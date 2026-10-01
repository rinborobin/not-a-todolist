import { readFile } from 'node:fs/promises';
import mysql from 'mysql2/promise';

const databaseName = process.env.MYSQL_DATABASE || 'todo_app';

if (!/^[A-Za-z0-9_$]+$/.test(databaseName)) {
  throw new Error('MYSQL_DATABASE must be a valid MySQL database name');
}

const databaseIdentifier = `\`${databaseName}\``;

function useConfiguredDatabase(sql) {
  return sql.replaceAll('todo_app', databaseName);
}

export default async function connectToDatabase() {
  const connection = await mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    port: Number(process.env.MYSQL_PORT || 3306),
    multipleStatements: true
  });

  try {
    const [schemaFile, seedFile] = await Promise.all([
      readFile(new URL('./schema.sql', import.meta.url), 'utf8'),
      readFile(new URL('./seed.sql', import.meta.url), 'utf8')
    ]);

    const [databaseRows] = await connection.query(
      'SELECT SCHEMA_NAME FROM information_schema.SCHEMATA WHERE SCHEMA_NAME = ?',
      [databaseName]
    );

    if (databaseRows.length === 0) {
      await connection.query(useConfiguredDatabase(schemaFile));
    } else {
      const [tableRows] = await connection.query(
        'SELECT COUNT(*) AS tableCount FROM information_schema.TABLES WHERE TABLE_SCHEMA = ?',
        [databaseName]
      );

      if (Number(tableRows[0].tableCount) === 0) {
        await connection.query(useConfiguredDatabase(schemaFile));
      }
    }

    await connection.query(`USE ${databaseIdentifier}`);

    const [userRows] = await connection.query('SELECT COUNT(*) AS userCount FROM users');
    if (Number(userRows[0].userCount) === 0) {
      await connection.query(useConfiguredDatabase(seedFile));
      console.log('Database seed completed.');
    }

    console.log('Connected to MySQL successfully!');
    return connection;
  } catch (error) {
    await connection.end();
    throw error;
  }
}
