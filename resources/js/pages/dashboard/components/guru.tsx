import HeadingSmall from '@/components/heading-small';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const DashboardGuru = () => {
  return (
    <>
      <HeadingSmall title="Mata pelajarankan" description="List mata pelajaran yang saya ajar" />
      <div className="grid grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>Matematika {index + 1}</CardTitle>
              <CardDescription>Kelas VI (SD)</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </>
  );
};

export default DashboardGuru;
