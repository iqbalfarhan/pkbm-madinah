import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { User } from '@/types';
import { Link } from '@inertiajs/react';
import dayjs from 'dayjs';
import { Edit, Ellipsis, Filter, Lock, Plus, Trash2 } from 'lucide-react';
import { FC, useState } from 'react';
import { toast } from 'sonner';
import MoreActionDropdown from './components/more-action-dropdown';
import ResetPassword from './components/reset-password';
import UserBulkDelete from './components/user-bulk-delete';
import UserBulkEdit from './components/user-bulk-edit';
import UserFilterSheet from './components/user-filter-sheet';
import UserFormSheet from './components/user-form-sheet';

type UserListProps = {
  users: User[];
};

const UserList: FC<UserListProps> = ({ users }) => {
  const [cari, setCari] = useState<string | undefined>();
  const [userIds, setUserIds] = useState<number[]>([]);

  const allUserIds = users.map((user) => user.id);
  const isAllChecked = userIds?.length === users.length;

  // return <pre>{JSON.stringify(users, null, 4)}</pre>;

  return (
    <AppLayout
      title="Pengaturan user"
      description="Halaman ini menampilkan list user yang terdaftar"
      breadcrumbs={[{ title: 'Pengaturan user', href: route('user.index') }]}
      actions={
        <>
          <UserFormSheet purpose="create">
            <Button>
              <Plus />
              Tambah user
            </Button>
          </UserFormSheet>
          <MoreActionDropdown>
            <Button variant={'secondary'} size={'icon'}>
              <Ellipsis />
            </Button>
          </MoreActionDropdown>
        </>
      }
    >
      <div className="flex items-center space-x-2">
        <Input placeholder="Cari user..." type="search" value={cari} onChange={(e) => setCari(e.target.value)} />
        <UserFilterSheet>
          <Button>
            <Filter />
            Filter data
          </Button>
        </UserFilterSheet>
        {userIds && userIds.length > 0 && (
          <>
            <Button variant={'ghost'} disabled>
              {userIds.length} item selected
            </Button>
            <UserBulkEdit userIds={userIds}>
              <Button>
                <Edit />
                Edit data
              </Button>
            </UserBulkEdit>
            <UserBulkDelete userIds={userIds} onSuccess={() => setUserIds([])}>
              <Button variant={'destructive'}>
                <Trash2 />
                Hapus data
              </Button>
            </UserBulkDelete>
          </>
        )}
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <Button variant={'ghost'} size={'icon'} asChild>
                <Label>
                  <Checkbox
                    checked={isAllChecked}
                    onCheckedChange={(checked) => {
                      setUserIds(checked ? allUserIds : []);
                    }}
                  />
                </Label>
              </Button>
            </TableHead>
            <TableHead>Nama user</TableHead>
            <TableHead>Alamat email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Login</TableHead>
            <TableHead>Asosiasi</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users
            .filter((user) =>
              JSON.stringify(user)
                .toLowerCase()
                .includes(cari?.toLowerCase() || ''),
            )
            .map((user) => {
              return (
                <TableRow key={user.id}>
                  <TableCell>
                    <Button variant={'ghost'} size={'icon'} asChild>
                      <Label>
                        <Checkbox
                          checked={userIds?.includes(user.id)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setUserIds((prev) => [...prev, user.id]);
                            } else {
                              setUserIds((prev) => prev.filter((id) => id !== user.id));
                            }
                          }}
                        />
                      </Label>
                    </Button>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="size-6">
                        <AvatarImage src={user.avatar} alt={user.name} />
                      </Avatar>
                      {user.name}
                    </div>
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.roles.join(', ')}</TableCell>
                  <TableCell>{user.last_login && dayjs(user.last_login).format('DD MMMM YYYY')}</TableCell>
                  <TableCell>lorem</TableCell>
                  <TableCell>
                    <ResetPassword user={user}>
                      <Button variant={'ghost'} size={'icon'}>
                        <Lock />
                      </Button>
                    </ResetPassword>
                    <UserFormSheet user={user} purpose="edit">
                      <Button variant={'ghost'} size={'icon'}>
                        <Edit />
                      </Button>
                    </UserFormSheet>
                    <Button variant={'ghost'} size={'icon'} asChild>
                      <Link
                        href={route('user.destroy', user.id)}
                        method="delete"
                        preserveScroll={true}
                        onSuccess={() => toast.success('User dipindahkan ke tempat sampah')}
                      >
                        <Trash2 />
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </AppLayout>
  );
};

export default UserList;
