# EMIS API CLIENT (WIP)

[![Build Status](https://travis-ci.org/CodeTanzania/emis-api-client.svg?branch=develop)](https://travis-ci.org/CodeTanzania/emis-api-client)

This is the client for EMIS API, It exposes all the shortcuts that the API offers
through a client which can be used for browser and nodejs.

## Installation

```sh
npm install --save @codetanzani/emis-api-client
```

## Usage

For React application and ES6 usage

```js
import { getPlanSchema } from '@codetanzania/emis-api-client';
```

For Node application(commonjs)

```js
const { getPlanSchema } = require('@codetanzania/emis-api-client');
```

## Testing

If you want to test this library,

- first clone this repo
- Install all dependencies
  ```sh 
  npm install
  ```
- Run test
  ```sh 
  npm test
  ```

## How to contribute

It will be nice, if you open an issue first so that we can know what is going on, then, fork this repo and push in your ideas. Do not forget to add a bit of test(s) of what value you adding.

## LICENSE

MIT License

Copyright (c) 2018 Code Tanzania & Contributors

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
