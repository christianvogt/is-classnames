# is-Classnames

[![npm version](https://img.shields.io/npm/v/is-classnames.svg?style=flat-square)](https://www.npmjs.com/package/is-classnames)
[![Build Status](https://travis-ci.org/christianvogt/is-classnames.svg?branch=master)](https://travis-ci.org/christianvogt/is-classnames#)

A simple utility for conditionally joining classNames together with the addition of modifier className prefixing.

Install with [npm](https://www.npmjs.com/):

npm:
```sh
npm install is-classnames --save
```

## Usage

The API and functionality are based on the the [classnames](https://github.com/JedWatson/classnames) library.

This library supports the creation of classNames that is very similar to BEM and borrows notation from SUIT CSS. The difference lies in how modifier rules are expressed. Modifiers are prefixed with `is-` followed by the short adjective.

BEM: `library-button--disabled`

Ours: `library-button.is-disabled`

### Auto-Prefixing

Unlike the [classnames](https://github.com/JedWatson/classnames) library, classNames without a hyphen are assumed to be state modifiers and are therefore prefixed with `is-`. ClassNames with a hyphen are assumed to be qualified block or element level classes.

```js
import cx from 'is-classnames';
const size = 'small';
const disabled = true;
cx('library-button', size, { disabled }); // => 'library-button is-small is-disabled'
```

### Always Prefix

If performance is a concern over the convenience of the auto-prefixing functionality, `is-classnames` also exports a `prefix` function
that always applies the prefix as well as a `classNames` function that never applies the prefix. The resulting className is the same, but saves having to check every string for the presences of a hyphen.

```js
import { classNames as cx, prefix } from 'is-classnames';
const size = 'small';
const disabled = true;
cx('library-button', prefix(size, { disabled })); // => 'library-button is-small is-disabled'
```

### Custom Prefix

This library exports a factory function for creating an instance which uses a custom prefix. The prefix argument must contain a hyphen.

```js
import { create } from 'is-classnames';
const cx = create('foo-');
const { prefix } = cx;
const size = 'small';
const disabled = true;
cx('library-button', size, { disabled }); // => 'library-button foo-small foo-disabled'
cx('library-button', cx.prefix(size, { disabled })); // => 'library-button foo-small foo-disabled'
```
