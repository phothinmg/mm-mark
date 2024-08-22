import Showdown from "showdown";
import type {
	MmExtension,
	ShowdownExtension,
	SubParser,
} from "./converter-types.js";

/**
 * Removes all extensions.
 *
 * @returns {void}
 */
export function removeExtensions(): void {
	return Showdown.resetExtensions();
}
/**
 * Checks if the given `ext` is a valid showdown extension.
 *
 * @param ext - The extension to checks.
 * @returns Returns `true` if the extension is valid showdown extension, otherwise `false`.
 */
export function validateExtension(
	ext: ShowdownExtension[] | ShowdownExtension,
): boolean {
	return Showdown.validateExtension(ext);
}
/**
 * Register a extension.
 *
 * @param name - The name of the new extension.
 * @param ext - The extension.
 * @throws Throws if `name` is not of type string.
 */
export function registerExtension(name: string, ext: MmExtension): void {
	return Showdown.extension(name, ext);
}

/**
 * Register a subParser.
 *
 * @param name - The name of the new parser.
 * @param func - The handler function of the new parser.
 * @throws Throws if `name` is not of type string.
 */
export function registerSubParser(name: string, func: SubParser): void {
	return Showdown.subParser(name, func);
}
