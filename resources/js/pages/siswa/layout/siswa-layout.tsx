import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, NavItem, SharedData, Siswa } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { Book, Building2, Edit, File, ListX, Target, User } from 'lucide-react';
import { FC, PropsWithChildren } from 'react';
import SiswaEditForm from '../components/siswa-edit-form';
import SiswaHeadingCard from '../components/siswa-heading-card';

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
      title: 'Data orang tua',
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
      <SiswaHeadingCard siswa={siswa} />

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
