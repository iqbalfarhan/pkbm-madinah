import FormControl from '@/components/form-control';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { errorMessage } from '@/lib/utils';
import { Kelas, SharedData } from '@/types';
import { useForm, usePage } from '@inertiajs/react';
import { Check, X } from 'lucide-react';
import { FC, PropsWithChildren, useEffect } from 'react';
import { toast } from 'sonner';

type SiswaBulkEditProps = PropsWithChildren & {
  siswaIds?: number[];
  onSuccess?: () => void;
};

const SiswaBulkEdit: FC<SiswaBulkEditProps> = ({ children, siswaIds, onSuccess }) => {
  const { data, setData, put } = useForm({
    siswa_ids: siswaIds,
    kelas_id: undefined as number | undefined,
    status: undefined as string | undefined,
  });

  const props = usePage<SharedData>().props;
  const kelases = props.kelases as Kelas[];

  useEffect(() => {
    setData('siswa_ids', siswaIds ?? []);
  }, [siswaIds, setData]);

  const handleSubmit = () => {
    put(route('siswa.bulk-update'), {
      preserveScroll: true,
      onSuccess: () => {
        toast.success('Berhasil mengubah peran siswa');
        onSuccess?.();
      },
      onError: (errors) => {
        const m = errorMessage(errors);
        toast.error(m);
      },
    });
  };

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Multi edit data siswa</SheetTitle>
          <SheetDescription>Mengubah status dan kelas siswa secara bersamaan</SheetDescription>
        </SheetHeader>
        <form
          className="space-y-6 px-4"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <FormControl label="Ganti kelas siswa ke">
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
          <FormControl label="Ganti status siswa">
            <Select value={data.status?.toString()} onValueChange={(value) => setData('status', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Pilih status siswa" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="aktif">Aktif</SelectItem>
                <SelectItem value="lulus">Sudah lulus</SelectItem>
                <SelectItem value="pindah">Pindah</SelectItem>
                <SelectItem value="dikeluarkan">Dikeluarkan</SelectItem>
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

export default SiswaBulkEdit;
