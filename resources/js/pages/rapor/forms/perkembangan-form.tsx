import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { penilaianPerkembangan } from '@/lib/mockup-data';
import { errorMessage } from '@/lib/utils';
import { Rapor, Siswa, TahunAjaran } from '@/types';
import { Penilaian, PointMark } from '@/types/rapor';
import { useForm } from '@inertiajs/react';
import { Check, ExternalLink } from 'lucide-react';
import { FC, useCallback, useEffect } from 'react';
import { toast } from 'sonner';
import { useDebouncedCallback } from 'use-debounce';

type RaporPerkembanganFormProps = {
  rapor: Rapor;
};

const RaporPerkembanganForm: FC<RaporPerkembanganFormProps> = ({ rapor }) => {
  const siswa: Siswa = rapor.siswa;
  const tahunajaran: TahunAjaran = rapor.tahunajaran;

  const { data, setData, put } = useForm({
    siswa_id: rapor.siswa.id,
    jenis: rapor.jenis,
    tahunajaran_id: rapor.tahunajaran.id,
    data: (rapor.data ?? penilaianPerkembangan) as Penilaian[],
  });

  const handleDescriptionChange = useDebouncedCallback((nilaiIndex: number, pointIndex: number, value: string) => {
    const updated = { ...data };
    updated.data[nilaiIndex].points[pointIndex].description = value;
    setData(updated);
  }, 300);

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
          LAPORAN PERKEMBANGAN SISWA PKBM AL-MADINAH SEMESTER {tahunajaran.semester} TAHUN AJARAN {tahunajaran.name}
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

        <h2 className="text-center text-xl font-bold">CURRICULAR DOMAIN</h2>
        {data.data.map((nilai, nilaiIndex) => (
          <Card key={nilaiIndex}>
            <CardHeader>
              <CardTitle>{nilai.name}</CardTitle>
              <CardDescription>{nilai.goal}</CardDescription>
            </CardHeader>
            <Separator />
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableCell className="text-center">Fokus Perkembangan</TableCell>
                    <TableCell className="w-xl text-center">Perkembangan anak</TableCell>
                    <TableCell className="w-[50px] text-center">A</TableCell>
                    <TableCell className="w-[50px] text-center">B</TableCell>
                    <TableCell className="w-[50px] text-center">C</TableCell>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {nilai.points.map((item, pointIndex) => (
                    <TableRow key={pointIndex}>
                      <TableCell>
                        <div className="text-wrap">{item.name}</div>
                      </TableCell>
                      <TableCell>
                        <Textarea
                          placeholder="Tulis deskripsi disini..."
                          className="min-h-20"
                          defaultValue={item.description}
                          onChange={(e) => handleDescriptionChange(nilaiIndex, pointIndex, e.target.value)}
                        />
                      </TableCell>
                      {['A', 'B', 'C'].map((mark) => (
                        <TableCell key={mark}>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              const updatedData = { ...data };
                              updatedData.data[nilaiIndex].points[pointIndex].mark = mark as PointMark;
                              setData(updatedData);
                            }}
                          >
                            <Checkbox checked={item.mark === mark} />
                          </Button>
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        ))}

        <h2 className="text-center text-xl font-bold">18 SIKAP</h2>

        <Card>
          <CardHeader>
            <CardTitle>4 dari 18 Sikap yang dibangun di Sekolah Al – Madinah.</CardTitle>
            <CardDescription>
              <li>I (membutuhkan motivasi)</li>
              <li>II (menunjukkan perbaikan)</li>
              <li>III (memiliki kompetensi)</li>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>No.</TableHead>
                  <TableHead className="w-full">Sikap yang dikembangkan</TableHead>
                  <TableHead className="text-center">I</TableHead>
                  <TableHead className="text-center">II</TableHead>
                  <TableHead className="text-center">III</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {['Istiqomah', 'Rendah Diri', 'Berpikir Positif', 'Mutu'].map((item, index) => (
                  <TableRow>
                    <TableCell>{index + 1}.</TableCell>
                    <TableCell>{item}</TableCell>
                    <TableCell>
                      <Button variant={'ghost'} size={'icon'}>
                        <Checkbox />
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button variant={'ghost'} size={'icon'}>
                        <Checkbox />
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button variant={'ghost'} size={'icon'}>
                        <Checkbox checked />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <h2 className="text-center text-xl font-bold">EKSTRAKULIKULER</h2>
        <Card>
          <CardHeader>
            <CardTitle>Ekstrakulikuler</CardTitle>
            <CardDescription>Ekstarkulukuler dan kegiatan yang diikuti siswa</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>No.</TableHead>
                  <TableHead>Jenis Ekstrakurikuler</TableHead>
                  <TableHead>Kegiatan yang pernah Diikuti</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {siswa.ekskuls?.map((item, index) => (
                  <TableRow>
                    <TableCell>{index + 1}.</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.kegiatan}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <h2 className="text-center text-xl font-bold">KETIDAKHADIRAN</h2>

        <Card>
          <CardHeader>
            <CardTitle>Ekstrakulikuler</CardTitle>
            <CardDescription>Ekstarkulukuler dan kegiatan yang diikuti siswa</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>No.</TableHead>
                  <TableHead>Jenis Ekstrakurikuler</TableHead>
                  <TableHead>Kegiatan yang pernah Diikuti</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {['Renang', 'Memanah'].map((item, index) => (
                  <TableRow>
                    <TableCell>{index + 1}.</TableCell>
                    <TableCell>{item}</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <h2 className="text-center text-xl font-bold">KOMENTAR</h2>

        <Card>
          <CardHeader>
            <CardTitle>Komentar guru</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea>
              Alhamdulillaah, Ananda Zuhdi sudah mampu menerapkan beberapa sikap dari 18 sikap yang telah ada, yaitu sabar menunggu giliran ketika
              akan recalling, fokus dan tuntas dalam mengerjakan pekerjaan yang telah diberikan oleh Bapak/Ibu guru. Disiplin, jujur, bersih, sayang
              teman, dan rajin mengikuti pelajaran di sekolah, ###Ikhlas menerima apapun yang didapatkannya. Serta ramah dan sering tersenyum kepada
              Bapak/Ibu guru serta teman-teman di sekolah. Ananda mampu menjelaskan kembali materi yang telah diberikan serta bertanggung jawab atas
              tugas yang telah diberikan oleh Bapak/Ibu guru di sekolah. Tetap muroja’ah di rumah, menjadi anak yang rendah hati, menghormati dan
              berbakti kepada orang tua dan semoga ananda Zuhdi menjadi anak yang sholeh. Aamiin.
            </Textarea>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default RaporPerkembanganForm;
