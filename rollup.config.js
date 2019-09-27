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
      '@lykmapipo/common',
      '@lykmapipo/env',
      'jwt-decode',
    ],
    output: [
      {
        file: pkg.main,
        format: 'cjs',
        interop: false,
        esModule: false,
        preferConst: true,
        strict: true,
      },
      { file: pkg.module, format: 'es' },
    ],
  },
];
