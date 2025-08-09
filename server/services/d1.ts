let d1Database: any = null

export const getD1Database = () => {
  if (d1Database) return d1Database

  try {
    // Use NuxtHub's hubDatabase() for D1 connection - available globally in NuxtHub
    d1Database = (globalThis as any).hubDatabase()
    return d1Database
  } catch (error) {
    console.error('Failed to connect to D1 database:', error)
    throw new Error('D1 database connection failed. Make sure your Cloudflare D1 database is configured.')
  }
}

// Utility functions for D1 operations
export const d1Execute = async (query: string, params: any[] = []) => {
  const db = getD1Database()
  return await db.prepare(query).bind(...params).run()
}

export const d1Query = async <T = any>(query: string, params: any[] = []): Promise<T[]> => {
  const db = getD1Database()
  const result = await db.prepare(query).bind(...params).all()
  return result.results as T[]
}

export const d1QueryFirst = async <T = any>(query: string, params: any[] = []): Promise<T | null> => {
  const db = getD1Database()
  return await db.prepare(query).bind(...params).first() as T | null
}

export const d1Batch = async (statements: Array<{ query: string; params?: any[] }>) => {
  const db = getD1Database()
  const prepared = statements.map(({ query, params = [] }) => 
    db.prepare(query).bind(...params)
  )
  return await db.batch(prepared)
}

export default getD1Database