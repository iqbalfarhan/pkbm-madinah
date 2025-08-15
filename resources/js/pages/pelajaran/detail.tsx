import HeadingSmall from '@/components/heading-small';
import { Button } from '@/components/ui/button';
import { Material, Pelajaran } from '@/types';
import { FC } from 'react';
import MaterialFormSheet from '../material/component/material-form-sheet';
import MaterialItemCard from '../material/component/material-item-card';
import PelajaranLayout from './layout/pelajaran-layout';

type PelajaranDetailProps = {
  materials: Material[];
  pelajaran: Pelajaran;
};

const PelajaranDetail: FC<PelajaranDetailProps> = ({ materials, pelajaran }) => {
  return (
    <PelajaranLayout>
      <HeadingSmall title="List materi" description="List materi yang terkait dengan pelajaran ini" />
      <MaterialFormSheet purpose="create" pelajaran_id={pelajaran.id}>
        <Button>Tambah matei baru</Button>
      </MaterialFormSheet>
      <div className="grid grid-cols-4 gap-4">
        {materials.map((m) => (
          <MaterialItemCard material={m} key={m.id} />
        ))}
      </div>
    </PelajaranLayout>
  );
};

export default PelajaranDetail;
