import FormControl from '@/components/form-control';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';
import { useState } from 'react';
import PpdbLayout from '../layout/ppdb-layout';

const OrangTuaTab = () => {
  const [fsaac, setFsaac] = useState(true);
  const [msaac, setMsaac] = useState(true);

  const { data, setData } = useForm({
    father_name: '',
    father_address: '',
    father_phone: '',
    father_ocupation: '',
    mother_name: '',
    mother_address: '',
    mother_phone: '',
    mother_ocupation: '',
  });

  return (
    <PpdbLayout
      active="orangtua"
      guide="Isi data orang tua siswa dengan benar dan lengkap. apabila alamat berbeda dengan anak, anda bisa hapus centang pada bagian `Alamat sama dengan anak`"
    >
      <Card>
        <CardHeader>
          <CardTitle>Data Orang Tua Siswa</CardTitle>
          <CardDescription>Mohon isi data ayah dan ibu secara lengkap.</CardDescription>
        </CardHeader>
        <Separator />
        <form action="">
          <CardContent className="grid grid-cols-2 gap-6">
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
                <Checkbox checked={fsaac} onCheckedChange={(checked) => setFsaac(!!checked)} />
                <span>Alamat sama dengan anak</span>
              </Label>
            </FormControl>
            {!fsaac && (
              <FormControl label="Alamat Ayah" className="col-span-full">
                <Textarea placeholder="Alamat ayah" value={data.father_address} onChange={(e) => setData('father_address', e.target.value)} />
              </FormControl>
            )}

            <div className="col-span-full py-4">
              <Separator />
            </div>

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
                <Checkbox checked={msaac} onCheckedChange={(checked) => setMsaac(!!checked)} />
                <span>Alamat sama dengan anak</span>
              </Label>
            </FormControl>
            {!msaac && (
              <FormControl label="Alamat Ibu" className="col-span-full">
                <Textarea placeholder="Alamat ibu" value={data.mother_address} onChange={(e) => setData('mother_address', e.target.value)} />
              </FormControl>
            )}
          </CardContent>
        </form>
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

export default OrangTuaTab;
