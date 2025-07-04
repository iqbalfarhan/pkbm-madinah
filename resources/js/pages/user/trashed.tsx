import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { User } from '@/types';
import { Link } from '@inertiajs/react';
import { ChevronLeft, Trash2, Undo2 } from 'lucide-react';
import { FC, useState } from 'react';
import { toast } from 'sonner';
import UserBulkForceDelete from './components/user-bulk-force-delete';
import UserBulkRestore from './components/user-bulk-restore';
import UserForceDelete from './components/user-force-delete';

type TrashedUserProps = {
  users: User[];
};

const TrashedUser: FC<TrashedUserProps> = ({ users }) => {
  const [cari, setCari] = useState<string | undefined>();
  const [userIds, setUserIds] = useState<number[]>([]);

  const allUserIds = users.map((user) => user.id);
  const isAllChecked = userIds?.length === users.length;

  return (
    <AppLayout
      title="Tempat sampah"
      description="Halaman ini menampilkan list user yang terdaftar"
      breadcrumbs={[{ title: 'Pengaturan user', href: route('user.index') }]}
      actions={
        <>
          <Button asChild>
            <Link href={route('user.index')}>
              <ChevronLeft /> Kembali ke list user
            </Link>
          </Button>
        </>
      }
    >
      <div className="flex items-center space-x-2">
        <Input placeholder="Cari user..." type="search" value={cari} onChange={(e) => setCari(e.target.value)} />
        {userIds && userIds.length > 0 && (
          <>
            <Button variant={'ghost'} disabled>
              {userIds.length} item selected
            </Button>
            <UserBulkRestore userIds={userIds} onSuccess={() => setUserIds([])}>
              <Button>
                <Undo2 />
                Restore
              </Button>
            </UserBulkRestore>
            <UserBulkForceDelete userIds={userIds} onSuccess={() => setUserIds([])}>
              <Button variant={'destructive'}>
                <Trash2 />
                Hapus permanen
              </Button>
            </UserBulkForceDelete>
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
            <TableHead>No</TableHead>
            <TableHead>Nama user</TableHead>
            <TableHead>Alamat email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Login Terakhir</TableHead>
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
            .map((user) => (
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
                <TableCell>{user.id}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="size-6">
                      <AvatarImage src={user.avatar} alt={user.name} />
                    </Avatar>
                    {user.name}
                  </div>
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>{user.last_login}</TableCell>
                <TableCell>
                  <Button variant={'ghost'} size={'icon'} asChild>
                    <Link
                      href={route('user.restore', user.id)}
                      method="put"
                      onSuccess={() => toast.success('User berhasil dikembalikan')}
                      preserveScroll={true}
                    >
                      <Undo2 />
                    </Link>
                  </Button>
                  <UserForceDelete user={user}>
                    <Button variant={'ghost'} size={'icon'}>
                      <Trash2 />
                    </Button>
                  </UserForceDelete>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </AppLayout>
  );
};

export default TrashedUser;
