const { Client } = require('pg');

const client = new Client({
  host: 'localhost',
  port: 5432,
  user: 'root',
  password: 'root',
  database: 'mycontacts',
});

client.connect();

console.log('Connection with DB established');

exports.query = async (query, values) => {
  const { rows } = await client.query(query, values); // result
  return rows; // result.rows;
};
