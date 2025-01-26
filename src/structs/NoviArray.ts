import { NoviError } from '@/errors/NoviError';
import type { NoviSchema, NoviSchemaOptions } from '@/types/novi';
import { NoviBase } from './NoviBase';

export class NoviArray<Item extends NoviSchema> extends NoviBase<
	Item['type'][]
> {
	public constructor(
		public readonly item: Item,
		options?: NoviSchemaOptions,
	) {
		super(options);
	}

	public min(length: number, message?: string) {
		return this.effect((array) => array.length >= length, message);
	}

	public max(length: number, message?: string) {
		return this.effect((array) => array.length <= length, message);
	}

	public _parse(value: unknown, path?: string) {
		if (!Array.isArray(value))
			throw NoviError.typeError({
				path,
				type: 'array',
				custom: this.options?.errors?.type,
			});

		for (const index in value)
			value[index] = this.item.parse(value[index], {
				path: path ? `${path}[${index}]` : index,
			});

		return value;
	}
}
