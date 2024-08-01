

export interface ShowdownOpts {
  omitExtraWLInCodeBlocks: boolean;
  noHeaderId: boolean;
  prefixHeaderId: boolean;
  rawPrefixHeaderId: boolean;
  ghCompatibleHeaderId: boolean;
  rawHeaderId: boolean;
  headerLevelStart: 1 | 2 | 3;
  parseImgDimensions: boolean;
  simplifiedAutoLink: boolean;
  excludeTrailingPunctuationFromURLs: boolean;
  literalMidWordUnderscores: boolean;
  literalMidWordAsterisks: boolean;
  strikethrough: boolean;
  tables: boolean;
  tablesHeaderId: boolean;
  ghCodeBlocks: boolean;
  tasklists: boolean;
  smoothLivePreview: boolean;
  smartIndentationFix: boolean;
  disableForced4SpacesIndentedSublists: boolean;
  simpleLineBreaks: boolean;
  requireSpaceBeforeHeadingText: boolean;
  ghMentions: boolean;
  ghMentionsLink: string;
  encodeEmails: boolean;
  openLinksInNewWindow: boolean;
  backslashEscapesHTMLTags: boolean;
  emoji: boolean;
  underline: boolean;
  ellipsis: boolean;
  completeHTMLDocument: boolean;
  metadata: boolean;
  splitAdjacentBlockquotes: boolean;
}
