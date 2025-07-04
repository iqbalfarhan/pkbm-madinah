import FormControl from '@/components/form-control';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
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
import { jenisRaporsLists } from '@/lib/enums';
import { errorMessage } from '@/lib/utils';
import SiswaItemCard from '@/pages/siswa/components/siswa-item-card';
import { SharedData, Siswa, TahunAjaran } from '@/types';
import { useForm, usePage } from '@inertiajs/react';
import { ArrowRight, X } from 'lucide-react';
import { FC, PropsWithChildren } from 'react';
import { toast } from 'sonner';

type RaporCreateDialogProps = PropsWithChildren & {
  siswa?: Siswa;
  tahunajaran?: TahunAjaran;
  jenisrapor?: string;
};

const RaporCreateDialog: FC<RaporCreateDialogProps> = ({ children, siswa, tahunajaran, jenisrapor }) => {
  const props = usePage<SharedData>().props;

  const siswas = (props.siswas as Siswa[]) ?? [];
  const tahunajarans = props.tahunajarans as TahunAjaran[];
  const ta = props.tahun_ajaran as TahunAjaran;

  const { data, setData, post, reset } = useForm({
    siswa_id: siswa?.id ?? '',
    tahunajaran_id: tahunajaran?.id ?? ta?.id,
    jenis: jenisrapor ?? '',
  });

  const handleCreateRapor = () => {
    post(route('rapor.store'), {
      preserveScroll: true,
      onSuccess: () => {
        toast.success('Berhasil membuat rapor');
        reset();
      },
      onError: (e) => toast.error(errorMessage(e)),
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Dialog title</DialogTitle>
          <DialogDescription>Dialog description</DialogDescription>
        </DialogHeader>
        <form
          className="space-y-6 py-4"
          onSubmit={(e) => {
            e.preventDefault();
            handleCreateRapor();
          }}
        >
          {siswa ? (
            <SiswaItemCard siswa={siswa} />
          ) : (
            <FormControl label="Pilih siswa">
              <Select value={data.siswa_id.toString()} onValueChange={(value) => setData('siswa_id', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih siswa" />
                </SelectTrigger>
                <SelectContent>
                  {siswas?.map((siswa) => (
                    <SelectItem key={siswa.id} value={siswa.id.toString()} className="flex items-start gap-2 py-2">
                      <Avatar className="size-6">
                        <AvatarImage src={siswa.avatar} />
                      </Avatar>
                      <div className="flex flex-col items-start">
                        <p>{siswa.name}</p>
                        <p className="text-xs text-muted-foreground">{siswa.nisn}</p>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
          )}
          <FormControl label="Pilih Tahun ajaran">
            <Select value={data.tahunajaran_id?.toString()} onValueChange={(value) => setData('tahunajaran_id', parseInt(value))}>
              <SelectTrigger>
                <SelectValue placeholder="Pilih jenis rapor" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={'null'}></SelectItem>
                {tahunajarans?.map((ta) => (
                  <SelectItem key={ta.id} value={ta.id.toString()}>
                    {ta.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>
          <FormControl label="Pilih Jenis rapor">
            <Select value={data.jenis} onValueChange={(value) => setData('jenis', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Pilih jenis rapor" />
              </SelectTrigger>
              <SelectContent>
                {jenisRaporsLists?.map((jenisrapor) => (
                  <SelectItem key={jenisrapor} value={jenisrapor}>
                    {jenisrapor}
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
          <Button onClick={handleCreateRapor}>
            Selanjutnya
            <ArrowRight />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RaporCreateDialog;
