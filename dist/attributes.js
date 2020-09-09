import { Model } from '@vuex-orm/core';
/**
 * Sets the property as the primary key of the model
 */
export function PrimaryKey() {
    return function (target, propertyName) {
        var that = target.constructor;
        that._primaryKey = that._primaryKey || [];
        that._primaryKey.push(propertyName);
    };
}
/**
 * Adds the property as a model field
 * @param fieldType The field attribute
 */
export function Field(fieldType) {
    return function (target, propertyName) {
        var that = target.constructor;
        that._fields = that._fields || {};
        that._fields[propertyName] = fieldType;
    };
}
/**
 * Adds the property as a string typed field
 * @param defaultValue The default value for the field (if undefined the default will be '')
 */
export function StringField(defaultValue) {
    return Field(function () { return Model.string(defaultValue || ''); });
}
/**
 * Adds the property as an incremental field
 */
export function IncrementField() {
    return Field(function () { return Model.increment(); });
}
/**
 * Adds the property as a generic attribute field
 * @param defaultValue The default value for the field (if undefined the default will be '')
 */
export function AttrField(defaultValue) {
    return Field(function () { return Model.attr(defaultValue); });
}
/**
 * Adds the property as a number typed field
 * @param defaultValue The default value for the field (if undefined the default will be 0)
 */
export function NumberField(defaultValue) {
    return Field(function () { return Model.number(defaultValue || 0); });
}
/**
 * Adds the property as a boolean typed field
 * @param defaultValue The default value for the field (if undefined the default will be FALSE)
 */
export function BooleanField(value, mutator) {
    return Field(function () { return Model.boolean(value, mutator); });
}
/**
 * Adds the property as a boolean typed field
 * @param value The default value for the field (if undefined the default will be null)
 */
export function DateField(value, mutator) {
    // @ts-ignore
    return Field(function () { return Model.date(value, mutator); });
}
/**
 * Adds the property as a 'Has Many' relationship field
 * @param related The class of the related model
 * @param foreignKey The foreign key of the related model
 * @param localKey The local key on the parent model
 */
export function HasManyField(args) {
    return Field(function () {
        var params = args();
        return Model.hasMany(params.related, params.foreignKey, params.localKey);
    });
}
/**
 * Adds the property as a 'Has One' relationship field
 * @param related The class of the related model
 * @param foreignKey The foreign key of the related model
 * @param localKey The local key on the parent model
 */
export function HasOneField(args) {
    return Field(function () {
        var params = args();
        return Model.hasOne(params.related, params.foreignKey, params.localKey);
    });
}
/**
 * Adds the property as a 'Belongs To' relationship field
 * @param parent The class of the parent model
 * @param foreignKey The foreign key of this model
 * @param ownerKey The key on the parent model
 */
export function BelongsToField(args) {
    return Field(function () {
        var params = args();
        return Model.belongsTo(params.parent, params.foreignKey, params.ownerKey);
    });
}
export function HasManyByField(args) {
    return Field(function () {
        var params = args();
        return Model.hasManyBy(params.parent, params.foreignKey, params.ownerKey);
    });
}
export function HasManyThroughField(args) {
    return Field(function () {
        var params = args();
        return Model.hasManyThrough(params.related, params.through, params.firstKey, params.secondKey, params.localKey, params.secondLocalKey);
    });
}
export function BelongsToManyField(args) {
    return Field(function () {
        var params = args();
        return Model.belongsToMany(params.related, params.pivot, params.foreignPivotKey, params.relatedPivotKey, params.parentKey, params.relatedKey);
    });
}
export function MorphToField(args) {
    return Field(function () {
        var params = args();
        return Model.morphTo(params.id, params.type);
    });
}
export function MorphOneField(args) {
    return Field(function () {
        var params = args();
        return Model.morphOne(params.related, params.id, params.type, params.localKey);
    });
}
export function MorphManyField(args) {
    return Field(function () {
        var params = args();
        return Model.morphMany(params.related, params.id, params.type, params.localKey);
    });
}
export function MorphToManyField(args) {
    return Field(function () {
        var params = args();
        return Model.morphToMany(params.related, params.pivot, params.relatedId, params.id, params.type, params.parentKey, params.relatedKey);
    });
}
export function MorphedByManyField(args) {
    return Field(function () {
        var params = args();
        return Model.morphedByMany(params.related, params.pivot, params.relatedId, params.id, params.type, params.parentKey, params.relatedKey);
    });
}
//# sourceMappingURL=attributes.js.map