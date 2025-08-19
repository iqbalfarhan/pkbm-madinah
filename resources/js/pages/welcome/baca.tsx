import MarkdownReader from '@/components/MarkdownReader';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Berita } from '@/types';
import { Link } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import { FC } from 'react';
import SectionContainer from './components/section-container';
import WelcomeLayout from './layouts/welcome-layout';

type Props = {
  berita: Berita;
};

const BacaArtikel: FC<Props> = ({ berita }) => {
  return (
    <WelcomeLayout>
      <SectionContainer className="py-10" title={berita.judul} description={berita.meta}>
        <div className="mx-auto max-w-3xl space-y-10">
          <Carousel>
            <CarouselContent>
              {berita.media?.map((m, index) => (
                <CarouselItem key={index}>
                  <img src={m.original_url} className="aspect-video w-full object-cover" />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>

          <MarkdownReader value={berita.content} className="max-w-full" />

          <Button asChild variant={'secondary'}>
            <Link href={route('artikel')}>
              <ArrowLeft />
              Kembali ke artikel
            </Link>
          </Button>
        </div>
      </SectionContainer>
    </WelcomeLayout>
  );
};

export default BacaArtikel;
