import { SharedData } from '@/types';
import { usePage } from '@inertiajs/react';

export function usePageProps<T extends Partial<SharedData> = SharedData>() {
  const { props } = usePage<T>();
  return props;
}
