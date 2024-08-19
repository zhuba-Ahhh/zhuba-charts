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
  const containerWidth = String(chartWidth + margin * 2);
  const containerHeight = String(chartHeight + margin * 2);
  const y = chartHeight;

  const ref = useRef<SVGSVGElement | null>(null);

  function createSVGElement(type) {
    return document.createElementNS('http://www.w3.org/2000/svg', type);
  }

  useEffect(() => {
    if (ref.current) {
      const svg = ref.current;
      if (svg) {
        // 设置 svg 的坐标原点和大小
        svg.setAttribute('width', containerWidth);
        svg.setAttribute('height', containerHeight);
        svg.setAttribute('viewBox', `0, 0, ${containerWidth}, ${containerHeight}`);

        // 创建一个 g 元素用于平移
        const g = createSVGElement('g');
        g.setAttribute('transform', `translate(${margin}, ${margin})`);
        svg.appendChild(g);
        const colors = data.map((d) => namesToColors[d.name]);
        const { step, barWidth, xs } = calculateBarDimensions(data, chartWidth);
        const barHeights = calculateBarHeights(
          data.map((d) => d.value),
          chartHeight
        );

        for (let index = 0; index < data.length; index++) {
          // 取得对应的属性
          const color = colors[index];
          const x = xs[index];
          const barHeight = barHeights[index];
          const value = data[index].value;

          // 绘制条
          const rect = createSVGElement('rect');
          rect.setAttribute('x', x);
          rect.setAttribute('y', y - barHeight);
          rect.setAttribute('fill', color);
          rect.setAttribute('width', barWidth);
          rect.setAttribute('height', barHeight);
          g.appendChild(rect);

          // 绘制值
          const text = createSVGElement('text');
          text.textContent = value;
          text.setAttribute('text-anchor', 'middle');
          text.setAttribute('fill', 'white');
          text.setAttribute('font-family', 'PingFangSC-Regular, sans-serif');
          text.setAttribute('font-size', 25);
          text.setAttribute('alignment-baseline', 'middle');
          text.setAttribute('x', x + barWidth / 2);
          text.setAttribute('y', y - barHeight / 2);

          g.appendChild(text);
        }
      }
    }
  }, [data, chartWidth, margin]);

  return <svg ref={ref} />;
};

export default Column;
