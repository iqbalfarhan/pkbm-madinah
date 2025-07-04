import FormControl from '@/components/form-control';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Guru, MapelGroup, SharedData, Tingkat } from '@/types';
import { usePage } from '@inertiajs/react';
import { Check, X } from 'lucide-react';
import { FC, PropsWithChildren } from 'react';

type MapelFilterSheetProps = PropsWithChildren & {
  data: string;
};

const MapelFilterSheet: FC<MapelFilterSheetProps> = ({ children }) => {
  const props = usePage<SharedData>().props;
  const mapelGroups = props.mapelGroups as MapelGroup[];
  const gurus = props.gurus as Guru[];
  const tingkats = props.tingkats as Tingkat[];

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Sheet title</SheetTitle>
          <SheetDescription>Sheet description</SheetDescription>
        </SheetHeader>
        <div className="space-y-6 px-4">
          <FormControl label="Group mata pelajaran">
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Filter data" />
              </SelectTrigger>
              <SelectContent>
                {mapelGroups.map((mapelGroup) => (
                  <SelectItem key={mapelGroup.id} value={mapelGroup.id.toString()}>
                    {mapelGroup.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>
          <FormControl label="Tingkat kelas">
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Filter data" />
              </SelectTrigger>
              <SelectContent>
                {tingkats.map((tingkat) => (
                  <SelectItem key={tingkat.id} value={tingkat.id.toString()}>
                    {tingkat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>
          <FormControl label="Pengajar">
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Filter data" />
              </SelectTrigger>
              <SelectContent>
                {gurus.map((guru) => (
                  <SelectItem key={guru.id} value={guru.id.toString()}>
                    <Avatar className="size-6">
                      <AvatarImage src={guru.avatar} alt={guru.name} />
                    </Avatar>
                    {guru.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>
        </div>
        <SheetFooter>
          <Button>
            <Check />
            Terapkan
          </Button>
          <SheetClose asChild>
            <Button variant={'outline'}>
              <X />
              Reset
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default MapelFilterSheet;
