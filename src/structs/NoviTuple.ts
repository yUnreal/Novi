import { NoviError } from '@/errors/NoviError';
import type { NoviSchema, NoviSchemaOptions, Tuplify } from '@/types/novi';
import { NoviBase } from './NoviBase';

export class NoviTuple<const Items extends NoviSchema[]> extends NoviBase<
	Tuplify<Items>
> {
	public constructor(
		public readonly items: Items,
		options?: NoviSchemaOptions,
	) {
		super(options);
	}

	public _parse(value: unknown, path?: string) {
		if (!Array.isArray(value))
			throw NoviError.typeError({
				path,
				type: 'tuple',
				custom: this.options?.errors?.type,
			});
		if (value.length !== this.items.length)
			throw new NoviError(
				`Novi expected tuple length "${this.items.length}, but got "${value.length}""`,
				path,
			);

		const { items } = this;

		for (const index in items)
			value[index] = items[index].parse(value[index], {
				path: path ? `${path}[${index}]` : index,
			});

		return value as Tuplify<Items>;
	}
}
