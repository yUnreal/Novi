import { NoviError } from '@/errors/NoviError';
import type { NoviSchemaOptions } from '@/types/novi';
import { NoviBase } from './NoviBase';

export class NoviCustom<Return> extends NoviBase<Return> {
	public constructor(
		private readonly fn: (value: unknown) => boolean,
		options?: NoviSchemaOptions,
	) {
		super(options);
	}

	public _parse(value: unknown, path?: string) {
		if (this.fn(value)) return value as Return;

		throw new NoviError('Custom schema failed for input', path);
	}
}
