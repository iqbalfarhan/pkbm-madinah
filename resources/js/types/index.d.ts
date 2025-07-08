import { absensiStatusLists, agamaLists, groupTingkat, jenisRaporsLists } from '@/lib/enums';
import { Penilaian } from '@/lib/mockup-data';
import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
  user: User;
  roles: string[];
  permissions: string[];
  kelas: Kelas | null;
}

export interface BreadcrumbItem {
  title: string;
  href: string;
}

export interface NavGroup {
  title: string;
  items: NavItem[];
}

export interface NavItem {
  title: string;
  href: string;
  icon?: LucideIcon | null;
  permission_name?: string | string[];
  isActive?: boolean;
}

export interface SharedData {
  name: string;
  quote: { message: string; author: string };
  auth: Auth;
  ziggy: Config & { location: string };
  sidebarOpen: boolean;
  tahun_ajaran: TahunAjaran;
  settings: { [key: string]: string };
  [key: string]: unknown;
}

export interface User {
  id: number;
  name: string;
  email: string;
  roles: string[];
  avatar?: string;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
  last_login: string;
  siswas?: Siswa[];
  guru?: Guru;
  [key: string]: unknown; // This allows for additional properties...
}

export type TahunAjaran = {
  id: number;
  name: string;
  semester: string;
  slug: string;
  label: string;
  active: boolean;
};

export type UserRole = 'admin' | 'guru' | 'orangtua';
export type GroupTingkat = typeof groupTingkat;
export type Gender = 'Laki-laki' | 'Perempuan';
export type Religion = typeof agamaLists;
export type SiswaStatus = 'ppdb' | 'aktif' | 'lulus' | 'pindah' | 'dikeluarkan';
export type AbsensiStatus = typeof absensiStatusLists;
export type JenisRapor = typeof jenisRaporsLists;

export type Pelajaran = {
  id: number;
  guru: Guru;
  kelas: Kelas;
  mapel: Mapel;
};

export type Guru = {
  id: number;
  name: string;
  nip: string;
  address: string;
  phone: string;
  email: string;
  avatar: string;
  gender: Gender;
  active: boolean;
  user?: User;
  walikelas?: Kelas;
  pelajarans: Pelajaran[];
  ekskuls?: Ekskul[];
};

export type Tingkat = {
  id: number;
  group: GroupTingkat;
  name: string;
  label: string;
  siswas_count?: number;
  kelases: Kelas[];
};

export type MapelGroup = {
  id: number;
  name: string;
};

export type Kelas = {
  id: number;
  name: string;
  tingkat: Tingkat;
  walikelas: Guru | null;
  description: string;
  siswas: Siswa[];
  mapels: Mapel[];
  pelajarans?: Pelajaran[];
};

export type Mapel = {
  id: number;
  name: string;
  description: string;
  thumbnail: string;
  tingkat: Tingkat;
  mapel_group: MapelGroup;
  materials: Material[];
  kelas: Kelas[];
};

export type Material = {
  id: number;
  mapel: Mapel;
  title: string;
  description: string;
  url: string;
};

export type Siswa = {
  id: number;
  name: string;
  nisn: string;
  user: User;
  kelas: Kelas;
  kelas_label: string;
  gender: Gender;
  pob: string;
  dob: string;
  ttl: string;
  religion: Religion;
  address: string;
  phone: string;
  email: string;
  active: boolean;
  avatar: string;
  register_year: number;
  umur?: string;
  status: SiswaStatus;
  created_at: string;
  ekskuls?: (Ekskul & {
    pivot: {
      kegiatan: string;
    };
  })[];
  orangtua?: Orangtua;
  rapors?: Rapor[];
  ketidakhadirans?: Ketidakhadiran[];
};

type RaporPerkembanganData = {
  name: string;
  goal: string;
  points: {
    name: string;
    description: string;
    mark: 'A' | 'B' | 'C';
  }[];
};

export type Rapor = {
  id: number;
  siswa: Siswa;
  tahunajaran: TahunAjaran;
  jenis: string;
  data: Penilaian[];
  pdf_path: string;
  publish: boolean;
};

export type Ekskul = {
  id: number;
  name: string;
  kegiatan: string;
  siswas: Siswa[];
  guru?: Guru;
};

export type Absensi = {
  tahunajaran: TahunAjaran;
  kelas: Kelas;
  siswa: Siswa;
  guru: Guru;
  mapel: Mapel;
  tanggal: string;
  status: AbsensiStatus;
};

export type Media = {
  id: number;
  model_type: string;
  model_id: number;
  uuid: string;
  collection_name: string;
  name: string;
  file_name: string;
  mime_type: string;
  disk: string;
  conversions_disk: string;
  size: string;
  // manipulations: [];
  // custom_properties: [];
  // generated_conversions: [];
  // responsive_images: [];
  order_column: number;
  created_at: string;
  updated_at: string;
  original_url: string;
  preview_url: string;
};

export type Orangtua = {
  id: number;
  siswa: Siswa;
  father_name: string;
  father_address: string;
  father_phone: string;
  father_ocupation: string;
  mother_name: string;
  mother_address: string;
  mother_phone: string;
  mother_ocupation: string;
};

export type Role = {
  id: number;
  name: string;
  permissions?: Permission[];
};

export type Permission = {
  id: number;
  group?: string;
  name: string;
};

export type Ketidakhadiran = {
  id: number;
  date: string;
  siswa: Siswa;
  tahunajaran: TahunAjaran;
  reason: string;
  medias: Media[];
};
