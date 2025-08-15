import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, Kelas, NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { Book, Edit, ListX, Target, User } from 'lucide-react';
import { FC, PropsWithChildren } from 'react';
import KelasFormSheet from '../components/kelas-form-sheet';

type KelasLayoutProps = PropsWithChildren & {
  kelas: Kelas;
};

const KelasLayout: FC<KelasLayoutProps> = ({ kelas, children }) => {
  const { url } = usePage();

  const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Kelas', href: route('kelas.index') },
    { title: kelas.name, href: route('kelas.show', kelas.id) },
  ];

  const tabLists: NavItem[] = [
    {
      title: 'Peserta didik',
      href: route('kelas.show', kelas.id),
      icon: User,
      isActive: url == `/kelas/${kelas.id}`,
    },
    {
      title: 'Ketidakhadiran',
      href: route('kelas.ketidakhadiran', kelas.id),
      icon: ListX,
      isActive: url == `/kelas/${kelas.id}/ketidakhadiran`,
    },
    {
      title: 'Pelajaran',
      href: route('kelas.pelajaran', kelas.id),
      icon: Book,
      isActive: url == `/kelas/${kelas.id}/pelajaran`,
    },
    {
      title: 'Ekstrakulikuler',
      href: route('kelas.ekskul', kelas.id),
      icon: Target,
      isActive: url == `/kelas/${kelas.id}/ekskul`,
    },
    {
      title: 'E-Rapor',
      href: route('kelas.rapor', kelas.id),
      icon: Book,
      isActive: url == `/kelas/${kelas.id}/rapor`,
    },
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
          <CardDescription className="line-clamp-2">{kelas.description}</CardDescription>
        </CardHeader>
        <Separator />
        <CardFooter>
          {tabLists.map((item) => (
            <Button variant={item.isActive ? 'default' : 'ghost'} key={item.title} asChild>
              <Link href={item.href}>
                {item.icon && <item.icon />}
                {item.title}
              </Link>
            </Button>
          ))}
        </CardFooter>
      </Card>

      {children}
    </AppLayout>
  );
};

export default KelasLayout;
