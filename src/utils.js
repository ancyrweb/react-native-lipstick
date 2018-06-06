export const curry = (fn, ...oldArgs) => (...newArgs) => {
  const args = [...oldArgs, ...newArgs];
  return args.length < fn.length ? curry(fn, ...args) : fn(...args);
};

export const compose = (...fns) =>
  fns.reduce((f, g) => (...args) => f(g(...args)));

export const pipe = (...fns) => compose.apply(compose, fns.reverse());

export const map = curry((fn, object) => {
  if (Array.isArray(object)) {
    return object.map(fn);
  }

  const out = {};
  Object.keys(object).forEach(key => {
    out[key] = fn(object[key], key, object);
  });
  return out;
});

export const filter = curry((fn, object) => {
  const out = {};
  Object.keys(object).forEach(key => {
    if (fn(object[key], key, object)) {
      out[key] = object[key];
    }
  });
  return out;
});
export const forEach = curry((fn, object) => {
  Object.keys(object).forEach(key => {
    fn(object[key], key, object);
  });
});

export const isFirstLetterEqualsTo = curry(
  (character, item) => typeof item === 'string' && item.charAt(0) === character
);

export const isObject = obj => typeof obj === 'object' && obj !== null;
export const isString = obj => typeof obj === 'string';

export const deepMap = curry((fn, obj) => {
  if (isObject(obj)) {
    return map(
      (val, key) => (isObject(val) ? deepMap(fn, val) : fn(val, key)),
      obj
    );
  }

  return obj;
});

export default {
  curry,
  compose,
  pipe,
  map,
  filter,
  forEach,
  isFirstLetterEqualsTo,
  isObject,
  isString,
  deepMap
};
