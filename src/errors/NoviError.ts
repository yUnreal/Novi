interface TypeErrorOptions {
	type: string;
	path?: string;
	custom?: string;
}

export class NoviError extends Error {
	public constructor(
		public readonly message: string,
		path?: string,
	) {
		super(path ? `${message} in "${path}"` : message);
	}

	public static typeError({ type, path, custom }: TypeErrorOptions) {
		return new NoviError(custom ?? `Novi expected type "${type}"`, path);
	}
}
