import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Guru } from '@/types';
import { router } from '@inertiajs/react';
import { FC } from 'react';

type GuruItemCardProps = {
  guru: Guru;
  asLink?: boolean;
};

const GuruItemCard: FC<GuruItemCardProps> = ({ guru, asLink = false }) => {
  const handleClick = () => {
    if (asLink) {
      router.visit(route('guru.show', guru.id));
    }
    return;
  };

  return (
    <Card onClick={handleClick}>
      <CardHeader>
        <div className="flex items-center gap-3">
          <Avatar className="size-12">
            <AvatarImage src={guru.avatar} alt={guru.name} />
            <AvatarFallback>{guru.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle>{guru.name}</CardTitle>
            <CardDescription>{guru.nip}</CardDescription>
            <CardDescription>{guru.gender}</CardDescription>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
};

export default GuruItemCard;
