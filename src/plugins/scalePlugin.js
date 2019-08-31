import { Dimensions } from 'react-native';
import { map, deepMap } from '../utils';

const { width, height } = Dimensions.get('window');

/**
 * ScalePlugin - Inspired by React-Native-Size-Matters
 * -----------------------------------------------------------------
 * Scales the elements so it has the same display on various screen
 * sizes.
 *
 * It consist of comparing the current dimensions against a predefined
 * set of screen width/height (based on a ~5" screen mobile device) so
 * that values are multiplied by the resulting factor.
 *
 * Example : for a baseWidth a 350, if our current screen has a width of 480,
 * we have a ratio of 480/350 = 1.38. Therefore, all width-related values
 * will be multiplied by 1.38 on the larger screen.
 *
 * We have two dimensions to scale from : width (s) and height (vs).
 * To scale a style, do as it follows :
 * {
 *  container: {
 *    height: "100@vs", // using @vs, we scale vertically
 *    width: "100@s", // using @s, we scale horizontally
 *  }
 * }
 */
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;

/** We use Math.ceil because decimal values wont work in Android < 5 **/
export const scale = size => Math.ceil(width / guidelineBaseWidth * size);
export const verticalScale = size =>
  Math.ceil(height / guidelineBaseHeight * size);

// This regex checks if our current value has a vertical or horizontal scale flag
const validScaleSheetRegex = /^(\-)?(\d+(\.\d{1,2})?)@(s|vs)$/;

const scaleRegex = /^(\-)?(\d+(\.\d{1,2})?)@s$/;
const verticalScaleRegex = /^(\-)?(\d+(\.\d{1,2})?)@vs$/;

/**
 * Scale the value using annotations.
 * @param value
 * @returns {*}
 */
const scaleByAnnotation = value => {
  if (!validScaleSheetRegex.test(value)) {
    return value;
  }

  const multiplier = value[0] === "-" ? -1 : 1;
  const numeralValue = value[0] === "-" ? value.substr(1).split('@')[0] : value.split('@')[0];
  const size = parseInt(numeralValue, 10);

  if (scaleRegex.test(value)) {
    return multiplier * scale(size);
  }

  if (verticalScaleRegex.test(value)) {
    return multiplier * verticalScale(size);
  }

  return value;
};

export default () => deepMap(scaleByAnnotation);
