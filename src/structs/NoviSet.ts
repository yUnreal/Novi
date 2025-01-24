import { NoviError } from '@/errors/NoviError';
import type { NoviSchema, NoviSchemaOptions } from '@/types/novi';
import { NoviBase } from './NoviBase';

export class NoviSet<Value extends NoviSchema> extends NoviBase<
	Set<Value['type']>
> {
	public constructor(
		public readonly value: Value,
		options?: NoviSchemaOptions,
	) {
		super(options);
	}

	public size(size: number, message?: string) {
		return this.effect((set) => set.size === size, message);
	}

	public min(size: number, message?: string) {
		return this.effect((set) => set.size >= size, message);
	}

	public max(size: number, message?: string) {
		return this.effect((set) => set.size <= size, message);
	}

	public _parse(value: unknown, path?: string) {
		if (!(value instanceof Set))
			throw NoviError.typeError({
				path,
				type: 'set',
				custom: this.options?.errors?.type,
			});

		value.clear();

		for (const data of value) value.add(this.value.parse(data));

		return value;
	}
}
