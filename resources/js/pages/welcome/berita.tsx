import { Berita } from '@/types';
import { FC } from 'react';
import BeritaItemCard from '../berita/components/berita-item-card';
import SectionContainer from './components/section-container';
import WelcomeLayout from './layouts/welcome-layout';

type Props = {
  beritas: Berita[];
};

const ListBerita: FC<Props> = ({ beritas }) => {
  return (
    <WelcomeLayout>
      <SectionContainer className="py-10" title="Berita kegiatan" description="Berita kegiatan sekolah terbaru">
        <div className="grid grid-cols-3 gap-6">
          {beritas.map((b) => (
            <BeritaItemCard key={b.id} berita={b} href={route('baca', b.slug)} />
          ))}
        </div>
      </SectionContainer>
    </WelcomeLayout>
  );
};

export default ListBerita;
