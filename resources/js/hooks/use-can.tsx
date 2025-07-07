import { usePageProps } from './use-page-props';

const useCan = (permission: string | string[]): boolean => {
  const { permissions } = usePageProps().auth;

  if (Array.isArray(permission)) {
    return permission.some((p) => permissions.includes(p));
  }

  return permissions.includes(permission);
};

export const enableToAccess = (permissions: string[], permission: string | string[]): boolean => {
  if (Array.isArray(permission)) {
    return permission.some((p) => permissions.includes(p));
  }
  return permissions.includes(permission);
};

export default useCan;
