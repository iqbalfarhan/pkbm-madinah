import HeadingSmall from '@/components/heading-small';
import { Card, CardContent } from '@/components/ui/card';

const DashboardWalikelas = () => {
  return (
    <>
      <HeadingSmall title="Kelas saya" description="peserta didik yang terkait dengan anda" />
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardContent>kelas gw</CardContent>
        </Card>
        <Card>
          <CardContent>Input ketidakhadiran siswa</CardContent>
        </Card>
      </div>
    </>
  );
};

export default DashboardWalikelas;
