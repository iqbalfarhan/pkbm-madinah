import { TahunAjaran, Tingkat } from '@/types';
import { FC } from 'react';
import TingkatChartWidget from '../widget/tingkat-chart-widget';
import WidgetCard from './widget-card';

type DashboardAdminProps = {
  siswa_count: number;
  all_siswa_count: number;
  ppdb_count: number;
  guru_count: number;
  walikelas_count: number;
  kelas_count: number;
  tahun_ajaran?: TahunAjaran;
  tingkats: Tingkat[];
};

const DashboardAdmin: FC<DashboardAdminProps> = ({
  siswa_count,
  all_siswa_count,
  guru_count,
  walikelas_count,
  kelas_count,
  tahun_ajaran,
  tingkats,
}) => {
  return (
    <>
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <WidgetCard
          href={route('siswa.index')}
          value={siswa_count}
          badge="Siswa aktif"
          title="Siswa aktif"
          description={`Siswa dengan status aktif belajar dari ${all_siswa_count} siswa yang terdaftar.`}
        />
        <WidgetCard
          value={guru_count}
          href={route('guru.index')}
          title="Guru yang mengajar"
          description={`Guru yang mengajar di sekolah termasuk ${walikelas_count} yang menjadi walikelas.`}
        />
        <WidgetCard
          value={kelas_count}
          href={route('kelas.index')}
          title="kelas"
          description={`Kelas yang ada di sekolah. dengan ${siswa_count} siswa yang aktif di kelas.`}
        />
        {tahun_ajaran && (
          <WidgetCard value={tahun_ajaran?.semester} title={tahun_ajaran.name} description="Tahun ajaran dan semester yang berjalan sekarang." />
        )}
      </div>

      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <TingkatChartWidget tingkats={tingkats} />
      </div>
    </>
  );
};

export default DashboardAdmin;
