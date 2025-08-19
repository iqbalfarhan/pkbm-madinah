import { Button } from '@/components/ui/button';
import BeritaItemCard from '@/pages/berita/components/berita-item-card';
import { Berita } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';
import SectionContainer from '../components/section-container';

const BeritaSection = () => {
  const { beritas = [] } = usePage<{ beritas: Berita[] }>().props;
  return (
    <SectionContainer className="py-10" title="Berita kegiatan" description="Berita kegiatan sekolah terbaru">
      <div className="grid grid-cols-3 gap-6">
        {beritas.map((b) => (
          <BeritaItemCard key={b.id} berita={b} href={route('baca', b.slug)} />
        ))}
      </div>

      <div className="flex flex-col items-center py-10">
        <Button asChild size={'xl'}>
          <Link href={route('artikel')}>
            Lihat semua berita <ArrowRight />
          </Link>
        </Button>
      </div>
    </SectionContainer>
  );
};

export default BeritaSection;
