- tahun ajaran
  - id
  - nama
  - aktif

- guru
  - id
  - nama
  - nip
  - no_hp
  - email

- tingkat
  - name
  - group
  - label

- mapel
  - id
  - nama
  - tingkat_id
  - guru_id

- kelas
  - id
  - nama
  - tingkat
  - tahun_ajaran_id
  - wali_kelas_id

- siswa
  - id
  - nama
  - nisn
  - kelas_id
  - tahun_ajaran_id
  - jenis_kelamin
  - tanggal_lahir

- absensi
  - id
  - tanggal
  - mapel_id
  - kelas_id
  - siswa_id
  - status

- rapor
  - id
  - siswa_id
  - tahun_ajaran_id
  - catatan

- nilai
  - id
  - rapor_id
  - mapel_id
  - nilai
  - deskripsi
