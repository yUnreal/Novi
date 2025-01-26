import type { NoviError } from '@/errors/NoviError';
import type { NoviArray } from '@/structs/NoviArray';
import type { NoviBigInt } from '@/structs/NoviBigInt';
import type { NoviBoolean } from '@/structs/NoviBoolean';
import type { NoviCustom } from '@/structs/NoviCustom';
import type { NoviDate } from '@/structs/NoviDate';
import type { NoviEnum } from '@/structs/NoviEnum';
import type { NoviFile } from '@/structs/NoviFile';
import type { NoviFunction } from '@/structs/NoviFunction';
import type { NoviInstance } from '@/structs/NoviInstance';
import type { NoviIntersection } from '@/structs/NoviIntersection';
import type { NoviJWT } from '@/structs/NoviJWT';
import type { NoviLiteral } from '@/structs/NoviLiteral';
import type { NoviMap } from '@/structs/NoviMap';
import type { NoviNever } from '@/structs/NoviNever';
import type { NoviNullable } from '@/structs/NoviNullable';
import type { NoviNullish } from '@/structs/NoviNullish';
import type { NoviNumber } from '@/structs/NoviNumber';
import type { NoviObject } from '@/structs/NoviObject';
import type { NoviOptional } from '@/structs/NoviOptional';
import type { NoviPromise } from '@/structs/NoviPromise';
import type { NoviRecord } from '@/structs/NoviRecord';
import type { NoviSet } from '@/structs/NoviSet';
import type { NoviString } from '@/structs/NoviString';
import type { NoviSymbol } from '@/structs/NoviSymbol';
import type { NoviTuple } from '@/structs/NoviTuple';
import type { NoviUnion } from '@/structs/NoviUnion';
import type { NoviUnknown } from '@/structs/NoviUnknown';

type Prettify<T> = {
	[K in keyof T]: T[K];
} & {};

export type NoviSchema =
	| NoviString
	| NoviNumber
	| NoviObject<NoviObjectRecord>
	| NoviBoolean
	| NoviTuple<NoviSchema[]>
	| NoviUnknown
	| NoviRecord<NoviPropertyKey, NoviSchema>
	| NoviLiteral<unknown>
	| NoviBigInt
	| NoviDate
	| NoviInstance<Constructor>
	| NoviMap<NoviSchema, NoviSchema>
	| NoviSet<NoviSchema>
	| NoviNever
	| NoviNullable<NoviSchema>
	| NoviOptional<NoviSchema>
	| NoviUnion<NoviSchema[]>
	| NoviIntersection<NoviSchema[]>
	| NoviPromise<NoviSchema>
	| NoviEnum<NoviEnumShape>
	| NoviJWT<NoviObject<NoviObjectRecord>>
	| NoviNullish<NoviSchema>
	| NoviArray<NoviSchema>
	| NoviCustom<unknown>
	| NoviFunction
	| NoviSymbol
	| NoviFile;

export type NoviObjectRecord = Record<string, NoviSchema>;

export type Tuplify<Items extends NoviSchema[]> = {
	[I in keyof Items]: Items[I]['type'];
};

export type Objectify<Shape extends NoviObjectRecord> = Prettify<
	{
		[K in keyof Shape as Shape[K] extends NoviOptional<NoviSchema>
			? never
			: K]: Shape[K]['type'];
	} & {
		[K in keyof Shape as Shape[K] extends NoviOptional<NoviSchema>
			? K
			: never]?: Shape[K]['type'];
	}
>;

export type Functify<Return extends NoviSchema, Args extends NoviSchema[]> = (
	...args: Tuplify<Args>
) => Return['type'];

export type NoviPropertyKey =
	| NoviString
	| NoviNumber
	| NoviLiteral<string | number>
	| NoviUnion<NoviPropertyKey[]>
	| NoviCustom<string | number>;

export type Constructor = new (...args: unknown[]) => unknown;

export interface NoviParseSchemaOptions {
	/**
	 * Whether Novi should parse safely the value, return {@link SafeReturnType}
	 */
	safe?: true;
	/**
	 * Custom path to customize error messages, object path or array/tuple index by default
	 */
	path?: string;
}

export interface NoviSchemaOptions {
	/**
	 * Options you can use to customize Novi error messages
	 */
	errors?: NoviCustomErrorOptions;
}

export interface NoviCustomSchemaOptions extends NoviSchemaOptions {
	message?: string;
}

export interface NoviCustomErrorOptions {
	/**
	 * Use this error message when the type does not match
	 */
	type?: string;
	/**
	 * Use this error message when the key is required and is not in the object
	 */
	required?: string;
}

export interface CoercibleSchemaOptions extends NoviSchemaOptions {
	/**
	 * Whether Novi should coerce the value if the value does not match the schema type
	 *
	 * ```ts
	 * const ageSchema = n.number({ coerce: true });
	 *
	 * const grandmaAge = ageSchema.parse("80"); // 80
	 * ```
	 */
	coerce?: true;
}

export type SafeReturnType<Type> =
	| {
			ok: true;
			data: Type;
	  }
	| {
			ok: false;
			error: NoviError;
	  };

export type NoviEnumShape = Record<string, string | number>;

export interface NoviSchemaEffect {
	message?: string;
	fn(value: unknown): unknown;
}

export interface NoviStringURLOptions {
	base?: string;
	message?: string;
}

export type Readonlify<T> = T extends (infer Item)[]
	? ReadonlyArray<Item>
	: T extends Map<infer Key, infer Value>
		? ReadonlyMap<Key, Value>
		: T extends Set<infer Value>
			? ReadonlySet<Value>
			: Readonly<T>;

export type PickPartial<
	S extends NoviObjectRecord,
	Keys extends keyof S,
> = Prettify<
	{
		[K in Keys]: NoviOptional<S[K]>;
	} & { [K in Exclude<keyof S, Keys>]: S[K] }
>;

export type PickRequired<
	S extends NoviObjectRecord,
	Keys extends keyof S,
> = Prettify<
	{
		[K in Keys]: S[K] extends NoviOptional<infer C> ? C : never;
	} & { [K in Exclude<keyof S, Keys>]: S[K] }
>;
