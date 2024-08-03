import type { ConverterOptions, ShowdownOptions } from "showdown";

export const defaultOptions: ShowdownOptions = {
	omitExtraWLInCodeBlocks: false,
	noHeaderId: false,
	prefixHeaderId: false,
	rawPrefixHeaderId: false,
	ghCompatibleHeaderId: false,
	rawHeaderId: false,
	headerLevelStart: 1,
	parseImgDimensions: true, // showdown default false
	simplifiedAutoLink: true, // showdown default false
	excludeTrailingPunctuationFromURLs: false,
	literalMidWordUnderscores: false,
	literalMidWordAsterisks: false,
	strikethrough: false,
	tables: true, // showdown default false
	tablesHeaderId: false,
	ghCodeBlocks: true,
	tasklists: false,
	smoothLivePreview: false,
	smartIndentationFix: false,
	disableForced4SpacesIndentedSublists: false,
	simpleLineBreaks: false,
	requireSpaceBeforeHeadingText: false,
	ghMentions: false,
	ghMentionsLink: "https://github.com/{u}",
	encodeEmails: true,
	openLinksInNewWindow: false,
	backslashEscapesHTMLTags: false,
	emoji: true, // showdown default false
	underline: false,
	ellipsis: true,
	completeHTMLDocument: false,
	metadata: false,
	splitAdjacentBlockquotes: false,
};
const dco: ConverterOptions = {
	...defaultOptions,
	extensions: [],
};
export interface MmConverter {
	backslashEscapesHTMLTags?: ConverterOptions["backslashEscapesHTMLTags"];
	completeHTMLDocument?: ConverterOptions["completeHTMLDocument"];
	customizedHeaderId?: ConverterOptions["customizedHeaderId"];
	disableForced4SpacesIndentedSublists?: ConverterOptions["disableForced4SpacesIndentedSublists"];
	ellipsis?: ConverterOptions["ellipsis"];
	encodeEmails?: ConverterOptions["encodeEmails"];
	extensions?: ConverterOptions["extensions"];
	ghCompatibleHeaderId?: ConverterOptions["ghCompatibleHeaderId"];
	ghMentions?: ConverterOptions["ghMentions"];
	ghMentionsLink?: ConverterOptions["ghMentionsLink"];
	headerLevelStart?: 1 | 2 | 3 | 4 | 5 | 6;
	literalMidWordUnderscores?: ConverterOptions["literalMidWordUnderscores"];
	metadata?: ConverterOptions["metadata"];
	noHeaderId?: ConverterOptions["noHeaderId"];
	omitExtraWLInCodeBlocks?: ConverterOptions["omitExtraWLInCodeBlocks"];
	openLinksInNewWindow?: ConverterOptions["openLinksInNewWindow"];
	prefixHeaderId?: ConverterOptions["prefixHeaderId"];
	rawHeaderId?: ConverterOptions["rawHeaderId"];
	rawPrefixHeaderId?: ConverterOptions["rawPrefixHeaderId"];
	requireSpaceBeforeHeadingText?: ConverterOptions["requireSpaceBeforeHeadingText"];
	simpleLineBreaks?: ConverterOptions["simpleLineBreaks"];
	splitAdjacentBlockquotes?: ConverterOptions["splitAdjacentBlockquotes"];
	smartIndentationFix?: ConverterOptions["smartIndentationFix"];
	smoothLivePreview?: ConverterOptions["smoothLivePreview"];
	strikethrough?: ConverterOptions["strikethrough"];
	tablesHeaderId?: ConverterOptions["tablesHeaderId"];
	underline?: ConverterOptions["underline"];
}

/**
 * **Generates and returns the options object for the Markdown converter based on the provided options or defaults.**
 *
 * @param options - Optional custom options to override the default settings.
 * @returns The options object for the Markdown converter.
 */
export const getOptions = (options?: MmConverter) => {
	const dfoptions: ConverterOptions = {
		emoji: true,
		ghCodeBlocks: true,
		parseImgDimensions: true,
		simplifiedAutoLink: true,
		tables: true,
		tasklists: true,
		backslashEscapesHTMLTags:
			options?.backslashEscapesHTMLTags ?? dco.backslashEscapesHTMLTags,
		completeHTMLDocument:
			options?.completeHTMLDocument ?? dco.completeHTMLDocument,
		customizedHeaderId: options?.customizedHeaderId ?? dco.customizedHeaderId,
		disableForced4SpacesIndentedSublists:
			options?.disableForced4SpacesIndentedSublists ??
			dco.disableForced4SpacesIndentedSublists,
		ellipsis: options?.ellipsis ?? dco.ellipsis,
		encodeEmails: options?.encodeEmails ?? dco.encodeEmails,
		extensions: options?.extensions ?? dco.extensions,
		ghCompatibleHeaderId:
			options?.ghCompatibleHeaderId ?? dco.ghCompatibleHeaderId,
		ghMentions: options?.ghMentions ?? dco.ghMentions,
		ghMentionsLink: options?.ghMentionsLink ?? dco.ghMentionsLink,
		headerLevelStart: options?.headerLevelStart ?? dco.headerLevelStart,
		literalMidWordUnderscores:
			options?.literalMidWordUnderscores ?? dco.literalMidWordUnderscores,
		metadata: options?.metadata ?? dco.metadata,
		noHeaderId: options?.noHeaderId ?? dco.noHeaderId,
		omitExtraWLInCodeBlocks:
			options?.omitExtraWLInCodeBlocks ?? dco.omitExtraWLInCodeBlocks,
		openLinksInNewWindow:
			options?.openLinksInNewWindow ?? dco.openLinksInNewWindow,
		prefixHeaderId: options?.prefixHeaderId ?? dco.prefixHeaderId,
		rawHeaderId: options?.rawHeaderId ?? dco.rawHeaderId,
		rawPrefixHeaderId: options?.rawPrefixHeaderId ?? dco.rawPrefixHeaderId,
		requireSpaceBeforeHeadingText:
			options?.requireSpaceBeforeHeadingText ??
			dco.requireSpaceBeforeHeadingText,
		simpleLineBreaks: options?.simpleLineBreaks ?? dco.simpleLineBreaks,
		splitAdjacentBlockquotes:
			options?.splitAdjacentBlockquotes ?? dco.splitAdjacentBlockquotes,
		smartIndentationFix:
			options?.smartIndentationFix ?? dco.smartIndentationFix,
		smoothLivePreview: options?.smoothLivePreview ?? dco.smoothLivePreview,
		strikethrough: options?.strikethrough ?? dco.strikethrough,
		tablesHeaderId: options?.tablesHeaderId ?? dco.tablesHeaderId,
		underline: options?.underline ?? dco.underline,
	};
	return dfoptions;
};
