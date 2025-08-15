import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Tingkat } from '@/types';
import { FC } from 'react';

export const description = 'A simple pie chart';
type TingkatChartWidgetProps = {
  tingkats: Tingkat[];
};

const TingkatChartWidget: FC<TingkatChartWidgetProps> = ({ tingkats }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Grafik jumlah siswa</CardTitle>
        <CardDescription>Grafik jumlah siswa aktif berdasarkan tingkat kelas</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={{}}>
          <BarChart accessibilityLayer data={tingkats}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="label" tickLine={false} tickMargin={0} axisLine={false} />
            <ChartTooltip cursor={true} content={<ChartTooltipContent />} />
            <Bar dataKey="siswas_count" label={'jumlah siswa'} fill="var(--primary)" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default TingkatChartWidget;
