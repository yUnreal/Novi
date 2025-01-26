import { NoviError } from '@/errors/NoviError';
import type { NoviSchemaOptions } from '@/types/novi';
import { NoviBase } from './NoviBase';

export class NoviCustom<Type> extends NoviBase<Type> {
	public constructor(
		private readonly fn?: (value: unknown) => boolean,
		options?: NoviSchemaOptions,
	) {
		super(options);
	}

	public _parse(value: unknown, path?: string) {
		const { fn } = this;

		if (fn) {
			if (fn(value)) return value as Type;

			throw new NoviError('Custom schema failed for input', path);
		}

		return value as Type;
	}
}
