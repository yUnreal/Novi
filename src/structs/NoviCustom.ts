import { NoviError } from '@/errors/NoviError';
import type { NoviCustomSchemaOptions } from '@/types/novi';
import { NoviBase } from './NoviBase';

export class NoviCustom<Type> extends NoviBase<Type> {
	public constructor(
		private readonly fn?: (value: unknown) => boolean,
		public options?: NoviCustomSchemaOptions,
	) {
		super(options);
	}

	public _parse(value: unknown, path?: string) {
		const { fn } = this;

		if (fn) {
			if (fn(value)) return value as Type;

			throw new NoviError(
				this.options?.message ?? 'Custom schema failed for input',
				path,
			);
		}

		return value as Type;
	}
}
