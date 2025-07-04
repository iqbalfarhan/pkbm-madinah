import FormControl from '@/components/form-control';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { userRoles } from '@/lib/enums';
import { router, useForm } from '@inertiajs/react';
import { CheckCheck, X } from 'lucide-react';
import { FC, PropsWithChildren } from 'react';

type UserFilterSheetProps = PropsWithChildren;

const UserFilterSheet: FC<UserFilterSheetProps> = ({ children }) => {
  const { data, setData, get } = useForm({
    role: 'all' as string | undefined,
  });

  const handleSubmit = () => {
    get(route('user.index'), { preserveState: true });
  };

  const handleReset = () => {
    router.get(route('user.index'), { role: undefined }, { preserveState: true });
  };

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Filter data siswa</SheetTitle>
          <SheetDescription>Filter data siswa berdasarkan role dan status aktif</SheetDescription>
        </SheetHeader>
        <form className="px-4" onSubmit={handleSubmit}>
          <FormControl label="Pilih role">
            <Select value={data.role} onValueChange={(value) => setData('role', value === 'all' ? undefined : value)}>
              <SelectTrigger>
                <SelectValue placeholder="Pilih role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua role</SelectItem>
                {userRoles.map((role) => (
                  <SelectItem key={role} value={role}>
                    {role}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>
        </form>
        <SheetFooter>
          <Button type="submit" onClick={handleSubmit}>
            <CheckCheck />
            Terapkan
          </Button>
          <SheetClose asChild>
            <Button variant={'outline'} onClick={handleReset}>
              <X />
              Batal
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default UserFilterSheet;
