import FormControl from '@/components/form-control';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { User } from '@/types';
import { useForm } from '@inertiajs/react';
import { Check, X } from 'lucide-react';
import { FC, PropsWithChildren } from 'react';

type LoginSettingProps = PropsWithChildren & {
  user?: User;
};

const LoginSetting: FC<LoginSettingProps> = ({ children, user }) => {
  const { data, setData } = useForm({
    name: user?.name ?? '',
    email: user?.email ?? '',
  });

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Sheet title</SheetTitle>
          <SheetDescription>Sheet description</SheetDescription>
        </SheetHeader>
        <div className="space-y-6 px-4">
          <FormControl label="Nama akun">
            <Input placeholder="Nama akun" value={data.name} onChange={(e) => setData('name', e.target.value)} />
          </FormControl>
          <FormControl label="Alamat email">
            <Input placeholder="Email" value={data.email} onChange={(e) => setData('email', e.target.value)} />
          </FormControl>
          <FormControl label="Password">
            <Input placeholder="Password" />
          </FormControl>
        </div>
        <SheetFooter>
          <Button>
            <Check />
            Simpan
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

export default LoginSetting;
