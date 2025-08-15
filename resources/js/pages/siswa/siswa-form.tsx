import DatePicker from '@/components/date-picker';
import FormControl from '@/components/form-control';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { errorMessage } from '@/lib/utils';
import { Gender } from '@/types';
import { useForm } from '@inertiajs/react';
import dayjs from 'dayjs';
import { ArrowRight } from 'lucide-react';
import { FC } from 'react';
import { toast } from 'sonner';

type SiswaFormProps = null;

const SiswaForm: FC<SiswaFormProps> = () => {
  const { data, setData, post } = useForm({
    name: '',
    nisn: '',
    gender: 'Laki-laki',
    religion: 'islam',
    pob: '',
    register_year: dayjs().format('YYYY'),
    phone: '',
    email: '',
    address: '',
    dob: undefined as Date | undefined,
    photo: undefined as File | undefined,
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    post(route('siswa.store'), {
      onSuccess: () => {
        toast.success('Data siswa berhasil disimpan');
      },
      onError: (e) => toast.error(errorMessage(e)),
    });
  };

  return (
    <AppLayout>
      <form onSubmit={handleSubmit} className="flex gap-6">
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Data diri</CardTitle>
            <CardDescription>Data diri siswa</CardDescription>
          </CardHeader>
          <Separator />
          <CardContent>
            <div className="grid grid-cols-2 gap-6">
              <FormControl label="Nama Lengkap" required>
                <Input value={data.name} onChange={(e) => setData('name', e.target.value)} placeholder="Nama lengkap" />
              </FormControl>
              <FormControl label="NISN" required>
                <Input value={data.nisn} onChange={(e) => setData('nisn', e.target.value)} placeholder="NISN" />
              </FormControl>
              <FormControl label="Tempat Lahir" required>
                <Input value={data.pob} onChange={(e) => setData('pob', e.target.value)} placeholder="Tempat lahir" />
              </FormControl>
              <FormControl label="Tanggal Lahir" required>
                <DatePicker value={data.dob} onValueChange={(date) => setData('dob', date)} />
              </FormControl>
              <FormControl label="Jenis Kelamin" required>
                <Select value={data.gender} onValueChange={(value) => setData('gender', value as Gender)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih jenis kelamin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Laki-laki">Laki-laki</SelectItem>
                    <SelectItem value="Perempuan">Perempuan</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormControl label="Agama" required>
                <Select value={data.religion} onValueChange={(value) => setData('religion', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih jenis kelamin" />
                  </SelectTrigger>
                  <SelectContent>
                    {['islam', 'kristen', 'katolik', 'hindu', 'budha'].map((agama) => (
                      <SelectItem value={agama} className="capitalize">
                        {agama}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormControl label="Alamat Lengkap" required className="col-span-full">
                <Input value={data.address} onChange={(e) => setData('address', e.target.value)} placeholder="Alamat lengkap" />
              </FormControl>
              <FormControl label="Nomor telepon">
                <Input type="phone" value={data.phone} onChange={(e) => setData('phone', e.target.value)} placeholder="Nomor telepon" />
              </FormControl>
              <FormControl label="Email">
                <Input type="email" value={data.email} onChange={(e) => setData('email', e.target.value)} placeholder="Email" />
              </FormControl>
            </div>
          </CardContent>
          <Separator />
          <CardFooter>
            <Button type="submit">
              Selanjutnya <ArrowRight />
            </Button>
          </CardFooter>
        </Card>

        <div className="w-96">
          <Card>
            <CardHeader>
              <CardTitle>Upload photo</CardTitle>
              <CardDescription>Upload foto siswa</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormControl>
                <Input type="file" accept="image/*" onChange={(e) => setData('photo', e.target.files?.[0])} />
              </FormControl>
              <Avatar className="size-32 place-self-center rounded">
                <AvatarImage src={data.photo ? URL.createObjectURL(data.photo) : '/user_placeholder.png'} />
              </Avatar>
            </CardContent>
            <CardFooter>
              <p className="text-sm text-muted-foreground">Ukuran foto maksimal 2MB. Hanya mendukung format JPG, JPEG, PNG, dan GIF.</p>
            </CardFooter>
          </Card>
        </div>
      </form>
    </AppLayout>
  );
};

export default SiswaForm;
