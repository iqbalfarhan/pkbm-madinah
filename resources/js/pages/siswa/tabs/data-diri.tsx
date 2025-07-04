import DatePicker from '@/components/date-picker';
import FormControl from '@/components/form-control';
import HeadingSmall from '@/components/heading-small';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { jenisKelaminLists, siswaStatusLists } from '@/lib/enums';
import { errorMessage } from '@/lib/utils';
import { Gender, Kelas, SharedData, Siswa, SiswaStatus } from '@/types';
import { useForm, usePage } from '@inertiajs/react';
import dayjs from 'dayjs';
import { Check } from 'lucide-react';
import { FC } from 'react';
import { toast } from 'sonner';
import SiswaLayout from '../layout/siswa-layout';

type DataDiriSiswaProps = {
  siswa: Siswa;
};

const DataDiriSiswa: FC<DataDiriSiswaProps> = ({ siswa }) => {
  const props = usePage<SharedData>().props;
  const kelases = props.kelases as Kelas[];

  const { data, setData, put } = useForm({
    name: siswa.name,
    nisn: siswa.nisn,
    phone: siswa.phone,
    email: siswa.email,
    register_year: siswa.register_year,
    address: siswa.address,
    pob: siswa.pob,
    dob: siswa.dob,
    status: siswa.status,
    gender: siswa.gender ?? 'Laki-laki',
    kelas_id: (siswa.kelas?.id ?? null) as number | null,
  });

  const handleSubmit = () => {
    put(route('siswa.update', siswa.id), {
      preserveScroll: true,
      onSuccess: () => {
        toast.success('Berhasil memperbarui data siswa');
      },
      onError: (e) => {
        toast.error(errorMessage(e));
      },
    });
  };

  return (
    <SiswaLayout siswa={siswa}>
      <HeadingSmall title="Informasi data diri siswa" description="informasi data diri siswa" />
      <Card>
        <CardHeader>
          <CardTitle>Edit data diri</CardTitle>
          <CardDescription>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem, voluptates?</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
            className="grid grid-cols-2 gap-6"
          >
            <FormControl label="Nama siswa">
              <Input value={data.name} onChange={(e) => setData('name', e.target.value)} />
            </FormControl>
            <FormControl label="NISN">
              <Input value={data.nisn} onChange={(e) => setData('nisn', e.target.value)} />
            </FormControl>
            <FormControl label="Tahun terdaftar">
              <Input type="number" value={data.register_year} onChange={(e) => setData('register_year', parseInt(e.target.value))} />
            </FormControl>
            <FormControl label="Kelas">
              <Select value={data.kelas_id?.toString()} onValueChange={(value) => setData('kelas_id', parseInt(value))}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih kelas" />
                </SelectTrigger>
                <SelectContent>
                  {kelases.map((kelas) => (
                    <SelectItem key={kelas.id} value={kelas.id.toString()}>
                      {kelas.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
            <FormControl label="Status aktif siswa">
              <Select value={data.status} onValueChange={(value) => setData('status', value as SiswaStatus)}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih kelas" />
                </SelectTrigger>
                <SelectContent>
                  {siswaStatusLists
                    .filter((item) => item !== 'ppdb')
                    .map((status) => (
                      <SelectItem key={status} value={status.toString()}>
                        {status}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </FormControl>
            <FormControl label="Jenis kelamin">
              <Select value={data.gender} onValueChange={(value) => setData('gender', value as Gender)}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih jenis kelamin" />
                </SelectTrigger>
                <SelectContent>
                  {jenisKelaminLists.map((gender) => (
                    <SelectItem key={gender} value={gender}>
                      {gender}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
            <FormControl label="Tempat lahir">
              <Input value={data.pob} onChange={(e) => setData('pob', e.target.value)} />
            </FormControl>
            <FormControl label="Tanggal Lahir" required>
              <DatePicker value={dayjs(data.dob).toDate()} onValueChange={(date) => setData('dob', dayjs(date).format('YYYY-MM-DD'))} />
            </FormControl>
            <FormControl label="Nomor telepon">
              <Input value={data.phone} onChange={(e) => setData('phone', e.target.value)} />
            </FormControl>
            <FormControl label="Alamat email">
              <Input type="email" value={data.email} onChange={(e) => setData('email', e.target.value)} />
            </FormControl>
            <FormControl label="Alamat tempat tinggal" className="col-span-full">
              <Textarea value={data.address} onChange={(e) => setData('address', e.target.value)} />
            </FormControl>
          </form>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSubmit}>
            <Check />
            Simpan
          </Button>
        </CardFooter>
      </Card>
    </SiswaLayout>
  );
};

export default DataDiriSiswa;
