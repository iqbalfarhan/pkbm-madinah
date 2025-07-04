import FormControl from '@/components/form-control';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Textarea } from '@/components/ui/textarea';
import { Guru, Mapel, MapelGroup, SharedData, Tingkat } from '@/types';
import { useForm, usePage } from '@inertiajs/react';
import { Check, X } from 'lucide-react';
import { FC, PropsWithChildren } from 'react';
import { toast } from 'sonner';

type MapelFormSheetProps = PropsWithChildren & {
  mapel?: Mapel;
  purpose?: 'create' | 'edit' | 'duplicate';
};

const MapelFormSheet: FC<MapelFormSheetProps> = ({ children, mapel, purpose }) => {
  const props = usePage<SharedData>().props;
  const mapelGroups = (props.mapelGroups as MapelGroup[]) ?? [];
  const tingkats = (props.tingkats as Tingkat[]) ?? [];
  const gurus = (props.gurus as Guru[]) ?? [];

  const { data, setData, put, post, reset } = useForm({
    name: mapel?.name ?? '',
    description: mapel?.description ?? '',
    guru_id: mapel?.guru?.id ?? '',
    tingkat_id: mapel?.tingkat?.id ?? '',
    mapel_group_id: mapel?.mapel_group?.id ?? '',
  });

  const handleSubmit = () => {
    if (purpose === 'create') {
      post(route('mapel.store'), {
        preserveScroll: true,
        onSuccess: () => {
          toast.success('Berhasil menambahkan mata pelajaran');
          reset();
        },
        onError: (e) => {
          const m = Object.entries(e)
            .map(([, v]) => v)
            .join(', ');
          toast.error(m);
        },
      });
    } else if (purpose === 'edit') {
      put(route('mapel.update', mapel?.id), {
        preserveScroll: true,
        onSuccess: () => {
          toast.success('Berhasil menambahkan mata pelajaran');
        },
        onError: (e) => {
          const m = Object.entries(e)
            .map(([, v]) => v)
            .join(', ');
          toast.error(m);
        },
      });
    } else if (purpose === 'duplicate') {
      post(route('mapel.store'), {
        preserveScroll: true,
        onSuccess: () => {
          toast.success('Berhasil menambahkan mata pelajaran');
        },
        onError: (e) => {
          const m = Object.entries(e)
            .map(([, v]) => v)
            .join(', ');
          toast.error(m);
        },
      });
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="capitalize">{purpose} Sheet title</SheetTitle>
          <SheetDescription>Sheet description</SheetDescription>
        </SheetHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className="space-y-6 px-4"
        >
          <FormControl label="Nama mata pelajaran">
            <Input placeholder="Nama mata pelajaran" value={data.name} onChange={(e) => setData('name', e.target.value)} />
          </FormControl>
          <FormControl label="Description">
            <Textarea placeholder="Nama mata pelajaran" value={data.description} onChange={(e) => setData('description', e.target.value)} />
          </FormControl>
          <FormControl label="Group mata pelajaran">
            <Select value={data.mapel_group_id.toString()} onValueChange={(value) => setData('mapel_group_id', value)}>
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
            <Select value={data.tingkat_id.toString()} onValueChange={(value) => setData('tingkat_id', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Pilih tingkat / kelas" />
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
            <Select value={data.guru_id.toString()} onValueChange={(value) => setData('guru_id', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Pilih pengajar" />
              </SelectTrigger>
              <SelectContent>
                {gurus.map((guru) => (
                  <SelectItem key={guru.id} value={guru.id.toString()}>
                    <Avatar className="size-6">
                      <AvatarImage src={guru.avatar} />
                    </Avatar>
                    {guru.name}
                  </SelectItem>
                ))}
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

export default MapelFormSheet;
