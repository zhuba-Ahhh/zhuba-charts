import React, { useEffect, useRef } from 'react';

function Draw() {
  const ref = useRef<HTMLCanvasElement | null>(null);
  // 获得 canvas 容器元素
  useEffect(() => {
    if (ref.current) {
      const canvas = ref.current;
      if (canvas) {
        // 设置 canvas 的样式宽高
        // 样式宽高决定了 canvas 在画布上呈现的大小
        canvas.style.width = 400 + 'px';
        canvas.style.height = 200 + 'px';

        // 设置 canvas 画布宽高
        // 这个宽高是可以绘制区域的大小
        // 样式宽高是默认等于画布宽高的
        canvas.width = 400;
        canvas.height = 200;

        // 获得绘制的上下文
        // 之后的 API 都是通过调用 context
        const context = canvas.getContext('2d');

        if (context) {
          // 绘制一个矩形
          context.fillStyle = 'red'; // 设置填充颜色
          context.strokeStyle = 'yellow'; // 设置边框的颜色
          context.lineWidth = 10; // 设置边框的宽度
          context.strokeRect(0, 0, 100, 100); // 绘制边框
          context.fillRect(5, 5, 95, 95); // 绘制填充颜色

          // 进行一系列坐标变换
          context.fillStyle = 'blue';
          context.translate(50, 50);
          context.rotate(-Math.PI / 6);
          context.scale(2, 3);
          context.fillRect(0, 0, 50, 50);
        }
      }
    }
  }, []);

  return <canvas ref={ref}></canvas>;
}

export default Draw;
