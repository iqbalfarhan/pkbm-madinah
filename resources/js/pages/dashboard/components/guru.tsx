import HeadingSmall from '@/components/heading-small';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const DashboardGuru = () => {
  return (
    <>
      <HeadingSmall title="Mata pelajaran yang saya ajar" description="List mata pelajaran yang saya ajar" />
      <div className="grid gap-4 md:grid-cols-4">
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
