import FormControl from '@/components/form-control';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { ArrowRight } from 'lucide-react';
import PpdbLayout from '../layout/ppdb-layout';

const BerkasTab = () => {
  return (
    <PpdbLayout active="berkas">
      <Card>
        <CardHeader>
          <CardTitle>Dokumen pendukung</CardTitle>
          <CardDescription>Mohon isi data ayah dan ibu secara lengkap.</CardDescription>
        </CardHeader>
        <Separator />
        <CardContent>
          <form className="grid grid-cols-2 gap-6">
            <FormControl label="Kartu keluarga" required>
              <Input type="file" />
            </FormControl>
            <FormControl label="Akta kelahiran" required>
              <Input type="file" />
            </FormControl>
          </form>
        </CardContent>
        <Separator />
        <CardFooter className="flex justify-end">
          <Button type="submit">
            Selanjutnya <ArrowRight className="ml-2" />
          </Button>
        </CardFooter>
      </Card>
    </PpdbLayout>
  );
};

export default BerkasTab;
