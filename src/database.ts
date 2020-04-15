import { Plugin, Store } from 'vuex'

import VuexORM, { Container, Database, Model } from '@vuex-orm/core'

export class ORMDatabase {
  private static _ormDatabase = new VuexORM.Database()
  private static _installed = <typeof Model[]>[]

  public static install(): Plugin<any> {
    const plugin = VuexORM.install(ORMDatabase._ormDatabase)
    return (store: Store<any>) => {
      Container.register((store as any) as Database)
      plugin(store)
    }
  }

  public static registerEntity(model: typeof Model) {
    if (this._installed.indexOf(model) !== -1) {
      // console.error(`Unable to register entity ${model.name}.  Entity already registered.`)
      return
    }
    ORMDatabase._ormDatabase.register(model)
  }
}
