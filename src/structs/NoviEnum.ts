import { NoviError } from '@/errors/NoviError';
import type { NoviEnumShape, NoviSchemaOptions } from '@/types/novi';
import { NoviBase } from './NoviBase';

export class NoviEnum<Enum extends NoviEnumShape> extends NoviBase<
	Enum[keyof Enum]
> {
	private values: (string | number)[];

	public constructor(shape: Enum, options?: NoviSchemaOptions) {
		super(options);

		this.values = Object.values(shape);
	}

	// @ts-expect-error
	public _parse(value: unknown, path?: string) {
		if (this.values.includes(value as string)) return value;

		throw NoviError.typeError({
			path,
			type: 'enum',
			custom: this.options?.errors?.type,
		});
	}
}
