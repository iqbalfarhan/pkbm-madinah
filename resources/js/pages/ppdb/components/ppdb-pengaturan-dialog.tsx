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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { usePageProps } from '@/hooks/use-page-props';
import { errorMessage } from '@/lib/utils';
import TahunAjaranFormSheet from '@/pages/tahunajaran/components/tahun-ajaran-form-sheet';
import { TahunAjaran } from '@/types';
import { useForm } from '@inertiajs/react';
import { Check, X } from 'lucide-react';
import { FC, PropsWithChildren, useState } from 'react';
import { toast } from 'sonner';

type PpdbPengaturanDialogProps = PropsWithChildren;

const PpdbPengaturanDialog: FC<PpdbPengaturanDialogProps> = ({ children }) => {
  const [open, setOpen] = useState(false);

  const { settings, active_ta, tahunajarans } = usePageProps();

  const tas = tahunajarans as TahunAjaran[];

  const { data, setData, post } = useForm({
    PPDB_OPEN: settings['PPDB_OPEN'] ?? 'false',
    PPDB_TAHUNAJARAN_ID: active_ta?.id,
  });

  const handleUpdateSetting = () => {
    post(route('ppdb.setting'), {
      preserveScroll: true,
      onSuccess: () => {
        toast.success('Pengaturan berhasil diubah');
        setOpen(false);
      },
      onError: (e) => toast.error(errorMessage(e)),
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Pengaturan PPDB</DialogTitle>
          <DialogDescription>Buka atau tutup sesi pendaftaran</DialogDescription>
        </DialogHeader>
        <form
          className="space-y-4 py-6"
          onSubmit={(e) => {
            e.preventDefault();
            handleUpdateSetting();
          }}
        >
          <FormControl label="Buka sesi ppdb">
            <Select value={data.PPDB_OPEN} onValueChange={(value) => setData('PPDB_OPEN', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Pilih status pembukaan PPDB" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="true">Buka</SelectItem>
                <SelectItem value="false">Tutup</SelectItem>
              </SelectContent>
            </Select>
          </FormControl>
          <FormControl
            label="Tahun ajaran"
            action={
              <TahunAjaranFormSheet purpose="create">
                <span className="text-xs underline">Pengaturan TA</span>
              </TahunAjaranFormSheet>
            }
          >
            <Select value={data.PPDB_TAHUNAJARAN_ID?.toString()} onValueChange={(value) => setData('PPDB_TAHUNAJARAN_ID', parseInt(value))}>
              <SelectTrigger>
                <SelectValue placeholder="Pilih tahun ajaran" />
              </SelectTrigger>
              <SelectContent>
                {tas.map((tahunajaran) => (
                  <SelectItem key={tahunajaran.id} value={tahunajaran.id.toString()}>
                    {tahunajaran.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>
        </form>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant={'outline'}>
              <X />
              Batal
            </Button>
          </DialogClose>
          <Button onClick={handleUpdateSetting}>
            <Check />
            Simpan
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PpdbPengaturanDialog;
