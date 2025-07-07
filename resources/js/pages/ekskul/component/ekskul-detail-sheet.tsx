import FormControl from '@/components/form-control';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Ekskul } from '@/types';
import { Info, X } from 'lucide-react';
import { FC, PropsWithChildren } from 'react';

type EkskulDetailSheetProps = PropsWithChildren & {
  ekskul: Ekskul;
};

const EkskulDetailSheet: FC<EkskulDetailSheetProps> = ({ children, ekskul }) => {
  const guru = ekskul?.guru;
  const siswas = ekskul?.siswas;
  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Detail Eskul</SheetTitle>
          <SheetDescription>{ekskul.name}</SheetDescription>
        </SheetHeader>
        <ScrollArea className="flex-1 overflow-auto">
          <div className="space-y-6 px-4">
            <FormControl label="Koordinator ekskul">
              <div className="flex items-center gap-2">
                <Avatar className="size-6">
                  <AvatarImage src={guru?.avatar} />
                </Avatar>
                {guru?.name}
              </div>
            </FormControl>
            <FormControl label="Anggota">
              {siswas.map((siswa) => (
                <div className="flex items-center gap-2 py-1">
                  <Avatar className="size-6">
                    <AvatarImage src={siswa?.avatar} />
                  </Avatar>
                  {siswa?.name}
                </div>
              ))}
            </FormControl>
          </div>
        </ScrollArea>

        <SheetFooter>
          <Alert>
            <Info />
            <AlertTitle>Menambahkan siswa</AlertTitle>
            <AlertDescription>Minta walikelas siswa untuk menambahkan siswa ke ekskul ini.</AlertDescription>
          </Alert>
          <SheetClose asChild>
            <Button variant={'outline'}>
              <X />
              Tutup
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default EkskulDetailSheet;
