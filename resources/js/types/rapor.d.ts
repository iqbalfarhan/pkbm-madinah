export type PointMark = 'A' | 'B' | 'C';

export type Penilaian = {
  name: string;
  goal: string;
  points: {
    name: string;
    description: string;
    mark: PointMark;
  }[];
};

export type RaporPerkembanganData = {
  nama: string;
  tahunajaran: string;
  semester: string;
  kelas: string;
  usia: string;
  nisn: string;
  penilaian: Penilaian[];
  komentar_guru: string;
  komentar_wali: string;
  komentar_siswa: string;
};

// batas rapor perkembangan

export type RaporTahfidzData = {
  catatan: string;
  penilaian: PenilaianTahfidz[];
  tanggal: string;
  pembimbing: string;
};

export type PenilaianTahfidz = {
  surah: string;
  keterangan: string;
  ayat: number;
};

// batas rapor tahfidz

export type RaporNilaiData = {
  naik_kelas: boolean;
  ke_kelas: string;
  keputusan: string;
  penilaian: PenilaianPelajaran[];
  tanggal: string;
  guru_kelas: string;
};

export type PenilaianPelajaran = {
  name: string;
  type: string; // inti | muatan lokal
  nilai_tugas: number;
  evaluasi: number;
  rata_rata: number;
};

// batas rapor nilai

export type RaporDoaData = {
  name: string;
};

// batas rapor doa
