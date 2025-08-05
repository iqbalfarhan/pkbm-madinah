import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { enableToAccess } from '@/hooks/use-can';
import { usePageProps } from '@/hooks/use-page-props';
import { cn } from '@/lib/utils';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';

type NavMainProps = {
  items?: NavItem[];
  label?: string;
  className?: string;
  showIf?: boolean;
};

export function NavMain({ items = [], label, className, showIf }: NavMainProps) {
  const { permissions } = usePageProps().auth;

  if (showIf === false) return null;

  const listedPermissions = items.map((item) => item.permission_name).filter((p): p is string => !!p);

  const hasPermission =
    listedPermissions.length === 0 || // semua item gak ada permission
    listedPermissions.some((p) => permissions.includes(p));
  if (!hasPermission) return null;

  return (
    <SidebarGroup className={cn(className)}>
      {label && <SidebarGroupLabel>{label}</SidebarGroupLabel>}
      <SidebarMenu>
        {items.map((item) => {
          const can = item.permission_name && enableToAccess(permissions, item.permission_name);

          if (!can) return null;
          return (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild isActive={item.isActive} tooltip={{ children: item.title }}>
                <Link href={item.href} preserveScroll={true}>
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
