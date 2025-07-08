import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Kelas } from '@/types';
import { FC } from 'react';

type KelasItemCardProps = {
  kelas: Kelas;
};

const KelasItemCard: FC<KelasItemCardProps> = ({ kelas }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{kelas.name}</CardTitle>
        <CardDescription className="line-clamp-2">{kelas.description}</CardDescription>
      </CardHeader>
      <CardFooter>
        <div className="flex items-center gap-2 text-sm">
          <Avatar className="size-6">
            <AvatarImage src={kelas.walikelas?.avatar} alt={kelas.walikelas?.name} />
            <AvatarFallback>0</AvatarFallback>
          </Avatar>
          {kelas.walikelas?.name ?? 'Belum pilih walikelas'}
        </div>
      </CardFooter>
    </Card>
  );
};

export default KelasItemCard;
