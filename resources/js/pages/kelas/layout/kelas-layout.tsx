import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, Kelas } from '@/types';
import { Edit } from 'lucide-react';
import { FC, PropsWithChildren } from 'react';
import KelasFormSheet from '../components/kelas-form-sheet';

type KelasLayoutProps = PropsWithChildren & {
  kelas: Kelas;
};

const KelasLayout: FC<KelasLayoutProps> = ({ kelas, children }) => {
  const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Kelas', href: route('kelas.index') },
    { title: kelas.name, href: route('kelas.show', kelas.id) },
  ];

  return (
    <AppLayout
      title={'Detail kelas'}
      breadcrumbs={breadcrumbs}
      actions={
        <>
          <KelasFormSheet kelas={kelas} purpose="edit">
            <Button>
              <Edit />
              Edit detail kelas
            </Button>
          </KelasFormSheet>
        </>
      }
    >
      <Card>
        <CardHeader>
          <CardTitle>{kelas.name}</CardTitle>
          <CardDescription>{kelas.tingkat.label}</CardDescription>
        </CardHeader>
        <CardContent>{kelas.walikelas?.name}</CardContent>
      </Card>

      <Tabs defaultValue="siswa">
        <TabsList>
          <TabsTrigger value="siswa">Anggota kelas</TabsTrigger>
          <TabsTrigger value="mapel">Mata pelajaran</TabsTrigger>
          <TabsTrigger value="absensi">Absensi</TabsTrigger>
        </TabsList>
      </Tabs>

      {children}
    </AppLayout>
  );
};

export default KelasLayout;
