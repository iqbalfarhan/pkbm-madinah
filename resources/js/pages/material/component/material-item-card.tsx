import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Material } from '@/types';
import { Link } from '@inertiajs/react';
import { FC } from 'react';

type Props = {
  material: Material;
};

const MaterialItemCard: FC<Props> = ({ material }) => {
  return (
    <Link href={route('material.show', material.id)}>
      <Card>
        <CardHeader>
          <CardTitle>{material.title}</CardTitle>
          <CardDescription>{material.description}</CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
};

export default MaterialItemCard;
