import FormControl from '@/components/form-control';
import MarkdownReader from '@/components/MarkdownReader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { Berita } from '@/types';
import { Upload } from 'lucide-react';
import { FC, useState } from 'react';

type Props = {
  berita: Berita;
};

const ShowBerita: FC<Props> = ({ berita }) => {
  const [gambar, setGambar] = useState<File | undefined>(undefined);

  return (
    <AppLayout title="Detail Berita" description="Detail berita">
      <div className="flex gap-6">
        <div className="flex-1">
          <Card>
            <CardHeader>
              <CardTitle>{berita.judul}</CardTitle>
              <CardDescription>
                <MarkdownReader value={berita.content} />
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
        <div className="w-full max-w-sm">
          <Card className="h-fit">
            <CardHeader>
              <CardTitle>Upload thumbnail</CardTitle>
              <CardDescription>Pilih file gambar berita, maksimal 2MB dengan format .jpg, .jpeg, .png</CardDescription>
            </CardHeader>
            <CardContent>
              <FormControl label="Pilih file">
                <Input type="file" accept="image/*" onChange={(e) => setGambar(e.target.files?.[0])} />
                {gambar && <img src={URL.createObjectURL(gambar)} alt="thumbnail" className="h-full w-full object-cover" />}
              </FormControl>
            </CardContent>
            <CardFooter>
              <Button>
                <Upload />
                Upload file
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default ShowBerita;
