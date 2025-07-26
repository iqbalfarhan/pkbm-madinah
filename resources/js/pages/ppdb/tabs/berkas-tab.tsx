import FormControl from '@/components/form-control';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { errorMessage } from '@/lib/utils';
import { Siswa } from '@/types';
import { useForm } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';
import { FC } from 'react';
import { toast } from 'sonner';
import PpdbLayout from '../layout/ppdb-layout';

type Props = {
  siswa: Siswa;
};

const BerkasTab: FC<Props> = ({ siswa }) => {
  const { data, setData, post } = useForm({
    kk: undefined as File | undefined,
    akte: undefined as File | undefined,
    ijazah: undefined as File | undefined,
    pasfoto: undefined as File | undefined,
  });

  const handleSubmit = () => {
    post(route('pendaftaran.store-berkas', siswa.id), {
      preserveScroll: true,
      onSuccess: () => toast.success('Dokumen berhasil diupload'),
      onError: (error) => toast.error(errorMessage(error)),
    });
  };

  return (
    <PpdbLayout active="berkas" guide="Upload file dengan jenis PDF Atau gambar JPG, PNG dengan maksimal ukuran file 2MB.">
      <Card>
        <CardHeader>
          <CardTitle>Dokumen pendukung</CardTitle>
          <CardDescription>Mohon isi data ayah dan ibu secara lengkap.</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            className="grid gap-6 md:grid-cols-2"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <FormControl label="Kartu keluarga" required>
              <Input type="file" onChange={(e) => setData('kk', e.target.files?.[0])} />
              {data.kk && <img src={URL.createObjectURL(data.kk)} alt="Preview" />}
            </FormControl>
            <FormControl label="Akta kelahiran" required>
              <Input type="file" onChange={(e) => setData('akte', e.target.files?.[0])} />
              {data.akte && <img src={URL.createObjectURL(data.akte)} alt="Preview" />}
            </FormControl>
          </form>
        </CardContent>
      </Card>
      <div className="flex justify-end">
        <Button type="submit" onClick={handleSubmit}>
          Selanjutnya <ArrowRight className="ml-2" />
        </Button>
      </div>
    </PpdbLayout>
  );
};

export default BerkasTab;
