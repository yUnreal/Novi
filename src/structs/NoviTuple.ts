import { NoviError } from '@/errors/NoviError';
import type { NoviSchema, NoviSchemaOptions, Tuplify } from '@/types/novi';
import { NoviBase } from './NoviBase';

export class NoviTuple<const Items extends NoviSchema[]> extends NoviBase<
	Tuplify<Items>
> {
	private _rest?: NoviSchema;

	public constructor(
		public readonly items: Items,
		options?: NoviSchemaOptions,
	) {
		super(options);
	}

	public rest<Rest extends NoviSchema>(rest: Rest) {
		this._rest = rest;
		
		return <NoviTuple<[...Items, ...Rest[]]>><unknown>this;
	}

	public _parse(value: unknown, path?: string) {
		if (!Array.isArray(value))
			throw NoviError.typeError({
				path,
				type: 'tuple',
				custom: this.options?.errors?.type,
			});

		const { items, _rest: rest } = this;

		if (value.length < items.length)
			throw new NoviError(
				`Novi expected tuple length "${items.length}, but got "${value.length}"`,
				path,
			);

		for (const index in value) {
			const schema = items[index] ?? rest;

			if (!schema) throw new NoviError(`Unknown index "${index}" for tuple. Use .rest() for rest types`, path ? `${path}[${index}]` : index);

			value[index] = schema.parse(value[index], {
				path: path ? `${path}[${index}]` : index,
			});
		}

		return value as Tuplify<Items>;
	}
}
