import FormControl from '@/components/form-control';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Siswa } from '@/types';
import { FC } from 'react';

type SiswaHeadingCardProps = {
  siswa: Siswa;
  className?: string;
};

const SiswaHeadingCard: FC<SiswaHeadingCardProps> = ({ siswa, className }) => {
  return (
    <Card className={cn(className)}>
      <CardContent>
        <div className="flex flex-col items-center gap-6 md:flex-row">
          <div>
            <Avatar className="size-24 place-self-center rounded md:size-32">
              <AvatarImage src={siswa.avatar} alt={siswa.name} />
            </Avatar>
          </div>
          <div className="grid flex-1 grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <FormControl label="Nama siswa">
              <p>{siswa.name}</p>
            </FormControl>
            <FormControl label="Nomor induk siswa">
              <p>{siswa.nisn}</p>
            </FormControl>
            <FormControl label="Nomor telepon">
              <p>{siswa.phone}</p>
            </FormControl>
            <FormControl label="Jenis kelamin">
              <p>{siswa.gender}</p>
            </FormControl>
            <FormControl label="Alamat email">
              <p>{siswa.email}</p>
            </FormControl>
            <FormControl label="Status aktif">
              <p>{siswa.status}</p>
            </FormControl>
            <FormControl label="Tempat, Tanggal lahir">
              <p>{siswa.ttl}</p>
            </FormControl>
            <FormControl label="Kelas">
              <p>{siswa.kelas_label ?? ''}</p>
            </FormControl>
            <FormControl label="Alamat tempat tinggal" className="sm:col-span-full">
              <p>{siswa.address}</p>
            </FormControl>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SiswaHeadingCard;
