import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { Setting } from '@/types';
import { Edit } from 'lucide-react';
import { FC } from 'react';
import SettingFormSheet from './components/setting-form-sheet';

type SettingListProps = {
  settings: Setting[];
};

const SettingList: FC<SettingListProps> = ({ settings }) => {
  return (
    <AppLayout title="Pengaturan" description="Pengaturan sekolah">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Key</TableHead>
            <TableHead>Value</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {settings.map((setting) => (
            <TableRow>
              <TableCell>{setting.key}</TableCell>
              <TableCell>{setting.value}</TableCell>
              <TableCell>
                <SettingFormSheet purpose="edit" setting={setting}>
                  <Button variant={'ghost'} size={'icon'}>
                    <Edit />
                  </Button>
                </SettingFormSheet>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </AppLayout>
  );
};

export default SettingList;
