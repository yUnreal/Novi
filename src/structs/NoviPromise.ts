import { NoviError } from '@/errors/NoviError';
import type { NoviSchema, NoviSchemaOptions } from '@/types/novi';
import { NoviBase } from './NoviBase';

export class NoviPromise<Schema extends NoviSchema> extends NoviBase<
	Promise<Schema['type']>
> {
	public constructor(
		public readonly schema: Schema,
		options?: NoviSchemaOptions,
	) {
		super(options);
	}

	public async _parse(value: unknown, path?: string) {
		if (!(value instanceof Promise))
			throw NoviError.typeError({
				path,
				type: 'promise',
				custom: this.options?.errors?.type,
			});

		return this.schema.parse(await value) as Promise<Schema['type']>;
	}
}
