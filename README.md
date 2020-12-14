# ald2uma
阿拉丁小游戏适配器

首先升级友盟小游戏sdk >=2.5.2;
```sh
npm install ald2uma --save
```
```js
import ald2uma from 'ald2uma';
/**
 * 自动适配阿拉丁
 * @param {object} context 当前小游戏顶级对象
 * @param {object} uma 友盟sdk的uma对象
 * @returns {arrary}  [context, uma]
 */
ald2uma.hookAld(wx,ald2uma.uma);
```
## 注意事项 
### 两者共存
代码内自动检测是否包含阿拉丁sdk,如果包含会劫持阿拉丁sdk，以实现自动适配，需要修改阿拉丁sdk的源码,将writable设置为true,以方便sdk劫持
### 直接替换
直接使用本插件替换阿拉丁sdk，项目源码中调用方法会自动转换到友盟的sdk
