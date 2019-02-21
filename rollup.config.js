import pkg from './package.json';

export default [
  {
    input: 'src/index.js',
    external: [
      'axios',
      'axios/lib/helpers/buildURL',
      'inflection',
      'lodash',
      'moment',
    ],
    output: [
      { file: pkg.main, format: 'cjs' },
      { file: pkg.module, format: 'es' },
    ],
  },
];
