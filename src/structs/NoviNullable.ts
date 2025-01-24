import type { NoviSchema, NoviSchemaOptions } from '@/types/novi';
import { NoviBase } from './NoviBase';

export class NoviNullable<Schema extends NoviSchema> extends NoviBase<
	Schema['type'] | null
> {
	public constructor(
		public readonly schema: Schema,
		options?: NoviSchemaOptions,
	) {
		super(options);
	}

	public _parse(value: unknown, path?: string) {
		return value === null
			? null
			: (this.schema.parse(value, { path }) as Schema['type']);
	}
}
