import FormControl from '@/components/form-control';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { usePageProps } from '@/hooks/use-page-props';
import { errorMessage } from '@/lib/utils';
import { Ekskul, Guru } from '@/types';
import { useForm } from '@inertiajs/react';
import { Check, X } from 'lucide-react';
import { FC, PropsWithChildren, useState } from 'react';
import { toast } from 'sonner';

type EkskulFormSheetProps = PropsWithChildren & {
  ekskul?: Ekskul;
  purpose: 'create' | 'edit';
};

const EkskulFormSheet: FC<EkskulFormSheetProps> = ({ children, ekskul, purpose }) => {
  const [open, setOpen] = useState(false);
  const { gurus } = usePageProps<{ gurus: Guru[] }>();

  const { data, setData, put, post, reset } = useForm({
    name: ekskul?.name,
    guru_id: ekskul?.guru?.id,
  });

  const handleSubmit = () => {
    if (purpose == 'create') {
      post(route('ekskul.store'), {
        preserveScroll: true,
        onSuccess: () => {
          toast.success('Ekstrakulikuler berhasil ditambahkan');
          reset();
          setOpen(false);
        },
        onError: (e) => toast.error(errorMessage(e)),
      });
    } else if (purpose == 'edit') {
      put(route('ekskul.update', ekskul?.id), {
        preserveScroll: true,
        onSuccess: () => {
          toast.success('Ekstrakulikuler berhasil diubah');
          setOpen(false);
        },
        onError: (e) => toast.error(errorMessage(e)),
      });
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
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
          <FormControl label="Nama ekstrakulikuler">
            <Input placeholder="Nama ekstrakulikuler" value={data.name} onChange={(e) => setData('name', e.target.value)} />
          </FormControl>
          <FormControl label="Pilih guru koordinator">
            <Select value={data.guru_id?.toString()} onValueChange={(value) => setData('guru_id', parseInt(value))}>
              <SelectTrigger>
                <SelectValue placeholder="Pilih guru" />
              </SelectTrigger>
              <SelectContent>
                {gurus.map((guru) => (
                  <SelectItem key={guru.id} value={guru.id.toString()}>
                    {guru.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>
        </form>
        <SheetFooter>
          <Button onClick={handleSubmit}>
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

export default EkskulFormSheet;
