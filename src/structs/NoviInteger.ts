import { NoviError } from '@/errors/NoviError';
import { NoviNumber } from './NoviNumber';

export class NoviInteger extends NoviNumber {
	// @ts-expect-error
	public _parse(value: unknown, path?: string) {
		if (typeof value !== 'number') {
			if (this.options?.coerce && Number.isSafeInteger(Number(value)))
				return value;

			throw NoviError.typeError({
				type: 'integer',
				path,
				custom: this.options?.errors?.type,
			});
		}

		return value;
	}
}
