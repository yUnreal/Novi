import { NoviError } from '@/errors/NoviError';
import type {
	CoercibleSchemaOptions,
	NoviStringURLOptions,
} from '@/types/novi';
import { NoviBase } from './NoviBase';

export class NoviString extends NoviBase<string> {
	public constructor(public readonly options?: CoercibleSchemaOptions) {
		super(options);
	}

	public min(value: number, message?: string) {
		return this.effect(({ length }) => length >= value, message);
	}

	public max(value: number, message?: string) {
		return this.effect(({ length }) => length <= value, message);
	}

	public regex(pattern: RegExp, message?: string) {
		return this.effect((str) => pattern.test(str), message);
	}

	public url(options?: NoviStringURLOptions) {
		return this.effect((str) => new URL(str, options?.base), options?.message);
	}

	public _parse(value: unknown, path?: string) {
		if (typeof value !== 'string') {
			if (this.options?.coerce) return String(value);

			throw NoviError.typeError({
				path,
				type: 'string',
				custom: this.options?.errors?.type,
			});
		}

		return value;
	}
}
