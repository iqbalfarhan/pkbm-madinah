import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { usePageProps } from '@/hooks/use-page-props';
import { hasRole } from '@/lib/utils';
import { Kelas, type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { Book, BookOpen, Calendar, Folder, Home, LayoutGrid, Target, UserCheck2, UserCircle2, Users, Users2 } from 'lucide-react';
import AppLogo from './app-logo';

export function AppSidebar() {
  const { auth } = usePageProps();

  const kelas = auth.kelas as Kelas[] | null;
  const roles = auth.roles as string[];
  const mainNavItems: NavItem[] = [
    {
      title: 'Dashboard',
      href: route('dashboard'),
      icon: LayoutGrid,
      permission_name: 'dashboard',
    },
    {
      title: 'Buku panduan',
      href: route('dokumentasi'),
      icon: BookOpen,
      permission_name: 'documentation',
    },
    {
      title: 'Pengaturan PPDB',
      href: route('ppdb.index'),
      icon: UserCheck2,
      permission_name: 'menampilkan list ppdb',
    },
    {
      title: 'Rapor siswa',
      href: route('rapor.index'),
      icon: Book,
      permission_name: 'menampilkan list rapor',
    },
  ];

  const ppdbNavItems: NavItem[] = [
    {
      title: 'Pendaftaran siswa',
      href: route('ppdb.create'),
      icon: Users,
      permission_name: 'menambahkan ppdb baru',
    },
  ];

  const masterDataNavItems: NavItem[] = [
    {
      title: 'Tahun Ajaran',
      href: route('tahunajaran.index'),
      icon: Calendar,
      permission_name: 'menampilkan list tahun ajaran',
    },
    {
      title: 'Data Kelas',
      href: route('kelas.index'),
      icon: Home,
      permission_name: 'menampilkan list kelas',
    },
    {
      title: 'Mata pelajaran',
      href: route('mapel.index'),
      icon: Book,
      permission_name: 'menampilkan list mata pelajaran',
    },
    {
      title: 'Ekstrakulikuler',
      href: route('ekskul.index'),
      icon: Target,
      permission_name: 'menampilkan list ekskul',
    },
    {
      title: 'Data Pengguna',
      href: route('user.index'),
      icon: Users,
      permission_name: 'menampilkan list user',
    },
    {
      title: 'Tenaga pendidik',
      href: route('guru.index'),
      icon: Users2,
      permission_name: 'menampilkan list guru',
    },
    {
      title: 'Data Siswa',
      href: route('siswa.index'),
      icon: UserCircle2,
      permission_name: 'menampilkan list siswa',
    },
  ];

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
        {hasRole(roles, ['walikelas']) && (
          <NavMain
            items={kelas?.map((kela) => ({
              title: `Pengaturan ${kela.name}`,
              href: route('kelas.show', kela.id),
              icon: Folder,
              permission_name: 'mengedit data kelas',
            }))}
            label={`Menu walikelas`}
          />
        )}
        {hasRole(roles, ['admin', 'superadmin']) && <NavMain items={masterDataNavItems} label="Master Data" />}
        {hasRole(roles, ['orangtua']) && <NavMain items={ppdbNavItems} label="PPDB" />}
      </SidebarContent>

      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
