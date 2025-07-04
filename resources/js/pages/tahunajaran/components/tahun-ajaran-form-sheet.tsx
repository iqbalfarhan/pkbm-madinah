import FormControl from '@/components/form-control';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { generateSlug } from '@/lib/utils';
import { TahunAjaran } from '@/types';
import { useForm } from '@inertiajs/react';
import dayjs from 'dayjs';
import { Check, X } from 'lucide-react';
import { FC, PropsWithChildren, useEffect, useState } from 'react';
import { toast } from 'sonner';

type TahunAjaranFormSheetProps = PropsWithChildren & {
  ta?: TahunAjaran;
  purpose: 'edit' | 'create' | 'duplicate';
};

const TahunAjaranFormSheet: FC<TahunAjaranFormSheetProps> = ({ children, ta, purpose }) => {
  const [open, setOpen] = useState(false);
  const [slug, setSlug] = useState('');

  const defaultTahunAjaran = dayjs().format('YYYY') + '/' + dayjs().add(1, 'year').format('YYYY');
  const { data, setData, put, post, reset } = useForm({
    name: ta?.name ?? defaultTahunAjaran,
    semester: ta?.semester ?? 'ganjil',
    slug: ta?.slug ?? slug,
  });

  useEffect(() => {
    if (data.name && data.semester) {
      const generated = generateSlug(data.name, data.semester);
      setSlug(generated);
      setData('slug', generated);
    }
  }, [data.name, data.semester, setData]);

  const handleSubmit = () => {
    if (purpose === 'edit') {
      put(route('tahunajaran.update', ta?.id), {
        preserveScroll: true,
        onSuccess: () => {
          toast.success('Berhasil memperbarui tahun ajaran');
          setOpen(false);
        },
        onError: (e) => {
          const m = Object.entries(e)
            .map(([, v]) => v)
            .join('\n');
          toast.error(m);
        },
      });
    } else if (purpose === 'create') {
      post(route('tahunajaran.store'), {
        preserveScroll: true,
        onSuccess: () => {
          toast.success('Berhasil memperbarui tahun ajaran');
          setOpen(false);
          reset();
        },
        onError: (e) => {
          const m = Object.entries(e)
            .map(([, v]) => v)
            .join('\n');
          toast.error(m);
        },
      });
    } else if (purpose === 'duplicate') {
      post(route('tahunajaran.store'), {
        preserveScroll: true,
        onSuccess: () => {
          toast.success('Berhasil memperbarui tahun ajaran');
          setOpen(false);
          reset();
        },
        onError: (e) => {
          const m = Object.entries(e)
            .map(([, v]) => v)
            .join('\n');
          toast.error(m);
        },
      });
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="capitalize">{purpose} tahun ajaran</SheetTitle>
          <SheetDescription>Form create tahun ajaran</SheetDescription>
        </SheetHeader>
        <form
          className="flex flex-1 flex-col space-y-6 px-4"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <FormControl label="Tahun ajaran">
            <Input placeholder="contoh : 2023/2024" value={data.name} onChange={(e) => setData('name', e.target.value)} />
          </FormControl>
          <FormControl label="Semester">
            <Select value={data.semester} onValueChange={(value) => setData('semester', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Pilih semester" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ganjil">Ganjil</SelectItem>
                <SelectItem value="genap">Genap</SelectItem>
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

export default TahunAjaranFormSheet;
