import FormControl from '@/components/form-control';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Textarea } from '@/components/ui/textarea';
import { capitalizeWords, errorMessage } from '@/lib/utils';
import { Berita, FormPurpose } from '@/types';
import { useForm } from '@inertiajs/react';
import { Check, X } from 'lucide-react';
import { FC, PropsWithChildren, useState } from 'react';
import { toast } from 'sonner';

type Props = PropsWithChildren & {
  berita?: Berita;
  purpose: FormPurpose;
};

const BeritaFormSheet: FC<Props> = ({ children, berita, purpose }) => {
  const [open, setOpen] = useState(false);

  const { data, setData, put, post, reset } = useForm({
    judul: berita?.judul ?? '',
    content: berita?.content ?? '',
  });

  const handleSubmit = () => {
    if (purpose === 'create' || purpose === 'duplicate') {
      post(route('berita.store'), {
        preserveScroll: true,
        onSuccess: () => {
          toast.success('Berita created successfully');
          reset();
          setOpen(false);
        },
        onError: (e) => toast.error(errorMessage(e)),
      });
    } else {
      put(route('berita.update', berita?.id), {
        preserveScroll: true,
        onSuccess: () => {
          toast.success('Berita updated successfully');
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
          <SheetTitle>{capitalizeWords(purpose)} data berita</SheetTitle>
          <SheetDescription>Form untuk {purpose} data berita</SheetDescription>
        </SheetHeader>
        <ScrollArea className="flex-1 overflow-y-auto">
          <form
            className="space-y-6 px-4"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <FormControl label="Nama berita">
              <Input type="text" placeholder="Name" value={data.judul} onChange={(e) => setData('judul', e.target.value)} />
            </FormControl>
            <FormControl label="Nama berita">
              <Textarea placeholder="Content berita" value={data.content} onChange={(e) => setData('content', e.target.value)} />
            </FormControl>
          </form>
        </ScrollArea>
        <SheetFooter>
          <Button type="submit" onClick={handleSubmit}>
            <Check /> Simpan berita
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

export default BeritaFormSheet;
