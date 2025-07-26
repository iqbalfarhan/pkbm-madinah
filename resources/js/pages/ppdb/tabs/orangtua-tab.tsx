import FormControl from '@/components/form-control';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { errorMessage } from '@/lib/utils';
import { Siswa } from '@/types';
import { useForm } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';
import { FC, useState } from 'react';
import { toast } from 'sonner';
import PpdbLayout from '../layout/ppdb-layout';

type Props = {
  siswa: Siswa;
};

const OrangTuaTab: FC<Props> = ({ siswa }) => {
  const [fsaac, setFsaac] = useState(true);
  const [msaac, setMsaac] = useState(true);

  const { data, setData, post } = useForm({
    siswa_id: siswa.id,
    father_name: '',
    father_address: siswa.address ?? '',
    father_phone: '',
    father_ocupation: '',
    mother_name: '',
    mother_address: siswa.address ?? '',
    mother_phone: '',
    mother_ocupation: '',
  });

  const handleSubmit = () => {
    post(route('pendaftaran.store-orangtua', siswa.id), {
      onSuccess: () => {
        toast.success('Data orang tua berhasil disimpan!');
      },
      onError: (error) => {
        toast.error(errorMessage(error));
      },
    });
  };

  return (
    <PpdbLayout
      active="orangtua"
      guide="Isi data orang tua siswa dengan benar dan lengkap. apabila alamat berbeda dengan anak, anda bisa hapus centang pada bagian `Alamat sama dengan anak`"
    >
      <Card>
        <CardHeader>
          <CardTitle>Data Ayah</CardTitle>
          <CardDescription>Mohon isi data ayah secara lengkap.</CardDescription>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
            className="grid gap-6 md:grid-cols-2"
          >
            {/* Ayah */}
            <FormControl label="Nama Ayah">
              <Input type="text" placeholder="Nama ayah" value={data.father_name} onChange={(e) => setData('father_name', e.target.value)} />
            </FormControl>
            <FormControl label="Pekerjaan Ayah">
              <Input
                type="text"
                placeholder="Pekerjaan ayah"
                value={data.father_ocupation}
                onChange={(e) => setData('father_ocupation', e.target.value)}
              />
            </FormControl>
            <FormControl label="Nomor Telepon Ayah">
              <Input type="text" placeholder="Nomor telepon" value={data.father_phone} onChange={(e) => setData('father_phone', e.target.value)} />
            </FormControl>
            <FormControl label="Alamat Sama Dengan Anak">
              <Label className="flex items-center gap-2 py-2">
                <Checkbox
                  checked={fsaac}
                  onCheckedChange={(checked) => {
                    setFsaac(!!checked);
                    if (checked) {
                      setData('father_address', siswa.address ?? '');
                    } else {
                      setData('father_address', '');
                    }
                  }}
                />
                <span>Alamat sama dengan anak</span>
              </Label>
            </FormControl>
            {!fsaac && (
              <FormControl label="Alamat Ayah" className="col-span-full">
                <Textarea placeholder="Alamat ayah" value={data.father_address} onChange={(e) => setData('father_address', e.target.value)} />
              </FormControl>
            )}
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Data Ibu Siswa</CardTitle>
          <CardDescription>Mohon isi data ibu secara lengkap.</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
            className="grid gap-6 md:grid-cols-2"
          >
            {/* Ibu */}
            <FormControl label="Nama Ibu">
              <Input type="text" placeholder="Nama ibu" value={data.mother_name} onChange={(e) => setData('mother_name', e.target.value)} />
            </FormControl>
            <FormControl label="Pekerjaan Ibu">
              <Input
                type="text"
                placeholder="Pekerjaan ibu"
                value={data.mother_ocupation}
                onChange={(e) => setData('mother_ocupation', e.target.value)}
              />
            </FormControl>
            <FormControl label="Nomor Telepon Ibu">
              <Input type="text" placeholder="Nomor telepon" value={data.mother_phone} onChange={(e) => setData('mother_phone', e.target.value)} />
            </FormControl>
            <FormControl label="Alamat Sama Dengan Anak">
              <Label className="flex items-center gap-2 py-2">
                <Checkbox
                  checked={msaac}
                  onCheckedChange={(checked) => {
                    setMsaac(!!checked);
                    if (checked) {
                      setData('mother_address', siswa.address ?? '');
                    } else {
                      setData('mother_address', '');
                    }
                  }}
                />
                <span>Alamat sama dengan anak</span>
              </Label>
            </FormControl>
            {!msaac && (
              <FormControl label="Alamat Ibu" className="col-span-full">
                <Textarea placeholder="Alamat ibu" value={data.mother_address} onChange={(e) => setData('mother_address', e.target.value)} />
              </FormControl>
            )}
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

export default OrangTuaTab;
