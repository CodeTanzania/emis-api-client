#### 0.6.0 (2019-01-29)

##### New Features

*  add alert source http actions ([4b9ac10b](https://github.com/CodeTanzania/emis-api-client/commit/4b9ac10b0db0a5a2cec80dfc40317e01ef15f938))

#### 0.5.1 (2019-01-28)

##### Chores

*  force latest dependencies ([cfbd88ad](https://github.com/CodeTanzania/emis-api-client/commit/cfbd88ade1a7767561a2b69d52fa97d4d165cb8a))

##### New Features

*  add default sort by updatedAt descending on api calls ([c5c6f04e](https://github.com/CodeTanzania/emis-api-client/commit/c5c6f04e43a613b22c7f582a99641ec136fc1714))

#### 0.5.0 (2019-01-26)

##### New Features

*  allow from(>=) and to(<=) date filter ([1ee2d200](https://github.com/CodeTanzania/emis-api-client/commit/1ee2d2009b2459ea1399bce7dbae9be9164deb64))
*  allow min(<=) and max(>=) filter on number ([06fe49c1](https://github.com/CodeTanzania/emis-api-client/commit/06fe49c10b91ab18fdfc3f20687096fcaac0e7ec))
*  add bate between & range filter prepare ([8ef5637f](https://github.com/CodeTanzania/emis-api-client/commit/8ef5637fae85bbb3e57bf1f45b0c58fd88ff538d))
*  add prepare params for get requests ([bea8fdbb](https://github.com/CodeTanzania/emis-api-client/commit/bea8fdbbc19df2a354597a324c07506069761422))

##### Code Style Changes

*  add prepareParams number range jsdoc example ([835f7e82](https://github.com/CodeTanzania/emis-api-client/commit/835f7e8214ce3ff6563e7607ffff5d7d29b0b5de))
*  add valid jdocs on HEADERS & CONTENT_TYPE ([7304fe73](https://github.com/CodeTanzania/emis-api-client/commit/7304fe732ba593489c7482800eccdd5648ac08ce))

#### 0.4.0 (2019-01-26)

##### Chores

*  switch git add . to git add -A ([23fb8d6e](https://github.com/CodeTanzania/emis-api-client/commit/23fb8d6e88450feba92e1597678b4ddbf1e16895))

##### New Features

*  add getSchemas to fetch /v1/schemas of api ([5e08bd88](https://github.com/CodeTanzania/emis-api-client/commit/5e08bd889fd73fbe7a11aa50c0b0462a04df0105))

#### 0.3.1 (2019-01-25)

##### Chores

*  add code linting before commit ([8ae1f38d](https://github.com/CodeTanzania/emis-api-client/commit/8ae1f38da9835a46ed874d3d8fcf8a581a5b2b6a))
*  add commit lint hook ([9f43d169](https://github.com/CodeTanzania/emis-api-client/commit/9f43d1692411985a566ac3ba3ffd3930e7870de9))

##### New Features

*  expose incident resource actions ([9128b036](https://github.com/CodeTanzania/emis-api-client/commit/9128b036f7ea89e59ff7736744765d61430d703f))

#### 0.3.0 (2019-01-23)

##### Chores

*  force lateste dependencies & audit fix ([de834d43](https://github.com/CodeTanzania/emis-api-client/commit/de834d434e3a5ccf8cb761cffede76db0226212d))

##### New Features

* **stakeholder:**  add alias to parties functions ([d18b114f](https://github.com/CodeTanzania/emis-api-client/commit/d18b114f807e730c6eacaa039e95fb59ba65152e))

#### 0.2.0 (2019-01-21)

##### New Features

*  impliment parallel request helpers ([e939fe63](https://github.com/CodeTanzania/emis-api-client/commit/e939fe63d76d17542f681dbbf86e14fb74a043d8))

#### 0.1.2 (2019-01-14)

##### Bug Fixes

*  ReferenceError: process is not defined in react ([7a58433f](https://github.com/CodeTanzania/emis-api-client/commit/7a58433f938cbe0f7aff53fe7eef8c6072c58c3d))

#### 0.1.0 (2019-01-12)

##### Documentation Changes

* **readme.md:**  update usage docs ([20017077](https://github.com/CodeTanzania/emis-api-client/commit/20017077568bc6a83c93673ea73592aede53a35f))
* ***:**  update usage docs ([ea68eefd](https://github.com/CodeTanzania/emis-api-client/commit/ea68eefd09216e228b9ac3a9c1b1ef39730a7efd))

##### New Features

* **index.js:**  export resource named http actions ([e8215873](https://github.com/CodeTanzania/emis-api-client/commit/e821587387d8a5c30fb91bf7a93c287c787c6b67))
* **client.js:**
  *  implement createHttpActionFor per resource ([c9b4b576](https://github.com/CodeTanzania/emis-api-client/commit/c9b4b57646ba9e3bb53010f58baeb9c35e0d9b74))
  *  implement delete http shortcut ([0bbc1896](https://github.com/CodeTanzania/emis-api-client/commit/0bbc1896810491feb471b2e8ec62ca7a7e91113f))
  *  implement put & patch http shortcuts ([b7845db9](https://github.com/CodeTanzania/emis-api-client/commit/b7845db98ac1d0d10785996f708e6287366b97dd))
  *  implement http post shortcut ([e464bc8c](https://github.com/CodeTanzania/emis-api-client/commit/e464bc8caf632e4055c07c502a92e3cb88821a3b))
  *  implement http get ([285ac98f](https://github.com/CodeTanzania/emis-api-client/commit/285ac98ff7acb9a270a5c2b8289d65204e11db9c))
  *  add disposeHttpClient for cleanups ([bd524519](https://github.com/CodeTanzania/emis-api-client/commit/bd5245195a9ee6a9456d703339f7ccf51404cf60))
  *  implement createHttpClient ([398434a1](https://github.com/CodeTanzania/emis-api-client/commit/398434a103fea3b5310b87d683b998a6b1ad8602))

##### Other Changes

*  Update usage section ([ea8e9aea](https://github.com/CodeTanzania/emis-api-client/commit/ea8e9aea5e52f1a7f3adbe6c33f20ba995446c03))
*  Update readme ([97b34d0c](https://github.com/CodeTanzania/emis-api-client/commit/97b34d0cf2b2ef41d8b7a34e62039fb30a26833c))

##### Performance Improvements

* **client.js:**
  *  reject early if no payload on post, put & patch ([b0057fa5](https://github.com/CodeTanzania/emis-api-client/commit/b0057fa5aa197624ab63b91451fd03152325f6fa))
  *  skip options creation if client instance already exists ([d5c3d4b4](https://github.com/CodeTanzania/emis-api-client/commit/d5c3d4b43460e4e199737f94dc6e6d5441887f05))

##### Tests

* **client.spec.js:**
  *  improve generated action test ([d3d9ab25](https://github.com/CodeTanzania/emis-api-client/commit/d3d9ab250ae6300eefc8b1751d2603852ebc386e))
  *  improve get specs ([87b58f6a](https://github.com/CodeTanzania/emis-api-client/commit/87b58f6a9ccbcd19e77eda90b4838e47d60442d0))
  *  ensure client is not re-created ([76a21bcf](https://github.com/CodeTanzania/emis-api-client/commit/76a21bcf4cdbeeadd42756b3894e30093491bbff))

