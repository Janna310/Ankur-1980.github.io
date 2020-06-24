const awsEnv = require("./aws.env");

const { Pool } = require("pg");

const aws_credentials = new Pool({
  user: awsEnv.AWS_USER,
  password: awsEnv.AWS_PASSWORD,
  host: awsEnv.AWS_HOST,
  port: awsEnv.AWS_PORT,
  database: awsEnv.AWS_DB,
  ssl: awsEnv.AWS_SSL,
});

module.exports = aws_credentials;
