import { compose, forEach } from '../utils';

/**
 * MultiSelectorsPlugin
 * ---------------------
 * Allows using selectors to push some properties to multiple blocks =
 * {
 *  container: {
 *    backgroundColor: "red",
 *  },
 *  block: {
 *    backgruondColor: "blue",
 *  },
 *  'container|block': {
 *    borderWidth: 1,
 *  }
 * }
 * =>
 * {
 *  container: {
 *    backgroundColor: "red",
 *    borderWidth: 1,
 *  },
 *  block: {
 *    backgroundColor: "blue",
 *    borderWidth: 1,
 *  }
 * }
 * @return {function}
 */
export default () => {
  return compose(object => {
    const out = {};
    forEach((value, key, object) => {
      // The properties without "|" are simply copied
      if (key.indexOf('|') < 0) {
        out[key] = value;
        return;
      }

      const keys = key.split('|');
      keys.forEach(key => {
        if (!out[key]) {
          out[key] = value;
        } else {
          out[key] = { ...out[key], ...value };
        }
      });
    }, object);
    return out;
  });
};
