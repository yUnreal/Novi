import { NoviError } from '@/errors/NoviError';
import type {
	NoviParseSchemaOptions,
	NoviSchemaEffect,
	NoviSchemaOptions,
	SafeReturnType,
} from '@/types/novi';

export abstract class NoviBase<R> {
	public type!: R;
	public description?: string;
	public effects: NoviSchemaEffect[] = [];

	public constructor(public options?: NoviSchemaOptions) {}

	public abstract _parse(value: unknown, path?: string): R;

	public effect(fn: (value: R) => unknown, message?: string) {
		this.effects.push({ fn, message });

		return this;
	}

	public describe(description?: string) {
		this.description = description;

		return this;
	}

	public parse(
		value: unknown,
		options: NoviParseSchemaOptions & { safe: true },
	): SafeReturnType<R>;
	public parse(value: unknown, options?: NoviParseSchemaOptions): R;

	public parse(value: unknown, options?: NoviParseSchemaOptions) {
		const parse = () => {
			const parsed = this._parse(value, options?.path);

			for (const effect of this.effects) {
				if (!effect.fn(parsed))
					throw new NoviError(
						effect.message ?? 'Some effect failed in the parsed value',
						options?.path,
					);
			}

			return parsed;
		};

		if (options?.safe) {
			try {
				return { ok: true, data: parse() };
			} catch (error) {
				return { ok: false, error };
			}
		}

		return parse();
	}

	public is(value: unknown): value is R {
		return this.parse(value, { safe: true }).ok;
	}

	// @ts-expect-error
	public parseAsync(
		value: unknown,
		options: NoviParseSchemaOptions & { safe: true },
	): Promise<SafeReturnType<R>>;
	public parseAsync(
		value: unknown,
		options?: NoviParseSchemaOptions,
	): Promise<R>;

	public async parseAsync(value: unknown, options?: NoviParseSchemaOptions) {
		const parse = async () => {
			const parsed = await this._parse(value, options?.path);

			for (const effect of this.effects) {
				if (!(await effect.fn(parsed)))
					throw new NoviError(
						effect.message ?? 'Some effect failed in the parsed value',
						options?.path,
					);
			}

			return parsed;
		};

		if (options?.safe) {
			try {
				return { ok: true, data: await parse() };
			} catch (error) {
				return { ok: false, error };
			}
		}

		return await parse();
	}
}
