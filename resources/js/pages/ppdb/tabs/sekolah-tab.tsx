import FormControl from '@/components/form-control';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';
import PpdbLayout from '../layout/ppdb-layout';

const SekolahTab = () => {
  const { data, setData } = useForm({
    name: '',
    address: '',
  });

  return (
    <PpdbLayout active="sekolah" guide="Bila tidak ada bisa dikosongkan, alamat sekolah asal boleh dikosongkan.">
      <Card>
        <CardHeader>
          <CardTitle>Sekolah asal siswa</CardTitle>
          <CardDescription>Mohon isi data ayah dan ibu secara lengkap.</CardDescription>
        </CardHeader>
        <Separator />
        <CardContent>
          <form action="" className="space-y-6">
            <FormControl label="Nama sekolah">
              <Input type="text" placeholder="Nama sekolah" value={data.name} onChange={(e) => setData('name', e.target.value)} />
            </FormControl>
            <FormControl label="Alamat sekolah">
              <Textarea placeholder="Alamat sekolah" value={data.address} onChange={(e) => setData('address', e.target.value)} />
            </FormControl>
          </form>
        </CardContent>
        <Separator />
        <CardFooter className="flex justify-end">
          <Button type="submit">
            Selanjutnya <ArrowRight className="ml-2" />
          </Button>
        </CardFooter>
      </Card>
    </PpdbLayout>
  );
};

export default SekolahTab;
