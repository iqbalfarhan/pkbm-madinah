import FormControl from '@/components/form-control';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { errorMessage } from '@/lib/utils';
import { Siswa } from '@/types';
import { useForm } from '@inertiajs/react';
import { Check } from 'lucide-react';
import { FC } from 'react';
import { toast } from 'sonner';
import PpdbLayout from '../layout/ppdb-layout';

type Props = {
  siswa: Siswa;
};

const BuktibayarTab: FC<Props> = ({ siswa }) => {
  const { data, setData, post } = useForm({
    bukti_bayar: undefined as File | undefined,
  });

  const handleSubmit = () => {
    post(route('pendaftaran.storeBuktiBayar', siswa.id), {
      preserveScroll: true,
      onSuccess: () => {
        toast.success('Bukti pembayaran berhasil diupload');
      },
      onError: (error) => {
        toast.error(errorMessage(error));
      },
    });
  };

  return (
    <PpdbLayout active="buktibayar" guide="Upload bukti pembayaran Anda di sini. Pastikan file yang diunggah sesuai dengan format yang ditentukan.">
      <Card>
        <CardHeader>
          <CardTitle>Upload bukti pembayaran</CardTitle>
          <CardDescription>Silakan unggah bukti pembayaran Anda di sini.</CardDescription>
        </CardHeader>
        <Separator />
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <FormControl label="Pilih file bukti pembayaran" required>
              <Input type="file" onChange={(e) => setData('bukti_bayar', e.target.files?.[0])} />
              {data.bukti_bayar && <img src={URL.createObjectURL(data.bukti_bayar)} alt="Preview" className="mt-2" />}
            </FormControl>
          </form>
        </CardContent>
        <CardFooter>
          <Button type="submit" onClick={handleSubmit}>
            <Check />
            Selanjutnya
          </Button>
        </CardFooter>
      </Card>
    </PpdbLayout>
  );
};

export default BuktibayarTab;
