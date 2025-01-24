import { NoviError } from '@/errors/NoviError';
import type {
	NoviObjectRecord,
	NoviSchemaOptions,
	Objectify,
	PickPartial,
	PickRequired,
} from '@/types/novi';
import { isObject } from '@/utils/isObject';
import { NoviBase } from './NoviBase';
import { NoviOptional } from './NoviOptional';

export class NoviObject<Shape extends NoviObjectRecord> extends NoviBase<
	Objectify<Shape>
> {
	public constructor(
		public readonly shape: Shape,
		options?: NoviSchemaOptions,
	) {
		super(options);
	}

	public _parse(value: unknown, path?: string) {
		if (!isObject(value))
			throw NoviError.typeError({
				path,
				type: 'object',
				custom: this.options?.errors?.type,
			});

		const { shape } = this;

		for (const key in shape) {
			if (key in value) {
				value[key] = shape[key].parse(value[key], {
					path: path ? `${path}.${key}` : key,
				});
				continue;
			}

			throw new NoviError(
				this.options?.errors?.required ??
					`A required key "${key}" is missing in the object`,
				path,
			);
		}

		return value as Objectify<Shape>;
	}

	public extend<NewShape extends NoviObjectRecord>(shape: NewShape) {
		return new NoviObject({ ...this.shape, ...shape });
	}

	public pick<Keys extends keyof Shape>(keys: Keys[]) {
		const newInstance = new NoviObject({} as Pick<Shape, Keys>);

		for (const key of keys) newInstance.shape[key] = this.shape[key];

		return newInstance;
	}

	public partial<Keys extends keyof Shape = keyof Shape>(keys?: Keys[]) {
		const instance = new NoviObject({} as PickPartial<Shape, Keys>);

		for (const key in keys ?? this.shape) {
			// @ts-expect-error
			instance.shape[key] = new NoviOptional(this.shape[key]);
		}

		return instance;
	}

	public required<Keys extends keyof Shape>(keys: Keys[]) {
		const instance = new NoviObject({} as PickRequired<Shape, Keys>);

		for (const key in keys ?? this.shape) {
			const schema = this.shape[key];

			// @ts-expect-error
			instance.shape[key] = schema.child ?? schema;
		}

		return instance;
	}
}
