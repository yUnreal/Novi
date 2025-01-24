import type { NoviSchema, NoviSchemaOptions } from '@/types/novi';
import { NoviBase } from './NoviBase';

export class NoviNullish<Schema extends NoviSchema> extends NoviBase<
	Schema['type'] | undefined | null
> {
	public constructor(
		public readonly schema: Schema,
		options?: NoviSchemaOptions,
	) {
		super(options);
	}

	// @ts-expect-error
	public _parse(value: unknown, path?: string) {
		return value === undefined || value === null
			? value
			: this.schema.parse(value, { path });
	}
}
