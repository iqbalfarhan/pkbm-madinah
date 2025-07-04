import { Badge } from '@/components/ui/badge';
import { SiswaStatus } from '@/types';

const statusVariantMap: Record<string, 'default' | 'success' | 'secondary' | 'destructive' | 'outline'> = {
  aktif: 'default',
  lulus: 'success',
  pindah: 'secondary',
  dikeluarkan: 'destructive',
  ppdb: 'outline',
};

const SiswaStatusBadge = ({ status }: { status: SiswaStatus | 'ppdb' }) => {
  const variant = statusVariantMap[status as string] ?? 'outline';

  return <Badge variant={variant}>{status}</Badge>;
};

export default SiswaStatusBadge;
