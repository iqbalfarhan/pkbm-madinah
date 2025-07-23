import Heading from '@/components/heading';
import ChildrenSvg from '@/components/svgs/children-svg';
import FormSvg from '@/components/svgs/form-svg';
import LearingSvg from '@/components/svgs/learning-svg';
import { Button } from '@/components/ui/button';
import { Card, CardFooter } from '@/components/ui/card';
import { Link } from '@inertiajs/react';
import { PlusCircle } from 'lucide-react';
import LandingHero from './components/landing-hero';
import WelcomeLayout from './layouts/welcome-layout';

export default function Welcome() {
  return (
    <WelcomeLayout>
      <LandingHero />
      <Card className="flex flex-row justify-between p-0">
        <LearingSvg className="mt-12 ml-6 h-32" />
        <CardFooter>
          <Button variant={'default'} size={'lg'} asChild>
            <Link href={route('pendaftaran.create')}>
              <PlusCircle />
              Pendaftaran baru
            </Link>
          </Button>
        </CardFooter>
      </Card>

      <div className="grid grid-cols-2 gap-12 py-20 text-lg">
        <div className="flex w-full flex-col items-center justify-center">
          <div className="w-full">
            <Heading title="Informasi PPDB Online" description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab, autem." />
          </div>
          <p>
            PKBM AL-MADINAH BALIKPAPAN menyediakan PPDB secara online diharapkan proses PPDB dapat berjalan cepat dan bisa dilakukan dimanapun dan
            kapanpun selama sesi PPDB Online dibuka. Proses pendaftaran calon siswa baru bisa mengakses website PPDB Online PKBM AL-MADINAH
            BALIKPAPAN.
          </p>
        </div>
        <ChildrenSvg className="aspect-video w-full" />
        <FormSvg className="aspect-video w-full" />
        <div className="flex w-full flex-col items-center justify-center">
          <div className="w-full">
            <Heading title="Informasi PPDB Online" description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab, autem." />
          </div>
          <p>
            Pengisian form PPDB Online mohon diperhatikan data yang dibutuhkan yang nantinya akan dipakai dalam proses PPDB. Setelah proses pengisian
            form PPDB secara online berhasil dilakukan, calon siswa akan mendapat bukti daftar dengan nomor pendaftaran dan harus disimpan yang akan
            digunakan untuk proses selanjutnya.
          </p>
        </div>
      </div>
    </WelcomeLayout>
  );
}
