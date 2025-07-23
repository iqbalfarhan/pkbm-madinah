'use client';

import FormControl from '@/components/form-control';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { addressData } from '@/lib/enums';
import { ArrowRight } from 'lucide-react';
import { useState } from 'react';
import PpdbLayout from '../layout/ppdb-layout';

const AlamatTab = () => {
  const [provinsi, setProvinsi] = useState('Kalimantan Timur');
  const [kabupaten, setKabupaten] = useState('Balikpapan');
  const [kecamatan, setKecamatan] = useState('');
  const [kelurahan, setKelurahan] = useState('');
  const [kodepos, setKodepos] = useState('');

  const provinsiList = [...new Set(addressData.map((item) => item.provinsi))];
  const kabupatenList = [...new Set(addressData.filter((item) => item.provinsi === provinsi).map((item) => item.kabupaten))];
  const kecamatanList = [...new Set(addressData.filter((item) => item.kabupaten === kabupaten).map((item) => item.kecamatan))];
  const kelurahanList = [...new Set(addressData.filter((item) => item.kecamatan === kecamatan).map((item) => item.kelurahan))];

  const handleKelurahanChange = (value: string) => {
    setKelurahan(value);
    const data = addressData.find((item) => item.kelurahan === value && item.kecamatan === kecamatan);
    if (data) setKodepos(data.kodepos);
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
        <Separator />
        <CardContent>
          <div className="grid grid-cols-2 gap-6">
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
              <Input placeholder="Contoh: Jl. Durian No. 88" />
            </FormControl>

            <FormControl label="RT">
              <Input placeholder="Misal: 01" />
            </FormControl>

            <FormControl label="RW">
              <Input placeholder="Misal: 04" />
            </FormControl>

            <FormControl label="Kode Pos">
              <Input value={kodepos} readOnly />
            </FormControl>
          </div>
        </CardContent>
        <Separator />
        <CardFooter className="flex justify-end">
          <Button>
            Selanjutnya <ArrowRight className="ml-2" />
          </Button>
        </CardFooter>
      </Card>
    </PpdbLayout>
  );
};

export default AlamatTab;
