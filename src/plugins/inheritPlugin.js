import {
  compose,
  filter,
  isFirstLetterEqualsTo,
  map,
  isObject
} from '../utils';

function resolveInherits(name, obj) {
  if (!name)
    return {};

  if (Array.isArray(name)) {
    let nextObj = {};
    for (let key of name) {
      nextObj = {
        ...resolveInherits(key, obj),
        ...nextObj,
      }
    }

    return nextObj;
  }

  if (!obj[name])
    return {};

  const { $inherits, ...restVal } = obj[name];
  return {
    ...resolveInherits($inherits, obj),
    ...restVal,
  }
}

function inherits(val, key, obj) {
  if (val.$inherits) {
    const { $inherits, ...restVal } = val;
    return {
      ...resolveInherits($inherits, obj),
      ...restVal,
    }
  }

  return val;
}

export default () => map(inherits)
