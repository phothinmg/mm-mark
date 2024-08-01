import type { ShowdownOptions, ConverterOptions } from "showdown";

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
const getOpions = (options?: ConverterOptions) => {
  const dfoptions: ConverterOptions = {
    backslashEscapesHTMLTags: options?.backslashEscapesHTMLTags ?? dco.backslashEscapesHTMLTags,
    completeHTMLDocument: options?.completeHTMLDocument ?? dco.completeHTMLDocument,
    customizedHeaderId: options?.customizedHeaderId ?? dco.customizedHeaderId,
    disableForced4SpacesIndentedSublists: options?.disableForced4SpacesIndentedSublists ?? dco.disableForced4SpacesIndentedSublists,
    ellipsis: options?.ellipsis ?? dco.ellipsis,
    emoji: options?.emoji ?? dco.emoji,
    encodeEmails: options?.encodeEmails ?? dco.encodeEmails,
    extensions: options?.extensions ?? dco.extensions,
    ghCodeBlocks: options?.ghCodeBlocks ?? dco.ghCodeBlocks,
    ghCompatibleHeaderId: options?.ghCompatibleHeaderId ?? dco.ghCompatibleHeaderId,
    ghMentions: options?.ghMentions ?? dco.ghMentions,
    ghMentionsLink: options?.ghMentionsLink ?? dco.ghMentionsLink,
    headerLevelStart: options?.headerLevelStart ?? dco.headerLevelStart,
    literalMidWordUnderscores: options?.literalMidWordUnderscores ?? dco.literalMidWordUnderscores,
    metadata: options?.metadata ?? dco.metadata,
    noHeaderId: options?.noHeaderId ?? dco.noHeaderId,
    omitExtraWLInCodeBlocks: options?.omitExtraWLInCodeBlocks ?? dco.omitExtraWLInCodeBlocks,
    openLinksInNewWindow: options?.openLinksInNewWindow ?? dco.openLinksInNewWindow,
    parseImgDimensions: options?.parseImgDimensions ?? dco.parseImgDimensions,
    prefixHeaderId: options?.prefixHeaderId ?? dco.prefixHeaderId,
    rawHeaderId: options?.rawHeaderId ?? dco.rawHeaderId,
    rawPrefixHeaderId: options?.rawPrefixHeaderId ?? dco.rawPrefixHeaderId,
    requireSpaceBeforeHeadingText: options?.requireSpaceBeforeHeadingText ?? dco.requireSpaceBeforeHeadingText,
    simpleLineBreaks: options?.simpleLineBreaks ?? dco.simpleLineBreaks,
    splitAdjacentBlockquotes: options?.splitAdjacentBlockquotes ?? dco.splitAdjacentBlockquotes,
    simplifiedAutoLink: options?.simplifiedAutoLink ?? dco.simplifiedAutoLink,
    smartIndentationFix: options?.smartIndentationFix ?? dco.smartIndentationFix,
    smoothLivePreview: options?.smoothLivePreview ?? dco.smoothLivePreview,
    strikethrough: options?.strikethrough ?? dco.strikethrough,
    tables: options?.tables ?? dco.tables,
    tablesHeaderId: options?.tablesHeaderId ?? dco.tablesHeaderId,
    tasklists: options?.tasklists ?? dco.tasklists, // Corrected the property name
    underline: options?.underline ?? dco.underline,
  };
  return dfoptions;
};