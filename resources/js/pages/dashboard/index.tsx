import { hasRole } from '@/lib/utils';
import { Siswa, TahunAjaran, Tingkat } from '@/types';
import DashboardAdmin from './components/admin';
import DashboardGuru from './components/guru';
import DashboardOrangtua from './components/orang-tua';
import DashboardLayout from './layout/dashboard-layout';

type DasshboardIndexProps = {
  roles: string[];
  tahun_ajaran?: TahunAjaran;
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

const DashboardIndex = ({ roles, counts, tingkats, tahun_ajaran, siswas }: DasshboardIndexProps) => {
  return (
    <DashboardLayout>
      {hasRole(roles, ['admin', 'superadmin']) && <DashboardAdmin tingkats={tingkats} tahun_ajaran={tahun_ajaran} {...counts} />}
      {hasRole(roles, ['guru', 'superadmin']) && <DashboardGuru />}
      {hasRole(roles, ['orangtua', 'superadmin']) && <DashboardOrangtua siswas={siswas} />}
    </DashboardLayout>
  );
};

export default DashboardIndex;
