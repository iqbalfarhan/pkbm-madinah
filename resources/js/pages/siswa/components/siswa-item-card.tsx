import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Siswa } from '@/types';
import { router } from '@inertiajs/react';
import { FC } from 'react';

type SiswaItemCardProps = {
  siswa: Siswa;
  asLink?: boolean;
  className?: string;
};

const SiswaItemCard: FC<SiswaItemCardProps> = ({ asLink, siswa, className }) => {
  const handleClick = () => {
    if (asLink) {
      router.visit(route('siswa.show', siswa.id));
    }
  };
  return (
    <Card onClick={handleClick} className={cn('w-full cursor-pointer', className)}>
      <CardHeader className="flex items-center gap-4">
        <Avatar>
          <AvatarImage src={siswa.avatar} alt={siswa.name} />
        </Avatar>
        <div className="flex flex-col">
          <CardTitle className="line-clamp-1">{siswa.name}</CardTitle>
          <CardDescription>{siswa.nisn ?? 'Belum ada NISN'}</CardDescription>
        </div>
      </CardHeader>
    </Card>
  );
};

export default SiswaItemCard;
