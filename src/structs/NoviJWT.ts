import { NoviError } from '@/errors/NoviError';
import type { NoviObjectRecord, NoviSchemaOptions } from '@/types/novi';
import { NoviBase } from './NoviBase';
import type { NoviObject } from './NoviObject';

export class NoviJWT<
	Schema extends NoviObject<NoviObjectRecord>,
> extends NoviBase<Schema['type']> {
	public constructor(
		public readonly schema: Schema,
		options?: NoviSchemaOptions,
	) {
		super(options);
	}

	public _parse(value: unknown, path?: string) {
		if (typeof value !== 'string')
			throw NoviError.typeError({
				path,
				type: 'JWT',
				custom: this.options?.errors?.type,
			});

		return this.schema.parse(
			JSON.parse(Buffer.from(value.split('.', 2)[1], 'base64').toString()),
			{ path },
		);
	}
}
