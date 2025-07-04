import FormControl from '@/components/form-control';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { groupTingkat } from '@/lib/enums';
import { Tingkat } from '@/types';
import { useForm } from '@inertiajs/react';
import { Check, X } from 'lucide-react';
import { FC, PropsWithChildren, useState } from 'react';
import { toast } from 'sonner';

type TingkatFormDialogProps = PropsWithChildren & {
  tingkat?: Tingkat;
  purpose: 'create' | 'edit';
};

const TingkatFormDialog: FC<TingkatFormDialogProps> = ({ children, tingkat, purpose }) => {
  const [open, setOpen] = useState(false);

  const { data, setData, post, put, reset } = useForm({
    name: tingkat?.name ?? '',
    group: tingkat?.group ?? 'TK',
  });

  const handleSubmit = () => {
    if (purpose === 'create') {
      post(route('tingkat.store'), {
        preserveScroll: true,
        onSuccess: () => {
          toast.success('Tingkat berhasil ditambahkan');
          reset();
          setOpen(false);
        },
        onError: (e) => {
          const m = Object.entries(e)
            .map(([, v]) => v)
            .join(', ');
          toast.success(m);
        },
      });
    } else {
      put(route('tingkat.update', tingkat?.id), {
        preserveScroll: true,
        onSuccess: () => {
          toast.success('Tingkat berhasil ditambahkan');
          setOpen(false);
        },
        onError: (e) => {
          const m = Object.entries(e)
            .map(([, v]) => v)
            .join(', ');
          toast.success(m);
        },
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="capitalize">{purpose} data tingkat kelas</DialogTitle>
          <DialogDescription>Dialog description</DialogDescription>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className="space-y-6 py-4"
        >
          <FormControl label="Group">
            <Select value={data.group?.toString()} onValueChange={(e) => setData('group', e)}>
              <SelectTrigger>
                <SelectValue placeholder="Pilih group tingkat" />
              </SelectTrigger>
              <SelectContent>
                {groupTingkat.map((group) => (
                  <SelectItem key={group} value={group}>
                    {group}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>
          <FormControl label="Nama tingkat">
            <Input type="text" placeholder="Nama tingkat" value={data.name} onChange={(e) => setData('name', e.target.value)} />
          </FormControl>
        </form>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant={'outline'}>
              <X />
              Batal
            </Button>
          </DialogClose>
          <Button type="submit" onClick={handleSubmit}>
            <Check />
            Simpan
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TingkatFormDialog;
