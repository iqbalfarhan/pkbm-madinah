import FormControl from '@/components/form-control';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { errorMessage } from '@/lib/utils';
import { router, useForm } from '@inertiajs/react';
import { CheckedState } from '@radix-ui/react-checkbox';
import { LogIn } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import PpdbLayout from '../layout/ppdb-layout';

const AkunTab = () => {
  const [haveAccount, setHaveAccount] = useState<CheckedState>(false);

  const { data, setData } = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.post(route('pendaftaran.register'), data, {
      preserveScroll: true,
      onSuccess: () => toast.success('Akun berhasil dibuat! Silakan lanjut ke pendaftaran siswa.'),
      onError: (e) => toast.error(errorMessage(e)),
    });
  };

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.post(
      route('pendaftaran.login'),
      {
        email: data.email,
        password: data.password,
      },
      {
        preserveScroll: true,
        onSuccess: () => toast.success('Login berhasil! Silakan lanjut ke pendaftaran siswa.'),
        onError: (e) => toast.error(errorMessage(e)),
      },
    );
  };

  return (
    <PpdbLayout
      active="akun"
      guide="Bila Anda belum memiliki akun, silakan buat akun terlebih dahulu dengan mencentang kotak. Jika sudah memiliki akun, silakan masuk dengan akun yang sudah ada."
    >
      <Card>
        <CardHeader>
          <Label>
            <Checkbox checked={haveAccount} onCheckedChange={(c) => setHaveAccount(c)} />
            <span>Sudah pernah mendaftar?</span>
          </Label>
        </CardHeader>
        <Separator />
        <CardContent className="mx-auto w-full max-w-md space-y-10">
          <div>
            <CardTitle>{haveAccount ? 'Masuk dengan akun yang sudah ada' : 'Buat akun orangtua'}</CardTitle>
            <CardDescription>Pembuatan akun orang tua</CardDescription>
          </div>
          {haveAccount ? (
            <form onSubmit={handleLogin} className="space-y-6">
              <FormControl label="Alamat email" required>
                <Input type="email" placeholder="Alamat email" value={data.email} onChange={(e) => setData('email', e.target.value)} />
              </FormControl>
              <FormControl label="Password" required>
                <Input type="password" placeholder="Password" value={data.password} onChange={(e) => setData('password', e.target.value)} />
              </FormControl>
              <FormControl>
                <Button>
                  <LogIn />
                  Masuk
                </Button>
              </FormControl>
            </form>
          ) : (
            <form onSubmit={handleRegister} className="space-y-6">
              <FormControl label="Nama lengkap" required>
                <Input type="text" placeholder="Nama lengkap" value={data.name} onChange={(e) => setData('name', e.target.value)} />
              </FormControl>
              <FormControl label="Alamat email" required>
                <Input type="email" placeholder="Alamat email" value={data.email} onChange={(e) => setData('email', e.target.value)} />
              </FormControl>
              <FormControl label="Password" required>
                <Input type="password" placeholder="Password" value={data.password} onChange={(e) => setData('password', e.target.value)} />
              </FormControl>
              <FormControl label="Konfirmasi password" required>
                <Input
                  type="password"
                  placeholder="Konfirmasi password"
                  value={data.password_confirmation}
                  onChange={(e) => setData('password_confirmation', e.target.value)}
                />
              </FormControl>
              <FormControl>
                <Button>
                  <LogIn />
                  Daftar
                </Button>
              </FormControl>
            </form>
          )}
        </CardContent>
      </Card>
    </PpdbLayout>
  );
};

export default AkunTab;
