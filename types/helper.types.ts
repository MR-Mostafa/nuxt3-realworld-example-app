/**
 * Spread / Flatten Types
 * @NOTE: Function types are not supported by this helper
 *
 * @see {@link https://github.com/microsoft/TypeScript/issues/31192|GitHub}
 */
type ObjKeyof<T> = T extends object ? keyof T : never;
type KeyofKeyof<T> = ObjKeyof<T> | { [K in keyof T]: ObjKeyof<T[K]> }[keyof T];
type StripNever<T> = Pick<T, { [K in keyof T]: [T[K]] extends [never] ? never : K }[keyof T]>;
type Lookup<T, K> = T extends unknown ? (K extends keyof T ? T[K] : never) : never;

export type SimpleFlatten<T> = T extends object
	? StripNever<{ [K in KeyofKeyof<T>]: Exclude<K extends keyof T ? T[K] : never, object> | { [P in keyof T]: Lookup<T[P], K> }[keyof T] }>
	: T;

export type NestedFlatten<T> = SimpleFlatten<SimpleFlatten<SimpleFlatten<SimpleFlatten<SimpleFlatten<T>>>>>;
