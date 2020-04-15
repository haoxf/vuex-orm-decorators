import { Plugin } from 'vuex';
import { Model } from '@vuex-orm/core';
export declare class ORMDatabase {
    private static _ormDatabase;
    private static _installed;
    static install(): Plugin<any>;
    static registerEntity(model: typeof Model): void;
}
