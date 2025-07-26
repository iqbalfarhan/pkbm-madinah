import DatePicker from '@/components/date-picker';
import FormControl from '@/components/form-control';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { jenisKelaminLists } from '@/lib/enums';
import { errorMessage } from '@/lib/utils';
import { SharedData, Siswa } from '@/types';
import { useForm, usePage } from '@inertiajs/react';
import dayjs from 'dayjs';
import { ArrowRight } from 'lucide-react';
import { FC } from 'react';
import { toast } from 'sonner';
import PpdbLayout from '../layout/ppdb-layout';

type Props = {
  siswa?: Siswa;
};

const DatadiriTab: FC<Props> = ({ siswa }) => {
  const { auth } = usePage<SharedData>().props;
  const { data, setData, post, errors } = useForm({
    name: siswa?.name || '',
    gender: siswa?.gender || '',
    nisn: siswa?.nisn || '',
    user_id: auth.user?.id || null,
    nis: siswa?.nis || '',
    dob: siswa?.dob || dayjs().subtract(7, 'year').format('YYYY-MM-DD'),
    pob: siswa?.pob || '',
    status: siswa?.status || 'ppdb',
    address: siswa?.address || '',
    phone: siswa?.phone || '',
    email: siswa?.email || '',
    register_year: siswa?.register_year || dayjs().year(),
  });

  const handleDatadiriTab = () => {
    const url = siswa ? route('pendaftaran.store-edit', siswa?.id) : route('pendaftaran.store');

    post(url, {
      preserveScroll: true,
      onSuccess: () => toast.success('Data calon peserta didik berhasil ditambahkan'),
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
        <CardContent>
          <form
            className="grid gap-6 md:grid-cols-2"
            onSubmit={(e) => {
              e.preventDefault();
              handleDatadiriTab();
            }}
          >
            <FormControl label="Nama lengkap siswa" required>
              <Input placeholder="Nama lengkap" value={data.name} onChange={(e) => setData('name', e.target.value)} error={!!errors.name} />
            </FormControl>
            <FormControl label="Jenis kelamin" required>
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
            <FormControl label="NISN" required>
              <Input placeholder="NISN" value={data.nisn} onChange={(e) => setData('nisn', e.target.value)} />
            </FormControl>
            <FormControl label="NIS" required>
              <Input placeholder="NIS" value={data.nis} onChange={(e) => setData('nis', e.target.value)} />
            </FormControl>
            <FormControl label="Tempat lahir" required>
              <Input placeholder="Kota tempat lahir" value={data.pob} onChange={(e) => setData('pob', e.target.value)} />
            </FormControl>
            <FormControl label="Tanggal lahir" required>
              <DatePicker value={dayjs(data.dob).toDate()} onValueChange={(date) => setData('dob', dayjs(date).format('YYYY-MM-DD'))} />
            </FormControl>
          </form>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Data pribadi siswa</CardTitle>
          <CardDescription>Isi nomor telepon dan email pribadi siswa.</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            className="grid gap-6 md:grid-cols-2"
            onSubmit={(e) => {
              e.preventDefault();
              handleDatadiriTab();
            }}
          >
            <FormControl label="Nomor telepon pribadi">
              <Input placeholder="+62xxx" value={data.phone} onChange={(e) => setData('phone', e.target.value)} error={!!errors.phone} />
            </FormControl>
            <FormControl label="Email pribadi">
              <Input
                type="email"
                placeholder="Email pribadi"
                value={data.email}
                onChange={(e) => setData('email', e.target.value)}
                error={!!errors.email}
              />
            </FormControl>
          </form>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleDatadiriTab}>
          Selanjutnya <ArrowRight />
        </Button>
      </div>
    </PpdbLayout>
  );
};

export default DatadiriTab;
