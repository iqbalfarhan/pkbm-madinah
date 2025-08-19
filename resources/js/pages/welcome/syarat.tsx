import { useAppearance } from '@/hooks/use-appearance';
import { cn } from '@/lib/utils';
import SectionContainer from './components/section-container';
import WelcomeLayout from './layouts/welcome-layout';

const SyaratPendaftaran = () => {
  const { appearance } = useAppearance();
  return (
    <WelcomeLayout>
      <SectionContainer className="py-10" title="Syarat Pendaftaran" description="Syarat Pendaftaran Peserta Didik Baru">
        <article className={cn('prose min-w-full', appearance != 'light' && 'prose-invert')}>
          <p>
            Untuk mengikuti proses Penerimaan Peserta Didik Baru (PPDB) secara online, calon peserta didik diwajibkan mengunggah dokumen-dokumen
            berikut melalui sistem PPDB:
          </p>
          <ol>
            <li>Photocopy Kartu Keluarga</li>
            <li>Photocopy Akta Kelahiran</li>
            <li>Photocopy Raport Terakhir (Jika ada)</li>
          </ol>

          <h3>Ketentuan Tambahan: </h3>
          <p>
            Semua dokumen wajib berformat JPG/PNG atau PDF dan ukuran file maksimal 2MB per dokumen. Pastikan dokumen terlihat jelas, tidak blur atau
            gelap, agar bisa diverifikasi dengan mudah oleh panitia. Gunakan email aktif dan nomor WhatsApp yang valid saat pendaftaran, karena
            seluruh informasi akan dikirimkan via online. Batas akhir unggah dokumen akan diinformasikan lewat sistem dan media sosial sekolah.
          </p>

          <p>
            Jika ada kendala saat melakukan upload dokumen, anda bisa hubungi admin PPDB lewat kontak yang tersedia di sistem atau WA resmi sekolah.
          </p>
        </article>
      </SectionContainer>
    </WelcomeLayout>
  );
};

export default SyaratPendaftaran;
