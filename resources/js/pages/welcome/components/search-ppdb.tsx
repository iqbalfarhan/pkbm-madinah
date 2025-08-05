import FormControl from '@/components/form-control';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { errorMessage, maskName } from '@/lib/utils';
import { Siswa } from '@/types';
import { useForm } from '@inertiajs/react';
import axios from 'axios';
import { Search, X } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

const SearchPpdb = () => {
  const [siswa, setSiswa] = useState<Siswa | null>(null);
  const { data, setData, errors } = useForm({
    value: '',
  });

  const handleSearch = async () => {
    await axios
      .post('/search-ppdb', data)
      .then((r) => setSiswa(r.data))
      .catch((e) => toast.error(errorMessage(e.response?.data.errors || {})));
  };

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch();
        }}
        className="mx-auto flex max-w-lg flex-col items-center gap-2 px-6 md:flex-row"
      >
        <Input placeholder="Cari NISN / Nomor peserta" value={data.value} onChange={(e) => setData('value', e.target.value)} error={!!errors.value} />
        <Button onClick={handleSearch} variant={'secondary'}>
          <Search />
          Cari di PPDB
        </Button>
      </form>

      <Dialog open={!!siswa} onOpenChange={() => setSiswa(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Hasil Pencarian</DialogTitle>
            <DialogDescription>{siswa ? `Ditemukan siswa dengan ID: ${siswa.id}` : 'Siswa tidak ditemukan.'}</DialogDescription>
          </DialogHeader>
          <Card>
            <CardContent className="space-y-4">
              {siswa && (
                <>
                  <FormControl label="Nama siswa">{maskName(siswa.name.toUpperCase())}</FormControl>
                  <FormControl label="NISN">{siswa.nisn}</FormControl>
                  <FormControl label="Status pendaftaran">{siswa.status}</FormControl>
                </>
              )}
            </CardContent>
          </Card>
          <DialogFooter>
            <DialogClose asChild>
              <Button>
                <X />
                Tutup
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SearchPpdb;
