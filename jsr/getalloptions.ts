import type {
	ConverterOptions,
	ShowdownConvertOptions,
} from './converter-types.ts'

/**
 * **Generates and returns the options object for the Markdown converter based on the provided options or defaults.**
 *
 * @param options - Optional custom options to override the default settings.
 * @returns The options object for the Markdown converter.
 */
export const getAllOptions = (
	options?: ConverterOptions,
): ShowdownConvertOptions => {
	const dfoptions: ShowdownConvertOptions = {
		emoji: true,
		ghCodeBlocks: true,
		parseImgDimensions: true,
		simplifiedAutoLink: true,
		tables: true,
		tasklists: true,
		completeHTMLDocument: false,
		headerLevelStart: 1,
		ellipsis: true,
		encodeEmails: true,
		metadata: false,
		openLinksInNewWindow: true,
		strikethrough: true,
		// ---------------------------------------------------------------------------------
		backslashEscapesHTMLTags: options?.backslashEscapesHTMLTags ?? false,
		customizedHeaderId: options?.customizedHeaderId ?? false,
		disableForced4SpacesIndentedSublists:
			options?.disableForced4SpacesIndentedSublists ?? false,
		extensions: options?.extensions ?? [],
		ghCompatibleHeaderId: options?.ghCompatibleHeaderId ?? false,
		ghMentions: options?.ghMentions ?? false,
		ghMentionsLink: options?.ghMentionsLink ?? 'https://github.com/{u}',
		literalMidWordUnderscores: options?.literalMidWordUnderscores ?? false,
		noHeaderId: options?.noHeaderId ?? false,
		omitExtraWLInCodeBlocks: options?.omitExtraWLInCodeBlocks ?? false,
		prefixHeaderId: options?.prefixHeaderId ?? false,
		rawHeaderId: options?.rawHeaderId ?? false,
		rawPrefixHeaderId: options?.rawPrefixHeaderId ?? false,
		requireSpaceBeforeHeadingText: options?.requireSpaceBeforeHeadingText ??
			false,
		simpleLineBreaks: options?.simpleLineBreaks ?? false,
		splitAdjacentBlockquotes: options?.splitAdjacentBlockquotes ?? false,
		smartIndentationFix: options?.smartIndentationFix ?? false,
		smoothLivePreview: options?.smoothLivePreview ?? false,
		tablesHeaderId: options?.tablesHeaderId ?? false,
		underline: options?.underline ?? false,
	}
	return dfoptions
}
