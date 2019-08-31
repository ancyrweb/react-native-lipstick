declare module 'react-native-lipstick' {
  // TODO : make these better

  import {ImageStyle, ViewStyle, TextStyle} from 'react-native';

  type Scalable = string | number;
  type ScalableValues = {
    marginLeft?: Scalable;
    marginRight?: Scalable;
    marginTop?: Scalable;
    marginBottom?: Scalable;
    borderRadius?: Scalable;
  };

  type CustomViewStyle = ViewStyle | (ScalableValues & {});
  type CustomImageStyle = ImageStyle | (ScalableValues & {});
  type CustomTextStyle =
    | TextStyle
    | (ScalableValues & {
    fontSize?: Scalable;
    color?: string;
    textAlign?: string;
    flex?: number;
  });
  type PluginStyles = {
    $inherits: string | string[]
  }

  type defaultExport = {
    create: (obj: Record<string, CustomImageStyle | CustomViewStyle | CustomTextStyle | PluginStyles>) => any;
  };

  const def: defaultExport;
  export default def;
}

declare module 'react-native-lipstick/src/plugins/scalePlugin' {
  export const verticalScale: (val: number) => number;
  export const scale: (val: number) => number;
}
