import { Icon } from '@/components/icon';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import GuruItemCard from '@/pages/guru/components/guru-item-card';
import KelasItemCard from '@/pages/kelas/components/kelas-item-card';
import MapelItemCard from '@/pages/mapel/components/mapel-item-card';
import { NavItem, Pelajaran } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { BookOpen, ChevronDown, Edit } from 'lucide-react';
import { FC, PropsWithChildren } from 'react';

type Props = PropsWithChildren & {
  title?: string;
  description?: string;
};

const PelajaranLayout: FC<Props> = ({ children }) => {
  const { pelajaran, active = 'material' } = usePage<{ pelajaran: Pelajaran; active: string }>().props;

  const links: NavItem[] = [
    {
      title: 'Materi belajar',
      href: route('pelajaran.show', pelajaran.id),
      icon: BookOpen,
      isActive: active === 'material',
    },
    {
      title: 'Input nilai',
      href: route('pelajaran.nilai', pelajaran.id),
      icon: Edit,
      isActive: active === 'nilai',
    },
  ];

  return (
    <AppLayout title="Detail pelajaran" description={pelajaran.mapel.name}>
      <Card>
        <Collapsible defaultOpen={false}>
          <CollapsibleTrigger asChild>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>{pelajaran.mapel.name}</CardTitle>
                  <CardDescription>{pelajaran.kelas.name}</CardDescription>
                </div>
                <Button variant={'secondary'} size={'icon'}>
                  <ChevronDown />
                </Button>
              </div>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent className="pt-6">
              <div className="grid grid-cols-4 gap-6">
                <KelasItemCard kelas={pelajaran.kelas} />
                <MapelItemCard mapel={pelajaran.mapel} />
                <GuruItemCard guru={pelajaran.guru} />
              </div>
            </CardContent>
          </CollapsibleContent>
        </Collapsible>
        <Separator />
        <CardFooter>
          <div className="flex items-center gap-2">
            {links.map((l) => (
              <Button asChild key={l.title} variant={l.isActive ? 'default' : 'secondary'}>
                <Link href={l.href}>
                  {l.icon && <Icon iconNode={l.icon} />}
                  {l.title}
                </Link>
              </Button>
            ))}
          </div>
        </CardFooter>
      </Card>
      {children}
    </AppLayout>
  );
};

export default PelajaranLayout;
