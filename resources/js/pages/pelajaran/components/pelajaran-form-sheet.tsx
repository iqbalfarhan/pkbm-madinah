import FormControl from '@/components/form-control';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { capitalizeWords, errorMessage } from '@/lib/utils';
import { FormPurpose, Guru, Kelas, Mapel, Pelajaran } from '@/types';
import { useForm, usePage } from '@inertiajs/react';
import { Check, X } from 'lucide-react';
import { FC, PropsWithChildren, useState } from 'react';
import { toast } from 'sonner';

type Props = PropsWithChildren & {
  kelas: Kelas;
  pelajaran?: Pelajaran;
  purpose: FormPurpose;
};

const PelajaranFormSheet: FC<Props> = ({ children, pelajaran, purpose, kelas }) => {
  const { mapels, gurus } = usePage<{
    mapels: Mapel[];
    gurus: Guru[];
  }>().props;

  const [open, setOpen] = useState(false);

  const { data, setData, put, post, reset } = useForm({
    mapel_id: pelajaran?.mapel_id ?? '',
    guru_id: pelajaran?.guru_id ?? '',
    kelas_id: kelas.id,
  });

  const handleSubmit = () => {
    if (purpose === 'create' || purpose === 'duplicate') {
      post(route('pelajaran.store'), {
        preserveScroll: true,
        onSuccess: () => {
          toast.success('Pelajaran created successfully');
          reset();
          setOpen(false);
        },
        onError: (e) => toast.error(errorMessage(e)),
      });
    } else {
      put(route('pelajaran.update', pelajaran?.id), {
        preserveScroll: true,
        onSuccess: () => {
          toast.success('Pelajaran updated successfully');
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
          <SheetTitle>{capitalizeWords(purpose)} data pelajaran</SheetTitle>
          <SheetDescription>Form untuk {purpose} data pelajaran</SheetDescription>
        </SheetHeader>
        <ScrollArea className="flex-1 overflow-y-auto">
          <form
            className="space-y-6 px-4"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <FormControl label="Nama pelajaran">
              <Select value={data.mapel_id.toString()} onValueChange={(value) => setData('mapel_id', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih pelajaran" />
                </SelectTrigger>
                <SelectContent>
                  {mapels.map((mapel) => (
                    <SelectItem key={mapel.id} value={mapel.id.toString()}>
                      {mapel.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
            <FormControl label="Guru">
              <Select value={data.guru_id.toString()} onValueChange={(value) => setData('guru_id', value)}>
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
        </ScrollArea>
        <SheetFooter>
          <Button type="submit" onClick={handleSubmit}>
            <Check /> Simpan pelajaran
          </Button>
          <SheetClose asChild>
            <Button variant={'outline'}>
              <X /> Batalin
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default PelajaranFormSheet;
