import { NoviError } from '@/errors/NoviError';
import type {
	NoviPropertyKey,
	NoviSchema,
	NoviSchemaOptions,
} from '@/types/novi';
import { isObject } from '@/utils/isObject';
import { NoviBase } from './NoviBase';

export class NoviRecord<
	Key extends NoviPropertyKey,
	Value extends NoviSchema,
	// @ts-expect-error
> extends NoviBase<Record<Key['type'], Value['type']>> {
	public constructor(
		public readonly key: Key,
		public readonly value: Value,
		options?: NoviSchemaOptions,
	) {
		super(options);
	}

	public _parse(value: unknown, path?: string) {
		if (!isObject(value))
			throw NoviError.typeError({
				path,
				type: 'record',
				custom: this.options?.errors?.type,
			});

		for (const key in value) {
			this.key.parse(key);

			value[key] = this.value.parse(value[key]);
		}

		// @ts-expect-error
		return value as Record<Key['type'], Value['type']>;
	}
}
