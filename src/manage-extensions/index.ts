import Showdown, { type ShowdownExtension } from "showdown";

/**
 * Register a extension.
 *
 * @param name - The name of the new extension.
 * @param ext - The extension.
 * @throws Throws if `name` is not of type string.
 */
function _registerExtension(
  name: string,
  ext:
    | ShowdownExtension
    | ShowdownExtension[]
    | (() => ShowdownExtension[] | ShowdownExtension)
): void {
  Showdown.extension(name, ext);
}

/**
 * Checks if the given `ext` is a valid showdown extension.
 *
 * @param ext - The extension to checks.
 * @returns Returns `true` if the extension is valid showdown extension, otherwise `false`.
 */
function _validateExtension(
  ext: ShowdownExtension[] | ShowdownExtension
): boolean {
  return Showdown.validateExtension(ext);
}

/**
 * Removes all extensions.
 *
 * @returns {void}
 */
function _removeExtensions(): void {
  Showdown.resetExtensions();
}

export { _registerExtension, _validateExtension, _removeExtensions };
