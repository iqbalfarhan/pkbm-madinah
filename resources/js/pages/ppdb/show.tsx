import FormControl from '@/components/form-control';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { strLimit } from '@/lib/utils';
import { Media, Siswa } from '@/types';
import { Link } from '@inertiajs/react';
import { FileIcon, Pencil, Printer, Trash2, Upload } from 'lucide-react';
import { FC } from 'react';
import SiswaHeadingCard from '../siswa/components/siswa-heading-card';

type DetailPPDBProps = {
  siswa: Siswa;
  medias: Media[];
};

const DetailPPDB: FC<DetailPPDBProps> = ({ siswa, medias }) => {
  return (
    <AppLayout
      title="Detail calon peserta didik baru"
      actions={
        <>
          <Button asChild>
            <Link href={route('pendaftaran.edit', siswa.id)} className="flex items-center gap-2">
              <Pencil />
              Edit data pendaftaran
            </Link>
          </Button>
          <Button>
            <Printer />
            Cetak
          </Button>
        </>
      }
    >
      <SiswaHeadingCard siswa={siswa} />
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="h-fit">
          <CardHeader>
            <CardTitle>Dokumen pelengkap</CardTitle>
            <CardDescription>File kartu keluarga dan akta kelahiran</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {medias
                .filter((m) => m.collection_name !== 'bukti bayar')
                .map((m) => (
                  <FormControl label={m.collection_name} className="group">
                    <div className="flex w-full flex-row justify-between">
                      <Button asChild variant={'link'}>
                        <a href={m.original_url} target="_blank">
                          <FileIcon />
                          {strLimit(m.name, 20)}
                        </a>
                      </Button>
                      <Button className="opacity-0 group-hover:opacity-100" variant={'destructive'} size={'icon'} asChild>
                        <Link preserveScroll={true} href={route('media.destroy', m.id)} method="delete">
                          <Trash2 />
                        </Link>
                      </Button>
                    </div>
                  </FormControl>
                ))}
            </div>
          </CardContent>
        </Card>
        <Card className="h-fit">
          <CardHeader>
            <CardTitle>Data orang tua calon pesdik</CardTitle>
            <CardDescription>Data ayah dan ibu</CardDescription>
          </CardHeader>

          {siswa.orangtua ? (
            <div className="space-y-6">
              <Separator />
              <CardHeader>
                <CardTitle>Data ayah</CardTitle>
                <CardDescription>
                  {siswa.orangtua.father_name}, {siswa.orangtua.father_ocupation}, {siswa.orangtua.father_address}, {siswa.orangtua.father_phone}
                </CardDescription>
              </CardHeader>
              <CardHeader>
                <CardTitle>Data ibu</CardTitle>
                <CardDescription>
                  {siswa.orangtua.mother_name}, {siswa.orangtua.mother_ocupation}, {siswa.orangtua.mother_address}, {siswa.orangtua.mother_phone}
                </CardDescription>
              </CardHeader>
            </div>
          ) : (
            <CardFooter>
              <Button>Lengkapi data orangtua</Button>
            </CardFooter>
          )}
        </Card>
        <Card className="h-fit">
          <CardHeader>
            <CardTitle>Detail pembayaran</CardTitle>
            <CardDescription>Pelunasan pembayaran biaya pendaftaran</CardDescription>
          </CardHeader>
          {medias.filter((m) => m.collection_name === 'bukti bayar').length > 0 ? (
            <CardContent className="space-y-4">
              {medias
                .filter((m) => m.collection_name === 'bukti bayar')
                .map((m, i) => (
                  <div key={i} className="group relative">
                    <img src={m.original_url} className="rounded" />
                    <div className="absolute right-2 bottom-2">
                      <Button className="opacity-0 group-hover:opacity-100" variant={'destructive'} size={'icon'} asChild>
                        <Link preserveScroll={true} href={route('media.destroy', m.id)} method="delete">
                          <Trash2 />
                        </Link>
                      </Button>
                    </div>
                  </div>
                ))}
            </CardContent>
          ) : (
            <CardFooter>
              <Button>
                <Upload />
                Upload bukti pembayaran
              </Button>
            </CardFooter>
          )}
        </Card>
      </div>
    </AppLayout>
  );
};

export default DetailPPDB;
