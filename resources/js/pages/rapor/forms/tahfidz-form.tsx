import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { surahList } from '@/lib/enums';
import { penilaianTahfidz } from '@/lib/mockup-data';
import { errorMessage, groupBy } from '@/lib/utils';
import { Rapor, Siswa, TahunAjaran } from '@/types';
import { RaporTahfidzData } from '@/types/rapor';
import { useForm } from '@inertiajs/react';
import { Check, ExternalLink, Plus, Trash2 } from 'lucide-react';
import { FC, useCallback, useEffect } from 'react';
import { toast } from 'sonner';

type Props = {
  rapor: Rapor;
  siswa: Siswa;
  tahunajaran: TahunAjaran;
};

const NilaiForm: FC<Props> = ({ rapor, siswa, tahunajaran }) => {
  const { data, setData, put } = useForm({
    siswa_id: rapor.siswa.id,
    jenis: rapor.jenis,
    tahunajaran_id: rapor.tahunajaran.id,
    data: (rapor.data ?? penilaianTahfidz) as RaporTahfidzData,
  });

  const handleUpdate = useCallback(() => {
    put(route('rapor.update', rapor.id), {
      preserveScroll: true,
      onSuccess: () => {
        toast.success('Rapor berhasil disimpan');
      },
      onError: (e) => toast.error(errorMessage(e)),
    });
  }, [put, rapor.id]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault(); // Biar gak nge-save halaman
        handleUpdate();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // Cleanup pas komponen unmount
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleUpdate]);

  const groupedSurah = groupBy(
    surahList.filter((s) => [1, 28, 29, 30].includes(s.juz)),
    'juz',
  );

  return (
    <AppLayout
      title="Rapor Perkembangan"
      description={`${rapor.siswa?.name} kelas ${rapor.siswa.kelas?.name} tahun ajaran ${rapor.tahunajaran?.name}`}
      actions={
        <>
          <Button asChild>
            <a href={route('rapor.stream', rapor.id)}>
              <ExternalLink />
              Preview PDF
            </a>
          </Button>
          <Button onClick={handleUpdate} className="fixed right-6 bottom-6">
            <Check />
            Simpan
          </Button>
        </>
      }
    >
      <div className="mx-auto max-w-4xl space-y-6">
        <CardTitle className="text-center text-3xl uppercase">
          LAPORAN PERKEMBANGAN HAFALAN AL-QURAN PKBM AL-MADINAH SEMESTER {tahunajaran.semester} TAHUN AJARAN {tahunajaran.name}
        </CardTitle>
        <Card>
          <CardContent>
            <dl className="space-y-2">
              <div className="flex">
                <dt className="w-1/3">Nama siswa</dt>
                <dd className="w-2/3">{siswa.name}</dd>
              </div>
              <div className="flex">
                <dt className="w-1/3">Kelas</dt>
                <dd className="w-2/3">{siswa.kelas?.name}</dd>
              </div>
              <div className="flex">
                <dt className="w-1/3">Usia</dt>
                <dd className="w-2/3">{siswa.umur ?? ''}</dd>
              </div>
              <div className="flex">
                <dt className="w-1/3">NIS/NISN</dt>
                <dd className="w-2/3">{siswa.nisn}</dd>
              </div>
            </dl>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Data rapor tahfidz</CardTitle>
            <CardDescription>Isi data tahfidz siswa</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>No</TableHead>
                  <TableHead>Nama surah</TableHead>
                  <TableHead>Kemampuan yang dicapai</TableHead>
                  <TableHead>Keterangan ayat</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.data.penilaian.map((item, index) => (
                  <TableRow>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          {item.surah == '' ? (
                            <Button variant={'ghost'} className="opacity-50">
                              Pilih surah
                            </Button>
                          ) : (
                            <Button variant={'ghost'}>{item.surah === '' ? 'Pilih surah' : item.surah}</Button>
                          )}
                        </DropdownMenuTrigger>
                        <DropdownMenuContent side="bottom" align="start">
                          {Object.keys(groupedSurah)
                            .sort((a, b) => Number(a) - Number(b))
                            .map((juz) => (
                              <DropdownMenuGroup key={juz}>
                                <DropdownMenuLabel>Juz {juz}</DropdownMenuLabel>
                                {groupedSurah[juz].map((surah) => (
                                  <DropdownMenuItem
                                    inset
                                    key={surah.id}
                                    onClick={() => {
                                      const updatedPenilaian = data.data.penilaian.map((item, idx) =>
                                        idx === index ? { ...item, surah: `${surah.surah} (${surah.id})` } : item,
                                      );
                                      setData('data.penilaian', updatedPenilaian);
                                    }}
                                  >
                                    {surah.surah} ({surah.id})
                                  </DropdownMenuItem>
                                ))}
                              </DropdownMenuGroup>
                            ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                    <TableCell>{item.keterangan}</TableCell>
                    <TableCell>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant={'ghost'} size={'icon'}>
                            {item.ayat}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent side="bottom" align="start" className="w-24">
                          <Input
                            className="text-center"
                            value={item.ayat}
                            onChange={(e) =>
                              setData(
                                'data.penilaian',
                                data.data.penilaian.map((item, idx) =>
                                  idx === index ? { ...item, ayat: e.target.value === '' ? 0 : Number(e.target.value) } : item,
                                ),
                              )
                            }
                          />
                        </PopoverContent>
                      </Popover>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant={'ghost'}
                        size={'icon'}
                        onClick={() =>
                          setData(
                            'data.penilaian',
                            data.data.penilaian.filter((_, idx) => idx !== index),
                          )
                        }
                      >
                        <Trash2 />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter>
            <Button onClick={() => setData('data.penilaian', [...data.data.penilaian, { surah: '', ayat: 0, keterangan: 'Berkembang' }])}>
              <Plus />
              Tambah baris
            </Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Catatan rapor</CardTitle>
            <CardDescription>Tulis catatan untuk siswa</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea value={data.data.catatan} onChange={(e) => setData('data.catatan', e.target.value)} className="min-h-24" />
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default NilaiForm;
