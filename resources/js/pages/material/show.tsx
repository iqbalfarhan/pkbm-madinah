import MarkdownReader from '@/components/MarkdownReader';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { Material, Pelajaran } from '@/types';
import { FC } from 'react';
import MaterialFormSheet from './component/material-form-sheet';

type Props = {
  material: Material;
  pelajaran: Pelajaran;
};

const MaterialDetail: FC<Props> = ({ material, pelajaran }) => {
  return (
    <AppLayout
      title={material.title}
      description={`Materi belajar untuk pelajaran ${pelajaran.mapel.name} kelas ${pelajaran.kelas.name}`}
      actions={
        <MaterialFormSheet material={material} purpose="edit" pelajaran_id={material.pelajaran_id}>
          <Button>Edit Material</Button>
        </MaterialFormSheet>
      }
    >
      <MarkdownReader value={material.description} />
    </AppLayout>
  );
};

export default MaterialDetail;
