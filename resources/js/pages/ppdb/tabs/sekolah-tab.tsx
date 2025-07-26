import FormControl from '@/components/form-control';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
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

const SekolahTab: FC<Props> = ({ siswa }) => {
  const { data, setData, post } = useForm({
    siswa_id: siswa.id,
    name: '',
    address: '',
  });

  const handleSubmit = () => {
    post(route('pendaftaran.store-sekolah', siswa.id), {
      onSuccess: () => toast.success('Data sekolah berhasil disimpan!'),
      onError: (error) => toast.error(errorMessage(error)),
    });
  };

  return (
    <PpdbLayout active="sekolah" guide="Bila tidak ada bisa dikosongkan, alamat sekolah asal boleh dikosongkan.">
      <Card>
        <CardHeader>
          <CardTitle>Sekolah asal siswa</CardTitle>
          <CardDescription>Mohon isi data ayah dan ibu secara lengkap.</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            className="space-y-6"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <FormControl label="Nama sekolah">
              <Input type="text" placeholder="Nama sekolah" value={data.name} onChange={(e) => setData('name', e.target.value)} />
            </FormControl>
            <FormControl label="Alamat sekolah">
              <Textarea placeholder="Alamat sekolah" value={data.address} onChange={(e) => setData('address', e.target.value)} />
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

export default SekolahTab;
