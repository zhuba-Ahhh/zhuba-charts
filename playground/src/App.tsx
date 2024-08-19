import React, { useEffect, useState } from 'react';

import Draw from './Canvas/Draw';
import Transform from './Canvas/Transform';
import Column from './Canvas/Column';
import SvgColumn from './Svg/Column';

function App() {
  const [data, setData] = useState<Array<{ name: string; value: number }>>([]);
  useEffect(() => {
    setData([
      { name: 'questions', value: 17 },
      { name: 'schools', value: 25 },
      { name: 'philosophers', value: 35 }
    ]);
  }, []);
  return (
    <>
      <Draw />
      <Transform />
      <Column data={data} chartWidth={480} chartHeight={300} margin={15} />
      <SvgColumn data={data} chartWidth={480} chartHeight={300} margin={15} />
    </>
  );
}

export default App;
