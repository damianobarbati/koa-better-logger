import request from 'supertest';
import koa from 'koa';
import log from './index.js';

describe('log', () => {
    it('logs', async () => {
        const app = new koa();
        app.use(log());
        app.use(ctx => ctx.body = 'foobar');

        const spy = spyOn(console, 'log').and.callThrough();
        await request(app.listen()).get('/');
        expect(spy).toHaveBeenCalledWith('ciao');
    });

    it('does not log', async () => {
        const app = new koa();
        app.use(log({ exclude: ctx => ctx.path.includes('healthcheck') }));
        app.use(ctx => ctx.body = 'foobar');

        const spy = spyOn(console, 'log').and.callThrough();
        await request(app.listen()).get('/healthcheck');
        expect(spy).toHaveBeenCalledWith('ciao');
    });
});
