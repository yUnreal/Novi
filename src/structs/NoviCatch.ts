import type { NoviSchema, NoviSchemaOptions } from '@/types/novi';
import { NoviBase } from './NoviBase';

export class NoviCatch<Schema extends NoviSchema> extends NoviBase<
	Schema['type']
> {
	public constructor(
		public readonly fun: () => Schema['type'],
		public readonly schema: Schema,
		options?: NoviSchemaOptions,
	) {
		super(options);
	}

	public _parse(value: unknown, path?: string) {
		// @ts-expect-error
		return this.schema.parse(value, { path, safe: true }).data ?? this.fun();
	}
}
