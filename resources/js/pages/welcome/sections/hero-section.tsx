import { Button } from '@/components/ui/button';
import { usePageProps } from '@/hooks/use-page-props';
import { SharedData } from '@/types';
import { Link } from '@inertiajs/react';
import { UserPlus } from 'lucide-react';
import SectionContainer from '../components/section-container';

const HeroSection = () => {
  const { active_ta, settings } = usePageProps<SharedData>();
  return (
    <div>
      <SectionContainer>
        <div className="mx-auto w-full space-y-8 py-32 text-center md:px-24">
          <h3 className="text-lg">Selamat datang di:</h3>
          <div className="flex flex-col">
            <h1 className="text-5xl font-bold">WEBSITE PENERIMAAN PESERTA DIDIK BARU</h1>
            <h1 className="text-4xl font-bold">{settings.SEKOLAH_NAME}</h1>
          </div>
          <p className="px-4 text-lg">
            Situs ini dipersiapkan sebagai pusat informasi dan pengolahan data siswa peserta PPDB {settings.SEKOLAH_NAME} Tahun ajaran{' '}
            {active_ta?.name} secara online dan realtime. Sistem ini akan membantu anda dalam melakukan pendaftaran secara online.
          </p>
          {/* <SearchPpdb /> */}
          <Button variant={'default'} size={'xl'} asChild>
            <Link href={route('pendaftaran.create')}>
              <UserPlus />
              Mulai pendaftaran
            </Link>
          </Button>
        </div>
      </SectionContainer>
    </div>
  );
};

export default HeroSection;
