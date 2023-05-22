module.exports = {
  apps: [
    {
      name: "my-app",
      script: "node_modules/serve/bin/serve",
      args: "-s build",
      watch: true,
      env_production: {
        NODE_ENV: "production",
      },
      env_development: {
        NODE_ENV: "development",
      },
      instances: 2,
      exec_mode: "cluster",
    },
  ],
};
