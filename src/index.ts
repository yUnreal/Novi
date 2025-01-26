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
	NoviEnumShape,
	NoviObjectRecord,
	NoviPropertyKey,
	NoviSchema,
	NoviSchemaOptions,
} from './types/novi';

export namespace n {
	export type type<S extends NoviSchema> = S['type'];

	//#region Primitives
	export const string = (options?: CoercibleSchemaOptions) =>
		new NoviString(options);
	export const number = (options?: CoercibleSchemaOptions) =>
		new NoviNumber(options);
	export const boolean = (options?: CoercibleSchemaOptions) =>
		new NoviBoolean(options);
	export const bigint = (options?: CoercibleSchemaOptions) =>
		new NoviBigInt(options);
	export const symbol = (options?: CoercibleSchemaOptions) =>
		new NoviSymbol(options);

	export const object = <Shape extends NoviObjectRecord>(
		shape: Shape,
		options?: NoviSchemaOptions,
	) => new NoviObject(shape, options);

	export const file = (options?: NoviSchemaOptions) => new NoviFile(options);

	export const date = (options?: CoercibleSchemaOptions) =>
		new NoviDate(options);

	export const set = <Value extends NoviSchema>(
		value: Value,
		options?: NoviSchemaOptions,
	) => new NoviSet(value, options);
	export const map = <Key extends NoviSchema, Value extends NoviSchema>(
		key: Key,
		value: Value,
		options?: NoviSchemaOptions,
	) => new NoviMap(key, value, options);

	export const array = <Item extends NoviSchema>(
		item: Item,
		options?: NoviSchemaOptions,
	) => new NoviArray(item, options);

	export const func = <
		Return extends NoviSchema,
		const Args extends NoviSchema[],
	>(
		options?: NoviSchemaOptions,
	) => new NoviFunction<Return, Args>(options);
	//#endregion

	//#region Customs
	export const tuple = <const Items extends NoviSchema[]>(
		items: Items,
		options?: NoviSchemaOptions,
	) => new NoviTuple(items, options);
	export const unknown = (options?: NoviSchemaOptions) =>
		new NoviUnknown(options);

	export const record = <Key extends NoviPropertyKey, Value extends NoviSchema>(
		key: Key,
		value: Value,
		options?: NoviSchemaOptions,
	) => new NoviRecord(key, value, options);

	export const literal = <const Value>(
		value: Value,
		options?: NoviSchemaOptions,
	) => new NoviLiteral(value, options);

	export const instance = <Instance extends Constructor>(
		instance: Instance,
		options?: NoviSchemaOptions,
	) => new NoviInstance(instance, options);

	export const never = (options?: NoviSchemaOptions) => new NoviNever(options);

	export const nullable = <Schema extends NoviSchema>(
		schema: Schema,
		options?: NoviSchemaOptions,
	) => new NoviNullable(schema, options);

	export const optional = <Schema extends NoviSchema>(
		schema: Schema,
		options?: NoviSchemaOptions,
	) => new NoviOptional(schema, options);

	export const promise = <Schema extends NoviSchema>(
		schema: Schema,
		options?: NoviSchemaOptions,
	) => new NoviPromise(schema, options);

	export const nativeEnum = <Enum extends NoviEnumShape>(
		shape: Enum,
		options?: NoviSchemaOptions,
	) => new NoviEnum(shape, options);

	export const or = <Unions extends NoviSchema[]>(
		unions: Unions,
		options?: NoviSchemaOptions,
	) => new NoviUnion(unions, options);
	export const and = <Intersections extends NoviSchema[]>(
		intersections: Intersections,
		options?: NoviSchemaOptions,
	) => new NoviIntersection(intersections, options);

	export const jwt = <Schema extends NoviObject<NoviObjectRecord>>(
		schema: Schema,
		options?: NoviSchemaOptions,
	) => new NoviJWT(schema, options);

	export const nullish = <Schema extends NoviSchema>(
		schema: Schema,
		options?: NoviSchemaOptions,
	) => new NoviNullish(schema, options);

	export const readonly = <Schema extends NoviSchema>(
		schema: Schema,
		options?: NoviSchemaOptions,
	) => new NoviReadonly(schema, options);

	export const custom = <Return>(
		fn: (value: unknown) => boolean,
		options?: NoviSchemaOptions,
	) => new NoviCustom<Return>(fn, options);

	export const _catch = <Schema extends NoviSchema>(
		fun: () => Schema['type'],
		schema: Schema,
		options?: NoviSchemaOptions,
	) => new NoviCatch(fun, schema, options);

	export const coerce = {
		string(options?: NoviSchemaOptions) {
			return string({ ...options, coerce: true });
		},
		number(options?: NoviSchemaOptions) {
			return number({ ...options, coerce: true });
		},
		bigint(options?: NoviSchemaOptions) {
			return bigint({ ...options, coerce: true });
		},
		boolean(options?: NoviSchemaOptions) {
			return boolean({ ...options, coerce: true });
		},
		date(options?: NoviSchemaOptions) {
			return date({ ...options, coerce: true });
		},
	};
	//#endregion
}
