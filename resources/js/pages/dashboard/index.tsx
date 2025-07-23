import { enableToAccess } from '@/hooks/use-can';
import { usePageProps } from '@/hooks/use-page-props';
import { Siswa, TahunAjaran, Tingkat } from '@/types';
import { FC } from 'react';
import DashboardAdmin from './components/admin';
import DashboardGuru from './components/guru';
import DashboardOrangtua from './components/orang-tua';
import DashboardWalikelas from './components/walikelas';
import DashboardLayout from './layout/dashboard-layout';

type DasshboardIndexProps = {
  active_ta?: TahunAjaran;
  tingkats: Tingkat[];
  counts: {
    siswa_count: number;
    all_siswa_count: number;
    ppdb_count: number;
    guru_count: number;
    walikelas_count: number;
    kelas_count: number;
  };
  siswas: Siswa[];
};

const DashboardIndex: FC<DasshboardIndexProps> = ({ counts, tingkats, active_ta, siswas }) => {
  const { permissions } = usePageProps().auth;

  return (
    <DashboardLayout>
      {enableToAccess(permissions, 'menampilkan widget admin') && <DashboardAdmin tingkats={tingkats} active_ta={active_ta} {...counts} />}
      {enableToAccess(permissions, 'menampilkan widget list pelajaran') && <DashboardGuru />}
      {enableToAccess(permissions, 'menampilkan widget list anak') && <DashboardOrangtua siswas={siswas} />}
      {enableToAccess(permissions, 'menampilkan widget kelas walikelas') && <DashboardWalikelas />}
    </DashboardLayout>
  );
};

export default DashboardIndex;
