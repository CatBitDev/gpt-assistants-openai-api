import { Argv, Envs, LoggerPlugin } from '@config/plugins'
import { Server } from '@presentation/server'
import { AppRoutes } from '@presentation/routes'
import { MongoDatabase } from '@data/mongo'
import { RegistryDatasource } from '@infrastructure/datasources/registry.datasource'
import { LogRepositoryImpl } from './infrastructure/repositories'
;(async () => {
  main()
})()

async function main() {
  const assistantDbConnection = await MongoDatabase.connect({
    dbName: Envs.MONGO_DB_NAME_ASSISTANTS,
    mongoUrl: Envs.MONGO_URL,
  })

  const logsDbConnection = await MongoDatabase.connect({
    dbName: Envs.MONGO_DB_NAME_LOGS,
    mongoUrl: Envs.MONGO_URL,
  })

  RegistryDatasource.create({
    assistantDbConnection,
    logsDbConnection,
  })

  const { m: mode } = Argv
  const logger = await LoggerPlugin.create({
    logRepository: LogRepositoryImpl.instance,
  })

  const server = new Server({
    logger,
    mode,
    port: Envs.PORT,
    routes: AppRoutes.routes,
  })

  server.start()
}
