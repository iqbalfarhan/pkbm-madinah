import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, Rapor } from '@/types';
import { Penilaian } from '@/types/rapor';
import { Link } from '@inertiajs/react';
import { Check, Download, Edit } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Rapor',
    href: '/rapor',
  },
  {
    title: 'Detail',
    href: '/rapor/1',
  },
];

const RaporDetail = ({ rapor }: { rapor: Rapor }) => {
  const title = `Rapor ${rapor.jenis} ${rapor.siswa.name} TA ${rapor.tahunajaran.label}`;
  const siswa = rapor.siswa;
  const data: Penilaian[] = rapor.data;
  return (
    <AppLayout
      title={title}
      breadcrumbs={breadcrumbs}
      description="Detail rapor siswa"
      actions={
        <>
          <Button asChild>
            <Link href={route('rapor.edit', rapor.id)}>
              <Edit />
              Edit rapor
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-6 md:grid-cols-4">
        <div className="space-y-6">
          <Card>
            <CardContent className="flex flex-col items-center justify-center gap-4">
              <Avatar className="size-32">
                <AvatarImage src={siswa.avatar} />
              </Avatar>
            </CardContent>
            <CardHeader className="text-center">
              <CardTitle>{siswa.name}</CardTitle>
              <CardDescription>{siswa.nisn}</CardDescription>
            </CardHeader>
          </Card>

          <Button className="w-full" asChild>
            <a href={route('rapor.download', rapor.id)}>
              <Download />
              Download PDF
            </a>
          </Button>
        </div>
        <div className="md:col-span-3">
          <div className="mx-auto max-w-4xl space-y-6">
            {data?.map((nilai, nilaiIndex) => (
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
                            <p className="text-wrap">{item.name}</p>
                          </TableCell>
                          <TableCell>
                            <p className="text-wrap">{item.description}</p>
                          </TableCell>
                          {['A', 'B', 'C'].map((mark) => (
                            <TableCell key={mark}>
                              {item.mark == mark && (
                                <Button variant="ghost" size="icon">
                                  <Check />
                                </Button>
                              )}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default RaporDetail;
