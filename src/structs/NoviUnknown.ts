import { NoviBase } from './NoviBase';

export class NoviUnknown extends NoviBase<unknown> {
	public _parse(value: unknown) {
		return value;
	}
}
