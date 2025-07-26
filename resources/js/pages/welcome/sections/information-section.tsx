import Heading from '@/components/heading';
import ChildrenSvg from '@/components/svgs/children-svg';
import FormSvg from '@/components/svgs/form-svg';
import SectionContainer from '../components/section-container';

const InformationSection = () => {
  return (
    <SectionContainer>
      <div className="grid gap-20 space-y-12 py-20 text-lg md:grid-cols-2">
        <div className="flex w-full flex-col items-center justify-center">
          <div className="w-full">
            <Heading title="Informasi PPDB Online" description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab, autem." />
          </div>
          <p>
            PKBM AL-MADINAH BALIKPAPAN menyediakan PPDB secara online diharapkan proses PPDB dapat berjalan cepat dan bisa dilakukan dimanapun dan
            kapanpun selama sesi PPDB Online dibuka. Proses pendaftaran calon siswa baru bisa mengakses website PPDB Online PKBM AL-MADINAH
            BALIKPAPAN.
          </p>
        </div>
        <ChildrenSvg className="aspect-video w-full" />
        <FormSvg className="aspect-video w-full" />
        <div className="flex w-full flex-col items-center justify-center">
          <div className="w-full">
            <Heading title="Informasi PPDB Online" description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab, autem." />
          </div>
          <p>
            Pengisian form PPDB Online mohon diperhatikan data yang dibutuhkan yang nantinya akan dipakai dalam proses PPDB. Setelah proses pengisian
            form PPDB secara online berhasil dilakukan, calon siswa akan mendapat bukti daftar dengan nomor pendaftaran dan harus disimpan yang akan
            digunakan untuk proses selanjutnya.
          </p>
        </div>
      </div>
    </SectionContainer>
  );
};

export default InformationSection;
