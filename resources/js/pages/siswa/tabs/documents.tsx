import HeadingSmall from '@/components/heading-small';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Media, Siswa } from '@/types';
import { Link } from '@inertiajs/react';
import { AlertCircle, Download, File, Trash2, Upload } from 'lucide-react';
import { FC } from 'react';
import { toast } from 'sonner';
import SiswaUploadDocument from '../components/siswa-upload-document';
import SiswaLayout from '../layout/siswa-layout';

type DocumentSiswaProps = {
  siswa: Siswa;
  documents: Media[];
};
const DocumentSiswa: FC<DocumentSiswaProps> = ({ siswa, documents }) => {
  const requiredDocs = ['akte kelahiran', 'kartu keluarga'];
  const uploadedDocs = documents.map((doc) => doc.collection_name);

  const isComplete = requiredDocs.every((req) => uploadedDocs.includes(req));
  return (
    <SiswaLayout siswa={siswa}>
      <HeadingSmall title="Dokumen pelengkap siswa" description="Dokumen pelengkap siswa" />

      {!isComplete && (
        <Alert variant={'destructive'}>
          <AlertCircle />
          <AlertDescription>Dokumen yang diupload belum lengkap.dokumen yang harus dilampirkan : akta kelahiran, kartu keluarga</AlertDescription>
        </Alert>
      )}

      <SiswaUploadDocument siswa={siswa}>
        <Button>
          <Upload />
          Upload Documents
        </Button>
      </SiswaUploadDocument>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Jenis file</TableHead>
            <TableHead>Nama file</TableHead>
            <TableHead>Tipe file</TableHead>
            <TableHead>Ukuran</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {documents.map((document) => (
            <TableRow key={document.id}>
              <TableCell>{document.collection_name}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Avatar className="size-6">
                    <AvatarImage src={document.preview_url} />
                    <AvatarFallback>
                      <File />
                    </AvatarFallback>
                  </Avatar>

                  {document.name}
                </div>
              </TableCell>
              <TableCell>
                <p className="line-clamp-1 max-w-48">{document.mime_type}</p>
              </TableCell>
              <TableCell>{document.size}</TableCell>
              <TableCell>
                <Button size={'icon'} variant={'ghost'}>
                  <a href={document.original_url} target="_blank">
                    <Download />
                  </a>
                </Button>
                <Button size={'icon'} variant={'ghost'}>
                  <Link
                    href={route('media.destroy', document.id)}
                    method="delete"
                    preserveScroll={true}
                    onSuccess={() => toast.success('Dokumen berhasil dihapus')}
                  >
                    <Trash2 />
                  </Link>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </SiswaLayout>
  );
};

export default DocumentSiswa;
