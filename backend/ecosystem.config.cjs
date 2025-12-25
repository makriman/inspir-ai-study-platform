module.exports = {
  apps: [{
    name: 'inspir-backend',
    script: './server.js',
    cwd: '/root/inspir/backend',
    instances: 1,
    exec_mode: 'fork',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    error_file: '/root/inspir/backend/logs/error.log',
    out_file: '/root/inspir/backend/logs/out.log',
    log_file: '/root/inspir/backend/logs/combined.log',
    time: true,
    autorestart: true,
    max_restarts: 10,
    min_uptime: '10s',
    max_memory_restart: '500M'
  }]
};
