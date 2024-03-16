module.exports = {
    apps: [
        {
            name: 'pivot',
            exec_mode: 'cluster',
            instances: 'max', // Or a number of instances
            script: './node_modules/nuxt/bin/nuxt.mjs',
            args: 'start',
            // pm2 start ecosystem.config.js
            env: {
                HOST: 'localhost',
                PORT: 3000,
                NODE_ENV: 'development'
            },
            env_production: {
                HOST: 'pivot410official.com',
                PORT: 3000,
                NODE_ENV: 'production'
            },
            output: './logs/console.log',
            error: './logs/consoleError.log'
        },


    ]
}
