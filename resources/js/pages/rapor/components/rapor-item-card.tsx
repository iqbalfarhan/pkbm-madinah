import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Rapor } from '@/types';
import { Link } from '@inertiajs/react';
import { FC } from 'react';

type RaporItemCardProps = {
  rapor: Rapor;
};

const RaporItemCard: FC<RaporItemCardProps> = ({ rapor }) => {
  return (
    <Link href={route('rapor.show', rapor.id)}>
      <Card>
        <CardHeader>
          <CardTitle>E-Rapor {rapor.jenis}</CardTitle>
          <CardDescription>
            {rapor.tahunajaran?.name} semester {rapor.tahunajaran?.semester}
          </CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
};

export default RaporItemCard;
