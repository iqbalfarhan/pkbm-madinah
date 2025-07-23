import { SidebarProvider } from '@/components/ui/sidebar';
import { Head } from '@inertiajs/react';
import { FC, PropsWithChildren } from 'react';
import GuestSidebar from '../components/guest-sidebar';
import LandingFooter from '../components/landing-footer';
import WelcomeNavMenu from '../components/welcome-nav-menu';

type Props = PropsWithChildren;

const WelcomeLayout: FC<Props> = ({ children }) => {
  return (
    <SidebarProvider defaultOpen={false}>
      <GuestSidebar />
      <main className="min-h-screen w-full">
        <Head title="PPDB Online" />
        <WelcomeNavMenu />
        <div className="mx-auto min-h-screen w-full max-w-6xl space-y-6 px-6 py-20">{children}</div>
        <LandingFooter />
      </main>
    </SidebarProvider>
  );
};

export default WelcomeLayout;
