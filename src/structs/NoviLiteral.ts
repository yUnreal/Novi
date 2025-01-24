import { NoviError } from '@/errors/NoviError';
import type { NoviSchemaOptions } from '@/types/novi';
import { NoviBase } from './NoviBase';

export class NoviLiteral<const Value> extends NoviBase<Value> {
	public constructor(
		public readonly value: Value,
		options?: NoviSchemaOptions,
	) {
		super(options);
	}

	public _parse(value: unknown, path?: string) {
		if (value === this.value) return value as Value;

		throw NoviError.typeError({
			path,
			type: String(this.value),
			custom: this.options?.errors?.type,
		});
	}
}
