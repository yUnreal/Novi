import { NoviError } from '@/errors/NoviError';
import type { CoercibleSchemaOptions } from '@/types/novi';
import { NoviBase } from './NoviBase';

export class NoviNumber extends NoviBase<number> {
	public constructor(public readonly options?: CoercibleSchemaOptions) {
		super(options);
	}

	public min(value: number, message?: string) {
		return this.effect((number) => number >= value, message);
	}

	public max(value: number, message?: string) {
		return this.effect((number) => number <= value, message);
	}

	public _parse(value: unknown, path?: string) {
		if (typeof value !== 'number') {
			if (this.options?.coerce) return Number(value);

			throw NoviError.typeError({
				path,
				type: 'number',
				custom: this.options?.errors?.type,
			});
		}

		return value;
	}
}
