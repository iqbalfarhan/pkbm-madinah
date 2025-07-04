<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>

    <style>{
        .flex {
            display: flex;
            flex-direction: row;
        }
    }</style>
</head>
<body>
    <div class="flex">
        <img src="{{ public_path('pkbm.png') }}" width="100px" />
        <h1>LAPORAN PERKEMBANGAN SISWA PKBM AL-MADINAH SEMESTER GENAP TAHUN AJARAN 2023/2024</h1>
    </div>

    <table>
        <thead>
            <tr>
                <td>Nama siswa</td>
                <td>Iqbal Farhan Syuhada</td>
            </tr>
            <tr>
                <td>Kelas</td>
                <td>IK6</td>
            </tr>
            <tr>
                <td>Nama siswa</td>
                <td>29 Tahun 6 Bulan</td>
            </tr>
            <tr>
                <td>NISN</td>
                <td>132010040002</td>
            </tr>
        </thead>
    </table>
    
    <h2>CURRICULAR DOMAIN</h2>

    <table border="1">
        <thead>
            <tr>
                <th colspan="5">ESTETIK</th>
            </tr>
            <tr>
                <td colspan="5">Agar anak dapat mengintegritaskan perasaan, pikiran, dan tindakan melalui seni, musik, dan pengalaman sensori yang lain untuk memperoleh kesenangan dan akhirnya memahami dirinya.</td>
            </tr>
        </thead>
        <thead>
            <tr>
                <th>Fokus Perkembangan	</th>
                <th>Perkembangan anak</th>
                <th>A</th>
                <th>B</th>
                <th>C</th>
            </tr>
        </thead>
        <tbody>
            @foreach (['Enjoyment', 'Stimulation', 'Insight', 'Satisfaction'] as $item)
                <tr>
                    <td>{{ $item }}</td>
                    <td>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam dicta corrupti aut sit tempore deleniti nobis explicabo. Quae commodi earum accusamus ex nulla illum temporibus, cupiditate tempora fugiat nemo! Magnam?</td>
                    <td>ok</td>
                    <td></td>
                    <td></td>
                </tr>
            @endforeach
        </tbody>
    </table>
    <br />
    <table border="1">
        <thead>
            <tr>
                <th colspan="5">AFEKSI</th>
            </tr>
            <tr>
                <td colspan="5">Agar anak merasakan mereka di sayang, mempunyai arti / makna dan sebagai pribadi yang memiliki kemampuan.</td>
            </tr>
        </thead>
        <thead>
            <tr>
                <th>Fokus Perkembangan	</th>
                <th>Perkembangan anak</th>
                <th>A</th>
                <th>B</th>
                <th>C</th>
            </tr>
        </thead>
        <tbody>
            @foreach (['Trust', 'Autonomy', 'Initiative', 'Industry', 'Self Concept', 'Self Esteem'] as $item)
                <tr>
                    <td>{{ $item }}</td>
                    <td>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam dicta corrupti aut sit tempore deleniti nobis explicabo. Quae commodi earum accusamus ex nulla illum temporibus, cupiditate tempora fugiat nemo! Magnam?</td>
                    <td>ok</td>
                    <td></td>
                    <td></td>
                </tr>
            @endforeach
        </tbody>
    </table>
    
</body>
</html>