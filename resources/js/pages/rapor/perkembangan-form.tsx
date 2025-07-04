import MarkdownReader from '@/components/MarkdownReader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { Rapor, Siswa, TahunAjaran } from '@/types';
import { Check, Download } from 'lucide-react';
import { FC } from 'react';

type RaporPerkembanganFormProps = {
  rapor: Rapor;
};

const RaporPerkembanganForm: FC<RaporPerkembanganFormProps> = ({ rapor }) => {
  const siswa: Siswa = rapor.siswa;
  const tahunajaran: TahunAjaran = rapor.tahunajaran;
  const penilaian = [
    {
      name: 'ESTETIK',
      goal: 'Agar anak dapat mengintegritaskan perasaan, pikiran, dan tindakan melalui seni, musik, dan pengalaman sensori yang lain untuk memperoleh kesenangan dan akhirnya memahami dirinya.',
      points: [
        {
          name: 'Enjoyment',
          description:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam dicta corrupti aut sit tempore deleniti nobis explicabo. Quae commodi earum accusamus ex nulla illum temporibus, cupiditate tempora fugiat nemo! Magnam?',
          mark: 'A',
        },
        {
          name: 'Stimulation',
          description:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores tempora ratione delectus, deleniti, reiciendis pariatur, impedit quasi exercitationem quam voluptatibus mollitia magnam vel adipisci molestiae quis repellat quae architecto iusto?',
          mark: 'A',
        },
        {
          name: 'Insight',
          description:
            'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt rem corrupti voluptatem ipsum asperiores commodi quia neque alias mollitia sapiente, cupiditate dolor consequatur facilis fugiat quam suscipit atque explicabo ad?',
          mark: 'A',
        },
        {
          name: 'Satisfaction',
          description:
            'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt rem corrupti voluptatem ipsum asperiores commodi quia neque alias mollitia sapiente, cupiditate dolor consequatur facilis fugiat quam suscipit atque explicabo ad?',
          mark: 'A',
        },
      ],
    },
    {
      name: 'AFEKSI',
      goal: 'Agar anak merasakan mereka di sayang, mempunyai arti / makna dan sebagai pribadi yang memiliki kemampuan.',
      points: [
        {
          name: 'Trust',
          description:
            'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt rem corrupti voluptatem ipsum asperiores commodi quia neque alias mollitia sapiente, cupiditate dolor consequatur facilis fugiat quam suscipit atque explicabo ad?',
          mark: 'A',
        },
        {
          name: 'Autonomy',
          description:
            'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt rem corrupti voluptatem ipsum asperiores commodi quia neque alias mollitia sapiente, cupiditate dolor consequatur facilis fugiat quam suscipit atque explicabo ad?',
          mark: 'A',
        },
        {
          name: 'Initiative',
          description:
            'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt rem corrupti voluptatem ipsum asperiores commodi quia neque alias mollitia sapiente, cupiditate dolor consequatur facilis fugiat quam suscipit atque explicabo ad?',
          mark: 'A',
        },
        {
          name: 'Industry',
          description:
            'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt rem corrupti voluptatem ipsum asperiores commodi quia neque alias mollitia sapiente, cupiditate dolor consequatur facilis fugiat quam suscipit atque explicabo ad?',
          mark: 'A',
        },
        {
          name: 'Self Concept',
          description:
            'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt rem corrupti voluptatem ipsum asperiores commodi quia neque alias mollitia sapiente, cupiditate dolor consequatur facilis fugiat quam suscipit atque explicabo ad?',
          mark: 'A',
        },
        {
          name: 'Self Esteem',
          description:
            'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt rem corrupti voluptatem ipsum asperiores commodi quia neque alias mollitia sapiente, cupiditate dolor consequatur facilis fugiat quam suscipit atque explicabo ad?',
          mark: 'A',
        },
      ],
    },
    {
      name: 'KOGNISI',
      goal: 'Agar anak dapat mengintegrasikan pengetahuan dan pengalamannya pada saat mereka mengembangkan konsep – konsep yang lebih luas.',
      points: [
        {
          name: 'Perception',
          description:
            'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt rem corrupti voluptatem ipsum asperiores commodi quia neque alias mollitia sapiente, cupiditate dolor consequatur facilis fugiat quam suscipit atque explicabo ad?',
          mark: 'A',
        },
        {
          name: 'Physical Knowledge',
          description:
            'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt rem corrupti voluptatem ipsum asperiores commodi quia neque alias mollitia sapiente, cupiditate dolor consequatur facilis fugiat quam suscipit atque explicabo ad?',
          mark: 'A',
        },
        {
          name: 'Logic-Math Knowledge',
          description:
            'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt rem corrupti voluptatem ipsum asperiores commodi quia neque alias mollitia sapiente, cupiditate dolor consequatur facilis fugiat quam suscipit atque explicabo ad?',
          mark: 'A',
        },
        {
          name: 'Representational Knowledge',
          description:
            'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt rem corrupti voluptatem ipsum asperiores commodi quia neque alias mollitia sapiente, cupiditate dolor consequatur facilis fugiat quam suscipit atque explicabo ad?',
          mark: 'A',
        },
        {
          name: 'Critical Thinking',
          description:
            'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt rem corrupti voluptatem ipsum asperiores commodi quia neque alias mollitia sapiente, cupiditate dolor consequatur facilis fugiat quam suscipit atque explicabo ad?',
          mark: 'A',
        },
        {
          name: 'Conventional Social Knowledge',
          description:
            'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt rem corrupti voluptatem ipsum asperiores commodi quia neque alias mollitia sapiente, cupiditate dolor consequatur facilis fugiat quam suscipit atque explicabo ad?',
          mark: 'A',
        },
      ],
    },
    {
      name: 'BAHASA',
      goal: 'Agar anak dapat menginterpresikan secara tepat saat berkomunikasi dengan orang lain sebaik / seefektif berkomunikasi dengan diri mereka sendiri.',
      points: [
        {
          name: 'Listening',
          description:
            'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt rem corrupti voluptatem ipsum asperiores commodi quia neque alias mollitia sapiente, cupiditate dolor consequatur facilis fugiat quam suscipit atque explicabo ad?',
          mark: 'A',
        },
        {
          name: 'Receptive',
          description:
            'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt rem corrupti voluptatem ipsum asperiores commodi quia neque alias mollitia sapiente, cupiditate dolor consequatur facilis fugiat quam suscipit atque explicabo ad?',
          mark: 'A',
        },
        {
          name: 'Expressive',
          description:
            'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt rem corrupti voluptatem ipsum asperiores commodi quia neque alias mollitia sapiente, cupiditate dolor consequatur facilis fugiat quam suscipit atque explicabo ad?',
          mark: 'A',
        },
        {
          name: 'Writing',
          description:
            'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt rem corrupti voluptatem ipsum asperiores commodi quia neque alias mollitia sapiente, cupiditate dolor consequatur facilis fugiat quam suscipit atque explicabo ad?',
          mark: 'A',
        },
        {
          name: 'Reading',
          description:
            'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt rem corrupti voluptatem ipsum asperiores commodi quia neque alias mollitia sapiente, cupiditate dolor consequatur facilis fugiat quam suscipit atque explicabo ad?',
          mark: 'A',
        },
      ],
    },
    {
      name: 'PSIKOMOTOR',
      goal: 'Agar anak dapat menguasai lingkungan melalui peningkatan control tubuh dan pengembangan sikap, pengetahuan, keterampilan – keterampilan, dan perilaku – perilaku yang berhubungan dalam memelihara, menghormati, dan melindungi diri mereka sendiri.',
      points: [
        {
          name: 'Body Awarness',
          description:
            'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt rem corrupti voluptatem ipsum asperiores commodi quia neque alias mollitia sapiente, cupiditate dolor consequatur facilis fugiat quam suscipit atque explicabo ad?',
          mark: 'A',
        },
        {
          name: 'Gross Motor',
          description:
            'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt rem corrupti voluptatem ipsum asperiores commodi quia neque alias mollitia sapiente, cupiditate dolor consequatur facilis fugiat quam suscipit atque explicabo ad?',
          mark: 'A',
        },
        {
          name: 'Fine Motor',
          description:
            'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt rem corrupti voluptatem ipsum asperiores commodi quia neque alias mollitia sapiente, cupiditate dolor consequatur facilis fugiat quam suscipit atque explicabo ad?',
          mark: 'A',
        },
        {
          name: 'Physical Health',
          description:
            'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt rem corrupti voluptatem ipsum asperiores commodi quia neque alias mollitia sapiente, cupiditate dolor consequatur facilis fugiat quam suscipit atque explicabo ad?',
          mark: 'A',
        },
      ],
    },
    {
      name: 'SOCIAL',
      goal: 'Agar anak dapat mengembangkan pola – pola dari interaksi social secara sukses juga nilai – nilai social dan   control diri.',
      points: [
        {
          name: 'Social Skill',
          description:
            'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt rem corrupti voluptatem ipsum asperiores commodi quia neque alias mollitia sapiente, cupiditate dolor consequatur facilis fugiat quam suscipit atque explicabo ad?',
          mark: 'A',
        },
        {
          name: 'Socialization',
          description:
            'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt rem corrupti voluptatem ipsum asperiores commodi quia neque alias mollitia sapiente, cupiditate dolor consequatur facilis fugiat quam suscipit atque explicabo ad?',
          mark: 'A',
        },
      ],
    },
  ];

  return (
    <AppLayout
      title="Rapor Perkembangan"
      description={`${rapor.siswa?.name} kelas ${rapor.siswa.kelas?.name} tahun ajaran ${rapor.tahunajaran?.name}`}
      actions={
        <>
          <Button asChild>
            <a href={route('rapor.pdf', rapor.id)}>
              <Download />
              Generate PDF
            </a>
          </Button>
          <Button>
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
        {penilaian.map((nilai) => (
          <Card>
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
                  {nilai.points.map((item) => (
                    <TableRow>
                      <TableCell>
                        <div className="text-wrap">{item.name}</div>
                      </TableCell>
                      <TableCell>
                        {/* <p className="text-wrap">{item.description}</p> */}
                        <Textarea className="min-h-20 border-0 !bg-transparent" value={item.description} />
                      </TableCell>
                      <TableCell>
                        <Button variant={'ghost'} size={'icon'}>
                          <Checkbox checked={item.mark === 'A'} />
                        </Button>
                      </TableCell>
                      <TableCell>
                        <Button variant={'ghost'} size={'icon'}>
                          <Checkbox checked={item.mark === 'B'} />
                        </Button>
                      </TableCell>
                      <TableCell>
                        <Button variant={'ghost'} size={'icon'}>
                          <Checkbox checked={item.mark === 'C'} />
                        </Button>
                      </TableCell>
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
            <MarkdownReader
              value="Alhamdulillaah, Ananda Zuhdi sudah mampu menerapkan beberapa sikap dari 18 sikap yang telah ada, yaitu sabar menunggu giliran ketika akan
            recalling, fokus dan tuntas dalam mengerjakan pekerjaan yang telah diberikan oleh Bapak/Ibu guru. Disiplin, jujur, bersih, sayang teman,
            dan rajin mengikuti pelajaran di sekolah, ###Ikhlas menerima apapun yang didapatkannya. Serta ramah dan sering tersenyum kepada Bapak/Ibu
            guru serta teman-teman di sekolah. Ananda mampu menjelaskan kembali materi yang telah diberikan serta bertanggung jawab atas tugas yang
            telah diberikan oleh Bapak/Ibu guru di sekolah. Tetap muroja’ah di rumah, menjadi anak yang rendah hati, menghormati dan berbakti kepada
            orang tua dan semoga ananda Zuhdi menjadi anak yang sholeh. Aamiin."
            />
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default RaporPerkembanganForm;
