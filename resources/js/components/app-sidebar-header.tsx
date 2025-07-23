import { Breadcrumbs } from '@/components/breadcrumbs';
import { SidebarTrigger } from '@/components/ui/sidebar';
import TahunAjaranListDialog from '@/pages/tahunajaran/components/tahun-ajaran-list-dialog';
import { SharedData, type BreadcrumbItem as BreadcrumbItemType } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { Calendar, TriangleAlert } from 'lucide-react';
import ThemeToggler from './theme-toggler';
import { Button } from './ui/button';

export function AppSidebarHeader({ breadcrumbs = [] }: { breadcrumbs?: BreadcrumbItemType[] }) {
  const { active_ta } = usePage<SharedData>().props;
  return (
    <header className="flex h-16 shrink-0 items-center justify-between gap-2 border-b border-sidebar-border/50 px-6 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 md:px-4">
      <div className="flex w-full items-center gap-2">
        <SidebarTrigger className="-ml-1" />
        <Breadcrumbs breadcrumbs={breadcrumbs} />
      </div>
      <ThemeToggler />
      <div className="hidden items-center gap-2 md:flex">
        {active_ta ? (
          <TahunAjaranListDialog>
            <Button variant={'outline'}>
              <Calendar />
              TA {active_ta.name} {active_ta.semester}
            </Button>
          </TahunAjaranListDialog>
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
