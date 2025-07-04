import FormControl from '@/components/form-control';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Textarea } from '@/components/ui/textarea';
import { Guru } from '@/types';
import { useForm } from '@inertiajs/react';
import { Check, X } from 'lucide-react';
import { FC, PropsWithChildren } from 'react';
import { toast } from 'sonner';

type GuruFormSheetProps = PropsWithChildren & {
  guru?: Guru;
  purpose: 'create' | 'edit';
};

const GuruFormSheet: FC<GuruFormSheetProps> = ({ children, guru, purpose }) => {
  const { data, setData, put, post } = useForm({
    name: guru?.name ?? '',
    nip: guru?.nip ?? '',
    phone: guru?.phone ?? '',
    gender: guru?.gender ?? '',
    email: guru?.email ?? '',
    active: (guru?.active ?? true) as boolean,
    address: guru?.address ?? '',
  });

  const handleSubmit = () => {
    if (purpose === 'edit') {
      put(route('guru.update', guru?.id), {
        preserveScroll: true,
        onSuccess: () => {
          toast.success('Berhasil mengubah data guru');
        },
        onError: (e) => {
          const m = Object.entries(e)
            .map(([, v]) => v)
            .join(', ');
          toast.error(m);
        },
      });
    } else {
      post(route('guru.store'), {
        preserveScroll: true,
        onSuccess: () => {
          toast.success('Berhasil mengubah data guru');
        },
        onError: (e) => {
          const m = Object.entries(e)
            .map(([, v]) => v)
            .join(', ');
          toast.error(m);
        },
      });
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="capitalize">{purpose} tenaga pendidik</SheetTitle>
          <SheetDescription>Sheet description</SheetDescription>
        </SheetHeader>
        <ScrollArea className="overflow-auto">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
            className="space-y-6 px-5"
          >
            <FormControl label="Nama tenaga pendidik" required>
              <Input value={data.name} onChange={(e) => setData('name', e.target.value)} />
            </FormControl>
            <FormControl label="NIP">
              <Input value={data.nip} onChange={(e) => setData('nip', e.target.value)} />
            </FormControl>
            <FormControl label="Nomor telepon">
              <Input value={data.phone} onChange={(e) => setData('phone', e.target.value)} />
            </FormControl>
            <FormControl label="Jenis kelamin">
              <Select value={data.gender} onValueChange={(e) => setData('gender', e)}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih jenis kelamin" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Laki-laki">Laki-laki</SelectItem>
                  <SelectItem value="Perempuan">Perempuan</SelectItem>
                </SelectContent>
              </Select>
            </FormControl>
            <FormControl label="Status aktif">
              <Select value={data.active ? 'true' : 'false'} onValueChange={(e) => setData('active', e == 'true' ? true : false)}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih jenis kelamin" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="true">Aktif</SelectItem>
                  <SelectItem value="false">Tidak Aktif</SelectItem>
                </SelectContent>
              </Select>
            </FormControl>
            <FormControl label="Alamat email">
              <Input value={data.email} onChange={(e) => setData('email', e.target.value)} />
            </FormControl>
            <FormControl label="Alamat tempat tinggal">
              <Textarea value={data.address} onChange={(e) => setData('address', e.target.value)} />
            </FormControl>
          </form>
        </ScrollArea>
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

export default GuruFormSheet;
