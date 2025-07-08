import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { errorMessage } from '@/lib/utils';
import { Rapor } from '@/types';
import { router } from '@inertiajs/react';
import { Check, X } from 'lucide-react';
import { FC, PropsWithChildren } from 'react';
import { toast } from 'sonner';

type RaporPublishToggleProps = PropsWithChildren & {
  rapor: Rapor;
};

const RaporPublishToggle: FC<RaporPublishToggleProps> = ({ children, rapor }) => {
  const handlePublish = () => {
    router.put(
      route('rapor.update', rapor.id),
      {
        publish: !rapor.publish,
        siswa_id: rapor.siswa.id,
        tahunajaran_id: rapor.tahunajaran.id,
        jenis: rapor.jenis,
      },
      {
        preserveScroll: true,
        onSuccess: () => {
          toast.success('Rapor berhasil di publish');
        },
        onError: (e) => toast.error(errorMessage(e)),
      },
    );
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{rapor.publish ? 'Sembunyikan' : 'Publish'} rapor</AlertDialogTitle>
          <AlertDialogDescription>
            {rapor.publish
              ? 'Apakah anda yakin ingin menyembunyikan rapor ini? setelah disembunyikan, orang tua tidak dapat melihat rapor ini lagi sampai rapor dipublish kembali.'
              : 'Apakah anda yakin ingin mempublish rapor ini? setelah dipublis orang tua akan dapat melihat rapor ini.'}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <Button variant={'outline'}>
              <X />
              Batal
            </Button>
          </AlertDialogCancel>
          <AlertDialogAction onClick={handlePublish}>
            <Check />
            {rapor.publish ? 'Sembunyikan' : 'Publish'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default RaporPublishToggle;
