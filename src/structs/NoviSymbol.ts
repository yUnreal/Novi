import { NoviError } from '@/errors/NoviError';
import { NoviBase } from './NoviBase';

export class NoviSymbol extends NoviBase<symbol> {
	public _parse(value: unknown, path?: string) {
		if (typeof value === 'symbol') return value;

		throw NoviError.typeError({
			type: 'symbol',
			path,
			custom: this.options?.errors?.type,
		});
	}
}
