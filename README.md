# koa-better-log

Koa middleware logging requests.

## Usage

Install:
```bash
yarn add koa-better-log
```

Usage:
```javascript
import koa from 'koa';
import log from 'koa-better-log';

const app = new koa()
app.use(log());
```

Output:
```bash
curl localhost

{
  time: '2020-07-18T19:36:12.079Z',
  timestamp: 1595100972079,
  name: 'webapp',
  version: '1.0.0',
  ip: '::1',
  method: 'GET',
  url: '/?fingerprint=23',
  status: 200,
  bytes: '709B',
  duration: '1ms'
}
```

## Options
- `pretty`: boolean to enable or disable pretty formatting of duration and size, default is `true`
- `logger`: function to log info with, default is `console.log`
- `json`: boolean to enable logging as json output, default is `true`
- `logWith`: function receiving `ctx` as argument and returning additional properties to log
- `include`: function receiving `ctx` as argument and returning `bool` indicating whether to do log request
- `exclude`: function receiving `ctx` as argument and returning `bool` indicating whether to not log request
