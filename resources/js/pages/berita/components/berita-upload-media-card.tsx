import FormControl from '@/components/form-control';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { errorMessage } from '@/lib/utils';
import { Berita, Media } from '@/types';
import { router, useForm } from '@inertiajs/react';
import { Upload } from 'lucide-react';
import { FC } from 'react';
import { toast } from 'sonner';

type Props = {
  berita: Berita;
};

const BeritaUploadMediaCard: FC<Props> = ({ berita }) => {
  const { data, setData, post, processing } = useForm({
    file: undefined as File | undefined,
  });

  const handleUploadMedia = () => {
    post(route('berita.upload-media', berita.id), {
      preserveScroll: true,
      onSuccess: () => {
        toast.success('new media uploaded');
        setData('file', undefined);
      },
      onError: (e) => toast.error(errorMessage(e)),
    });
  };

  const handleDeleteMedia = (id: Media['id']) => {
    router.delete(route('media.destroy', id), {
      preserveScroll: true,
      onSuccess: () => {
        toast.success('Media deleted successfully');
      },
      onError: (e) => toast.error(errorMessage(e)),
    });
  };

  return (
    <form
      action=""
      onSubmit={(e) => {
        e.preventDefault();
        handleUploadMedia();
      }}
    >
      <Card className="h-fit">
        <CardHeader>
          <CardTitle>Upload thumbnail</CardTitle>
          <CardDescription>Pilih file gambar berita, maksimal 2MB dengan format .jpg, .jpeg, .png</CardDescription>
        </CardHeader>
        <CardContent>
          <FormControl label="Pilih file">
            <Input type="file" accept="image/*" onChange={(e) => setData('file', e.target.files?.[0])} />
            {data.file && <img src={URL.createObjectURL(data.file)} alt="thumbnail" className="h-full w-full object-cover" />}
          </FormControl>
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={processing || !data.file}>
            <Upload />
            Upload file
          </Button>
        </CardFooter>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-3 gap-1">
            {berita.media?.map((m, index) => (
              <img key={index} src={m.original_url} className="aspect-square w-full object-cover" onDoubleClick={() => handleDeleteMedia(m.id)} />
            ))}
          </div>
          <CardDescription>{berita.media?.length} media yang diupload. double click untuk menghapus</CardDescription>
        </CardContent>
      </Card>
    </form>
  );
};

export default BeritaUploadMediaCard;
