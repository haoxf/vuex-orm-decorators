import { Attribute, Model } from '@vuex-orm/core'
import Mutator from '@vuex-orm/core/lib/attributes/contracts/Mutator'

/**
 * Sets the property as the primary key of the model
 */
export function PrimaryKey() {
  return (target: Object, propertyName: string | symbol): void => {
    const that = target.constructor as { _primaryKey?: (string | symbol)[] }
    that._primaryKey = that._primaryKey || []
    that._primaryKey.push(propertyName)
  }
}

/**
 * Adds the property as a model field
 * @param fieldType The field attribute
 */
export function Field(fieldType: () => Attribute) {
  return (target: Object, propertyName: string | symbol): void => {
    const that = target.constructor as { _fields?: Record<string | symbol, () => Attribute> }
    that._fields = that._fields || {}
    that._fields[propertyName as string] = fieldType
  }
}

/**
 * Adds the property as a string typed field
 * @param defaultValue The default value for the field (if undefined the default will be '')
 */
export function StringField(defaultValue?: string) {
  return Field(() => Model.string(defaultValue || ''))
}

/**
 * Adds the property as an incremental field
 */
export function IncrementField() {
  return Field(() => Model.increment())
}

/**
 * Adds the property as a generic attribute field
 * @param defaultValue The default value for the field (if undefined the default will be '')
 */
export function AttrField(defaultValue?: any) {
  return Field(() => Model.attr(defaultValue))
}

/**
 * Adds the property as a number typed field
 * @param defaultValue The default value for the field (if undefined the default will be 0)
 */
export function NumberField(defaultValue?: number) {
  return Field(() => Model.number(defaultValue || 0))
}

/**
 * Adds the property as a boolean typed field
 * @param defaultValue The default value for the field (if undefined the default will be FALSE)
 */
export function BooleanField(value?: any, mutator?: Mutator<boolean | null>) {
  return Field(() => Model.boolean(value, mutator))
}

/**
 * Adds the property as a boolean typed field
 * @param value The default value for the field (if undefined the default will be null)
 */
export function DateField(value?: any, mutator?: Mutator<Date | null>) {
  // @ts-ignore
  return Field(() => Model.date(value, mutator))
}

/**
 * Adds the property as a 'Has Many' relationship field
 * @param related The class of the related model
 * @param foreignKey The foreign key of the related model
 * @param localKey The local key on the parent model
 */
export function HasManyField(args: () => { related: typeof Model | string; foreignKey: string; localKey?: string }) {
  return Field(() => {
    const params = args()
    return Model.hasMany(params.related, params.foreignKey, params.localKey)
  })
}

/**
 * Adds the property as a 'Has One' relationship field
 * @param related The class of the related model
 * @param foreignKey The foreign key of the related model
 * @param localKey The local key on the parent model
 */
export function HasOneField(args: () => { related: typeof Model | string; foreignKey: string; localKey?: string }) {
  return Field(() => {
    const params = args()
    return Model.hasOne(params.related, params.foreignKey, params.localKey)
  })
}

/**
 * Adds the property as a 'Belongs To' relationship field
 * @param parent The class of the parent model
 * @param foreignKey The foreign key of this model
 * @param ownerKey The key on the parent model
 */
export function BelongsToField(args: () => { parent: typeof Model | string; foreignKey: string; ownerKey?: string }) {
  return Field(() => {
    const params = args()
    return Model.belongsTo(params.parent, params.foreignKey, params.ownerKey)
  })
}

export function HasManyByField(args: () => { parent: typeof Model | string; foreignKey: string; ownerKey?: string }) {
  return Field(() => {
    const params = args()
    return Model.hasManyBy(params.parent, params.foreignKey, params.ownerKey)
  })
}

export function HasManyThroughField(
  args: () => {
    related: typeof Model | string
    through: typeof Model | string
    firstKey: string
    secondKey: string
    localKey?: string
    secondLocalKey?: string
  }
) {
  return Field(() => {
    const params = args()
    return Model.hasManyThrough(
      params.related,
      params.through,
      params.firstKey,
      params.secondKey,
      params.localKey,
      params.secondLocalKey
    )
  })
}

export function BelongsToManyField(
  args: () => {
    related: typeof Model | string
    pivot: typeof Model | string
    foreignPivotKey: string
    relatedPivotKey: string
    parentKey?: string
    relatedKey?: string
  }
) {
  return Field(() => {
    const params = args()
    return Model.belongsToMany(
      params.related,
      params.pivot,
      params.foreignPivotKey,
      params.relatedPivotKey,
      params.parentKey,
      params.relatedKey
    )
  })
}

export function MorphToField(args: () => { id: string; type: string }) {
  return Field(() => {
    const params = args()
    return Model.morphTo(params.id, params.type)
  })
}

export function MorphOneField(
  args: () => { related: typeof Model | string; id: string; type: string; localKey?: string }
) {
  return Field(() => {
    const params = args()
    return Model.morphOne(params.related, params.id, params.type, params.localKey)
  })
}

export function MorphManyField(
  args: () => { related: typeof Model | string; id: string; type: string; localKey?: string }
) {
  return Field(() => {
    const params = args()
    return Model.morphMany(params.related, params.id, params.type, params.localKey)
  })
}

export function MorphToManyField(
  args: () => {
    related: typeof Model | string
    pivot: typeof Model | string
    relatedId: string
    id: string
    type: string
    parentKey?: string
    relatedKey?: string
  }
) {
  return Field(() => {
    const params = args()
    return Model.morphToMany(
      params.related,
      params.pivot,
      params.relatedId,
      params.id,
      params.type,
      params.parentKey,
      params.relatedKey
    )
  })
}

export function MorphedByManyField(
  args: () => {
    related: typeof Model | string
    pivot: typeof Model | string
    relatedId: string
    id: string
    type: string
    parentKey?: string
    relatedKey?: string
  }
) {
  return Field(() => {
    const params = args()
    return Model.morphedByMany(
      params.related,
      params.pivot,
      params.relatedId,
      params.id,
      params.type,
      params.parentKey,
      params.relatedKey
    )
  })
}
