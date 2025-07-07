import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { Permission, Role } from '@/types';
import { Edit } from 'lucide-react';
import { FC } from 'react';
import RolePermissionFormSheet from './components/role-permission-form-sheet';

type RoleIndexProps = {
  roles: Role[];
  permissions: Permission[];
};

const RoleIndex: FC<RoleIndexProps> = ({ roles, permissions }) => {
  return (
    <AppLayout
      actions={
        <>
          <RolePermissionFormSheet>
            <Button>Tambah role/permissions</Button>
          </RolePermissionFormSheet>
        </>
      }
    >
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Permission Group</TableHead>
            <TableHead>Permission Name</TableHead>
            {roles.map((role) => (
              <TableHead key={role.id}>{role.name}</TableHead>
            ))}
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {permissions.map((permission) => (
            <TableRow key={permission.id}>
              <TableCell>{permission.group}</TableCell>
              <TableCell>{permission.name}</TableCell>
              {roles.map((role) => (
                <TableCell key={role.id}>
                  <Checkbox defaultChecked={role.permissions?.find((p) => p.id === permission.id) ? true : false} />
                </TableCell>
              ))}
              <TableCell>
                <Button variant={'ghost'} size={'icon'}>
                  <Edit />
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
