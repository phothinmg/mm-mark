import Showdown, { type SubParser } from "showdown";

type MmSubParser = SubParser;

/**
 * Register a subParser.
 *
 * @param name - The name of the new parser.
 * @param func - The handler function of the new parser.
 * @throws Throws if `name` is not of type string.
 */
function registerSubParser(name: string, func: SubParser): void {
	return Showdown.subParser(name, func);
}

export { registerSubParser, type MmSubParser };
