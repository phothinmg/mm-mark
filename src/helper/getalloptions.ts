import type { ConverterOptions } from "showdown";

/**
 * Clone of Showdown.ConverterOptions
 */
type MmmarkConverterOptions = ConverterOptions;
/**
 * Options for user choice
 */
type MmmarkUserSelectOptions = {
	/**
	 * Support for HTML Tag escaping.
	 *
	 * @example
	 * **input**:
	 *
	 * ```md
	 * \<div>foo\</div>.
	 * ```
	 *
	 * **backslashEscapesHTMLTags** = false
	 * ```html
	 * <p>\<div>foo\</div></p>
	 * ```
	 *
	 * **backslashEscapesHTMLTags** = true
	 * ```html
	 * <p>&lt;div&gt;foo&lt;/div&gt;</p>
	 * ```
	 * @default false
	 */
	backslashEscapesHTMLTags?: MmmarkConverterOptions["backslashEscapesHTMLTags"];
	/**
	 * Use text in curly braces as header id.
	 *
	 * @example
	 *  ```md
	 *   ## Sample header {real-id}     will use real-id as id
	 *  ```
	 * @default false
	 */
	customizedHeaderId?: MmmarkConverterOptions["customizedHeaderId"];
	/**
	 * Disables the requirement of indenting sublists by 4 spaces for them to be nested,
	 * effectively reverting to the old behavior where 2 or 3 spaces were enough.
	 *
	 * @example
	 * **input**:
	 *
	 * ```md
	 * - one
	 *   - two
	 *
	 * ...
	 *
	 * - one
	 *     - two
	 * ```
	 *
	 * **disableForced4SpacesIndentedSublists** = false
	 *
	 * ```html
	 * <ul>
	 * <li>one</li>
	 * <li>two</li>
	 * </ul>
	 * <p>...</p>
	 * <ul>
	 * <li>one
	 *    <ul>
	 *        <li>two</li>
	 *    </ul>
	 * </li>
	 * </ul>
	 * ```
	 *
	 * **disableForced4SpacesIndentedSublists** = true
	 *
	 * ```html
	 * <ul>
	 * <li>one
	 *    <ul>
	 *        <li>two</li>
	 *    </ul>
	 * </li>
	 * </ul>
	 * <p>...</p>
	 * <ul>
	 * <li>one
	 *    <ul>
	 *        <li>two</li>
	 *    </ul>
	 * </li>
	 * </ul>
	 * ```
	 * @default false
	 */
	disableForced4SpacesIndentedSublists?: MmmarkConverterOptions["disableForced4SpacesIndentedSublists"];
	/**
	 * Add showdown extensions to the new converter can be showdown extensions or "global" extensions name.
	 *
	 * @default
	 * []
	 *
	 * Add extensions to the new converter can be showdown extensions or "global" extensions name.
	 */
	extensions?: MmmarkConverterOptions["extensions"];
	/**
	 * Generate header ids compatible with github style (spaces are replaced
	 * with dashes and a bunch of non alphanumeric chars are removed).
	 *
	 * @example
	 * **input**:
	 *
	 * ```md
	 * # This is a header with @#$%
	 * ```
	 *
	 * **ghCompatibleHeaderId** = false
	 *
	 * ```html
	 * <h1 id="thisisaheader">This is a header</h1>
	 * ```
	 *
	 * **ghCompatibleHeaderId** = true
	 *
	 * ```html
	 * <h1 id="this-is-a-header-with-">This is a header with @#$%</h1>
	 * ```
	 * @default false
	 */
	ghCompatibleHeaderId?: MmmarkConverterOptions["ghCompatibleHeaderId"];
	/**
	 * Enables support for github @mentions, which links to the github profile page of the username mentioned.
	 *
	 * @example
	 * **input**:
	 *
	 * ```md
	 * hello there @tivie
	 * ```
	 *
	 * **ghMentions** = false
	 *
	 * ```html
	 * <p>hello there @tivie</p>
	 * ```
	 *
	 * **ghMentions** = true
	 *
	 * ```html
	 * <p>hello there <a href="https://www.github.com/tivie>@tivie</a></p>
	 * ```
	 * @default false
	 */
	ghMentions?: MmmarkConverterOptions["ghMentions"];
	/**
	 * Changes the link generated by @mentions. `{u}` is replaced by the text of the mentions. Only applies if **[ghMentions][]** is enabled.
	 *
	 * @example
	 * **input**:
	 *
	 * ```md
	 * hello there @tivie
	 * ```
	 *
	 * **ghMentionsLink** = https://github.com/{u}
	 *
	 * ```html
	 * <p>hello there <a href="https://www.github.com/tivie>@tivie</a></p>
	 * ```
	 *
	 * **ghMentionsLink** = http://mysite.com/{u}/profile
	 *
	 * ```html
	 * <p>hello there <a href="//mysite.com/tivie/profile">@tivie</a></p>
	 * ```
	 * @default https://github.com/{u}
	 */
	ghMentionsLink?: MmmarkConverterOptions["ghMentionsLink"];
	/**
	 * Turning this on will stop showdown from interpreting underscores in the middle of
	 * words as <em> and <strong> and instead treat them as literal underscores.
	 *
	 * @example
	 * **input**:
	 *
	 * ```md
	 * some text with__underscores__in middle
	 * ```
	 *
	 * **literalMidWordUnderscores** = false
	 *
	 * ```html
	 * <p>some text with<strong>underscores</strong>in middle</p>
	 * ```
	 *
	 * **literalMidWordUnderscores** = true
	 *
	 * ```html
	 * <p>some text with__underscores__in middle</p>
	 * ```
	 * @default false
	 */
	literalMidWordUnderscores?: MmmarkConverterOptions["literalMidWordUnderscores"];
	/**
	 * Disable the automatic generation of header ids.
	 * Showdown generates an id for headings automatically. This is useful for linking to a specific header.
	 * This behavior, however, can be disabled with this option.
	 *
	 * @example
	 * **input**:
	 *
	 * ```md
	 * # This is a header
	 * ```
	 *
	 * **noHeaderId** = false
	 *
	 * ```html
	 * <h1 id="thisisaheader">This is a header</h1>
	 * ```
	 *
	 * **noHeaderId** = true
	 *
	 * ```html
	 * <h1>This is a header</h1>
	 * ```
	 * @default false
	 */
	noHeaderId?: MmmarkConverterOptions["noHeaderId"];
	/**
	 * Omit the trailing newline in a code block.
	 * By default, showdown adds a newline before the closing tags in code blocks. By enabling this option, that newline is removed.
	 * This option affects both indented and fenced (gfm style) code blocks.
	 *
	 * @example
	 *
	 * **input**:
	 *
	 * ```md
	 * var foo = 'bar';
	 * ```
	 *
	 * **omitExtraWLInCodeBlocks** = false:
	 *
	 * ```html
	 * <code><pre>var foo = 'bar';
	 * </pre></code>
	 * ```
	 * **omitExtraWLInCodeBlocks** = true:
	 *
	 * ```html
	 * <code><pre>var foo = 'bar';</pre></code>
	 * ```
	 * @default false
	 */
	omitExtraWLInCodeBlocks?: MmmarkConverterOptions["omitExtraWLInCodeBlocks"];
	/**
	 * Add a prefix to the generated header ids.
	 * Passing a string will prefix that string to the header id.
	 * Setting to true will add a generic 'section' prefix.
	 *
	 * @default false
	 */
	prefixHeaderId?: MmmarkConverterOptions["prefixHeaderId"];
	/**
	 * Remove only spaces, ' and " from generated header ids (including prefixes),
	 * replacing them with dashes (-).
	 * WARNING: This might result in malformed ids.
	 *
	 * @default false
	 */
	rawHeaderId?: MmmarkConverterOptions["rawHeaderId"];
	/**
	 * Setting this option to true will prevent showdown from modifying the prefix.
	 * This might result in malformed IDs (if, for instance, the " char is used in the prefix).
	 * Has no effect if prefixHeaderId is set to false.
	 *
	 * @default false
	 */
	rawPrefixHeaderId?: MmmarkConverterOptions["rawPrefixHeaderId"];
	/**
	 * Makes adding a space between # and the header text mandatory.
	 *
	 * @example
	 * **input**:
	 *
	 * ```md
	 * #header
	 * ```
	 *
	 * **requireSpaceBeforeHeadingText** = false
	 *
	 * ```html
	 * <h1 id="header">header</h1>
	 * ```
	 *
	 * **simpleLineBreaks** = true
	 *
	 * ```html
	 * <p>#header</p>
	 * ```
	 *
	 * @default false
	 */
	requireSpaceBeforeHeadingText?: MmmarkConverterOptions["requireSpaceBeforeHeadingText"];
	/**
	 * Parses line breaks as like GitHub does, without needing 2 spaces at the end of the line.
	 *
	 * @example
	 * **input**:
	 *
	 * ```md
	 * a line
	 * wrapped in two
	 * ```
	 *
	 * **simpleLineBreaks** = false
	 *
	 * ```html
	 * <p>a line
	 * wrapped in two</p>
	 * ```
	 *
	 * **simpleLineBreaks** = true
	 *
	 * ```html
	 * <p>a line<br>
	 * wrapped in two</p>
	 * ```
	 * @default false
	 */
	simpleLineBreaks?: MmmarkConverterOptions["simpleLineBreaks"];
	/**
	 * Split adjacent blockquote blocks.
	 */
	splitAdjacentBlockquotes?: MmmarkConverterOptions["splitAdjacentBlockquotes"];
	/**
	 * Tries to smartly fix indentation problems related to es6 template
	 * strings in the midst of indented code.
	 *
	 * @default false
	 */
	smartIndentationFix?: MmmarkConverterOptions["smartIndentationFix"];
	/**
	 * Prevents weird effects in live previews due to incomplete input.
	 *
	 * @example
	 * ![awkward effect](http://i.imgur.com/YQ9iHTL.gif)
	 * You can prevent this by enabling this option.
	 * @default false
	 */
	smoothLivePreview?: MmmarkConverterOptions["smoothLivePreview"];
	/**
	 * If enabled adds an id property to table headers tags.
	 *
	 * @remarks This options only applies if **[tables][]** is enabled.
	 * @default false
	 */
	tablesHeaderId?: MmmarkConverterOptions["tablesHeaderId"];
	/**
	 * Enable support for underline. Syntax is double or triple underscores: `__underline word__`. With this option enabled,
	 * underscores no longer parses into `<em>` and `<strong>`
	 *
	 * @example
	 * **input**:
	 *
	 * ```md
	 * __underline word__
	 * ```
	 *
	 * **underline** = false
	 * ```html
	 * <p><strong>underlined word</strong></p>
	 * ```
	 *
	 * **underline** = true
	 * ```html
	 * <p><u>underlined word</u></p>
	 * ```
	 * @default false
	 */
	underline?: MmmarkConverterOptions["underline"];
};

/**
 * **Getting all options**
 *
 * @param options - Optional custom options to override the default settings.
 * @returns The options object for the Markdown converter.
 */
const getAllOptions = (
	options?: MmmarkUserSelectOptions,
): MmmarkConverterOptions => {
	const dfoptions: MmmarkConverterOptions = {
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
		ghMentionsLink: options?.ghMentionsLink ?? "https://github.com/{u}",
		literalMidWordUnderscores: options?.literalMidWordUnderscores ?? false,
		noHeaderId: options?.noHeaderId ?? false,
		omitExtraWLInCodeBlocks: options?.omitExtraWLInCodeBlocks ?? false,
		prefixHeaderId: options?.prefixHeaderId ?? false,
		rawHeaderId: options?.rawHeaderId ?? false,
		rawPrefixHeaderId: options?.rawPrefixHeaderId ?? false,
		requireSpaceBeforeHeadingText:
			options?.requireSpaceBeforeHeadingText ?? false,
		simpleLineBreaks: options?.simpleLineBreaks ?? false,
		splitAdjacentBlockquotes: options?.splitAdjacentBlockquotes ?? false,
		smartIndentationFix: options?.smartIndentationFix ?? false,
		smoothLivePreview: options?.smoothLivePreview ?? false,
		tablesHeaderId: options?.tablesHeaderId ?? false,
		underline: options?.underline ?? false,
	};
	return dfoptions;
};

export {
	getAllOptions,
	type MmmarkConverterOptions,
	type MmmarkUserSelectOptions,
};