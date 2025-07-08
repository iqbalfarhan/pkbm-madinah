import DatePicker from '@/components/date-picker';
import FormControl from '@/components/form-control';
import { Button } from '@/components/ui/button';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Textarea } from '@/components/ui/textarea';
import { errorMessage } from '@/lib/utils';
import { Ketidakhadiran } from '@/types';
import { useForm } from '@inertiajs/react';
import dayjs from 'dayjs';
import { Check, X } from 'lucide-react';
import { FC, PropsWithChildren, useState } from 'react';
import { toast } from 'sonner';

type KetidakhadiranEditSheetProps = PropsWithChildren & {
  ketidakhadiran: Ketidakhadiran;
};

const KetidakhadiranEditSheet: FC<KetidakhadiranEditSheetProps> = ({ children, ketidakhadiran }) => {
  const [open, setOpen] = useState(false);
  const { data, setData, put } = useForm({
    date: dayjs(ketidakhadiran.date).format('YYYY-MM-DD'),
    reason: ketidakhadiran.reason,
  });

  const handleUpdate = () => {
    put(route('ketidakhadiran.update', ketidakhadiran.id), {
      preserveScroll: true,
      onSuccess: () => {
        toast.success('Berhasil mengubah data ketidakhadiran');
        setOpen(false);
      },
      onError: (e) => toast.error(errorMessage(e)),
    });
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Sheet title</SheetTitle>
          <SheetDescription>Sheet description</SheetDescription>
        </SheetHeader>
        <form
          className="space-y-6 px-4"
          onSubmit={(e) => {
            e.preventDefault();
            handleUpdate();
          }}
        >
          <FormControl label="Tanggal">
            <DatePicker value={dayjs(data.date).toDate()} onValueChange={(date) => setData('date', dayjs(date).format('YYYY-MM-DD'))} />
          </FormControl>
          <FormControl label="Alasan">
            <Textarea value={data.reason} onChange={(e) => setData('reason', e.target.value)} />
          </FormControl>
        </form>
        <SheetFooter>
          <Button onClick={handleUpdate}>
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

export default KetidakhadiranEditSheet;
