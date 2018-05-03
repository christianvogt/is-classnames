function factory(prefix, force) {

  if (prefix != null && prefix.length > 0 && prefix.indexOf('-') === -1) {
    throw new Error('is-classnames prefix must contain a hyphen.');
  }

  const addPrefix = prefix == null || prefix.length === 0 ? (cls) => (cls) :
    (cls) => (!force && (cls.length === 0 || cls.indexOf('-') >= 0) ? cls : `${prefix}${cls}`);

  function process(...args) {
    const classes = [];

    args.forEach((arg) => {

      if (!arg) {
        return;
      }

      const argType = typeof arg;

      if (argType === 'string' || argType === 'number') {
        classes.push(addPrefix(arg));

      } else if (Array.isArray(arg)) {
        const inner = process(...arg);
        if (inner) {
          classes.push(inner);
        }

      } else if (argType === 'object') {
        Object.keys(arg).forEach(key => {
          if (key && arg[key]) {
            classes.push(addPrefix(key));
          }
        });
      }
    });

    return classes.join(' ');
  }

  return process;
}

// export factory function to create instance with custom prefix
export const create = (prefix) => {
  const fn = factory(prefix);
  fn.prefix = factory(prefix, true);
  return fn;
};

// export non-prefixing function
export const classNames = factory();

// export prefixing function
export const prefix = factory('is-', true);

// export default classnames function with prefix === 'is-'
export default factory('is-');
