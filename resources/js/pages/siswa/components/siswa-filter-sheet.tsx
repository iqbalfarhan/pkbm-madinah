import FormControl from '@/components/form-control';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { useIsMobile } from '@/hooks/use-mobile';
import { jenisKelaminLists, siswaStatusLists } from '@/lib/enums';
import { Kelas, SharedData } from '@/types';
import { router, useForm, usePage } from '@inertiajs/react';
import { CheckCheck, X } from 'lucide-react';
import { FC, PropsWithChildren, useState } from 'react';

type SiswaFilterSheetProps = PropsWithChildren & {
  query: {
    status?: string | undefined;
    kelas_id?: number | undefined;
    gender?: string | undefined;
    register_year?: number | undefined;
  };
};

const SiswaFilterSheet: FC<SiswaFilterSheetProps> = ({ children, query }) => {
  const [open, setOpen] = useState(false);
  const { props } = usePage<SharedData>();
  const kelases = props.kelases as Kelas[];
  const isMobile = useIsMobile();

  const { data, setData, get } = useForm({
    status: query.status ?? undefined,
    kelas_id: query.kelas_id ?? undefined,
    gender: query.gender ?? undefined,
    register_year: query.register_year ?? undefined,
  });

  const handleSubmit = () => {
    get(route('siswa.index'), {
      preserveState: true,
      onSuccess: () => {
        setOpen(false);
      },
    });
  };

  const handleResetFilter = () => {
    setData('status', undefined);
    setData('kelas_id', undefined);
    setData('gender', undefined);
    setData('register_year', undefined);

    router.get(
      route('siswa.index'),
      {
        status: undefined,
        kelas_id: undefined,
        gender: undefined,
        register_year: undefined,
      },
      { preserveState: true },
    );
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent side={isMobile ? 'bottom' : 'right'}>
        <SheetHeader>
          <SheetTitle>Filter data siswa</SheetTitle>
          <SheetDescription>Pencarian berdasarkan pengelompokan data</SheetDescription>
        </SheetHeader>
        <form className="space-y-6 px-4" method="get">
          <FormControl label="Status Siswa">
            <Select value={data.status ?? undefined} onValueChange={(value) => setData('status', value == 'all' ? undefined : value)}>
              <SelectTrigger>
                <SelectValue placeholder="Pilih status siswa" />
              </SelectTrigger>
              <SelectContent>
                {siswaStatusLists
                  .filter((stat) => stat !== 'ppdb')
                  .map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </FormControl>
          <FormControl label="Kelas">
            <Select value={data.kelas_id?.toString()} onValueChange={(value) => setData('kelas_id', value == 'all' ? undefined : parseInt(value))}>
              <SelectTrigger>
                <SelectValue placeholder="Pilih kelas siswa" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua kelas</SelectItem>
                {kelases.map((kelas) => (
                  <SelectItem key={kelas.id} value={kelas.id.toString()}>
                    {kelas.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>
          <FormControl label="Jenis kelamin">
            <Select value={data.gender?.toString()} onValueChange={(value) => setData('gender', value == 'all' ? undefined : value)}>
              <SelectTrigger>
                <SelectValue placeholder="Pilih jenis kelamin" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua gender</SelectItem>
                {jenisKelaminLists.map((jenisKelamin) => (
                  <SelectItem key={jenisKelamin} value={jenisKelamin}>
                    {jenisKelamin}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>
          <FormControl label="Tahun daftar">
            <Input type="number" value={data.register_year?.toString()} onInput={(e) => setData('register_year', parseInt(e.currentTarget.value))} />
          </FormControl>
        </form>
        <SheetFooter>
          <Button onClick={handleSubmit}>
            <CheckCheck />
            Terapkan filter
          </Button>
          <Button
            variant={'outline'}
            onClick={() => {
              handleResetFilter();
            }}
          >
            <X />
            Reset filter
          </Button>
          {/* <SheetClose asChild>
            <Button variant={'outline'}>
              <X />
              Batal
            </Button>
          </SheetClose> */}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default SiswaFilterSheet;
