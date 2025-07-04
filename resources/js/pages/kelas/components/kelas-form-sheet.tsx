import FormControl from '@/components/form-control';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { errorMessage } from '@/lib/utils';
import TingkatListSheet from '@/pages/tingkat/components/tingkat-list-sheet';
import { Guru, Kelas, SharedData, Tingkat } from '@/types';
import { useForm, usePage } from '@inertiajs/react';
import { Check, X } from 'lucide-react';
import { FC, PropsWithChildren, useState } from 'react';
import { toast } from 'sonner';

type KelasFormSheetProps = PropsWithChildren & {
  kelas?: Kelas;
  purpose?: 'edit' | 'create';
};

const KelasFormSheet: FC<KelasFormSheetProps> = ({ children, kelas, purpose }) => {
  const [open, setOpen] = useState(false);
  const { data, setData, put, post, reset } = useForm({
    name: kelas?.name ?? '',
    tingkat_id: kelas?.tingkat?.id ?? '',
    guru_id: kelas?.walikelas?.id ?? '',
  });

  const props = usePage<SharedData>().props;
  const tingkats = (props.tingkats as Tingkat[]) ?? [];
  const gurus = (props.gurus as Guru[]) ?? [];

  const handleSubmit = () => {
    if (purpose === 'create') {
      post(route('kelas.store'), {
        preserveScroll: true,
        onSuccess: () => {
          toast.success('Kelas berhasil ditambahkan');
          setOpen(false);
          reset();
        },
        onError: (e) => {
          toast.error(errorMessage(e));
        },
      });
    } else if (purpose === 'edit') {
      put(route('kelas.update', kelas?.id), {
        preserveScroll: true,
        onSuccess: () => {
          toast.success('Kelas berhasil ditambahkan');
          setOpen(false);
        },
        onError: (e) => {
          toast.error(errorMessage(e));
        },
      });
    }

    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="capitalize">{purpose} data Kelas</SheetTitle>
          <SheetDescription>Kelas form sheet</SheetDescription>
        </SheetHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className="space-y-6 px-4"
        >
          <FormControl
            label="Tingkat kelas"
            action={
              <TingkatListSheet>
                <span className="text-xs underline">Atur data</span>
              </TingkatListSheet>
            }
          >
            <Select value={data.tingkat_id.toString()} onValueChange={(value) => setData('tingkat_id', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Pilih tingkat / kelas" />
              </SelectTrigger>
              <SelectContent>
                {tingkats.map((tingkat) => (
                  <SelectItem key={tingkat.id} value={tingkat.id.toString()}>
                    {tingkat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>
          <FormControl label="Nama kelas">
            <Input value={data.name} onChange={(e) => setData('name', e.target.value)} placeholder="Nama kelas" />
          </FormControl>
          <FormControl label="Walikelas">
            <Select value={data.guru_id.toString()} onValueChange={(value) => setData('guru_id', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Pilih walikelas" />
              </SelectTrigger>
              <SelectContent>
                {gurus.map((guru) => (
                  <SelectItem key={guru.id} value={guru.id.toString()}>
                    <Avatar className="size-6">
                      <AvatarImage src={guru.avatar} />
                    </Avatar>
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

export default KelasFormSheet;
