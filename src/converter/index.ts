import Showdown, { type Converter } from "showdown";

import {
	type MmmarkConverterOptions,
	type MmmarkUserSelectOptions,
	getAllOptions,
} from "../helper/getalloptions.js";

type MmConverter = Converter;

function mdConverter(options?: MmmarkUserSelectOptions) {
	const opts: MmmarkConverterOptions = getAllOptions(options);
	return new Showdown.Converter(opts);
}

export { mdConverter, type MmConverter };
