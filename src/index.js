const { npm_package_name: name, npm_package_version: version } = process.env;

export default ({ logger = console.log, include, exclude } = {}) => async (ctx, next) => {
    const toLog = (!include || include(ctx)) && (!exclude || !exclude(ctx));
    if (!toLog)
        return next;

    const start = Date.now();

    try {
        await next();
    }
    finally {
        const time = new Date().toISOString();
        const timestamp = new Date().getTime();
        const ip = ctx.ips.length > 0 ? ctx.ips[ctx.ips.length - 1] : ctx.ip;
        const method = ctx.method;
        const url = ctx.originalUrl;
        const duration = Date.now() - start + 'ms';
        const bytes = ctx.response.length;
        const status = ctx.status;

        logger({ time, timestamp, name, version, ip, method, url, status, bytes, duration });
    }
};
