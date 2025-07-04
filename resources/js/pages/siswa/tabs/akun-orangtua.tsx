import HeadingSmall from '@/components/heading-small';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import UserFormSheet from '@/pages/user/components/user-form-sheet';
import { Siswa } from '@/types';
import { AlertCircle } from 'lucide-react';
import { FC } from 'react';
import SiswaLayout from '../layout/siswa-layout';

type Props = {
  siswa: Siswa;
};

const AkunOrangtua: FC<Props> = ({ siswa }) => {
  return (
    <SiswaLayout siswa={siswa}>
      <HeadingSmall title="Akun login orang tua" description="Pengaturan akun login orang tua" />

      {!siswa.user && (
        <>
          <Alert variant={'destructive'}>
            <AlertCircle />
            <AlertTitle>Orang tua belum memiliki akun</AlertTitle>
            <AlertDescription>Sebagai guru dan admin, anda bisa membuatkan akun untuk orangtua</AlertDescription>
          </Alert>

          <UserFormSheet purpose="create">
            <Button>Buat akun baru</Button>
          </UserFormSheet>
          <Button>Sambungkan dengan akun yang sudah ada</Button>
        </>
      )}
    </SiswaLayout>
  );
};

export default AkunOrangtua;
