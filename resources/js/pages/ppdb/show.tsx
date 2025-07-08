import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { Siswa } from '@/types';
import { Upload } from 'lucide-react';
import { FC } from 'react';
import SiswaHeadingCard from '../siswa/components/siswa-heading-card';

type DetailPPDBProps = {
  siswa: Siswa;
};

const DetailPPDB: FC<DetailPPDBProps> = ({ siswa }) => {
  return (
    <AppLayout title="Detail calon peserta didik baru">
      <div className="grid grid-cols-3 gap-6">
        <SiswaHeadingCard siswa={siswa} className="col-span-full" />
        <Card>
          <CardHeader>
            <CardTitle>Detail pembayaran</CardTitle>
            <CardDescription>Pelunasan pembayaran biaya pendaftaran</CardDescription>
          </CardHeader>
          <CardContent className="flex-1"></CardContent>
          <CardFooter>
            <Button>
              <Upload />
              Upload bukti pembayaran
            </Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Data orang tua calon pesdik</CardTitle>
            <CardDescription>Data ayah dan ibu</CardDescription>
          </CardHeader>
          <CardContent>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum saepe, provident ut perspiciatis voluptas exercitationem odit error magnam
            tempora ipsa, voluptatum quod ducimus nihil natus, dicta iusto numquam dolore alias?
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Asal sekolah siswa</CardTitle>
            <CardDescription>Data sekolah asal siswa</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Dokumen pelengkap</CardTitle>
            <CardDescription>File kartu keluarga dan akta kelahiran</CardDescription>
          </CardHeader>
        </Card>
      </div>
    </AppLayout>
  );
};

export default DetailPPDB;
