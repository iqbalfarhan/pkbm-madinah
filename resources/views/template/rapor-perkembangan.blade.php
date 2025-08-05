<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>{{ $rapor->download_file_name }}</title>

    <style>
        @import url();
        body {
            font-family: DejaVu Sans, sans-serif; /* DejaVu Sans recommended buat simbol */
        }

        * {
            font-size: 10pt;
            font-family: Arial, Helvetica, sans-serif;
        }

        footer {
            position: fixed;
            width: 100%;
            bottom: -70px;
            height: 50px;
            background-color: white;
            text-align: right;
            /* line-height: 35px; */
        }

        .table {
            width: 100%;
            border-collapse: collapse
        }

        .page-header {
            text-align: center;
            text-transform: uppercase;
            font-size: 15pt;
            width: 400px
        }

        .table-header {
            background-color: black;
            color: white
        }

        h2{
            text-transform: uppercase
        }
    </style>
</head>
<body>
    <br />
    <table style="width: 100%">
        <tr>
            <td><img src="{{ public_path('pkbm.png') }}" width="210px" /></td>
            <td>
                <h1 class="page-header">LAPORAN PERKEMBANGAN SISWA PKBM AL-MADINAH SEMESTER {{ $rapor->tahunajaran->semester }} TAHUN AJARAN {{ $rapor->tahunajaran->name }}</h1>
            </td>
        </tr>
    </table>
    <br />

    <table>
        <thead>
            <tr>
                <td>Nama siswa</td>
                <td>:</td>
                <td>{{ $rapor->siswa->name }}</td>
            </tr>
            <tr>
                <td>Kelas</td>
                <td>:</td>
                <td>{{ $rapor->siswa->kelas?->name }}</td>
            </tr>
            <tr>
                <td>Umur</td>
                <td>:</td>
                <td>{{ $rapor->siswa->umur }}</td>
            </tr>
            <tr>
                <td>NISN</td>
                <td>:</td>
                <td>{{ $rapor->siswa->nisn }}</td>
            </tr>
        </thead>
    </table>
    
    <h2>CURRICULAR DOMAIN</h2>

    @isset ($rapor['data'])
        @foreach ($rapor['data'] as $data)
            <table border="1" class="table" cellpadding="7">
                <tbody>
                    <tr>
                        <th colspan="5" style="color: white; background-color: black; font-size: 14pt; font-weight: bolder;">{{ $data['name'] }}</th>
                    </tr>
                    <tr>
                        <td colspan="5">
                            <span style="font-weight: bold">Tujuan utama:</span>
                            <br />
                            {{ $data['goal'] }}
                        </td>
                    </tr>
                </tbody>
                <tbody>
                    <tr style="background-color: grey; color: white; padding: 10px 0;">
                        <th style="width: 100px">Fokus perkembangan</th>
                        <th>Perkembangan anak</th>
                        <th style="width: 30px">A</th>
                        <th style="width: 30px">B</th>
                        <th style="width: 30px">C</th>
                    </tr>
                </tbody>
                <tbody>
                    @foreach ($data['points'] as $point)
                        <tr>
                            <td>{{ $point['name'] }}</td>
                            <td>{{ $point['description'] }}</td>
                            <td style="text-align: center">{!! $point['mark'] == "A" ? "&#10004;" : "" !!}</td>
                            <td style="text-align: center">{!! $point['mark'] == "B" ? "&#10004;" : "" !!}</td>
                            <td style="text-align: center">{!! $point['mark'] == "C" ? "&#10004;" : "" !!}</td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
            <br /><br />
        @endforeach
    @else
    <h3>Tidak ada data</h3>
    @endisset

    <br /><br />

    <h2>Ekstrakulikuler</h2>

    @isset($rapor['siswa']['ekskuls'])

        <table border="1" class="table" cellpadding="5">
            <thead class="table-header">
                <th>No</th>
                <th>Jenis Ekstrakulikuler</th>
                <th>Kegiatan yang pernah diikuti</th>
            </thead>
            <tbody>
                @foreach ($rapor['siswa']['ekskuls'] as $index => $ekskul)
                    <tr>
                        <td>{{ $index+1 }}</td>
                        <td>{{ $ekskul['name'] }}</td>
                        <td>{{ $ekskul['pivot']['kegiatan'] }}</td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    @endisset

    <br /><br />

    <h2>Ketidakhadiran</h2>

    <table border="1" class="table" style="width: 50%" cellpadding="5">
        <thead class="table-header">
            <th colspan="3">Ketidakhadiran</th>
        </thead>
        <tbody>
            <tr>
                <td>Sakit</td>
                <td>:</td>
                <td style="width: 100%">0</td>
            </tr>
            <tr>
                <td>Izin</td>
                <td>:</td>
                <td>0</td>
            </tr>
            <tr>
                <td><p style="text-wrap: nowrap;">Tanpa keterangan</p></td>
                <td>:</td>
                <td>0</td>
            </tr>
        </tbody>

    </table>

    <br /><br />

    <table border="1" class="table" cellpadding="7">
        <tbody>
            <tr>
                <th colspan="5" style="color: white; background-color: black; font-size: 14pt; font-weight: bolder;">Komentar guru</th>
            </tr>
            <tr>
                <td>Alhamdulillaah,<br>
                    Ananda Zuhdi sudah mampu menerapkan beberapa sikap dari 18 sikap yang telah ada, yaitu sabar menunggu giliran ketika akan recalling, fokus dan tuntas dalam mengerjakan pekerjaan yang telah diberikan oleh Bapak/Ibu guru. Disiplin, jujur, bersih, sayang teman, dan rajin mengikuti pelajaran di sekolah, Ikhlas menerima apapun yang didapatkannya. Serta ramah dan sering tersenyum kepada Bapak/Ibu guru serta teman-teman di sekolah. <br>
                    Ananda mampu menjelaskan kembali materi yang telah diberikan serta bertanggung jawab atas tugas yang telah diberikan oleh Bapak/Ibu guru di sekolah. Tetap muroja’ah di rumah, menjadi anak yang rendah hati, menghormati dan berbakti kepada orang tua dan semoga ananda Zuhdi menjadi anak yang sholeh. Aamiin.
                </td>
            </tr>
            <tr>
                <th colspan="5" style="color: white; background-color: black; font-size: 14pt; font-weight: bolder;">Komentar siswa</th>
            </tr>
            <tr>
                <td>	Saya baik dalam hal :

                	Usaha perbaikan saya untuk semester berikutnya :
                </td>
            </tr>
            <tr>
                <th colspan="5" style="color: white; background-color: black; font-size: 14pt; font-weight: bolder;">Komentar orang tua / wali</th>
            </tr>
            <tr>
                <td>	Anak saya meningkat dalam hal :

                	Saya akan membantu anak saya agar :
                </td>
            </tr>
        </tbody>
    </table>

    <br /><br />
    <br /><br />

    <table class="table">
        <tbody>
            <tr>
                <th style="width: 30%; text-align: center;">
                    Orang Tua/ Wali
                    <br/><br/>
                    <br/><br/>
                    <b>(.........)</b>
                </th>
                <th style="width: 40%"></th>
                <th style="width: 30%; text-align: center">
                    Balikpapan, 14 Juni 2024,<br/>
                    Walikelas,
                    <br/><br/>
                    <br/><br/>
                    <b>Nama Walikelas</b>
                </th>
            </tr>

        </tbody>
    </table>
    <footer>
        Laporan Perkembangan Siswa – PKBM Al–Madinah
    </footer>
    
</body>
</html>