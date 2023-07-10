module.exports = {
  apps: [
    {
      name: "JCWDOL0911", // Format JCWD-{batchcode}-{groupnumber}
      script: "./projects/server/src/index.js",
      env: {
        NODE_ENV: "production",
        PORT: 8911,
      },
      time: true,
    },
  ],
};
