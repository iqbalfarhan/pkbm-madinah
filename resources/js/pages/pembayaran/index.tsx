import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { dateDFYHis, formatRupiah, strLimit } from '@/lib/utils';
import { Pembayaran } from '@/types';
import { Link } from '@inertiajs/react';
import { Edit, Filter, Folder, Plus, Trash2 } from 'lucide-react';
import { FC, useState } from 'react';
import PembayaranDeleteDialog from './components/pembayaran-delete-dialog';
import PembayaranFilterSheet from './components/pembayaran-filter-sheet';
import PembayaranFormSheet from './components/pembayaran-form-sheet';

type Props = {
  pembayarans: Pembayaran[];
};

const PembayaranList: FC<Props> = ({ pembayarans }) => {
  const [ids, setIds] = useState<number[]>([]);
  const [cari, setCari] = useState('');
  const [paid, setPaid] = useState('all');

  return (
    <AppLayout
      title="Pembayarans"
      description="Manage your pembayarans"
      actions={
        <PembayaranFormSheet purpose="create">
          <Button>
            <Plus />
            Create new pembayaran
          </Button>
        </PembayaranFormSheet>
      }
    >
      <div className="flex gap-2">
        <Input placeholder="Search pembayarans..." value={cari} onChange={(e) => setCari(e.target.value)} />
        <Select value={paid} onValueChange={(e) => setPaid(e)}>
          <SelectTrigger className="w-80">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua</SelectItem>
            <SelectItem value="paid">Paid</SelectItem>
            <SelectItem value="unpaid">Unpaid</SelectItem>
          </SelectContent>
        </Select>
        <PembayaranFilterSheet>
          <Button>
            <Filter />
            Filter data
          </Button>
        </PembayaranFilterSheet>
        {ids.length > 0 && (
          <>
            <Button variant={'ghost'} disabled>
              {ids.length} item selected
            </Button>
            <Button>
              <Edit /> Edit selected
            </Button>
            <Button variant={'destructive'}>
              <Trash2 /> Delete selected
            </Button>
          </>
        )}
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <Button variant={'ghost'} size={'icon'} asChild>
                <Label>
                  <Checkbox
                    checked={ids.length === pembayarans.length}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setIds(pembayarans.map((pembayaran) => pembayaran.id));
                      } else {
                        setIds([]);
                      }
                    }}
                  />
                </Label>
              </Button>
            </TableHead>
            <TableHead>Kode</TableHead>
            <TableHead>Nama siswa</TableHead>
            <TableHead>Keterangan</TableHead>
            <TableHead>Nominal</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Tanggal bayar</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pembayarans
            .filter((pembayaran) => JSON.stringify(pembayaran).toLowerCase().includes(cari.toLowerCase()))
            .filter((pembayaran) => paid === 'all' || (paid === 'paid' && pembayaran.paid) || (paid === 'unpaid' && !pembayaran.paid))
            .map((pembayaran) => (
              <TableRow key={pembayaran.id}>
                <TableCell>
                  <Button variant={'ghost'} size={'icon'} asChild>
                    <Label>
                      <Checkbox
                        checked={ids.includes(pembayaran.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setIds([...ids, pembayaran.id]);
                          } else {
                            setIds(ids.filter((id) => id !== pembayaran.id));
                          }
                        }}
                      />
                    </Label>
                  </Button>
                </TableCell>
                <TableCell>{pembayaran.code}</TableCell>
                <TableCell>{pembayaran.siswa.name}</TableCell>
                <TableCell>{strLimit(pembayaran.keterangan)}</TableCell>
                <TableCell className="text-right font-mono">{formatRupiah(pembayaran.nominal)}</TableCell>
                <TableCell>{pembayaran.paid ? <Badge>Paid</Badge> : <Badge variant={'outline'}>Unpaid</Badge>}</TableCell>
                <TableCell>{pembayaran.paid_at && dateDFYHis(pembayaran.paid_at)}</TableCell>
                <TableCell>
                  <Button variant={'ghost'} size={'icon'}>
                    <Link href={route('pembayaran.show', pembayaran.id)}>
                      <Folder />
                    </Link>
                  </Button>
                  <PembayaranFormSheet purpose="edit" pembayaran={pembayaran}>
                    <Button variant={'ghost'} size={'icon'}>
                      <Edit />
                    </Button>
                  </PembayaranFormSheet>
                  <PembayaranDeleteDialog pembayaran={pembayaran}>
                    <Button variant={'ghost'} size={'icon'}>
                      <Trash2 />
                    </Button>
                  </PembayaranDeleteDialog>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </AppLayout>
  );
};

export default PembayaranList;
