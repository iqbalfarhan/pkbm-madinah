import FormControl from '@/components/form-control';
import HeadingSmall from '@/components/heading-small';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { errorMessage, groupBy } from '@/lib/utils';
import { Permission, Role } from '@/types';
import { router, useForm } from '@inertiajs/react';
import { Check, Plus } from 'lucide-react';
import { FC } from 'react';
import { toast } from 'sonner';
import RolePermissionFormSheet from './components/role-permission-form-sheet';

type ShowRoleProps = {
  role: Role;
  permissions: Permission[];
};
const ShowRole: FC<ShowRoleProps> = ({ role, permissions }) => {
  const rolepermits = role.permissions?.map((p) => p.id);
  const togglePermission = (permissionId: number) => {
    router.put(
      route('role.toggle-permission', role.id),
      {
        permission_id: permissionId,
      },
      {
        preserveScroll: true,
        onSuccess: () => {
          toast.success('Permission updated successfully');
        },
        onError: (e) => toast.error(errorMessage(e)),
      },
    );
  };

  const { data, setData, put } = useForm({
    name: role.name,
  });

  const handleUpdateRole = () => {
    put(route('role.update', role.id), {
      preserveScroll: true,
      onSuccess: () => toast.success('Role updated successfully'),
      onError: (e) => toast.error(errorMessage(e)),
    });
  };

  return (
    <AppLayout
      breadcrumbs={[
        {
          title: 'Role permission',
          href: route('role.index'),
        },
        {
          title: role.name,
          href: route('role.show', role.id),
        },
      ]}
      title={`Edit permission untuk role ${role.name}`}
      description="Edit permissions"
      actions={<></>}
    >
      <Card>
        <CardHeader>
          <CardTitle>Ganti nama role</CardTitle>
          <CardDescription>Nama role sebelumnya: {role.name}</CardDescription>
        </CardHeader>
        <CardContent>
          <FormControl className="flex flex-row gap-4">
            <Input value={data.name} onChange={(e) => setData('name', e.target.value)} />
            <Button onClick={handleUpdateRole}>
              <Check />
              Simpan
            </Button>
          </FormControl>
        </CardContent>
      </Card>
      <Separator />
      <div className="flex justify-between">
        <HeadingSmall title="Daftar permission" description="Checklist permission yang diberikan kepada role ini" />
        <RolePermissionFormSheet type="permission">
          <Button>
            <Plus />
            Tambah permissions
          </Button>
        </RolePermissionFormSheet>
      </div>
      <div className="grid grid-cols-4 gap-6">
        {Object.entries(groupBy(permissions, 'group')).map(([group, permits]) => (
          <Card className="h-fit">
            <CardHeader>
              <CardTitle className="capitalize">{group}</CardTitle>
              <CardDescription>{permits.length} permissions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {permits.map((p) => (
                <Label key={p.id}>
                  <Checkbox defaultChecked={rolepermits?.includes(p.id)} onCheckedChange={() => togglePermission(p.id)} />
                  <span title={p.name} className="line-clamp-1 capitalize">
                    {p.name}
                  </span>
                </Label>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </AppLayout>
  );
};

export default ShowRole;
