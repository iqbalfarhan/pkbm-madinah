import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { usePageProps } from '@/hooks/use-page-props';
import { SharedData } from '@/types';
import { Search } from 'lucide-react';
import SectionContainer from '../components/section-container';

const HeroSection = () => {
  const { active_ta, settings } = usePageProps<SharedData>();
  return (
    <SectionContainer>
      <div className="mx-auto w-full space-y-8 py-32 text-center md:px-24">
        <h3 className="text-lg">
          Assalamulaikum
          <br />
          selamat datang di:
        </h3>
        <div className="flex flex-col">
          <h1 className="text-4xl font-bold">Website PENERIMAAN PESERTA DIDIK BARU</h1>
          <h1 className="text-3xl font-bold text-primary">{settings.SEKOLAH_NAME}</h1>
        </div>
        <p className="px-4 text-lg">
          Situs ini dipersiapkan sebagai pusat informasi dan pengolahan data siswa peserta PPDB {settings.SEKOLAH_NAME} Tahun ajaran {active_ta?.name}{' '}
          secara online dan realtime. Sistem ini akan membantu anda dalam melakukan pendaftaran secara online.
        </p>
        <form className="mx-auto flex max-w-lg flex-col items-center gap-2 px-6 md:flex-row">
          <Input placeholder="Cari NISN / Nomor peserta" />
          <Button>
            <Search />
            Cari di PPDB
          </Button>
        </form>
      </div>
    </SectionContainer>
  );
};

export default HeroSection;
