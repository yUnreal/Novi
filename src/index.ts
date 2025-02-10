import { NoviArray } from './structs/NoviArray';
import { NoviBigInt } from './structs/NoviBigInt';
import { NoviBoolean } from './structs/NoviBoolean';
import { NoviCatch } from './structs/NoviCatch';
import { NoviCustom } from './structs/NoviCustom';
import { NoviDate } from './structs/NoviDate';
import { NoviEnum } from './structs/NoviEnum';
import { NoviFile } from './structs/NoviFile';
import { NoviFunction } from './structs/NoviFunction';
import { NoviInstance } from './structs/NoviInstance';
import { NoviIntersection } from './structs/NoviIntersection';
import { NoviJWT } from './structs/NoviJWT';
import { NoviLazy } from './structs/NoviLazy';
import { NoviLiteral } from './structs/NoviLiteral';
import { NoviMap } from './structs/NoviMap';
import { NoviNever } from './structs/NoviNever';
import { NoviNullable } from './structs/NoviNullable';
import { NoviNullish } from './structs/NoviNullish';
import { NoviNumber } from './structs/NoviNumber';
import { NoviObject } from './structs/NoviObject';
import { NoviOptional } from './structs/NoviOptional';
import { NoviPromise } from './structs/NoviPromise';
import { NoviReadonly } from './structs/NoviReadonly';
import { NoviRecord } from './structs/NoviRecord';
import { NoviSet } from './structs/NoviSet';
import { NoviString } from './structs/NoviString';
import { NoviSymbol } from './structs/NoviSymbol';
import { NoviTuple } from './structs/NoviTuple';
import { NoviUnion } from './structs/NoviUnion';
import { NoviUnknown } from './structs/NoviUnknown';
import type {
	CoercibleSchemaOptions,
	Constructor,
	NoviCustomSchemaOptions,
	NoviEnumShape,
	NoviObjectRecord,
	NoviPropertyKey,
	NoviSchema,
	NoviSchemaOptions,
} from './types/novi';

export * from './types/novi';

export const n = {
	string: (options?: CoercibleSchemaOptions) => new NoviString(options),
	number: (options?: CoercibleSchemaOptions) => new NoviNumber(options),
	boolean: (options?: CoercibleSchemaOptions) => new NoviBoolean(options),
	bigint: (options?: CoercibleSchemaOptions) => new NoviBigInt(options),
	symbol: (options?: CoercibleSchemaOptions) => new NoviSymbol(options),
	object: <Shape extends NoviObjectRecord>(
		shape: Shape,
		options?: NoviSchemaOptions,
	) => new NoviObject(shape, options),
	file: (options?: NoviSchemaOptions) => new NoviFile(options),
	date: (options?: CoercibleSchemaOptions) => new NoviDate(options),
	set: <Value extends NoviSchema>(value: Value, options?: NoviSchemaOptions) =>
		new NoviSet(value, options),
	map: <Key extends NoviSchema, Value extends NoviSchema>(
		key: Key,
		value: Value,
		options?: NoviSchemaOptions,
	) => new NoviMap(key, value, options),
	array: <Item extends NoviSchema>(item: Item, options?: NoviSchemaOptions) =>
		new NoviArray(item, options),
	func: <Return extends NoviSchema, const Args extends NoviSchema[]>(
		options?: NoviSchemaOptions,
	) => new NoviFunction<Return, Args>(options),
	tuple: <const Items extends NoviSchema[]>(
		items: Items,
		options?: NoviSchemaOptions,
	) => new NoviTuple(items, options),
	unknown: (options?: NoviSchemaOptions) => new NoviUnknown(options),
	record: <Key extends NoviPropertyKey, Value extends NoviSchema>(
		key: Key,
		value: Value,
		options?: NoviSchemaOptions,
	) => new NoviRecord(key, value, options),
	literal: <const Value>(value: Value, options?: NoviSchemaOptions) =>
		new NoviLiteral(value, options),
	instance: <Instance extends Constructor>(
		instance: Instance,
		options?: NoviSchemaOptions,
	) => new NoviInstance(instance, options),
	never: (options?: NoviSchemaOptions) => new NoviNever(options),
	nullable: <Schema extends NoviSchema>(
		schema: Schema,
		options?: NoviSchemaOptions,
	) => new NoviNullable(schema, options),
	optional: <Schema extends NoviSchema>(
		schema: Schema,
		options?: NoviSchemaOptions,
	) => new NoviOptional(schema, options),
	promise: <Schema extends NoviSchema>(
		schema: Schema,
		options?: NoviSchemaOptions,
	) => new NoviPromise(schema, options),
	enum: <Enum extends NoviEnumShape>(
		shape: Enum,
		options?: NoviSchemaOptions,
	) => new NoviEnum(shape, options),
	or: <Unions extends NoviSchema[]>(
		unions: Unions,
		options?: NoviSchemaOptions,
	) => new NoviUnion(unions, options),
	and: <Intersections extends NoviSchema[]>(
		intersections: Intersections,
		options?: NoviSchemaOptions,
	) => new NoviIntersection(intersections, options),
	jwt: <Schema extends NoviObject<NoviObjectRecord>>(
		schema: Schema,
		options?: NoviSchemaOptions,
	) => new NoviJWT(schema, options),
	nullish: <Schema extends NoviSchema>(
		schema: Schema,
		options?: NoviSchemaOptions,
	) => new NoviNullish(schema, options),
	readonly: <Schema extends NoviSchema>(
		schema: Schema,
		options?: NoviSchemaOptions,
	) => new NoviReadonly(schema, options),
	custom: <Type>(
		fun?: (value: unknown) => boolean,
		options?: NoviCustomSchemaOptions,
	) => new NoviCustom<Type>(fun, options),
	catch: <Schema extends NoviSchema>(
		fun: () => Schema['type'],
		schema: Schema,
		options?: NoviSchemaOptions,
	) => new NoviCatch(fun, schema, options),
	lazy: <Schema extends NoviSchema>(
		fun: () => Schema,
		options?: NoviSchemaOptions,
	) => new NoviLazy(fun, options),
};
