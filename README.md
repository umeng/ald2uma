# ald2uma
阿拉丁小程序适配器
```sh
npm install ald2uma --save
```
```js
import ald2uma from 'ald2uma';
/**
 * 自动适配阿拉丁
 * @param {object} context 当前小程序顶级对象
 * @param {object} uma 友盟sdk的uma对象
 * @returns {arrary}  [context, uma]
 */
ald2uma.hookAld(wx,ald2uma.uma);
```
