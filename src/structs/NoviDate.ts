import { NoviError } from '@/errors/NoviError';
import type { CoercibleSchemaOptions } from '@/types/novi';
import { NoviBase } from './NoviBase';

export class NoviDate extends NoviBase<Date> {
	public constructor(public readonly options?: CoercibleSchemaOptions) {
		super(options);
	}

	public min(value: Date, message?: string) {
		return this.effect((date) => date.getTime() >= value.getTime(), message);
	}

	public max(value: Date, message?: string) {
		return this.effect((date) => date.getTime() <= value.getTime(), message);
	}

	public _parse(value: unknown, path?: string) {
		if (!(value instanceof Date)) {
			if (this.options?.coerce) return new Date(value as string);

			throw NoviError.typeError({
				path,
				type: 'boolean',
				custom: this.options?.errors?.type,
			});
		}

		return value;
	}
}
