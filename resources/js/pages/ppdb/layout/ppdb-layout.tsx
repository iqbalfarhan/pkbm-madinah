import Heading from '@/components/heading';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import WelcomeLayout from '@/pages/welcome/layouts/welcome-layout';
import { NavItem } from '@/types';
import { Info } from 'lucide-react';
import { FC, PropsWithChildren } from 'react';
import WizardTrigger from '../components/wizard-trigger';

type Props = PropsWithChildren & {
  active?: string;
  guide?: string;
};

const PpdbLayout: FC<Props> = ({ children, active = 'datadiri', guide }) => {
  const tabMenuList: NavItem[] = [
    {
      title: 'Datadiri siswa',
      href: route('pendaftaran.create'),
      key: 'datadiri',
    },
    {
      title: 'Tempat tinggal',
      href: route('pendaftaran.alamat', 2),
      key: 'alamat',
    },
    {
      title: 'Orangtua wali',
      href: route('pendaftaran.orangtua', 2),
      key: 'orangtua',
    },
    {
      title: 'Sekolah sebelumnya',
      href: route('pendaftaran.sekolah', 2),
      key: 'sekolah',
    },
    {
      title: 'Dokumen pendukung',
      href: route('pendaftaran.berkas', 2),
      key: 'berkas',
    },
    {
      title: 'Pembuatan akun',
      href: route('pendaftaran.berkas', 2),
      key: 'akun',
    },
  ];

  return (
    <WelcomeLayout>
      <Heading
        title="Selamat Datang di PPDB Online PKBM AL-MADINAH BALIKPAPAN"
        description="lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum."
      />
      <div className="mb-6 flex items-center justify-center gap-12 p-6">
        {tabMenuList.map((item, index) => (
          <WizardTrigger key={item.key} item={item} number={index + 1} active={active === item.key} />
        ))}
      </div>
      <div className="flex gap-6">
        <div className="w-full max-w-3xl">{children}</div>
        {guide && (
          <div className="flex-1">
            <Alert>
              <Info />
              <AlertTitle>Panduang pengisian</AlertTitle>
              <AlertDescription>{guide}</AlertDescription>
            </Alert>
          </div>
        )}
      </div>
    </WelcomeLayout>
  );
};

export default PpdbLayout;
