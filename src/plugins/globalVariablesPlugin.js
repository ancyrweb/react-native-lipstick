import {
  compose,
  filter,
  isFirstLetterEqualsTo,
  map,
  isObject
} from '../utils';

/**
 * GlobalVariablesPlugin
 * ----------------------
 * Allow using global variables in style values.
 * For example
 * {
 *   $color: "red",
 *   container: {
 *    color: "$color", // la valeur $color sera remplace par "red"
 *   }
 * }
 *
 * @return {function}
 */
export default () =>
  compose(
    filter((value, key) => isFirstLetterEqualsTo('$', key) === false),
    map((classValue, classKey, object) => {
      if (!isObject(classValue)) return classValue;
      
      return map((propertyValue, propertyKey) => {
        if (isFirstLetterEqualsTo('$', propertyValue)) {
          return object[propertyValue];
        }

        return propertyValue;
      })(classValue);
    })
  );
