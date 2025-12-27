module.exports = {
  apps: [{
    name: 'inspir-nextjs',
    script: 'npm',
    args: 'start',
    cwd: '/root/inspir/nextjs-seo',
    env: {
      PORT: 3001,
      NODE_ENV: 'production'
    },
    max_memory_restart: '500M',
    error_file: '/root/.pm2/logs/inspir-nextjs-error.log',
    out_file: '/root/.pm2/logs/inspir-nextjs-out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    autorestart: true,
    max_restarts: 10,
    min_uptime: '10s'
  }]
};
