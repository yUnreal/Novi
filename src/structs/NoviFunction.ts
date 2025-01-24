import { NoviError } from '@/errors/NoviError';
import type { Functify, NoviSchema, Tuplify } from '@/types/novi';
import { NoviBase } from './NoviBase';

export class NoviFunction<
	Return extends NoviSchema = NoviSchema,
	Args extends NoviSchema[] = NoviSchema[],
> extends NoviBase<Functify<Return, Args>> {
	private return!: Return;
	private args!: Args;

	public _parse(value: unknown, path?: string) {
		if (typeof value === 'function') return value as Functify<Return, Args>;

		throw NoviError.typeError({
			type: 'function',
			path,
			custom: this.options?.errors?.type,
		});
	}

	public returns<NewReturn extends NoviSchema>(returns: NewReturn) {
		// @ts-expect-error
		this.return = returns;

		return <NoviFunction<NewReturn, Args>>(<unknown>this);
	}

	public arguments<const NewArgs extends NoviSchema[]>(args: NewArgs) {
		// @ts-expect-error
		this.args = args;

		return <NoviFunction<Return, NewArgs>>(<unknown>this);
	}

	public decorate(fn: (...args: Tuplify<Args>) => Return['type']) {
		if (!this.args || !this.return)
			throw new NoviError(
				'Novi function expectes a valid return and args schema',
			);

		return ((...args: Tuplify<Args>) => {
			for (const index in this.args) {
				this.args[index].parse(args[index]);
			}

			return this.return.parse(fn(...args));
		}) as typeof fn;
	}
}
