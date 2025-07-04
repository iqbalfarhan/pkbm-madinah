export default function AppLogo() {
  return (
    <>
      <div className="flex aspect-square size-8 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground">
        {/* <AppLogoIcon className="size-5 fill-current text-white dark:text-black" /> */}
        <img src="/pkbm.png" alt="Laravel Starter Kit" className="size-5" />
      </div>
      <div className="ml-1 grid flex-1 text-left text-sm">
        <span className="mb-0.5 truncate leading-tight font-semibold">PKBM Al-Madinah</span>
      </div>
    </>
  );
}
