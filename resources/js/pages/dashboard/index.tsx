import { usePageProps } from '@/hooks/use-page-props';
import DashboardLayout from './layout/dashboard-layout';

const DashboardIndex = () => {
  const { auth } = usePageProps();
  const { permissions, roles } = auth;
  return (
    <DashboardLayout>
      <pre>{JSON.stringify(roles, null, 2)}</pre>
      <pre>{JSON.stringify(permissions, null, 2)}</pre>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos, cupiditate quibusdam. Modi quisquam repellendus placeat, nesciunt
      expedita, corporis ad omnis iure ut mollitia sequi asperiores impedit harum tempore porro voluptate!
    </DashboardLayout>
  );
};

export default DashboardIndex;
