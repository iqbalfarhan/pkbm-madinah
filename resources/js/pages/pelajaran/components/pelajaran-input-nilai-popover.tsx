import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { errorMessage } from '@/lib/utils';
import { Nilai, Pelajaran, Siswa } from '@/types';
import { router } from '@inertiajs/react';
import { FC, useEffect, useState } from 'react';
import { toast } from 'sonner';

type Props = {
  nilai?: Nilai;
  jenis: 'tugas' | 'evaluasi';
  pelajaran_id?: Pelajaran['id'];
  siswa_id?: Siswa['id'];
};

const PelajaranInputNilaiPopover: FC<Props> = ({ nilai, jenis, siswa_id, pelajaran_id }) => {
  const [initData, setInitData] = useState({
    pelajaran_id: nilai?.pelajaran_id ?? pelajaran_id,
    siswa_id: nilai?.siswa_id ?? siswa_id,
    nilai_tugas: nilai?.nilai_tugas ?? 0,
    nilai_evaluasi: nilai?.nilai_evaluasi ?? 0,
  });

  useEffect(() => {
    setInitData({
      pelajaran_id: nilai?.pelajaran_id ?? pelajaran_id,
      siswa_id: nilai?.siswa_id ?? siswa_id,
      nilai_tugas: nilai?.nilai_tugas ?? 0,
      nilai_evaluasi: nilai?.nilai_evaluasi ?? 0,
    });
  }, [nilai, pelajaran_id, siswa_id]);

  const handleSubmit = () => {
    if (nilai) {
      router.put(
        route('nilai.update', nilai.id),
        {
          ...initData,
          ...(jenis === 'tugas'
            ? {
                nilai_tugas: initData.nilai_tugas,
              }
            : { nilai_evaluasi: initData.nilai_evaluasi }),
        },
        {
          preserveScroll: true,
          onSuccess: () => {
            toast.success('Nilai berhasil diubah');
          },
          onError: (e) => {
            toast.error(errorMessage(e));
          },
        },
      );
    } else {
      router.post(
        route('nilai.store'),
        {
          ...initData,
          ...(jenis === 'tugas' ? { nilai_tugas: initData.nilai_tugas } : { nilai_evaluasi: initData.nilai_evaluasi }),
        },
        {
          preserveScroll: true,
          onSuccess: () => {
            toast.success('Nilai berhasil diubah');
          },
          onError: (e) => {
            toast.error(errorMessage(e));
          },
        },
      );
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant={'ghost'} size={'icon'}>
          {jenis === 'tugas' ? (nilai?.nilai_tugas ?? 0) : (nilai?.nilai_evaluasi ?? '0')}
        </Button>
      </PopoverTrigger>
      <PopoverContent side="bottom" align="start" className="w-32">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          {jenis === 'tugas' ? (
            <Input
              className="text-center"
              type="number"
              step={0.01}
              value={initData.nilai_tugas}
              onChange={(e) => setInitData({ ...initData, nilai_tugas: e.target.value == '' ? 0 : Number(e.target.value) })}
            />
          ) : null}
          {jenis === 'evaluasi' ? (
            <Input
              className="text-center"
              type="number"
              step={0.01}
              value={initData.nilai_evaluasi}
              onChange={(e) => setInitData({ ...initData, nilai_evaluasi: e.target.value == '' ? 0 : Number(e.target.value) })}
            />
          ) : null}
        </form>
      </PopoverContent>
    </Popover>
  );
};

export default PelajaranInputNilaiPopover;
