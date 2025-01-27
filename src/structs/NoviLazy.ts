import type { NoviSchema, NoviSchemaOptions } from '@/types/novi';
import { NoviBase } from './NoviBase';

export class NoviLazy<Schema extends NoviSchema> extends NoviBase<
	Schema['type']
> {
	public constructor(
		private readonly fun: () => Schema,
		options?: NoviSchemaOptions,
	) {
		super(options);
	}

	public _parse(value: unknown, path?: string) {
		return this.fun().parse(value, { path }) as Schema['type'];
	}
}
