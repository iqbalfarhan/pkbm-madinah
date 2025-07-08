import DatePicker from '@/components/date-picker';
import FormControl from '@/components/form-control';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { usePageProps } from '@/hooks/use-page-props';
import AppLayout from '@/layouts/app-layout';
import { jenisKelaminLists } from '@/lib/enums';
import { errorMessage } from '@/lib/utils';
import { BreadcrumbItem } from '@/types';
import { useForm } from '@inertiajs/react';
import dayjs from 'dayjs';
import { ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Input data calon pesdik',
    href: route('ppdb.create'),
  },
];

const CreatePpdb = () => {
  const { user } = usePageProps().auth;

  const { data, setData, post } = useForm({
    name: '',
    gender: '',
    dob: dayjs().subtract(7, 'year').format('YYYY-MM-DD'),
    pob: '',
    status: 'ppdb',
    address: '',
    register_year: dayjs().year(),
    user_id: user.id,
  });

  const handleCreatePpdb = () => {
    post(route('ppdb.store'), {
      preserveScroll: true,
      onSuccess: () => {
        toast.success('Data calon peserta didik berhasil ditambahkan');
      },
      onError: (e) => toast.error(errorMessage(e)),
    });
  };

  return (
    <AppLayout title="Input data calon peserta didik" breadcrumbs={breadcrumbs}>
      <Card className="mx-auto w-full max-w-3xl">
        <CardHeader>
          <CardTitle>Data calon peserta didik</CardTitle>
          <CardDescription>Isi data calon peserta didik dengan benar dan lengkap.</CardDescription>
        </CardHeader>
        <Separator />
        <CardContent>
          <form
            className="grid gap-6 md:grid-cols-2"
            onSubmit={(e) => {
              e.preventDefault();
              handleCreatePpdb();
            }}
          >
            <FormControl label="Nama lengkap siswa">
              <Input placeholder="Nama lengkap" value={data.name} onChange={(e) => setData('name', e.target.value)} />
            </FormControl>
            <FormControl label="Jenis kelamin">
              <Select value={data.gender} onValueChange={(value) => setData('gender', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih jenis kelamin" />
                </SelectTrigger>
                <SelectContent>
                  {jenisKelaminLists.map((jk) => (
                    <SelectItem value={jk}>{jk}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
            <FormControl label="Tempat lahir">
              <Input placeholder="Kota tempat lahir" value={data.pob} onChange={(e) => setData('pob', e.target.value)} />
            </FormControl>
            <FormControl label="Tanggal lahir">
              <DatePicker value={dayjs(data.dob).toDate()} onValueChange={(date) => setData('dob', dayjs(date).format('YYYY-MM-DD'))} />
            </FormControl>
            <FormControl label="Alamat tempat tinggal" className="md:col-span-full">
              <Textarea value={data.address} onChange={(e) => setData('address', e.target.value)} placeholder="Alamat tempat tinggal" />
            </FormControl>
          </form>
        </CardContent>
        <Separator />
        <CardFooter className="flex justify-end">
          <Button onClick={handleCreatePpdb}>
            Selanjutnya <ArrowRight />
          </Button>
        </CardFooter>
      </Card>
    </AppLayout>
  );
};

export default CreatePpdb;
