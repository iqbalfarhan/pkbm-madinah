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
        <CardDescription>
          Kelas tingkat {kelas.tingkat.group} - {kelas.siswas.length} siswa - 10 Matapelajaran
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <div className="flex items-center gap-2 text-xs">
          <Avatar className="size-4">
            <AvatarImage src={kelas.walikelas?.avatar} alt={kelas.walikelas?.name} />
            <AvatarFallback>A</AvatarFallback>
          </Avatar>
          {kelas.walikelas?.name ?? 'Belum pilih walikelas'}
        </div>
      </CardFooter>
    </Card>
  );
};

export default KelasItemCard;
