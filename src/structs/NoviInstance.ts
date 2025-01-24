import { NoviError } from '@/errors/NoviError';
import type { Constructor, NoviSchemaOptions } from '@/types/novi';
import { NoviBase } from './NoviBase';

export class NoviInstance<Instance extends Constructor> extends NoviBase<
	InstanceType<Instance>
> {
	public constructor(
		public readonly instance: Instance,
		options?: NoviSchemaOptions,
	) {
		super(options);
	}

	public _parse(value: unknown, path?: string) {
		if (value instanceof this.instance) return value as InstanceType<Instance>;

		throw NoviError.typeError({
			path,
			type: `${this.instance.name}`,
			custom: this.options?.errors?.type,
		});
	}
}
