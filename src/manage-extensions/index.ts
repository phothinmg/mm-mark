import Showdown, { type ShowdownExtension } from "showdown";

type MmExtension = ShowdownExtension;

/**
 * Register a extension.
 *
 * @param name - The name of the new extension.
 * @param ext - The extension.
 * @throws Throws if `name` is not of type string.
 */
function registerExtension(
	name: string,
	ext: MmExtension | MmExtension[] | (() => MmExtension[] | MmExtension),
): void {
	Showdown.extension(name, ext);
}

/**
 * Checks if the given `ext` is a valid showdown extension.
 *
 * @param ext - The extension to checks.
 * @returns Returns `true` if the extension is valid showdown extension, otherwise `false`.
 */
function validateExtension(ext: MmExtension[] | MmExtension): boolean {
	return Showdown.validateExtension(ext);
}

/**
 * Removes all extensions.
 *
 * @returns {void}
 */
function removeExtensions(): void {
	Showdown.resetExtensions();
}

export {
	registerExtension,
	validateExtension,
	removeExtensions,
	type MmExtension,
};
