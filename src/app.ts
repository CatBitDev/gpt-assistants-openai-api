import { Envs } from '@config/plugins'
import { Server } from '@presentation/server'
import { AppRoutes } from '@presentation/routes'
import { MongoDatabase } from '@data/mongo/'
;(async () => {
  main()
})()

async function main() {
  await MongoDatabase.connect({
    dbName: Envs.MONGO_DB_NAME,
    mongoUrl: Envs.MONGO_URL,
  })

  const server = new Server({
    port: Envs.PORT,
    routes: AppRoutes.routes,
  })
  server.start()
}
