import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, Mapel } from '@/types';
import { Edit2 } from 'lucide-react';
import { FC } from 'react';
import MapelFormSheet from './components/mapel-form-sheet';

type MapelShowProps = {
  mapel: Mapel;
};

const MapelShow: FC<MapelShowProps> = ({ mapel }) => {
  const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Mata pelajaran', href: route('mapel.index') },
    { title: mapel.name, href: route('mapel.show', mapel.id) },
  ];

  return (
    <AppLayout
      title={mapel.name}
      description={mapel.description}
      breadcrumbs={breadcrumbs}
      actions={
        <MapelFormSheet mapel={mapel}>
          <Button>
            <Edit2 />
            Edit
          </Button>
        </MapelFormSheet>
      }
    >
      <pre>{JSON.stringify(mapel, null, 2)}</pre>
    </AppLayout>
  );
};

export default MapelShow;
