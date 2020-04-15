import VuexORM, { Container } from '@vuex-orm/core';
var ORMDatabase = /** @class */ (function () {
    function ORMDatabase() {
    }
    ORMDatabase.install = function () {
        var plugin = VuexORM.install(ORMDatabase._ormDatabase);
        return function (store) {
            Container.register(store);
            plugin(store);
        };
    };
    ORMDatabase.registerEntity = function (model) {
        if (this._installed.indexOf(model) !== -1) {
            // console.error(`Unable to register entity ${model.name}.  Entity already registered.`)
            return;
        }
        ORMDatabase._ormDatabase.register(model);
    };
    ORMDatabase._ormDatabase = new VuexORM.Database();
    ORMDatabase._installed = [];
    return ORMDatabase;
}());
export { ORMDatabase };
//# sourceMappingURL=database.js.map