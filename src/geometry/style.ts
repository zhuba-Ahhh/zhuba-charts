export const channelStyles = (
  index: any,
  channels: {
    x?: any;
    y?: any;
    y1?: any;
    z?: any[];
    x1?: any;
    r?: any[];
    text?: any;
    rotate?: any[];
    fontSize?: any[];
    fontWeight?: any[];
    d?: any;
    stroke?: any;
    fill?: any;
  }
) => {
  const { stroke: S, fill: F } = channels;
  return {
    ...(S && { stroke: S[index] }),
    ...(F && { fill: F[index] })
  };
};

export const groupChannelStyles = ([index]: any, channels: { x: any; y: any; z: any }) => {
  return channelStyles(index, channels);
};
