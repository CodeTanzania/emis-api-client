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

