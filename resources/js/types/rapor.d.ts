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
