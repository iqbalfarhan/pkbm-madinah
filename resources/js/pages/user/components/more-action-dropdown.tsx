import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Link } from '@inertiajs/react';
import { Trash2 } from 'lucide-react';
import { FC, PropsWithChildren } from 'react';

type MoreActionDropdownProps = PropsWithChildren & {};

const MoreActionDropdown: FC<MoreActionDropdownProps> = ({ children }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem variant="destructive" asChild>
          <Link href={route('user.trashed')}>
            <Trash2 />
            Tempat sampah
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MoreActionDropdown;
