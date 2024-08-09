module.exports = {
  apps: [
    {
      name: "hoatho-backend", // pm2 start App name
      script: "dist/index.js",
      exec_mode: "cluster", // 'cluster' or 'fork'
      instance_var: "INSTANCE_ID", // instance variable
      instances: 2, // pm2 instance count
      autorestart: true, // auto restart if process crash
      watch: false, // files change automatic restart
      ignore_watch: ["node_modules", "logs"], // ignore files change
      max_memory_restart: "1G", // restart if process use more than 1G memory
      merge_logs: true, // if true, stdout and stderr will be merged and sent to pm2 log
      output: "./logs/access.log", // pm2 log file
      error: "./logs/error.log", // pm2 error log file
      env: {
        NODE_ENV: "production",
        PORT: 8888,
        DB_HOST: "localhost",
        DB_PORT: 27017,
        DB_DATABASE: "hoatho",
        SECRET_KEY: "hoatho",
        JWT_EXPIRATION: 3600,
        LOG_FORMAT: "combined",
        LOG_DIR: "../logs",
        ORIGIN: "*",
        CREDENTIALS: true,
      },
    },
  ],
};
