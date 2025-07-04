import FormControl from '@/components/form-control';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';

const PengaturanPPDB = () => {
  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: 'PPDB',
      href: route('dashboard'),
    },
    {
      title: 'Pengaturan',
      href: route('ppdb.setting'),
    },
  ];
  return (
    <AppLayout title="Pengaturan PPDB" breadcrumbs={breadcrumbs}>
      <Card>
        <CardHeader>
          <CardTitle>Pengaturan PPDB</CardTitle>
          <CardDescription>Pengaturan PPDB</CardDescription>
        </CardHeader>
        <Separator />
        <CardContent>
          <FormControl label="Untuk tahun ajaran">
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Pilih Tahun" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2023/2024">2023/2024</SelectItem>
                <SelectItem value="2024/2025">2024/2025</SelectItem>
                <SelectItem value="2025/2026">2025/2026</SelectItem>
              </SelectContent>
            </Select>
          </FormControl>
        </CardContent>
        <Separator />
        <CardFooter>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur impedit fugit porro nemo soluta quasi totam. Tempora quia reiciendis,
          aliquid dolore, autem dolores harum quae veritatis quidem vel reprehenderit neque.
        </CardFooter>
      </Card>
    </AppLayout>
  );
};

export default PengaturanPPDB;
