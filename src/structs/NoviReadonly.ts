import type { NoviSchema, NoviSchemaOptions, Readonlify } from '@/types/novi';
import { NoviBase } from './NoviBase';

export class NoviReadonly<Schema extends NoviSchema> extends NoviBase<
	Readonlify<Schema['type']>
> {
	public constructor(
		public readonly schema: Schema,
		options?: NoviSchemaOptions,
	) {
		super(options);
	}

	public _parse(value: unknown, path?: string) {
		return Object.freeze(this.schema.parse(value, { path })) as Readonlify<
			Schema['type']
		>;
	}
}
