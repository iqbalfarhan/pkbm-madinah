import { SidebarProvider } from '@/components/ui/sidebar';
import { Toaster } from '@/components/ui/sonner';
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
        <div className="min-h-screen">{children}</div>
        <LandingFooter />
      </main>
      <Toaster />
    </SidebarProvider>
  );
};

export default WelcomeLayout;
