import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { SharedData, type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { Book, BookOpen, Calendar, Home, LayoutGrid, Settings2, Target, UserCheck2, UserCircle2, Users, Users2 } from 'lucide-react';
import AppLogo from './app-logo';

export function AppSidebar() {
  const { auth } = usePage<SharedData>().props;
  const user = auth.user;
  const mainNavItems: NavItem[] = [
    {
      title: 'Dashboard',
      href: route('dashboard'),
      icon: LayoutGrid,
    },
    {
      title: 'Buku panduan',
      href: route('dokumentasi'),
      icon: BookOpen,
    },
  ];

  const ppdbNavItems: NavItem[] = [
    {
      title: 'Pengaturan PPDB',
      href: route('ppdb.setting'),
      icon: Settings2,
    },
    {
      title: 'Data Calon Pesdik',
      href: route('ppdb.index'),
      icon: UserCheck2,
    },
  ];

  const raporNavItems: NavItem[] = [
    {
      title: 'Rapor Perkembangan',
      href: route('rapor.index'),
      icon: Book,
    },
    {
      title: 'Rapor Mapel Umum',
      href: route('rapor.index'),
      icon: Book,
    },
    {
      title: 'Rapor Tahfidz',
      href: route('rapor.index'),
      icon: Book,
    },
    {
      title: 'Rapor Tahsin',
      href: route('rapor.index'),
      icon: Book,
    },
  ];

  const masterDataNavItems: NavItem[] = [
    {
      title: 'Tahun Ajaran',
      href: route('tahunajaran.index'),
      icon: Calendar,
    },
    {
      title: 'Data Kelas',
      href: route('kelas.index'),
      icon: Home,
    },
    {
      title: 'Mata pelajaran',
      href: route('mapel.index'),
      icon: Book,
    },
    {
      title: 'Ekstrakulikuler',
      href: route('ekskul.index'),
      icon: Target,
    },
    {
      title: 'Data Pengguna',
      href: route('user.index'),
      icon: Users,
    },
    {
      title: 'Tenaga pendidik',
      href: route('guru.index'),
      icon: Users2,
    },
    {
      title: 'Data Siswa',
      href: route('siswa.index'),
      icon: UserCircle2,
    },
  ];
  // const footerNavItems: NavItem[] = [
  //   {
  //     title: 'Documentation',
  //     href: route('dokumentasi'),
  //     icon: BookOpen,
  //   },
  // ];

  return (
    <Sidebar collapsible="icon" variant="sidebar">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/dashboard" prefetch>
                <AppLogo />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={mainNavItems} label="Dashboard" />
        {user.role === 'admin' && (
          <>
            <NavMain items={raporNavItems} label="E-Rapor" />
            <NavMain items={ppdbNavItems} label="PPDB" />
            <NavMain items={masterDataNavItems} label="Master data" />
          </>
        )}
      </SidebarContent>

      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
