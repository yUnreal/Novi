import { NoviError } from '@/errors/NoviError';
import { NoviBase } from './NoviBase';
import type { NoviLiteral } from './NoviLiteral';
import type { NoviString } from './NoviString';

export class NoviFile extends NoviBase<File> {
	public _parse(value: unknown, path?: string) {
		if (value instanceof File) return value;

		throw NoviError.typeError({
			type: 'file',
			path,
			custom: this.options?.errors?.type,
		});
	}

	public min(size: number, message?: string) {
		return this.effect((file) => file.size >= size, message);
	}

	public max(size: number, message?: string) {
		return this.effect((file) => file.size <= size, message);
	}

	public filename(schema: NoviString, message?: string) {
		return this.effect(
			(file) => schema.parse(file.name, { safe: true }).ok,
			message,
		);
	}

	public accept(
		extension: NoviString | NoviLiteral<string> | string[],
		message?: string,
	) {
		return this.effect(
			({ type }) =>
				Array.isArray(extension)
					? extension.includes(type)
					: extension.parse(type, { safe: true }).ok,
			message,
		);
	}
}
