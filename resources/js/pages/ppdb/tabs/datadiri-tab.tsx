import DatePicker from '@/components/date-picker';
import FormControl from '@/components/form-control';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { jenisKelaminLists } from '@/lib/enums';
import { errorMessage } from '@/lib/utils';
import { useForm } from '@inertiajs/react';
import dayjs from 'dayjs';
import { ArrowRight } from 'lucide-react';
import { toast } from 'sonner';
import PpdbLayout from '../layout/ppdb-layout';

const DatadiriTab = () => {
  const { data, setData, post } = useForm({
    name: '',
    gender: '',
    dob: dayjs().subtract(7, 'year').format('YYYY-MM-DD'),
    pob: '',
    status: 'ppdb',
    address: '',
    register_year: dayjs().year(),
  });

  const handleDatadiriTab = () => {
    post(route('ppdb.store'), {
      preserveScroll: true,
      onSuccess: () => {
        toast.success('Data calon peserta didik berhasil ditambahkan');
      },
      onError: (e) => toast.error(errorMessage(e)),
    });
  };

  return (
    <PpdbLayout active="datadiri" guide="isi nama lengkap siswa, jenis kelamin, tanggal lahir, tempat lahir, alamat, dan status pendaftaran">
      <Card>
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
              handleDatadiriTab();
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
            <FormControl label="NISN">
              <Input placeholder="Status" value={data.status} />
            </FormControl>
            <FormControl label="NIS">
              <Input placeholder="Status" value={data.status} />
            </FormControl>
            <FormControl label="Tempat lahir">
              <Input placeholder="Kota tempat lahir" value={data.pob} onChange={(e) => setData('pob', e.target.value)} />
            </FormControl>
            <FormControl label="Tanggal lahir">
              <DatePicker value={dayjs(data.dob).toDate()} onValueChange={(date) => setData('dob', dayjs(date).format('YYYY-MM-DD'))} />
            </FormControl>
          </form>
        </CardContent>
        <Separator />
        <CardFooter className="flex justify-end">
          <Button onClick={handleDatadiriTab}>
            Selanjutnya <ArrowRight />
          </Button>
        </CardFooter>
      </Card>
    </PpdbLayout>
  );
};

export default DatadiriTab;
