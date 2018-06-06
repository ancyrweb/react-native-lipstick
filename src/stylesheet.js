import { StyleSheet as DefaultStyleSheet } from 'react-native';
import { pipe } from './utils';

import globalVariablesPlugin from './plugins/globalVariablesPlugin';
import multiSelectorsPlugin from './plugins/multiSelectorsPlugin';
import scalePlugin from './plugins/scalePlugin';

/**
 * The plugin system is a fairly simple one :
 * it consist of piping plugins one after an other.
 * Every plugin takes an object style as an input and return
 * an other object style as its output.
 *
 * We use the initial parse style as an initial object because
 * it might be reset (in tests for example).
 */
let initialParseStyle = pipe(
  multiSelectorsPlugin(),
  globalVariablesPlugin(),
  scalePlugin()
);

let parseStyle = initialParseStyle;

const StyleSheet = {
  /**
   * Creates a parsed style
   * @param  {Object} obj the original style to pass
   * @return {Object}     the native style
   */
  create: obj => {
    return DefaultStyleSheet.create(parseStyle(obj));
  },

  /**
   * Adds a plugin
   * @param {function} plugin the plugin to add
   */
  addPlugin: plugin => {
    parseStyle = pipe(plugin, parseStyle);
  },

  /**
   * Reset the StyleSheet
   */
  reset: () => {
    parseStyle = initialParseStyle;
  }
};

export default StyleSheet;
