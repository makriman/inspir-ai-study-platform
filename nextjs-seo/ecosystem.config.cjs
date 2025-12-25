module.exports = {
  apps: [{
    name: 'inspir-nextjs',
    script: 'npm',
    args: 'start',
    cwd: '/root/inspir/nextjs-seo',
    instances: 1,
    exec_mode: 'fork',
    autorestart: true,
    watch: false,
    max_memory_restart: '500M',
    env: {
      NODE_ENV: 'production',
      PORT: 3001
    },
    error_file: '/root/inspir/nextjs-seo/logs/error.log',
    out_file: '/root/inspir/nextjs-seo/logs/out.log',
    log_file: '/root/inspir/nextjs-seo/logs/combined.log',
    time: true
  }]
}
