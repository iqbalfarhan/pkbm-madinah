import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { dateDFY } from '@/lib/utils';
import { Berita } from '@/types';
import { router } from '@inertiajs/react';
import { FC } from 'react';

type Props = {
  berita: Berita;
  href?: string;
};

const BeritaItemCard: FC<Props> = ({ berita, href }) => {
  const handleClick = () => {
    if (href) {
      router.visit(href);
    }

    return;
  };

  return (
    <Card onClick={handleClick}>
      <CardContent className="space-y-4">
        <div className="flex items-end justify-end">
          <Badge variant={'outline'}>{dateDFY(berita.created_at)}</Badge>
        </div>
        <img src={berita.thumbnail} alt={berita.judul} className="aspect-video w-full rounded object-cover" />
      </CardContent>
      <CardHeader className="flex-1">
        <CardTitle className="line-clamp-2">{berita.judul}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="line-clamp-3">{berita.content}</CardDescription>
      </CardContent>
    </Card>
  );
};

export default BeritaItemCard;
