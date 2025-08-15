import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Pelajaran } from '@/types';
import { router } from '@inertiajs/react';
import { FC } from 'react';

type Props = {
  pelajaran: Pelajaran;
  asLink?: boolean;
};

const PelajaranItemCard: FC<Props> = ({ pelajaran, asLink = false }) => {
  const p = pelajaran;

  const handleClick = () => {
    if (asLink) {
      router.visit(route('pelajaran.show', p.id));
    }
    return;
  };

  return (
    <Card onClick={handleClick}>
      <CardHeader>
        <CardTitle>{p.mapel.name}</CardTitle>
        <CardDescription>{p.kelas.name}</CardDescription>
      </CardHeader>
    </Card>
  );
};

export default PelajaranItemCard;
