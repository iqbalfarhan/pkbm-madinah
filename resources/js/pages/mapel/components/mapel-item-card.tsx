import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Mapel } from '@/types';
import { router } from '@inertiajs/react';
import { FC } from 'react';

type MapelItemCardProps = {
  mapel: Mapel;
  asLink?: boolean;
};

const MapelItemCard: FC<MapelItemCardProps> = ({ mapel, asLink = false }) => {
  const handleClick = () => {
    if (asLink) {
      router.visit(route('mapel.show', mapel.id));
    }
    return;
  };

  return (
    <Card onClick={handleClick}>
      <CardHeader>
        <CardTitle>{mapel.name}</CardTitle>
        <CardDescription>{mapel.mapel_group?.name}</CardDescription>
        <CardDescription>{mapel.tingkat.label ?? ''}</CardDescription>
      </CardHeader>
    </Card>
  );
};

export default MapelItemCard;
