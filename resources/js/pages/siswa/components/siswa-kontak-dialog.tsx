import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Siswa } from '@/types';
import { PropsWithChildren } from 'react';

type Props = PropsWithChildren & { siswa: Siswa };

const SiswaKontakDialog = ({ children, siswa }: Props) => {
  const ortu = siswa.orangtua;
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Kontak orangtua</DialogTitle>
          <DialogDescription>Kontak orangtua siswa</DialogDescription>
        </DialogHeader>
        <DialogHeader>
          <DialogTitle>{siswa.name}</DialogTitle>
          <DialogDescription>
            {siswa.phone} | {siswa.address}
          </DialogDescription>
        </DialogHeader>
        <DialogHeader>
          <DialogTitle>{ortu?.father_name}</DialogTitle>
          <DialogDescription>
            {ortu?.father_phone} | {ortu?.father_address}
          </DialogDescription>
        </DialogHeader>
        <DialogHeader>
          <DialogTitle>{ortu?.mother_name}</DialogTitle>
          <DialogDescription>
            {ortu?.mother_phone} | {ortu?.mother_address}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default SiswaKontakDialog;
