import Showdown, { type Converter } from 'showdown'

import {
	getAllOptions,
	type MmmarkConverterOptions,
	type MmmarkUserSelectOptions,
} from '../helper/getalloptions.ts'

type MmConverter = Converter

/**
 * **Create a Showdown converter**
 *
 * @param options - Optional custom options to override the default settings.
 * @returns A new Showdown converter.
 */
function mdConverter(options?: MmmarkUserSelectOptions): Showdown.Converter {
	const opts: MmmarkConverterOptions = getAllOptions(options)
	return new Showdown.Converter(opts)
}

export { mdConverter, type MmConverter }
