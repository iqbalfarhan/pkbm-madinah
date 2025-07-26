import Heading from '@/components/heading';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { usePageProps } from '@/hooks/use-page-props';
import SectionContainer from '@/pages/welcome/components/section-container';
import WelcomeLayout from '@/pages/welcome/layouts/welcome-layout';
import { NavItem, SharedData, Siswa } from '@/types';
import { usePage } from '@inertiajs/react';
import { Info } from 'lucide-react';
import { FC, PropsWithChildren } from 'react';
import WizardTrigger from '../components/wizard-trigger';

type Props = PropsWithChildren & {
  active?: string;
  guide?: string;
};

const PpdbLayout: FC<Props> = ({ children, active = 'datadiri', guide }) => {
  const { auth } = usePageProps();
  const { siswa } = usePage<SharedData & { siswa: Siswa }>().props;

  const tabMenuList: NavItem[] = [
    {
      title: 'Buat akun orangtua',
      href: route('pendaftaran.akun'),
      key: 'akun',
    },
    {
      title: 'Datadiri siswa',
      href: siswa ? route('pendaftaran.edit', siswa?.id) : route('pendaftaran.create'),
      key: 'datadiri',
    },
    {
      title: 'Tempat tinggal',
      href: siswa && route('pendaftaran.alamat', siswa?.id),
      key: 'alamat',
    },
    {
      title: 'Orangtua wali',
      href: siswa && route('pendaftaran.orangtua', siswa?.id),
      key: 'orangtua',
    },
    {
      title: 'Sekolah sebelumnya',
      href: siswa && route('pendaftaran.sekolah', siswa?.id),
      key: 'sekolah',
    },
    {
      title: 'Dokumen pendukung',
      href: siswa && route('pendaftaran.berkas', siswa?.id),
      key: 'berkas',
    },
    {
      title: 'Upload bukti bayar',
      href: siswa && route('pendaftaran.buktibayar', siswa?.id),
      key: 'buktibayar',
    },
  ];

  return (
    <WelcomeLayout>
      <SectionContainer className="py-16">
        <Heading title="Pendaftaran siswa baru" description="lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum." />
        {/* <ScrollArea className="mb-6 flex w-full flex-row items-center justify-center gap-12 p-6"> */}
        <div className="flex w-full justify-center overflow-x-auto">
          <div className="mb-6 flex items-center justify-center gap-12 p-6">
            {tabMenuList.map((item, index) => {
              if (auth?.user && item.key === 'akun') return null;
              return <WizardTrigger key={item.key} item={item} number={index} active={active === item.key} />;
            })}
          </div>
        </div>

        <div className="flex flex-col gap-6 sm:flex-row">
          <div className="w-full max-w-3xl space-y-6">{children}</div>
          {guide && (
            <div className="flex-1">
              <Alert variant={'success'}>
                <Info />
                <AlertTitle>Panduang pengisian</AlertTitle>
                <AlertDescription>{guide}</AlertDescription>
              </Alert>
            </div>
          )}
        </div>
      </SectionContainer>
    </WelcomeLayout>
  );
};

export default PpdbLayout;
