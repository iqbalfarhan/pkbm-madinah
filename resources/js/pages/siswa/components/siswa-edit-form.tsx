import FormControl from '@/components/form-control';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Textarea } from '@/components/ui/textarea';
import { jenisKelaminLists } from '@/lib/enums';
import { errorMessage } from '@/lib/utils';
import { Gender, Kelas, SharedData, Siswa } from '@/types';
import { useForm, usePage } from '@inertiajs/react';
import { Check, X } from 'lucide-react';
import { FC, PropsWithChildren, useState } from 'react';
import { toast } from 'sonner';

type SiswaEditFormProps = PropsWithChildren & {
  siswa: Siswa;
};

const SiswaEditForm: FC<SiswaEditFormProps> = ({ children, siswa }) => {
  const props = usePage<SharedData>().props;
  const [open, setOpen] = useState(false);
  const kelases = (props.kelases as Kelas[]) ?? [];

  const { data, setData, put } = useForm({
    name: siswa.name,
    nisn: siswa.nisn,
    phone: siswa.phone,
    email: siswa.email,
    address: siswa.address,
    gender: siswa.gender ?? 'Laki-laki',
    kelas_id: (siswa.kelas?.id ?? null) as number | null,
  });

  const handleSubmit = () => {
    put(route('siswa.update', siswa.id), {
      onSuccess: () => {
        toast.success('Berhasil memperbarui data siswa');
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
          <SheetTitle>Edit info siswa</SheetTitle>
          <SheetDescription>Edit informasi siswa</SheetDescription>
        </SheetHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className="space-y-6 px-4"
        >
          <FormControl label="Nama siswa">
            <Input value={data.name} onChange={(e) => setData('name', e.target.value)} />
          </FormControl>
          <FormControl label="NISN">
            <Input value={data.nisn} onChange={(e) => setData('nisn', e.target.value)} />
          </FormControl>
          <FormControl label="Kelas">
            <Select value={data.kelas_id?.toString()} onValueChange={(value) => setData('kelas_id', parseInt(value))}>
              <SelectTrigger>
                <SelectValue placeholder="Pilih kelas" />
              </SelectTrigger>
              <SelectContent>
                {kelases.map((kelas) => (
                  <SelectItem key={kelas.id} value={kelas.id.toString()}>
                    {kelas.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>
          <FormControl label="Jenis kelamin">
            <Select value={data.gender} onValueChange={(value) => setData('gender', value as Gender)}>
              <SelectTrigger>
                <SelectValue placeholder="Pilih jenis kelamin" />
              </SelectTrigger>
              <SelectContent>
                {jenisKelaminLists.map((gender) => (
                  <SelectItem key={gender} value={gender}>
                    {gender}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>
          <FormControl label="Nomor telepon">
            <Input value={data.phone} onChange={(e) => setData('phone', e.target.value)} />
          </FormControl>
          <FormControl label="Alamat email">
            <Input type="email" value={data.email} onChange={(e) => setData('email', e.target.value)} />
          </FormControl>
          <FormControl label="Alamat tempat tinggal">
            <Textarea value={data.address} onChange={(e) => setData('address', e.target.value)} />
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

export default SiswaEditForm;
