import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { Role } from '@/types';
import { Link } from '@inertiajs/react';
import { Edit, Plus, Trash2 } from 'lucide-react';
import { FC } from 'react';
import RolePermissionFormSheet from './components/role-permission-form-sheet';

type RoleIndexProps = {
  roles: Role[];
};

const RoleIndex: FC<RoleIndexProps> = ({ roles }) => {
  return (
    <AppLayout
      breadcrumbs={[
        {
          title: 'Role permission',
          href: route('role.index'),
        },
      ]}
      title="Daftar role"
      description="List role yang digunakan diaplikasi"
      actions={
        <>
          <RolePermissionFormSheet type="role">
            <Button>
              <Plus />
              Tambah role
            </Button>
          </RolePermissionFormSheet>
        </>
      }
    >
      <Input placeholder="Cari role" />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Role Name</TableHead>
            <TableHead>Permission</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {roles.map((role) => (
            <TableRow key={role.id}>
              <TableCell>{role.name}</TableCell>
              <TableCell>{role.permissions?.length} permissions</TableCell>
              <TableCell className="text-center">
                <Button variant={'ghost'} size={'icon'}>
                  <Link href={route('role.show', role.id)}>
                    <Edit />
                  </Link>
                </Button>
                <Button variant={'ghost'} size={'icon'}>
                  <Link href={route('role.destroy', role.id)}>
                    <Trash2 />
                  </Link>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </AppLayout>
  );
};

export default RoleIndex;
