import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { FC } from 'react';

type PengumumanListProps = {
  data: string;
};

const PengumumanList: FC<PengumumanListProps> = () => {
  return (
    <AppLayout>
      <div className="mx-auto max-w-4xl space-y-6">
        {Array.from({ length: 10 }).map((_, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>Pengumuman {index}</CardTitle>
              <CardDescription>2 juni 2025</CardDescription>
            </CardHeader>
            <CardContent>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. At officiis deserunt quod culpa autem corporis nemo quibusdam architecto
              voluptatem accusantium maxime tempora fuga excepturi aliquam pariatur, enim et, necessitatibus eligendi?
            </CardContent>
          </Card>
        ))}
      </div>
    </AppLayout>
  );
};

export default PengumumanList;
