import FormControl from '@/components/form-control';
import { Button } from '@/components/ui/button';
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { generateSlug } from '@/lib/utils';
import { Guru, Kelas, TahunAjaran } from '@/types';
import { router, useForm } from '@inertiajs/react';
import dayjs from 'dayjs';
import { FC, useEffect, useState } from 'react';

type Props = {
  gurus: Guru[];
  tas: TahunAjaran[];
  kelas: Kelas[];
  query?: {
    [key: string]: string;
  };
};

const CreateTahunajaran: FC<Props> = ({ gurus, tas, kelas, query }) => {
  const [slug, setSlug] = useState('');

  const defaultTahunAjaran = dayjs().format('YYYY') + '/' + dayjs().add(1, 'year').format('YYYY');
  const { data, setData } = useForm({
    name: defaultTahunAjaran,
    semester: '',
    slug: slug,
  });

  useEffect(() => {
    if (data.name && data.semester) {
      const generated = generateSlug(data.name, data.semester);
      setSlug(generated);
      setData('slug', generated);
    }
  }, [data.name, data.semester, setData]);

  return (
    <AppLayout title="Buat tahun ajaran baru" description="Halaman untuk membuat tahun ajaran baru">
      <Card>
        <CardHeader>
          <CardTitle>Buat tahun ajaran baru</CardTitle>
          <CardDescription>Halaman untuk membuat tahun ajaran baru</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <FormControl label="Tahun ajaran">
            <Input placeholder="contoh : 2023/2024" value={data.name} onChange={(e) => setData('name', e.target.value)} />
          </FormControl>
          <FormControl label="Semester">
            <Select value={data.semester} onValueChange={(value) => setData('semester', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Pilih semester" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ganjil">Ganjil</SelectItem>
                <SelectItem value="genap">Genap</SelectItem>
              </SelectContent>
            </Select>
          </FormControl>
          <Label>
            <Checkbox />
            <span>Copy kelas dari tahunajaran</span>
          </Label>

          <FormControl label="Tahun ajaran">
            <Select
              value={query?.taid}
              onValueChange={(value) => {
                router.visit(route('tahunajaran.create'), {
                  preserveScroll: true,
                  prefetch: true,
                  data: {
                    taid: value,
                  },
                });
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Pilih tahun ajaran" />
              </SelectTrigger>
              <SelectContent>
                {tas.map((ta) => (
                  <SelectItem key={ta.id} value={ta.id.toString()}>
                    {ta.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nama kelas</TableHead>
              </TableRow>
            </TableHeader>
          </Table>
        </CardContent>
        <CardFooter>
          <CardAction>
            <Button>Simpan tahun ajaran</Button>
          </CardAction>
        </CardFooter>
      </Card>
      <p>{JSON.stringify(gurus)}</p>
      <p>{JSON.stringify(tas)}</p>
      <p>{JSON.stringify(kelas)}</p>
    </AppLayout>
  );
};

export default CreateTahunajaran;
