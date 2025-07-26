import Heading from '@/components/heading';
import SectionContainer from './components/section-container';
import WelcomeLayout from './layouts/welcome-layout';

const SyaratPendaftaran = () => {
  return (
    <WelcomeLayout>
      <SectionContainer className="py-16 md:py-24">
        <Heading title="Syarat Pendaftaran" description="Syarat Pendaftaran Peserta Didik Baru" />

        <article className="prose min-w-full">
          <p>
            Untuk mengikuti proses Penerimaan Peserta Didik Baru (PPDB) secara online, calon peserta didik diwajibkan mengunggah dokumen-dokumen
            berikut melalui sistem PPDB:
          </p>
          <ol>
            <li>Photocopy Kartu Keluarga</li>
            <li>Photocopy Akta Kelahiran</li>
            <li>Photocopy Raport Terakhir</li>
            <li>Photocopy KIP,PKH (Jika ada)</li>
            <li>Photocopy Surat Keterangan Lulus atau Ijazah (Jika sudah ada)</li>
          </ol>

          <h3>Ketentuan Tambahan: </h3>
          <p>
            Semua dokumen wajib berformat JPG/PNG atau PDF dan ukuran file maksimal 2MB per dokumen. Pastikan dokumen terlihat jelas, tidak blur atau
            gelap, agar bisa diverifikasi dengan mudah oleh panitia. Gunakan email aktif dan nomor WhatsApp yang valid saat pendaftaran, karena
            seluruh informasi akan dikirimkan via online. Batas akhir unggah dokumen akan diinformasikan lewat sistem dan media sosial sekolah.
          </p>

          <p>Kalau ada kendala waktu upload, kamu bisa hubungi admin PPDB lewat kontak yang tersedia di sistem atau WA resmi sekolah.</p>
        </article>
      </SectionContainer>
    </WelcomeLayout>
  );
};

export default SyaratPendaftaran;
