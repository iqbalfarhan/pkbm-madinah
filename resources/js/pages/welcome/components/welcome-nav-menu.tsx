import AppLogo from '@/components/app-logo';
import ThemeToggler from '@/components/theme-toggler';
import { Button } from '@/components/ui/button';
import { Card, CardFooter } from '@/components/ui/card';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { guestMenuList } from './menu-list';

const WelcomeNavMenu = () => {
  const { auth, ppdb_open } = usePage<SharedData>().props;
  return (
    <>
      <Card className="sticky top-0 z-10 rounded-none border-0">
        <CardFooter>
          <div className="flex w-full items-center justify-between">
            <div className="flex gap-5">
              <SidebarTrigger className="flex md:hidden" />
              <Link href={route('home')} prefetch className="flex items-center">
                <AppLogo />
              </Link>
            </div>

            <div className="hidden items-center md:flex">
              {guestMenuList.map((menu, index) => (
                <Button variant={'ghost'} key={index} asChild>
                  <Link href={menu.href}>{menu.title}</Link>
                </Button>
              ))}

              <Button variant={'ghost'} disabled children="|" />

              {auth.user ? (
                <Button variant={'ghost'} asChild>
                  <Link href={route('login')}>Dashboard</Link>
                </Button>
              ) : (
                <>
                  <Button variant={'ghost'} asChild>
                    <Link href={route('login')}>Masuk</Link>
                  </Button>
                  {ppdb_open == 'true' && (
                    <Button variant={'ghost'} asChild>
                      <Link href={route('register')}>Daftar</Link>
                    </Button>
                  )}
                </>
              )}
            </div>
            <ThemeToggler />
          </div>
        </CardFooter>
      </Card>
    </>
  );
};

export default WelcomeNavMenu;
