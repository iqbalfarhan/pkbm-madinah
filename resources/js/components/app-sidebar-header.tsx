import { Breadcrumbs } from '@/components/breadcrumbs';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { SharedData, type BreadcrumbItem as BreadcrumbItemType } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { Calendar, TriangleAlert } from 'lucide-react';
import { Button } from './ui/button';

export function AppSidebarHeader({ breadcrumbs = [] }: { breadcrumbs?: BreadcrumbItemType[] }) {
  const { tahun_ajaran } = usePage<SharedData>().props;
  return (
    <header className="flex h-16 shrink-0 items-center justify-between gap-2 border-b border-sidebar-border/50 px-6 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 md:px-4">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="-ml-1" />
        <Breadcrumbs breadcrumbs={breadcrumbs} />
      </div>
      <div className="hidden items-center gap-2 md:flex">
        {tahun_ajaran ? (
          <Button variant={'outline'} disabled asChild>
            <Link href={route('tahunajaran.index')}>
              <Calendar />
              TA {tahun_ajaran.name} {tahun_ajaran.semester}
            </Link>
          </Button>
        ) : (
          <Button variant={'destructive'} asChild>
            <Link href={route('tahunajaran.index')}>
              <TriangleAlert />
              Belum ada tahun ajaran aktif
            </Link>
          </Button>
        )}
      </div>
    </header>
  );
}
