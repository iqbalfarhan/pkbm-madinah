import { usePageProps } from '@/hooks/use-page-props';
import AppLogoIcon from './app-logo-icon';

export default function AppLogo() {
  const { name } = usePageProps();
  return (
    <>
      <div className="flex aspect-square size-8 items-center justify-center rounded-md text-sidebar-primary-foreground">
        <AppLogoIcon className="size-6 fill-current text-primary" />
      </div>
      <div className="ml-1 grid flex-1 text-left text-sm">
        <span className="mb-0.5 truncate leading-tight font-semibold">{name}</span>
      </div>
    </>
  );
}
