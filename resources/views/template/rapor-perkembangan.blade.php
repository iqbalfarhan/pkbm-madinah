<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>{{ $rapor->download_file_name }}</title>

    <style>
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
                            <td style="text-align: center">{{ $point['mark'] == "A" && "ü" }}</td>
                            <td style="text-align: center">{{ $point['mark'] == "B" && "ü" }}</td>
                            <td style="text-align: center">{{ $point['mark'] == "C" && "ü" }}</td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
            <br />
            <br />
        @endforeach
    @else
    <h3>Tidak ada data</h3>
    @endisset

    <footer>
        Laporan Perkembangan Siswa – PKBM Al–Madinah | 7
    </footer>
    
</body>
</html>