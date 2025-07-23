import FormControl from '@/components/form-control';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { errorMessage } from '@/lib/utils';
import { Setting } from '@/types';
import { useForm } from '@inertiajs/react';
import { Check, X } from 'lucide-react';
import { FC, PropsWithChildren, useState } from 'react';
import { toast } from 'sonner';

type SettingFormSheetProps = PropsWithChildren & {
  setting?: Setting;
  purpose: 'create' | 'edit';
};

const SettingFormSheet: FC<SettingFormSheetProps> = ({ children, setting, purpose }) => {
  const [open, setOpen] = useState(false);

  const { data, setData, put, post } = useForm({
    key: setting?.key,
    value: setting?.value,
  });

  const handleUpdate = () => {
    if (purpose === 'create') {
      post(route('settings.store'), {
        preserveScroll: true,
        onSuccess: () => toast.success('Berhasil menambahkan data'),
        onError: (e) => toast.error(errorMessage(e)),
      });
    } else if (purpose === 'edit') {
      put(route('settings.update', setting?.id), {
        preserveScroll: true,
        onSuccess: () => toast.success('Berhasil mengupdate data'),
        onError: (e) => toast.error(errorMessage(e)),
      });
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{purpose} data setting</SheetTitle>
          <SheetDescription>sheet form untuk setting</SheetDescription>
        </SheetHeader>
        <ScrollArea className="flex-1 overflow-auto">
          <form
            className="space-y-6 px-4"
            onSubmit={(e) => {
              e.preventDefault();
              handleUpdate();
            }}
          >
            <FormControl label="Setting name">
              <Input type="text" value={data.key} onChange={(e) => setData('key', e.target.value)} />
            </FormControl>
            <FormControl label="Value">
              <Input type="text" value={data.value} onChange={(e) => setData('value', e.target.value)} />
            </FormControl>
          </form>
        </ScrollArea>
        <SheetFooter>
          <Button onClick={handleUpdate}>
            <Check />
            Simpan data
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

export default SettingFormSheet;
