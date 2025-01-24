import { NoviError } from '@/errors/NoviError';
import type { NoviSchema, NoviSchemaOptions } from '@/types/novi';
import { NoviBase } from './NoviBase';

export class NoviMap<
	Key extends NoviSchema,
	Value extends NoviSchema,
> extends NoviBase<Map<Key['type'], Value['type']>> {
	public constructor(
		public readonly key: Key,
		public readonly value: Value,
		options?: NoviSchemaOptions,
	) {
		super(options);
	}

	public size(size: number, message?: string) {
		return this.effect((map) => map.size === size, message);
	}

	public _parse(value: unknown, path?: string) {
		if (!(value instanceof Map))
			throw NoviError.typeError({
				path,
				type: 'map',
				custom: this.options?.errors?.type,
			});

		value.clear();

		for (const [key, data] of value) {
			value.set(
				this.key.parse(key, { path }),
				this.value.parse(data, { path }),
			);
		}

		return value;
	}
}
