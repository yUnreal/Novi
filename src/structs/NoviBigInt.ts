import { NoviError } from '@/errors/NoviError';
import type { CoercibleSchemaOptions } from '@/types/novi';
import { NoviBase } from './NoviBase';

export class NoviBigInt extends NoviBase<bigint> {
	public constructor(public readonly options?: CoercibleSchemaOptions) {
		super(options);
	}

	public min(value: bigint, message?: string) {
		return this.effect((number) => number >= value, message);
	}

	public max(value: bigint, message?: string) {
		return this.effect((number) => number <= value, message);
	}

	public _parse(value: unknown, path?: string) {
		if (typeof value !== 'bigint') {
			if (this.options?.coerce) return BigInt(value as string);

			throw NoviError.typeError({
				path,
				type: 'bigint',
				custom: this.options?.errors?.type,
			});
		}

		return value;
	}
}
