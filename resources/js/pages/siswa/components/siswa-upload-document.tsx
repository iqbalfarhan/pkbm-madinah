import FormControl from '@/components/form-control';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { errorMessage } from '@/lib/utils';
import { Siswa } from '@/types';
import { useForm } from '@inertiajs/react';
import { Upload, X } from 'lucide-react';
import { FC, PropsWithChildren, useState } from 'react';
import { toast } from 'sonner';

type SiswaUploadDocumentProps = PropsWithChildren & {
  siswa: Siswa;
};

const SiswaUploadDocument: FC<SiswaUploadDocumentProps> = ({ children, siswa }) => {
  const [open, setOpen] = useState(false);
  const { data, setData, post, reset } = useForm({
    name: '',
    file: undefined as File | undefined,
  });

  const handleSubmit = () => {
    post(route('siswa.storeDocument', siswa.id), {
      preserveScroll: true,
      onSuccess: () => {
        toast.success('Document berhasil diupload');
        reset();
        setOpen(false);
      },
      onError: (e) => {
        toast.error(errorMessage(e));
      },
    });
  };
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Upload dokumen siswa</SheetTitle>
          <SheetDescription>Tipe file yang diterima adalah pdf dan file gambar</SheetDescription>
        </SheetHeader>
        <form onSubmit={(e) => (e.preventDefault(), handleSubmit())} className="space-y-6 px-4">
          <FormControl label="Nama file">
            <Select value={data.name} onValueChange={(value) => setData('name', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Pilih peruntukan upload" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="kartu keluarga">Kartu keluarga</SelectItem>
                <SelectItem value="akte kelahiran">Akte kelahiran</SelectItem>
              </SelectContent>
            </Select>
          </FormControl>
          <FormControl label="Pilih file">
            <Input type="file" onChange={(e) => setData('file', e.target.files?.[0])} />
          </FormControl>
        </form>
        <SheetFooter>
          <Button type="submit" onClick={handleSubmit}>
            <Upload />
            Upload dokumen
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

export default SiswaUploadDocument;
