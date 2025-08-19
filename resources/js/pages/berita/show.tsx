import MarkdownReader from '@/components/MarkdownReader';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import AppLayout from '@/layouts/app-layout';
import { Berita } from '@/types';
import { Link } from '@inertiajs/react';
import { Edit } from 'lucide-react';
import { FC } from 'react';

type Props = {
  berita: Berita;
};

const ShowBerita: FC<Props> = ({ berita }) => {
  return (
    <AppLayout
      title="Detail Berita"
      description="Detail berita"
      actions={
        <>
          <Button asChild>
            <Link href={route('berita.edit', berita.id)}>
              <Edit />
              Edit berita
            </Link>
          </Button>
        </>
      }
    >
      <div className="mx-auto w-full max-w-3xl space-y-6">
        <div className="flex flex-col gap-1.5">
          <h1 className="text-3xl font-semibold">{berita.judul}</h1>
          <p className="text-muted-foreground">{berita.meta}</p>
        </div>

        {berita.media?.length > 0 && (
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
        )}
        <MarkdownReader value={berita.content} className="max-w-full" />
      </div>
    </AppLayout>
  );
};

export default ShowBerita;
