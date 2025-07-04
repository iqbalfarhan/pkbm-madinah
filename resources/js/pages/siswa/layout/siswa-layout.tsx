import FormControl from '@/components/form-control';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, NavItem, SharedData, Siswa } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { Book, Building2, Edit, File, ListX, Target, User } from 'lucide-react';
import { FC, PropsWithChildren } from 'react';
import SiswaEditForm from '../components/siswa-edit-form';

type SiswaLayoutProps = PropsWithChildren & {
  siswa: Siswa;
};

const SiswaLayout: FC<SiswaLayoutProps> = ({ children, siswa }) => {
  const { url } = usePage<SharedData>();
  const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Data siswa', href: route('siswa.index') },
    { title: siswa.name, href: route('siswa.show', siswa.id) },
  ];

  const detailSiswaMenu: NavItem[] = [
    {
      title: 'Data diri siswa',
      href: route('siswa.show', siswa.id),
      icon: User,
      isActive: url === `/siswa/${siswa.id}`,
    },
    {
      title: 'E-Rapor',
      href: route('siswa.rapor', siswa.id),
      icon: Book,
      isActive: url === `/siswa/${siswa.id}/rapor`,
    },
    {
      title: 'Ketidakhadiran',
      href: route('siswa.ketidakhadiran', siswa.id),
      icon: ListX,
      isActive: url === `/siswa/${siswa.id}/ketidakhadiran`,
    },
    {
      title: 'Ekstrakulikuler',
      href: route('siswa.ekskul', siswa.id),
      icon: Target,
      isActive: url === `/siswa/${siswa.id}/ekskul`,
    },
    {
      title: 'Asal sekolah',
      href: route('siswa.asal-sekolah', siswa.id),
      icon: Building2,
      isActive: url === `/siswa/${siswa.id}/asal-sekolah`,
    },
    {
      title: 'Orang tua',
      href: route('siswa.orangtua', siswa.id),
      icon: User,
      isActive: url === `/siswa/${siswa.id}/orangtua`,
    },
    {
      title: 'Akun login orang tua',
      href: route('siswa.akun-orangtua', siswa.id),
      icon: User,
      isActive: url === `/siswa/${siswa.id}/akun-orangtua`,
    },
    {
      title: 'Dokumen',
      href: route('siswa.documents', siswa.id),
      icon: File,
      isActive: url === `/siswa/${siswa.id}/documents`,
    },
  ];
  return (
    <AppLayout
      breadcrumbs={breadcrumbs}
      title={siswa.name}
      description={siswa.nisn}
      actions={
        <SiswaEditForm siswa={siswa}>
          <Button>
            <Edit /> Edit siswa
          </Button>
        </SiswaEditForm>
      }
    >
      <Card>
        <CardContent>
          <div className="flex flex-col items-center gap-6 md:flex-row">
            <div>
              <Avatar className="size-24 place-self-center rounded md:size-32">
                <AvatarImage src={siswa.avatar} alt={siswa.name} />
              </Avatar>
            </div>
            <div className="grid flex-1 grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              <FormControl label="Nama siswa">
                <p className="text-muted-foreground">{siswa.name}</p>
              </FormControl>
              <FormControl label="Nomor induk siswa">
                <p className="text-muted-foreground">{siswa.nisn}</p>
              </FormControl>
              {/* <FormControl label="Nomor telepon">
                <p className="text-muted-foreground">{siswa.phone}</p>
              </FormControl>
              <FormControl label="Jenis kelamin">
                <p className="text-muted-foreground">{siswa.gender}</p>
              </FormControl>
              <FormControl label="Alamat email">
                <p className="text-muted-foreground">{siswa.email}</p>
              </FormControl> */}
              <FormControl label="Status aktif">
                <p className="text-muted-foreground">{siswa.status}</p>
              </FormControl>
              {/* <FormControl label="Tempat, Tanggal lahir">
                <p className="text-muted-foreground">{siswa.ttl}</p>
              </FormControl> */}
              <FormControl label="Kelas">
                <p className="text-muted-foreground">{siswa.kelas_label ?? ''}</p>
              </FormControl>
              {/* <FormControl label="Alamat tempat tinggal" className="sm:col-span-2">
                <p className="text-muted-foreground">{siswa.address}</p>
              </FormControl> */}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col gap-6 md:flex-row">
        <div className="w-full md:w-60">
          {detailSiswaMenu.map((item, index) => (
            <Button variant={item.isActive ? 'secondary' : 'ghost'} key={index} className="w-full justify-start" asChild>
              <Link href={item.href}>
                {item.icon && <item.icon />}
                {item.title}
              </Link>
            </Button>
          ))}
        </div>
        <div className="flex-1 space-y-6">{children}</div>
      </div>
    </AppLayout>
  );
};

export default SiswaLayout;
