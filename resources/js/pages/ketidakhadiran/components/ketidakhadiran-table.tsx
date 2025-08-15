import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Ketidakhadiran } from '@/types';
import { Edit, Trash2 } from 'lucide-react';
import KetidakhadiranDeleteDialog from './ketidakhadiran-delete-dialog';
import KetidakhadiranEditSheet from './ketidakhadiran-edit-sheet';

type KetidakhadiranTableProps = {
  ketidakhadirans: Ketidakhadiran[];
};

const KetidakhadiranTable = ({ ketidakhadirans }: KetidakhadiranTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Tahun ajaran</TableHead>
          <TableHead>NISN</TableHead>
          <TableHead>Nama siswa</TableHead>
          <TableHead>Tanggal</TableHead>
          <TableHead>Alasan</TableHead>
          <TableHead>Keterangan</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {ketidakhadirans.map((absen) => (
          <TableRow key={absen.id}>
            <TableCell>{absen.tahunajaran?.label}</TableCell>
            <TableCell>{absen.siswa?.nisn}</TableCell>
            <TableCell>{absen.siswa?.name}</TableCell>
            <TableCell>{absen.date}</TableCell>
            <TableCell>
              <p className="max-w-sm text-wrap">{absen.reason}</p>
            </TableCell>
            <TableCell>
              <p className="max-w-sm text-wrap">{absen.description}</p>
            </TableCell>
            <TableCell>
              <KetidakhadiranEditSheet ketidakhadiran={absen}>
                <Button variant={'ghost'} size={'icon'}>
                  <Edit />
                </Button>
              </KetidakhadiranEditSheet>
              <KetidakhadiranDeleteDialog ketidakhadiran={absen}>
                <Button variant={'ghost'} size={'icon'}>
                  <Trash2 />
                </Button>
              </KetidakhadiranDeleteDialog>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default KetidakhadiranTable;
