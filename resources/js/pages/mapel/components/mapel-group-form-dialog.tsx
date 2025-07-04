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
import { MapelGroup } from '@/types';
import { useForm } from '@inertiajs/react';
import { Check, X } from 'lucide-react';
import { FC, PropsWithChildren, useState } from 'react';
import { toast } from 'sonner';

type MapelGroupFormDialogProps = PropsWithChildren & {
  mapelGroup?: MapelGroup;
  purpose: 'create' | 'edit';
};

const MapelGroupFormDialog: FC<MapelGroupFormDialogProps> = ({ children, mapelGroup, purpose }) => {
  const { data, setData, post, put, reset } = useForm({
    name: mapelGroup?.name ?? '',
  });

  const [show, setShow] = useState(false);

  const handleSubmit = () => {
    if (purpose === 'create') {
      post(route('mapelgroup.store'), {
        onSuccess: () => {
          toast.success('Berhasil menambahkan group mapel');
          reset();
        },
      });
    } else {
      put(route('mapelgroup.update', mapelGroup?.id), {
        onSuccess: () => {
          toast.success('Berhasil mengubah group mapel');
        },
      });
    }

    setShow(false);
  };

  return (
    <Dialog open={show} onOpenChange={setShow}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="capitalize">{purpose} Group mapel</DialogTitle>
          <DialogDescription>Dialog description</DialogDescription>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <FormControl label="Nama group">
            <Input value={data.name} onChange={(e) => setData('name', e.target.value)} />
          </FormControl>
        </form>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant={'outline'}>
              <X />
              Batal
            </Button>
          </DialogClose>
          <Button onClick={handleSubmit}>
            <Check />
            Simpan
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MapelGroupFormDialog;
