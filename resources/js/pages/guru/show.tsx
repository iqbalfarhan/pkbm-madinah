import FormControl from '@/components/form-control';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, Guru } from '@/types';
import { Edit, LogIn, Plus } from 'lucide-react';
import { FC } from 'react';
import GuruFormSheet from './components/guru-form-sheet';
import LoginSetting from './components/login-setting';

type GuruDetailProps = {
  guru: Guru;
};

const GuruDetail: FC<GuruDetailProps> = ({ guru }) => {
  const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Tenaga pendidik', href: route('guru.index') },
    { title: guru.name, href: route('guru.show', guru.id) },
  ];

  return (
    <AppLayout
      title={guru.name}
      description={guru.nip ?? 'Belum ada NIP'}
      breadcrumbs={breadcrumbs}
      actions={
        <GuruFormSheet guru={guru} purpose="edit">
          <Button>
            <Edit />
            Edit tenaga pendidik
          </Button>
        </GuruFormSheet>
      }
    >
      <Card>
        <CardContent>
          <div className="flex flex-col gap-6 md:flex-row">
            <div>
              <Avatar className="size-24 place-self-center rounded md:size-32">
                <AvatarImage src={guru.avatar} alt={guru.name} />
              </Avatar>
            </div>
            <div className="grid flex-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              <FormControl label="Nama pendidik">
                <p className="text-muted-foreground">{guru.name}</p>
              </FormControl>
              <FormControl label="Nomor telepon">
                <p className="text-muted-foreground">{guru.phone}</p>
              </FormControl>
              <FormControl label="Jenis kelamin">
                <p className="text-muted-foreground">{guru.gender}</p>
              </FormControl>
              <FormControl label="Alamat email">
                <p className="text-muted-foreground">{guru.email}</p>
              </FormControl>
              <FormControl label="Status aktif">
                <p className="text-muted-foreground">{guru.active ? 'Aktif' : 'Tidak aktif'}</p>
              </FormControl>
              <FormControl label="Walikelas">
                <p className="text-muted-foreground">{guru.walikelas?.name ?? '-'}</p>
              </FormControl>
              <FormControl label="Alamat tempat tinggal" className="col-span-full">
                <p className="text-muted-foreground">{guru.address}</p>
              </FormControl>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Hubungkan dengan akun login</CardTitle>
            <CardDescription>Pengaturan akun yang digunakan guru untuk login ke aplikasi</CardDescription>
          </CardHeader>
          <Separator />
          <CardFooter>
            <LoginSetting user={guru.user}>
              {guru.user ? (
                <Button>
                  <LogIn />
                  Pengaturan akun login
                </Button>
              ) : (
                <Button variant={'secondary'}>
                  <Plus />
                  Buat akun login untuk guru
                </Button>
              )}
            </LoginSetting>
          </CardFooter>
        </Card>
        <Card className="h-fit">
          <CardHeader>
            <CardTitle>Matapelajaran yang diajar</CardTitle>
            <CardDescription>Mengajar di kelas dan mapel</CardDescription>
          </CardHeader>
          <Separator />
          {guru.pelajarans.map((pelajaran) => {
            const mapel = pelajaran?.mapel;
            const kelas = pelajaran?.kelas;
            return (
              <CardHeader key={pelajaran.id}>
                <CardTitle>{mapel?.name}</CardTitle>
                <CardDescription>{kelas?.name}</CardDescription>
              </CardHeader>
            );
          })}
        </Card>
        <Card className="h-fit">
          <CardHeader>
            <CardTitle>Sebagai wali kelas</CardTitle>
            <CardDescription>Pengaturan akun yang digunakan guru untuk login ke aplikasi</CardDescription>
          </CardHeader>
          <Separator />
          {guru.walikelas && <CardFooter>{guru.walikelas.name}</CardFooter>}
        </Card>
      </div>
    </AppLayout>
  );
};

export default GuruDetail;
