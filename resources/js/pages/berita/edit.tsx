import FormControl from '@/components/form-control';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { Berita } from '@/types';
import { Link, useForm } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import { FC } from 'react';
import BeritaUploadMediaCard from './components/berita-upload-media-card';

type Props = {
  berita: Berita;
};

const EditBerita: FC<Props> = ({ berita }) => {
  const { data, setData, put } = useForm({
    judul: berita.judul ?? '',
    content: berita.content ?? '',
  });

  const handleUpdate = () => {
    put(route('berita.update', berita.id));
  };

  return (
    <AppLayout
      title="Edit berita"
      description="Edit berita"
      actions={
        <>
          <Button asChild variant={'secondary'}>
            <Link href={route('berita.show', berita.id)}>
              <ArrowLeft /> Kembali ke detail berita
            </Link>
          </Button>
        </>
      }
    >
      <div className="flex gap-6">
        <div className="flex-1">
          <Card>
            <CardHeader>
              <FormControl label="Judul artikel">
                <Input value={data.judul} onChange={(e) => setData('judul', e.target.value)} />
              </FormControl>
            </CardHeader>
            <Separator />
            <CardContent>
              <FormControl label="Tulis konten berita">
                <Textarea className="min-h-48" value={data.content} onChange={(e) => setData('content', e.target.value)} />
              </FormControl>
            </CardContent>
            <Separator />
            <CardFooter>
              <Button onClick={handleUpdate}>Simpan</Button>
            </CardFooter>
          </Card>
        </div>

        <div className="max-w-sm">
          <BeritaUploadMediaCard berita={berita} />
        </div>
      </div>
    </AppLayout>
  );
};

export default EditBerita;
