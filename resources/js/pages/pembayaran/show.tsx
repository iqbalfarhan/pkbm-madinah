import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { Pembayaran } from '@/types';
import { FC } from 'react';

type Props = {
  pembayaran: Pembayaran;
};

const showPembayaran: FC<Props> = ({ pembayaran }) => {
  return (
    <AppLayout title="Detail Pembayaran" description="Detail pembayaran">
      <Card>
        <CardHeader>
          <CardTitle>{pembayaran.code}</CardTitle>
          <CardDescription>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, quo impedit cupiditate voluptas culpa magnam itaque distinctio at ullam,
            beatae perferendis doloremque facilis mollitia, quod corporis. Autem voluptatum ipsum placeat.
          </CardDescription>
        </CardHeader>
      </Card>
    </AppLayout>
  );
};

export default showPembayaran;
