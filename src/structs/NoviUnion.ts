import { NoviError } from '@/errors/NoviError';
import type { NoviSchema, NoviSchemaOptions } from '@/types/novi';
import { NoviBase } from './NoviBase';

export class NoviUnion<Unions extends NoviSchema[]> extends NoviBase<
	Unions[number]['type']
> {
	public constructor(
		public readonly unions: Unions,
		options?: NoviSchemaOptions,
	) {
		super(options);
	}

	public _parse(value: unknown, path?: string) {
		for (const union of this.unions) {
			const parsed = union.parse(value, { safe: true, path });

			if (parsed.ok) return parsed.data as Unions[number]['type'];
		}

		throw new NoviError(
			`Value failed in ${this.unions.length} union types`,
			path,
		);
	}
}
