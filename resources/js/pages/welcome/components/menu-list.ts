import { NavItem } from '@/types';
import { CheckSquare, Home, Newspaper, Route } from 'lucide-react';

export const guestMenuList: NavItem[] = [
  {
    title: 'Beranda',
    href: route('home'),
    icon: Home,
  },
  {
    title: 'Kegiatan',
    href: route('artikel'),
    icon: Newspaper,
  },
  {
    title: 'Syarat pendaftaran',
    href: route('syarat'),
    icon: CheckSquare,
  },
  {
    title: 'Alur pendaftaran',
    href: route('alur'),
    icon: Route,
  },
];
