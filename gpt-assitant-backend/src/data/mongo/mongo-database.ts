import mongoose, { Connection } from 'mongoose'

interface ConnectionOptions {
  mongoUrl: string
  dbName: string
}

export class MongoDatabase {
  private static connections: Map<string, Connection> = new Map()

  static async connect(options: ConnectionOptions): Promise<Connection> {
    const { mongoUrl, dbName } = options

    if (this.connections.has(dbName)) {
      return this.connections.get(dbName)!
    }

    return new Promise((resolve) => {
      try {
        const connection = mongoose.createConnection(mongoUrl, {
          dbName: dbName,
        })

        connection.on('connected', () => {
          this.connections.set(dbName, connection)
          resolve(connection)
        })

        connection.on('error', (error) => {
          console.error(`Error connecting to database: ${error}`)
          throw error
        })
      } catch (error) {
        console.error(`Error connecting to database: ${error}`)
        throw error
      }
    })
  }

  static getConnection(dbName: string): Connection | undefined {
    return this.connections.get(dbName)
  }

  static async disconnect(dbName: string): Promise<boolean> {
    if (!dbName) return false

    const connection = this.connections.get(dbName)
    if (connection) {
      await connection.close()
      this.connections.delete(dbName)
      return true
    }

    return false
  }
}
