import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { FC } from 'react';

type Props = {
  item: NavItem;
  number: number;
  active?: boolean;
};

const WizardTrigger: FC<Props> = ({ item, number, active }) => {
  return (
    <Link href={item.href}>
      <div className="flex h-18 w-20 flex-col items-center justify-start space-y-4">
        <Avatar className={cn('aspect-square h-12 w-12 ring-4 ring-transparent', active && 'ring-4 ring-primary')}>
          <AvatarFallback>{number}</AvatarFallback>
        </Avatar>
        <span className={cn('max-w-full text-center text-xs font-bold text-wrap text-muted-foreground', active && 'text-primary')}>{item.title}</span>
      </div>
    </Link>
  );
};

export default WizardTrigger;
