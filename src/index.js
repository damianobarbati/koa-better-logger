import prettyDuration from 'pretty-ms';
import prettySize from 'prettysize';

const { npm_package_name: name, npm_package_version: version } = process.env;

export default ({ logger = console.log, logWith, json = true, pretty = true, include, exclude } = {}) => async (ctx, next) => {
    const toLog = (!include || include(ctx)) && (!exclude || !exclude(ctx));
    if (!toLog)
        return next();

    const start = Date.now();

    try {
        await next();
    }
    finally {
        const time = new Date().toISOString();
        const timestamp = new Date().getTime();
        const ip = ctx.ips.length > 0 ? ctx.ips[0] : ctx.ip;
        const method = ctx.method;
        const url = ctx.originalUrl;
        const duration = pretty ? prettyDuration(Date.now() - start) : Date.now() - start;
        const bytes = pretty ? prettySize(ctx.response.length, { nospace: true, one: true }) : bytes;
        const status = ctx.status;

        const customInfo = logWith ? logWith(ctx) : {};

        let info = { time, timestamp, name, version, ip, method, url, status, bytes, duration, ...customInfo };
        info = json ? JSON.stringify(info) : info;

        logger(info);
    }
};
