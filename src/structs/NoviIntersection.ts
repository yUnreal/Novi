import type { NoviSchema, NoviSchemaOptions } from '@/types/novi';
import { NoviBase } from './NoviBase';

type UnionToIntersection<U> = (
	U extends unknown
		? (x: U) => void
		: never
) extends (x: infer I) => void
	? I
	: never;

export class NoviIntersection<
	Intersections extends NoviSchema[],
> extends NoviBase<UnionToIntersection<Intersections[number]['type']>> {
	public constructor(
		public readonly intersections: Intersections,
		options?: NoviSchemaOptions,
	) {
		super(options);
	}

	public _parse(value: unknown, path?: string) {
		for (const intersection of this.intersections) {
			intersection.parse(value, { path });
		}

		return value as UnionToIntersection<Intersections[number]['type']>;
	}
}
