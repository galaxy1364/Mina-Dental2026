import Svg, { Circle, Line, Path, Polyline, Rect } from 'react-native-svg';

/**
 * MinaDent icon set — modern stroke glyphs drawn with react-native-svg so each
 * section has its own crisp, scalable mark (no emoji, no raster assets).
 */
export type IconName =
  | 'home'
  | 'calendar'
  | 'appointment'
  | 'clock'
  | 'tooth'
  | 'flask'
  | 'implant'
  | 'wallet'
  | 'box'
  | 'users'
  | 'building'
  | 'chart'
  | 'grid'
  | 'key'
  | 'plus'
  | 'sync'
  | 'logout'
  | 'bell'
  | 'search'
  | 'chevronL'
  | 'chevronR'
  | 'chevronU'
  | 'chevronD'
  | 'cloud'
  | 'check'
  | 'close'
  | 'eyeOff'
  | 'sliders'
  | 'alert';

interface IconProps {
  name: IconName;
  size?: number;
  color?: string;
  strokeWidth?: number;
}

export function Icon({ name, size = 24, color = '#FFFFFF', strokeWidth = 2 }: IconProps) {
  const s = {
    stroke: color,
    strokeWidth,
    fill: 'none' as const,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      {glyph(name, s, color)}
    </Svg>
  );
}

function glyph(name: IconName, s: object, color: string) {
  switch (name) {
    case 'home':
      return (
        <>
          <Path d="M3 11.5 12 4l9 7.5" {...s} />
          <Path d="M5.5 10v9.5h13V10" {...s} />
        </>
      );
    case 'calendar':
      return (
        <>
          <Rect x="3.5" y="5" width="17" height="15" rx="3.5" {...s} />
          <Line x1="3.5" y1="9.5" x2="20.5" y2="9.5" {...s} />
          <Line x1="8" y1="2.8" x2="8" y2="6.5" {...s} />
          <Line x1="16" y1="2.8" x2="16" y2="6.5" {...s} />
          <Rect x="13.7" y="12.3" width="3.6" height="3.6" rx="1.1" fill={color} stroke="none" />
          <Line x1="6.7" y1="13" x2="9.3" y2="13" {...s} />
          <Line x1="6.7" y1="16.6" x2="9.3" y2="16.6" {...s} />
        </>
      );
    case 'appointment':
      return (
        <>
          <Path d="M4 7.5A2.5 2.5 0 0 1 6.5 5h11A2.5 2.5 0 0 1 20 7.5V12" {...s} />
          <Path d="M20 12v0M13.5 20H6.5A2.5 2.5 0 0 1 4 17.5V7.5" {...s} />
          <Line x1="4" y1="9.5" x2="20" y2="9.5" {...s} />
          <Line x1="8" y1="2.8" x2="8" y2="6.5" {...s} />
          <Line x1="16" y1="2.8" x2="16" y2="6.5" {...s} />
          <Circle cx="16.5" cy="16.5" r="4" {...s} />
          <Polyline points="16.5 14.6 16.5 16.5 18 17.6" {...s} />
        </>
      );
    case 'clock':
      return (
        <>
          <Circle cx="12" cy="12" r="8.5" {...s} />
          <Polyline points="12 7.5 12 12 15.5 13.8" {...s} />
        </>
      );
    case 'tooth':
      return (
        <Path
          d="M12 3.5c2.5 0 4 1.2 5 1.2S18.8 4 19.5 4.5C21 5.6 21 8 20 10.5c-.7 1.8-.7 3-1 5-.3 1.9-.7 4.5-1.8 4.5-1.3 0-1.2-3.2-2.2-5-.5-.9-1.2-1.4-2-1.4s-1.5.5-2 1.4c-1 1.8-.9 5-2.2 5-1.1 0-1.5-2.6-1.8-4.5-.3-2-.3-3.2-1-5C2 8 2 5.6 3.5 4.5 4.2 4 5 4.7 6 4.7S9.5 3.5 12 3.5Z"
          {...s}
        />
      );
    case 'flask':
      return (
        <>
          <Path d="M9.5 3.5h5M10 3.5v6L5.5 17a2.5 2.5 0 0 0 2.3 3.5h8.4A2.5 2.5 0 0 0 18.5 17L14 9.5v-6" {...s} />
          <Line x1="7.5" y1="14.5" x2="16.5" y2="14.5" {...s} />
        </>
      );
    case 'implant':
      return (
        <>
          <Path d="M8 4h8a1.5 1.5 0 0 1 1.5 1.5V7h-11V5.5A1.5 1.5 0 0 1 8 4Z" {...s} />
          <Polyline points="7.6 8.6 12 10.1 16.4 8.6" {...s} />
          <Polyline points="8.1 11 12 12.4 15.9 11" {...s} />
          <Polyline points="8.7 13.4 12 14.7 15.3 13.4" {...s} />
          <Polyline points="9.5 15.8 12 17 14.5 15.8" {...s} />
          <Polyline points="10.7 18.2 12 19.6 13.3 18.2" {...s} />
        </>
      );
    case 'wallet':
      return (
        <>
          <Rect x="3.5" y="6" width="17" height="13" rx="3" {...s} />
          <Path d="M3.5 9.5h12a2.5 2.5 0 0 1 0 5h-12" {...s} />
          <Circle cx="15.5" cy="12" r="1.1" fill={color} stroke="none" />
        </>
      );
    case 'box':
      return (
        <>
          <Path d="M3.5 7.5 12 3.5l8.5 4v9L12 20.5 3.5 16.5v-9Z" {...s} />
          <Path d="M3.5 7.5 12 11.5l8.5-4M12 11.5v9" {...s} />
        </>
      );
    case 'users':
      return (
        <>
          <Circle cx="9" cy="8.5" r="3" {...s} />
          <Path d="M3.5 19c0-3 2.5-5 5.5-5s5.5 2 5.5 5" {...s} />
          <Path d="M16 6.2a3 3 0 0 1 0 5.6M17.5 14.2c2 .6 3.5 2.3 3.5 4.8" {...s} />
        </>
      );
    case 'building':
      return (
        <>
          <Rect x="5" y="3.5" width="14" height="17" rx="2" {...s} />
          <Line x1="9" y1="7.5" x2="9" y2="7.5" {...s} />
          <Line x1="15" y1="7.5" x2="15" y2="7.5" {...s} />
          <Line x1="9" y1="11" x2="9" y2="11" {...s} />
          <Line x1="15" y1="11" x2="15" y2="11" {...s} />
          <Path d="M10.5 20.5v-4h3v4" {...s} />
        </>
      );
    case 'chart':
      return (
        <>
          <Path d="M4 4v16h16" {...s} />
          <Polyline points="7 15 11 10 14 13 19 6" {...s} />
        </>
      );
    case 'grid':
      return (
        <>
          <Rect x="4" y="4" width="6.5" height="6.5" rx="2" {...s} />
          <Rect x="13.5" y="4" width="6.5" height="6.5" rx="2" {...s} />
          <Rect x="4" y="13.5" width="6.5" height="6.5" rx="2" {...s} />
          <Rect x="13.5" y="13.5" width="6.5" height="6.5" rx="2" {...s} />
        </>
      );
    case 'key':
      return (
        <>
          <Circle cx="8" cy="8" r="4" {...s} />
          <Path d="M10.8 10.8 20 20M17 17l2-2M14 14l2-2" {...s} />
        </>
      );
    case 'plus':
      return (
        <>
          <Line x1="12" y1="5" x2="12" y2="19" {...s} />
          <Line x1="5" y1="12" x2="19" y2="12" {...s} />
        </>
      );
    case 'sync':
      return (
        <>
          <Path d="M20 8a8 8 0 0 0-14-2M4 6v3h3" {...s} />
          <Path d="M4 16a8 8 0 0 0 14 2M20 18v-3h-3" {...s} />
        </>
      );
    case 'logout':
      return (
        <>
          <Path d="M14 4H6.5A2.5 2.5 0 0 0 4 6.5v11A2.5 2.5 0 0 0 6.5 20H14" {...s} />
          <Polyline points="17 8 21 12 17 16" {...s} />
          <Line x1="21" y1="12" x2="10" y2="12" {...s} />
        </>
      );
    case 'bell':
      return (
        <>
          <Path d="M6.5 9a5.5 5.5 0 0 1 11 0c0 5 2 6.5 2 6.5h-15S6.5 14 6.5 9Z" {...s} />
          <Path d="M10 19a2 2 0 0 0 4 0" {...s} />
        </>
      );
    case 'search':
      return (
        <>
          <Circle cx="11" cy="11" r="6.5" {...s} />
          <Line x1="16" y1="16" x2="20.5" y2="20.5" {...s} />
        </>
      );
    case 'chevronL':
      return <Polyline points="14 6 8 12 14 18" {...s} />;
    case 'chevronR':
      return <Polyline points="10 6 16 12 10 18" {...s} />;
    case 'chevronU':
      return <Polyline points="6 14 12 8 18 14" {...s} />;
    case 'chevronD':
      return <Polyline points="6 10 12 16 18 10" {...s} />;
    case 'check':
      return <Polyline points="5 12.5 10 17.5 19 7" {...s} />;
    case 'close':
      return (
        <>
          <Line x1="6" y1="6" x2="18" y2="18" {...s} />
          <Line x1="18" y1="6" x2="6" y2="18" {...s} />
        </>
      );
    case 'eyeOff':
      return (
        <>
          <Path d="M4 12s3-6 8-6c1.6 0 3 .6 4.2 1.4M20 12s-3 6-8 6c-1.6 0-3-.6-4.2-1.4" {...s} />
          <Circle cx="12" cy="12" r="2.6" {...s} />
          <Line x1="4" y1="4" x2="20" y2="20" {...s} />
        </>
      );
    case 'sliders':
      return (
        <>
          <Line x1="5" y1="7" x2="19" y2="7" {...s} />
          <Line x1="5" y1="12" x2="19" y2="12" {...s} />
          <Line x1="5" y1="17" x2="19" y2="17" {...s} />
          <Circle cx="9" cy="7" r="2" fill={color} stroke="none" />
          <Circle cx="15" cy="12" r="2" fill={color} stroke="none" />
          <Circle cx="8" cy="17" r="2" fill={color} stroke="none" />
        </>
      );
    case 'alert':
      return (
        <>
          <Path d="M12 4 21 19H3L12 4Z" {...s} />
          <Line x1="12" y1="10" x2="12" y2="14" {...s} />
          <Circle cx="12" cy="16.5" r="0.6" fill={color} stroke="none" />
        </>
      );
    case 'cloud':
      return (
        <Path
          d="M7 18a4 4 0 0 1 0-8 5 5 0 0 1 9.6-1.3A3.5 3.5 0 0 1 18 18H7Z"
          {...s}
        />
      );
    default:
      return null;
  }
}
