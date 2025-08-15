import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Siswa } from '@/types';
import { router, usePage } from '@inertiajs/react';
import { Edit, Folder, Trash2 } from 'lucide-react';
import { FC } from 'react';

type SiswaItemCardProps = {
  siswa: Siswa;
  asLink?: boolean;
  className?: string;
};

const SiswaItemCard: FC<SiswaItemCardProps> = ({ asLink, siswa, className }) => {
  const { editSiswa } = usePage<{ editSiswa: boolean }>().props;
  const handleClick = () => {
    if (asLink) {
      router.visit(route('siswa.show', siswa.id));
    }
  };
  return (
    <Card onClick={handleClick} className={cn('w-full cursor-pointer', className)}>
      <CardContent className="flex flex-col items-center justify-center gap-4">
        <Avatar className="size-32">
          <AvatarImage src={siswa.avatar} />
        </Avatar>
      </CardContent>
      <CardHeader className="text-center">
        <CardTitle>{siswa.name}</CardTitle>
        <CardDescription>{siswa.nisn}</CardDescription>
        <CardDescription>{siswa.kelas_label}</CardDescription>
      </CardHeader>
      {editSiswa && (
        <CardContent className="text-center">
          <Button variant={'ghost'} size={'icon'}>
            <Folder />
          </Button>
          <Button variant={'ghost'} size={'icon'}>
            <Edit />
          </Button>
          <Button variant={'ghost'} size={'icon'}>
            <Trash2 />
          </Button>
        </CardContent>
      )}
    </Card>
  );
};

export default SiswaItemCard;
