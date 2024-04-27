import Showdown, { ShowdownOptions } from "showdown";
import { findMetaIndices, getData, getContent } from "./frontmatter";
import { htmlTemplate } from "./template";
import showdownMathjax from "showdown-mathjax";
import showdownPrism from "showdown-prism";
import { showmarkToc } from "showmark-toc";
/**
 * Class representing a Markdown converter.
 *
 * @class Markdown
 */
class Markdown {
  /**
   * Formats a date string into a localized date format.
   *
   * @param date - The date string to be formatted.
   * @returns The formatted date string.
   */
  formatDate(date: any): string {
    return new Date(date).toLocaleString("en-US", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }
  /**
   * Calculates the estimated reading time for a given text.
   *
   * @param text - The text to calculate the reading time for.
   * @returns The estimated reading time in minutes.
   */
  readTime(text: string): number {
    const wpm = 225;
    const words = text.trim().split(/\s+/).length;
    return Math.ceil(words / wpm);
  }
  /**
   * Retrieves the frontmatter data and content from a file.
   *
   * @param contents - Markdown contents.
   * @returns An object containing the frontmatter data and content.
   *          - data: A record of key-value pairs representing the frontmatter data.
   *          - content: The content of the file.
   */
  frontmatter(contents: string): {
    data: Record<string, unknown>;
    content: string;
  } {
    const lines = contents.split("\n");
    const metaIndices = lines.reduce(findMetaIndices, []);
    const data = getData({ lines, metaIndices });
    const content = getContent({ lines, metaIndices });

    return { data, content };
  }
  /**
   * Creates a new instance of the Showdown converter with the specified options.
   *
   * @param options - The options to configure the converter.
   * @returns A new instance of the Showdown converter.
   */
  /**
   * Creates a new instance of the Showdown converter with the specified options.
   *
   * @param options - The options to configure the converter.
   * @returns A new instance of the Showdown converter.
   */
  converter(options?: ShowdownOptions): Showdown.Converter {
    return new Showdown.Converter(options);
  }
  /**
   * Converts a markdown file to HTML and returns various data related to the file.
   *
   * @param contents - Markdown Contents.
   * @returns An object containing the following properties:
   *          - data: A record of key-value pairs representing the frontmatter data.
   *          - json: The frontmatter data and content in JSON string format.
   *          - convertedHtml: The converted HTML content of the markdown file.
   *          - postHtml: The HTML template for displaying the converted markdown content with additional information such as post title, date, reading time, and last update.
   *          - pageHtml: The HTML template for displaying the converted markdown content without additional information.
   */
  markToHtml(contents: string): object {
    const con = this.frontmatter(contents);
    const data = con.data;
    const content = con.content;
    const json = JSON.stringify(con, null, 2);
    const convert = this.converter({
      parseImgDimensions: true,
      simplifiedAutoLink: true,
      strikethrough: true,
      tables: true,
      tasklists: true,
      openLinksInNewWindow: true,
      emoji: true,
      moreStyling: true,
      extensions: [showdownMathjax, showdownPrism, showmarkToc],
    });
    convert.setFlavor("github");
    const convertedHtml = convert.makeHtml(content);
    let postTitle: {};
    if (data.title) {
      postTitle = data.title;
    } else {
      postTitle = "";
    }
    let postDate;
    if (data.date) {
      postDate = this.formatDate(data.date);
    } else {
      postDate = "";
    }
    const readingTime = /* html */ `<small>Reading Time : ${this.readTime(
      content
    )} minutes</small>`;
    const postHtml = htmlTemplate({
      postContent: convertedHtml,
      postTitle: postTitle,
      postDate: postDate,
      readingTime: readingTime,
    });
    const pageHtml = htmlTemplate({
      postContent: convertedHtml,
    });
    return {
      data,
      json,
      convertedHtml,
      postHtml,
      pageHtml,
    };
  }
}





/**
 * Creates a new instance of the Markdown converter.
 *
 * @returns A new instance of the Markdown converter.
 */
export function mmMark(): Markdown {
  return new Markdown();
}
