import { d1Query, d1Execute } from '~/server/services/d1'

export default defineEventHandler(async (event) => {
  try {
    // Example: Create a simple table and insert/query data
    
    // Create a test table
    await d1Execute(`
      CREATE TABLE IF NOT EXISTS test_users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `)
    
    // Insert test data
    await d1Execute(
      'INSERT OR IGNORE INTO test_users (name, email) VALUES (?, ?)',
      ['Test User', 'test@example.com']
    )
    
    // Query data
    const users = await d1Query('SELECT * FROM test_users LIMIT 10')
    
    return {
      success: true,
      message: 'D1 database connection successful',
      data: users
    }
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'D1 database error: ' + error.message
    })
  }
})