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

## Options
 - `include`: function with `ctx` as argument and returning `bool` indicating whether to do log request
 - `exclude`: function with `ctx` as argument and returning `bool` indicating whether to not log request
