
// db.js
import mysql from 'mysql2/promise';
async function connectToDatabase() {
  try {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'your_username',
      password: '',
      database: 'your_database_name',
      port: 3306 // Default MySQL port
    });

    console.log('Connected to MySQL successfully!');

    // Run a sample query
    const [rows, fields] = await connection.execute('SELECT 1 + 1 AS solution');
    console.log('The solution is: ', rows[0].solution);

    // Always close the connection when done
    await connection.end();

  } catch (error) {
    console.error('Error connecting to the database:', error.message);
  }
}

export default connectToDatabase();
