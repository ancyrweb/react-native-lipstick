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
        ...nextObj,
        ...resolveInherits(key, obj),
      }
    }

    return nextObj;
  }

  if (!obj[name])
    return {};

  const { $inherits, ...restVal } = obj[name];
  return {
    ...restVal,
    ...resolveInherits($inherits, obj),
  }
}

function inherits(val, key, obj) {
  if (val.$inherits) {
    const { $inherits, ...restVal } = val;
    return {
      ...restVal,
      ...resolveInherits($inherits, obj)
    }
  }

  return val;
}

export default () => map(inherits)
