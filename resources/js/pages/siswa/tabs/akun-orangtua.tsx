import HeadingSmall from '@/components/heading-small';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Siswa } from '@/types';
import { Link } from '@inertiajs/react';
import { AlertCircle, GitFork, Plus } from 'lucide-react';
import { FC } from 'react';
import { toast } from 'sonner';
import SiswaJoinAccount from '../components/siswa-join-account';
import SiswaLayout from '../layout/siswa-layout';

type Props = {
  siswa: Siswa;
};

const AkunOrangtua: FC<Props> = ({ siswa }) => {
  return (
    <SiswaLayout siswa={siswa}>
      <HeadingSmall title="Akun login orang tua" description="Pengaturan akun login orang tua" />

      {!siswa.user ? (
        <Card>
          <CardContent>
            <Alert variant={'destructive'}>
              <AlertCircle />
              <AlertTitle>Orang tua belum memiliki akun</AlertTitle>
              <AlertDescription>Sebagai guru dan admin, anda bisa membuatkan akun untuk orangtua</AlertDescription>
            </Alert>
          </CardContent>

          <CardFooter className="flex gap-2">
            <Button>
              <Plus /> Buat akun baru
            </Button>
            <SiswaJoinAccount siswa={siswa}>
              <Button>
                <GitFork /> Sambungkan dengan akun yang sudah ada
              </Button>
            </SiswaJoinAccount>
          </CardFooter>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Terkoneksi dengan akun orangtua</CardTitle>
            <CardDescription>Hubugnan dengan akun orangtua</CardDescription>
          </CardHeader>
          <CardContent>
            {siswa.user?.name} terkoneksi dengan {JSON.stringify((siswa.user?.siswas?.length || 1) - 1)} siswa lainnya
          </CardContent>
          <CardFooter>
            <Button>
              <Link
                href={route('siswa.update', siswa.id)}
                data={{ user_id: null }}
                method="put"
                onSuccess={() => toast.success('Berhasil di disconnet')}
              >
                Disconnect
              </Link>
            </Button>
          </CardFooter>
        </Card>
      )}
    </SiswaLayout>
  );
};

export default AkunOrangtua;
