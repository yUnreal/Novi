import { NoviError } from '@/errors/NoviError';
import { NoviBase } from './NoviBase';

export class NoviNever extends NoviBase<never> {
	public _parse(_value: unknown, path?: string): never {
		throw NoviError.typeError({
			path,
			type: 'never',
			custom: this.options?.errors?.type,
		});
	}
}
