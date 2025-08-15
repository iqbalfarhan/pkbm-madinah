import FormControl from '@/components/form-control';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Textarea } from '@/components/ui/textarea';
import { capitalizeWords, errorMessage } from '@/lib/utils';
import { FormPurpose, Material, Pelajaran } from '@/types';
import { useForm } from '@inertiajs/react';
import { Check, X } from 'lucide-react';
import { FC, PropsWithChildren, useState } from 'react';
import { toast } from 'sonner';

type Props = PropsWithChildren & {
  material?: Material;
  pelajaran_id: Pelajaran['id'];
  purpose: FormPurpose;
};

const MaterialFormSheet: FC<Props> = ({ children, material, purpose, pelajaran_id }) => {
  const [open, setOpen] = useState(false);

  const { data, setData, put, post } = useForm({
    pelajaran_id: pelajaran_id,
    title: material?.title ?? '',
    description: material?.description ?? '',
    url: material?.url ?? '',
  });

  const handleSubmit = () => {
    if (purpose === 'create' || purpose === 'duplicate') {
      post(route('material.store'), {
        preserveScroll: true,
        onSuccess: () => {
          toast.success('Material created successfully');
          setData('title', '');
          setData('description', '');
          setData('url', '');
          setOpen(false);
        },
        onError: (e) => toast.error(errorMessage(e)),
      });
    } else {
      put(route('material.update', material?.id), {
        preserveScroll: true,
        onSuccess: () => {
          toast.success('Material updated successfully');
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
          <SheetTitle>{capitalizeWords(purpose)} data material</SheetTitle>
          <SheetDescription>Form untuk {purpose} data material</SheetDescription>
        </SheetHeader>
        <ScrollArea className="flex-1 overflow-y-auto">
          <form
            className="space-y-6 px-4"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <FormControl label="Judul materi" required>
              <Input type="text" placeholder="Judul materi" value={data.title} onChange={(e) => setData('title', e.target.value)} />
            </FormControl>
            <FormControl label="Deskripsi materi" required>
              <Textarea placeholder="Deskripsi materi" value={data.description} onChange={(e) => setData('description', e.target.value)} />
            </FormControl>
            <FormControl label="URL">
              <Input type="url" placeholder="Url slide google" value={data.url} onChange={(e) => setData('url', e.target.value)} />
            </FormControl>
          </form>
        </ScrollArea>
        <SheetFooter>
          <Button type="submit" onClick={handleSubmit}>
            <Check /> Simpan material
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

export default MaterialFormSheet;
