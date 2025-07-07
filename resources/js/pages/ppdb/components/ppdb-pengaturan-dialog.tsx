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
import { useForm } from '@inertiajs/react';
import { X } from 'lucide-react';
import { FC, PropsWithChildren } from 'react';

type PpdbPengaturanDialogProps = PropsWithChildren;

const PpdbPengaturanDialog: FC<PpdbPengaturanDialogProps> = ({ children }) => {
  const { data, setData } = useForm({
    buka_sesi_ppdb: '',
    tahunajaran_id: '',
  });

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Dialog title</DialogTitle>
          <DialogDescription>Dialog description</DialogDescription>
        </DialogHeader>
        <div className="py-6">
          <FormControl label="Buka sesi ppdb">
            <Select value={data.buka_sesi_ppdb} onValueChange={(value) => setData('buka_sesi_ppdb', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Pilih status pembukaan PPDB" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="open">Buka</SelectItem>
                <SelectItem value="close">Tutup</SelectItem>
              </SelectContent>
            </Select>
          </FormControl>
          {data.buka_sesi_ppdb === 'open' && (
            <FormControl label="Tahun ajaran">
              <Select value={data.tahunajaran_id} onValueChange={(value) => setData('tahunajaran_id', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih tahun ajaran" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2023/2024">2023/2024</SelectItem>
                  <SelectItem value="2024/2025">2024/2025</SelectItem>
                </SelectContent>
              </Select>
            </FormControl>
          )}
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant={'outline'}>
              <X />
              Batal
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PpdbPengaturanDialog;
