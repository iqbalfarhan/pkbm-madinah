import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Tingkat } from '@/types';
import { FC } from 'react';

export const description = 'A simple pie chart';

// const chartData = [
//   { browser: 'chrome', visitors: 275, fill: 'var(--color-chrome)' },
//   { browser: 'safari', visitors: 200, fill: 'var(--color-safari)' },
//   { browser: 'firefox', visitors: 187, fill: 'var(--color-firefox)' },
//   { browser: 'edge', visitors: 173, fill: 'var(--color-edge)' },
//   { browser: 'other', visitors: 90, fill: 'var(--color-other)' },
// ];

const chartConfig = {
  visitors: {
    label: 'Visitors',
  },
  chrome: {
    label: 'Chrome',
    color: 'var(--chart-1)',
  },
  Safari: {
    label: 'Safari',
    color: 'var(--chart-2)',
  },
  firefox: {
    label: 'Firefox',
    color: 'var(--chart-3)',
  },
  edge: {
    label: 'Edge',
    color: 'var(--chart-4)',
  },
  other: {
    label: 'Other',
    color: 'var(--chart-5)',
  },
} satisfies ChartConfig;

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
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={tingkats}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="label" tickLine={false} tickMargin={0} axisLine={false} />
            <ChartTooltip cursor={true} content={<ChartTooltipContent />} />
            <Bar dataKey="siswas_count" label={'jumlah siswa'} fill="var(--chart-1)" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default TingkatChartWidget;
