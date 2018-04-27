import babel from 'rollup-plugin-babel';
import minify from 'rollup-plugin-babel-minify';

const { main } = require('./package.json');

export default {
  input: 'index.js',
  plugins: [
    babel({ exclude: 'node_modules/**' }),
    minify({ comments: false })
  ],
  output: [
    {
      file: main,
      format: 'cjs',
      sourceMap: true,
    },
  ],
};
