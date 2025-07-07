import FormControl from '@/components/form-control';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { usePageProps } from '@/hooks/use-page-props';
import { jenisRaporsLists } from '@/lib/enums';
import { TahunAjaran } from '@/types';
import { router, useForm } from '@inertiajs/react';
import { Check, X } from 'lucide-react';
import { FC, PropsWithChildren } from 'react';

type RaporFilterSheetProps = PropsWithChildren;

const RaporFilterSheet: FC<RaporFilterSheetProps> = ({ children }) => {
  const props = usePageProps();
  const tahunajarans = props.tahunajarans as TahunAjaran[];

  const { data, setData, get } = useForm({
    tahunajaran_id: undefined as number | undefined,
    jenis: undefined as string | undefined,
  });

  const handleFilter = () => {
    get(route('rapor.index'), {
      preserveScroll: true,
      preserveState: true,
    });
  };

  const handleReset = () => {
    router.get(
      route('rapor.index'),
      {
        tahunajaran_id: undefined,
        jenis: undefined,
      },
      {
        preserveScroll: true,
        preserveState: true,
      },
    );
  };

  return (
    <Sheet>
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
            handleFilter();
          }}
        >
          <FormControl label="Tahun ajaran">
            <Select value={data.tahunajaran_id?.toString()} onValueChange={(value) => setData('tahunajaran_id', parseInt(value))}>
              <SelectTrigger>
                <SelectValue placeholder="Tahun ajaran" />
              </SelectTrigger>
              <SelectContent>
                {tahunajarans?.map((ta) => (
                  <SelectItem key={ta.id} value={ta.id.toString()}>
                    {ta.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>
          <FormControl label="Jenis rapor">
            <Select value={data.jenis} onValueChange={(value) => setData('jenis', value == 'all' ? undefined : value)}>
              <SelectTrigger>
                <SelectValue placeholder="Jenis rapor" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua</SelectItem>
                {jenisRaporsLists.map((jenis) => (
                  <SelectItem key={jenis} value={jenis}>
                    {jenis}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>
        </form>
        <SheetFooter>
          <Button onClick={handleFilter}>
            <Check />
            Terapkan filter
          </Button>
          <Button variant={'outline'} onClick={handleReset}>
            <X />
            Batal
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default RaporFilterSheet;
