import type { NoviSchema, NoviSchemaOptions } from '@/types/novi';
import { NoviBase } from './NoviBase';

export class NoviOptional<Schema extends NoviSchema> extends NoviBase<
	Schema['type'] | undefined
> {
	public constructor(
		public readonly child: Schema,
		options?: NoviSchemaOptions,
	) {
		super(options);
	}

	public _parse(value: unknown, path?: string) {
		return value === undefined
			? undefined
			: (this.child.parse(value, { path }) as Schema['type']);
	}
}
