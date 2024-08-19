import React, { useEffect, useRef } from 'react';
import { FC } from 'react';

interface Datum {
  name: string;
  value: number;
}

interface ColumnProps {
  data: Datum[];
  chartWidth: number;
  chartHeight: number;
  margin: number;
}

const namesToColors: Record<string, string> = {
  questions: '#5B8FF9',
  philosophers: '#61DDAA',
  schools: '#65789B'
};

const calculateBarDimensions = (
  data: Datum[],
  chartWidth: number
): { step: number; barWidth: number; xs: number[] } => {
  const step = chartWidth / data.length;
  const barWidth = step * 0.8;
  const xs = data.map((_, i) => i * step);
  return { step, barWidth, xs };
};

const calculateBarHeights = (values: number[], chartHeight: number): number[] => {
  const vmax = Math.max(...values);
  return values.map((v) => chartHeight * (v / vmax));
};

const Column: FC<ColumnProps> = ({ data, chartWidth, chartHeight, margin }) => {
  const containerWidth = chartWidth + margin * 2;
  const containerHeight = chartHeight + margin * 2;
  const y = chartHeight;

  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (ref.current) {
      const canvas = ref.current;
      if (canvas) {
        canvas.style.width = `${containerWidth}px`;
        canvas.style.height = `${containerHeight}px`;

        canvas.width = containerWidth * 2;
        canvas.height = containerHeight * 2;

        const context = canvas.getContext('2d');
        if (context) {
          context.scale(2, 2);
          context.translate(margin, margin);

          const { step, barWidth, xs } = calculateBarDimensions(data, chartWidth);
          const barHeights = calculateBarHeights(
            data.map((d) => d.value),
            chartHeight
          );
          const colors = data.map((d) => namesToColors[d.name]);

          for (let index = 0; index < data.length; index++) {
            const color = colors[index];
            const x = xs[index];
            const barHeight = barHeights[index];
            const value = data[index].value;

            context.fillStyle = color;
            context.fillRect(x, y - barHeight, barWidth, barHeight);

            context.textAlign = 'center';
            context.textBaseline = 'middle';
            context.fillStyle = 'white';
            context.font = '25px PingFangSC-Regular, sans-serif';
            context.fillText(String(value), x + barWidth / 2, y - barHeight / 2);
          }
        }
      }
    }
  }, [data, chartWidth, margin]);

  return <canvas ref={ref} />;
};

export default Column;
