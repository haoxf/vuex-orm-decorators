import { Plugin } from 'vuex'

import VuexORM, { Container, Model } from '@vuex-orm/core'

export class ORMDatabase {
  private static _ormDatabase = new VuexORM.Database()
  private static _installed = <typeof Model[]>[]

  public static install(): Plugin<any> {
    Container.register(ORMDatabase._ormDatabase)
    return VuexORM.install(ORMDatabase._ormDatabase)
  }

  public static registerEntity(model: typeof Model) {
    if (this._installed.indexOf(model) !== -1) {
      // console.error(`Unable to register entity ${model.name}.  Entity already registered.`)
      return
    }
    ORMDatabase._ormDatabase.register(model)
  }
}
