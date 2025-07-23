import FormControl from '@/components/form-control';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { errorMessage } from '@/lib/utils';
import { useForm } from '@inertiajs/react';
import { Check, X } from 'lucide-react';
import { FC, PropsWithChildren } from 'react';
import { toast } from 'sonner';

type RolePermissionFormSheetProps = PropsWithChildren & {
  type?: 'role' | 'permission';
};

const RolePermissionFormSheet: FC<RolePermissionFormSheetProps> = ({ children, type }) => {
  const { data, setData, post } = useForm({
    type: type,
    group: type === 'permission' ? '' : undefined,
    name: '',
  });

  const handleSubmit = () => {
    post(route('role.store'), {
      preserveScroll: true,
      onSuccess: () => {
        toast.success('Berhasil menambahkan role');
        setData('name', '');
      },
      onError: (errors) => toast.error(errorMessage(errors)),
    });
  };

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Sheet title</SheetTitle>
          <SheetDescription>Sheet description</SheetDescription>
        </SheetHeader>
        <form
          className="space-y-6 px-4"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          {!type && (
            <FormControl label="Type">
              <Select value={data.type} onValueChange={(value) => setData('type', value as 'role' | 'permission')}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih tipe input" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="role">Role</SelectItem>
                  <SelectItem value="permission">Permission</SelectItem>
                </SelectContent>
              </Select>
            </FormControl>
          )}
          {data.type === 'permission' && (
            <FormControl label="Permission group name">
              <Input value={data.group} onChange={(e) => setData('group', e.target.value)} placeholder="group" />
            </FormControl>
          )}
          <FormControl label="Role / Permission name">
            <Input value={data.name} onChange={(e) => setData('name', e.target.value)} placeholder={`${data.type} name`} />
          </FormControl>
        </form>
        <SheetFooter>
          <Button onClick={handleSubmit}>
            <Check />
            Batal
          </Button>
          <SheetClose asChild>
            <Button variant={'outline'}>
              <X />
              Batal
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default RolePermissionFormSheet;
