import FormControl from '@/components/form-control';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { penilaianPelajaran } from '@/lib/mockup-data';
import { errorMessage, groupBy } from '@/lib/utils';
import { Rapor, Siswa, TahunAjaran } from '@/types';
import { RaporNilaiData } from '@/types/rapor';
import { router, useForm } from '@inertiajs/react';
import { Check, ExternalLink, Loader2 } from 'lucide-react';
import { FC, useCallback, useEffect } from 'react';
import { toast } from 'sonner';

type Props = {
  rapor: Rapor;
  tahunajaran: TahunAjaran;
  siswa: Siswa;
};

const NilaiForm: FC<Props> = ({ rapor, siswa, tahunajaran }) => {
  const { data, setData, put } = useForm({
    siswa_id: rapor.siswa.id,
    jenis: rapor.jenis,
    tahunajaran_id: rapor.tahunajaran.id,
    data: (rapor.data ?? penilaianPelajaran) as RaporNilaiData,
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

  const groupingNilai = groupBy(data.data.penilaian, 'type');

  return (
    <AppLayout
      title="Rapor Nilai"
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
          LAPORAN HASIL BELAJAR
          <br /> SEMESTER {tahunajaran.semester} TAHUN AJARAN {tahunajaran.name}
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
            <CardTitle>Nilai matapelajaran</CardTitle>
            <CardDescription>
              Nilai tugas dan evaluasi diisi oleh guru pelajaran. Apabila ada perubahan nilai dari guru, lakukan refresh data nilai dengan klik pada
              tombol di bawah
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button
              onClick={() => {
                router.put(
                  route('rapor.sync-nilai', rapor.id),
                  {},
                  {
                    preserveScroll: true,
                    onSuccess: () => {
                      toast.success('Data nilai berhasil di refresh');
                      router.reload();
                    },
                    onError: (e) => toast.error(errorMessage(e)),
                  },
                );
              }}
            >
              <Loader2 /> Refresh data nilai
            </Button>
          </CardFooter>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>No</TableHead>
                  <TableHead>Mata pelajaran</TableHead>
                  <TableHead>Nilai tugas</TableHead>
                  <TableHead>Nilai Evaluasi</TableHead>
                  <TableHead>Nilai Rata-rata</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Object.entries(groupingNilai).map(([type, items], index) => {
                  return (
                    <>
                      <TableRow key={index}>
                        <TableCell colSpan={5} className="bg-muted font-bold uppercase">
                          {type}
                        </TableCell>
                      </TableRow>
                      {items.map((item, index) => (
                        <TableRow>
                          <TableCell>{index + 1}</TableCell>
                          <TableCell>{item.name}</TableCell>
                          <TableCell>{item.nilai_tugas}</TableCell>
                          <TableCell>{item.evaluasi}</TableCell>
                          <TableCell>{item.rata_rata}</TableCell>
                        </TableRow>
                      ))}
                    </>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Keputusan</CardTitle>
            <CardDescription>Berdasarkan pencapaian kompetensi pada semester 1 dan 2, peserta didik dinyatakan :</CardDescription>
          </CardHeader>
          <Separator />
          <CardFooter>
            <div className="grid w-full grid-cols-4">
              <FormControl label="Naik kelas?">
                <Label className="flex h-9 items-center">
                  <Checkbox checked={data.data.naik_kelas} onCheckedChange={(checked: boolean) => setData('data.naik_kelas', checked)} />
                  <span>Naik kelas</span>
                </Label>
              </FormControl>
              <div>
                {data.data.naik_kelas && (
                  <FormControl label="Naik ke kelas">
                    <Select value={data.data.ke_kelas} onValueChange={(value) => setData('data.ke_kelas', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih kelas" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2">2</SelectItem>
                        <SelectItem value="3">3</SelectItem>
                        <SelectItem value="4">4</SelectItem>
                        <SelectItem value="5">5</SelectItem>
                        <SelectItem value="6">6</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                )}
              </div>
            </div>
          </CardFooter>
          <CardContent className="hidden">
            <Textarea value={data.data.keputusan} onChange={(e) => setData('data.keputusan', e.target.value)} className="min-h-24" />
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default NilaiForm;
