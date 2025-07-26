'use client';

import FormControl from '@/components/form-control';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { addressData } from '@/lib/enums';
import { errorMessage } from '@/lib/utils';
import { Siswa } from '@/types';
import { router } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';
import { FC, useState } from 'react';
import { toast } from 'sonner';
import PpdbLayout from '../layout/ppdb-layout';

type Props = {
  siswa: Siswa;
};

const AlamatTab: FC<Props> = ({ siswa }) => {
  const [provinsi, setProvinsi] = useState('Kalimantan Timur');
  const [kabupaten, setKabupaten] = useState('Balikpapan');
  const [kecamatan, setKecamatan] = useState('');
  const [kelurahan, setKelurahan] = useState('');
  const [kodepos, setKodepos] = useState('');
  const [jalan, setJalan] = useState('');
  const [rt, setRt] = useState('');
  const [rw, setRw] = useState('');

  const provinsiList = [...new Set(addressData.map((item) => item.provinsi))];
  const kabupatenList = [...new Set(addressData.filter((item) => item.provinsi === provinsi).map((item) => item.kabupaten))];
  const kecamatanList = [...new Set(addressData.filter((item) => item.kabupaten === kabupaten).map((item) => item.kecamatan))];
  const kelurahanList = [...new Set(addressData.filter((item) => item.kecamatan === kecamatan).map((item) => item.kelurahan))];

  const handleKelurahanChange = (value: string) => {
    setKelurahan(value);
    const data = addressData.find((item) => item.kelurahan === value && item.kecamatan === kecamatan);
    if (data) setKodepos(data.kodepos);
  };

  const handleSubmit = () => {
    router.post(
      route('pendaftaran.store-alamat', siswa.id),
      {
        provinsi,
        kabupaten,
        kecamatan,
        kelurahan,
        jalan,
        rt,
        rw,
        kodepos,
      },
      {
        preserveScroll: true,
        onSuccess: () => toast.success('Alamat berhasil disimpan!'),
        onError: (e) => toast.error(errorMessage(e)),
      },
    );
  };

  return (
    <PpdbLayout
      active="alamat"
      guide="Isi alamat tempat tinggal calon peserta didik. Kota, kecamatan, dan kelurahan akan otomatis tersaring berdasarkan provinsi yang dipilih."
    >
      <Card>
        <CardHeader>
          <CardTitle>Alamat Tempat Tinggal</CardTitle>
          <CardDescription>Alamat tempat tinggal calon peserta didik.</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            className="grid gap-6 md:grid-cols-2"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <FormControl label="Provinsi">
              <Select
                value={provinsi}
                onValueChange={(value) => {
                  setProvinsi(value);
                  setKabupaten('');
                  setKecamatan('');
                  setKelurahan('');
                  setKodepos('');
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Pilih provinsi" />
                </SelectTrigger>
                <SelectContent>
                  {provinsiList.map((item) => (
                    <SelectItem key={item} value={item}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>

            <FormControl label="Kabupaten / Kota">
              <Select
                value={kabupaten}
                onValueChange={(value) => {
                  setKabupaten(value);
                  setKecamatan('');
                  setKelurahan('');
                  setKodepos('');
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Pilih kabupaten / kota" />
                </SelectTrigger>
                <SelectContent>
                  {kabupatenList.map((item) => (
                    <SelectItem key={item} value={item}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>

            <FormControl label="Kecamatan">
              <Select
                value={kecamatan}
                onValueChange={(value) => {
                  setKecamatan(value);
                  setKelurahan('');
                  setKodepos('');
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Pilih kecamatan" />
                </SelectTrigger>
                <SelectContent>
                  {kecamatanList.map((item) => (
                    <SelectItem key={item} value={item}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>

            <FormControl label="Kelurahan">
              <Select value={kelurahan} onValueChange={handleKelurahanChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih kelurahan" />
                </SelectTrigger>
                <SelectContent>
                  {kelurahanList.map((item) => (
                    <SelectItem key={item} value={item}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>

            <FormControl label="Jalan / Perumahan & No. Rumah">
              <Input placeholder="Contoh: Jl. Durian No. 88" value={jalan} onChange={(e) => setJalan(e.target.value)} />
            </FormControl>

            <FormControl label="RT">
              <Input placeholder="Misal: 01" value={rt} onChange={(e) => setRt(e.target.value)} />
            </FormControl>

            <FormControl label="RW">
              <Input placeholder="Misal: 04" value={rw} onChange={(e) => setRw(e.target.value)} />
            </FormControl>

            <FormControl label="Kode Pos">
              <Input placeholder="Kode Pos" value={kodepos} readOnly />
            </FormControl>
          </form>
        </CardContent>
      </Card>
      <div className="flex justify-end">
        <Button onClick={handleSubmit}>
          Selanjutnya <ArrowRight className="ml-2" />
        </Button>
      </div>
    </PpdbLayout>
  );
};

export default AlamatTab;
