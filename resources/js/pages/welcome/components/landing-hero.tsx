import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { usePageProps } from '@/hooks/use-page-props';
import { SharedData } from '@/types';
import { Search } from 'lucide-react';

const LandingHero = () => {
  const { active_ta, settings } = usePageProps<SharedData>();
  return (
    <div className="mx-auto w-full max-w-6xl space-y-8 px-6 pb-20 text-center md:px-20">
      <h3 className="text-lg">Selamat datang di:</h3>
      <div className="flex flex-col">
        <h1 className="text-4xl font-bold">PENERIMAAN PESERTA DIDIK BARU</h1>
        <h1 className="text-3xl font-bold text-primary">{settings.SEKOLAH_NAME}</h1>
      </div>
      <p className="text-lg">
        Situs ini dipersiapkan sebagai pusat informasi dan pengolahan data siswa peserta PPDB {settings.SEKOLAH_NAME} Tahun ajaran {active_ta?.name}{' '}
        secara online dan realtime. Sistem ini akan membantu anda dalam melakukan pendaftaran secara online.
      </p>
      <form className="mx-auto flex max-w-lg items-center gap-2">
        <Input placeholder="Input NISN / Nomor peserta" />
        <Button>
          <Search />
          Cari
        </Button>
      </form>

      {/* <ChildrenSvg className="mx-auto" /> */}
    </div>
  );
};

export default LandingHero;
