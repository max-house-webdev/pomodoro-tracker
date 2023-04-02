interface IHexToRgbaProps {
  hex: string;
  opacity?: number;
}

export function hexToRgba(props: IHexToRgbaProps) {
  const { hex, opacity = 0 } = props;

  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

  const DEFAULT = { r: 0, b: 0, g: 0 };

  const parse = result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : DEFAULT;

  const rgba = `rgba(${parse.r}, ${parse.b}, ${parse.b}, ${opacity})`;

  return { parse, rgba };
}
