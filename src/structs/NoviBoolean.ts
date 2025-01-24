import { NoviError } from '@/errors/NoviError';
import type { CoercibleSchemaOptions } from '@/types/novi';
import { NoviBase } from './NoviBase';

export class NoviBoolean extends NoviBase<boolean> {
	public constructor(public readonly options?: CoercibleSchemaOptions) {
		super(options);
	}

	public _parse(value: unknown, path?: string) {
		if (typeof value !== 'boolean') {
			if (this.options?.coerce) return Boolean(value);

			throw NoviError.typeError({
				path,
				type: 'boolean',
				custom: this.options?.errors?.type,
			});
		}

		return value;
	}
}
