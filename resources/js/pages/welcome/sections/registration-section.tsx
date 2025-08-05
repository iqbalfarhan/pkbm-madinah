import LearingSvg from '@/components/svgs/learning-svg';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from '@inertiajs/react';
import { UserPlus } from 'lucide-react';
import SectionContainer from '../components/section-container';

const RegistrationSection = () => {
  return (
    <Card className="rounded-none" id="register">
      <CardContent>
        <SectionContainer className="flex flex-col justify-between gap-12 py-12 md:flex-row">
          <LearingSvg className="h-48" />
          <div className="flex max-w-md flex-col items-center space-y-6 text-center md:items-end md:text-right">
            <h3 className="text-xl font-bold">Mulai pendaftaran siswa</h3>
            <p>
              Klik link dibawah ini untuk mulai mengisi data peserta didik baru, harap isi dengan benar dan sesuai dengan yang dibutuhkan form
              pendaftaran
            </p>
            <Button variant={'default'} size={'xl'} asChild>
              <Link href={route('pendaftaran.create')}>
                <UserPlus />
                Mulai pendaftaran
              </Link>
            </Button>
          </div>
        </SectionContainer>
      </CardContent>
    </Card>
  );
};

export default RegistrationSection;
