import FormControl from '@/components/form-control';
import HeadingSmall from '@/components/heading-small';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { errorMessage } from '@/lib/utils';
import { Orangtua, Siswa } from '@/types';
import { useForm } from '@inertiajs/react';
import { FC } from 'react';
import { toast } from 'sonner';
import SiswaLayout from '../layout/siswa-layout';

type DataOrangtuaProps = {
  siswa: Siswa;
  orangtua?: Orangtua;
};

const DataOrangtua: FC<DataOrangtuaProps> = ({ siswa, orangtua }) => {
  const { data, setData, put, post } = useForm({
    siswa_id: siswa.id,
    father_name: orangtua?.father_name ?? '',
    father_address: orangtua?.father_address ?? '',
    father_phone: orangtua?.father_phone ?? '',
    father_ocupation: orangtua?.father_ocupation ?? '',
    mother_name: orangtua?.mother_name ?? '',
    mother_address: orangtua?.mother_address ?? '',
    mother_phone: orangtua?.mother_phone ?? '',
    mother_ocupation: orangtua?.mother_ocupation ?? '',
  });

  const handleSubmit = () => {
    if (orangtua) {
      updateOrangtua();
    } else {
      createOrangtua();
    }
  };

  const createOrangtua = () => {
    post(route('orangtua.store'), {
      preserveScroll: true,
      onSuccess: () => {
        toast.success('Data orangtua berhasil ditambahkan');
      },
      onError: (e) => toast.error(errorMessage(e)),
    });
  };

  const updateOrangtua = () => {
    put(route('orangtua.update', orangtua?.id), {
      preserveScroll: true,
      onSuccess: () => {
        toast.success('Data orangtua berhasil ditambahkan');
      },
      onError: (e) => toast.error(errorMessage(e)),
    });
  };

  return (
    <SiswaLayout siswa={siswa}>
      <HeadingSmall title="Data orangtua siswa" description="Data orangtua siswa" />
      <div className="grid grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Ayah</CardTitle>
            <CardDescription>Informasi data ayah</CardDescription>
          </CardHeader>
          <Separator />
          <CardContent className="space-y-6">
            <FormControl label="Nama">
              <Input value={data.father_name} onChange={(e) => setData('father_name', e.target.value)} />
            </FormControl>
            <FormControl label="Nomor telepon">
              <Input value={data.father_phone} onChange={(e) => setData('father_phone', e.target.value)} />
            </FormControl>
            <FormControl label="Pekerjaan">
              <Input value={data.father_ocupation} onChange={(e) => setData('father_ocupation', e.target.value)} />
            </FormControl>
            <FormControl label="Alamat">
              <Textarea value={data.father_address} onChange={(e) => setData('father_address', e.target.value)} />
            </FormControl>
          </CardContent>
          <Separator />
          <CardFooter>
            <Button onClick={handleSubmit}>Simpan</Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Ibu</CardTitle>
            <CardDescription>Informasi data ibu</CardDescription>
          </CardHeader>
          <Separator />
          <CardContent className="space-y-6">
            <FormControl label="Nama">
              <Input value={data.mother_name} onChange={(e) => setData('mother_name', e.target.value)} />
            </FormControl>
            <FormControl label="Nomor telepon">
              <Input value={data.mother_phone} onChange={(e) => setData('mother_phone', e.target.value)} />
            </FormControl>
            <FormControl label="Pekerjaan">
              <Input value={data.mother_ocupation} onChange={(e) => setData('mother_ocupation', e.target.value)} />
            </FormControl>
            <FormControl label="Alamat">
              <Textarea value={data.mother_address} onChange={(e) => setData('mother_address', e.target.value)} />
            </FormControl>
          </CardContent>
          <Separator />
          <CardFooter>
            <Button onClick={handleSubmit}>Simpan</Button>
          </CardFooter>
        </Card>
      </div>
    </SiswaLayout>
  );
};

export default DataOrangtua;
