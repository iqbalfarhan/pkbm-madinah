import AppLayout from '@/layouts/app-layout';
import { SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import { FC, PropsWithChildren } from 'react';

type DashboardLayoutProps = PropsWithChildren;

const DashboardLayout: FC<DashboardLayoutProps> = ({ children }) => {
  const { auth } = usePage<SharedData>().props;
  const { user, role } = auth;

  return (
    <AppLayout title={`Selamat datang ${user.name}`} description={`Saat ini anda masuk sebagai ${role}`}>
      {children}
    </AppLayout>
  );
};

export default DashboardLayout;
