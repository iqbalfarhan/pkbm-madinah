import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { SharedData, type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import {
  Book,
  BookOpen,
  Database,
  Folder,
  Key,
  LayoutGrid,
  List,
  Settings,
  Target,
  UserCircle2,
  UserCog,
  UserPlus,
  Users,
  Users2,
} from 'lucide-react';
import AppLogo from './app-logo';

export function AppSidebar() {
  const { roles, kelas } = usePage<SharedData>().props.auth;

  // const kelas = auth.kelas as Kelas[] | null;
  // const roles = auth.roles as Role[] | [];
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
      icon: UserPlus,
      permission_name: 'menambahkan ppdb baru',
    },
    {
      title: 'Pengaturan PPDB',
      href: route('ppdb.index'),
      icon: UserCog,
      permission_name: 'menampilkan list ppdb',
    },
  ];

  const masterDataNavItems: NavItem[] = [
    {
      title: 'Pengaturan kelas',
      href: route('kelas.index'),
      icon: List,
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

  const superadminNavItems: NavItem[] = [
    {
      title: 'Role & permissions',
      href: route('role.index'),
      icon: Key,
      permission_name: 'mengatur role permission',
    },
    {
      title: 'Adminer database',
      href: route('role.index'),
      icon: Database,
      permission_name: 'membuka database',
    },
    {
      title: 'Pengaturan',
      href: route('settings.index'),
      icon: Settings,
      permission_name: 'edit sekolah',
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
        <NavMain
          items={kelas?.map((kela) => ({
            title: `Peng. ${kela.name}`,
            href: route('kelas.show', kela.id),
            icon: Folder,
            permission_name: 'menampilkan detail kelas',
          }))}
          label={`Menu walikelas`}
          showIf={roles.includes('walikelas')}
        />
        <NavMain items={masterDataNavItems} label="Master Data" />
        <NavMain items={ppdbNavItems} label="PPDB" />
        <NavMain items={superadminNavItems} label="Menu Superadmin" />
      </SidebarContent>

      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
