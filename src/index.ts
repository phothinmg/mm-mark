import frontmatter from "ptm-frontmatter";
import showdown from "showdown";
import fs from "node:fs";
import htmlTemplate from "./postTemp.js";
import ShowdownMathjax from "showdown-mathjax";
import showdownPrism from "showdown-prism";

/**
 * Convert markdown file to HTML content.
 * ----------
 * 
 * ***Base on Showndown JS and TeX,  LaTeX,  MathMl, Prism JS are support.***
 * 
 * @example
 * const converter = new Converter(_PATH_TO_MARKDOWN_FILE);
 * 
 * 
 * 
 * @return 
 * - json : {data: *frontmatter*, content: markdown content(before convert)}
 * - data : frontmatter , default  date and title
 * - content :  markdown content(before convert)
 * - postTitle : Title of post from data(frontmatter)
 * - postDate : Posted date from data(frontmatter)
 * - lastUpdatedDate : Last updated date of content
 * - readingTime : Reading time of content
 * - convertedContent : Converted content.
 * - postHtml : HTML with convertedContent , postTitle , 
 *              postDate , lastUpdatedDate , readingTime 
 *              (for blog post)
 * - pageHtml : HTML with only convertedContent for page
 * 
 */
class Converter {
  filePath: string;
  /**
   * Creates an instance of the Converter class.
   *
   * @param {string} filePath - The path of the file to be converted.
   */
  constructor(filePath: string) {
    this.filePath = filePath;
  }
  /**
   * Formats a given date string into a specific format.
   * @param date - The date string to be formatted.
   * @returns The formatted date string in the format "Weekday, Day Month Year". For example, "Sat, 01 Jan 2022".
   */
  formatDate(date: string): string {
    return new Date(date).toLocaleString("en-US", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }

  /**
   * Calculates the estimated reading time of a given text.
   *
   * @param {string} text - The text to calculate the reading time for.
   * @return {number} The estimated reading time in minutes.
   */
  readTime(text: string): number {
    const wpm = 225;
    const words = text.trim().split(/\s+/).length;
    return Math.ceil(words / wpm);
  }

  /**
   * Retrieves the last update time of a file.
   *
   * @return {string} The last modified time of the file in ISO string format.
   */
  lastUpdate(): string {
    const stats = fs.statSync(this.filePath);
    const lastModifiedTime = stats.mtime.toISOString();
    return lastModifiedTime;
  }

  /**
   * Initializes and configures a showdown.Converter object with specific options and flavor.
   * @returns {showdown.Converter} The initialized converter object.
   */
  convert(): showdown.Converter {
    const converter = new showdown.Converter({
      parseImgDimensions: true,
      simplifiedAutoLink: true,
      strikethrough: true,
      tables: true,
      tasklists: true,
      openLinksInNewWindow: true,
      emoji: true,
      moreStyling: true,
      extensions: [ShowdownMathjax, showdownPrism],
    });

    converter.setFlavor("github");
    return converter;
  }

  /**
   * Retrieves the content of the file using frontmatter.
   *
   * @return {any} The frontmatter content of the file.
   */
  filecontent(): any {
    try {
      return frontmatter(this.filePath);
    } catch (error) {
      console.error("Error reading or parsing file:", error);
      return null; // Or handle error as appropriate
    }
  }

  /**
   * Retrieves the data from the frontmatter of the file at the specified file path.
   *
   * @return {any} The data retrieved from the frontmatter of the file.
   */
  get data(): any {
    return frontmatter(this.filePath).data;
  }
  /**
   * Retrieves the content from the frontmatter of the file at the specified file path.
   *
   * @return {any} The content retrieved from the frontmatter of the file.
   */
  get content(): any {
    return frontmatter(this.filePath).content;
  }
  /**
   * Retrieves the post title from the data object.
   *
   * @return {any} The post title.
   */
  get postTitle(): any {
    return this.data.title;
  }
  /**
   * Retrieves the post date from the data object.
   *
   * @return {any} The post date.
   */
  get postDate(): any {
    return this.formatDate(this.data.date);
  }
  /**
   * Retrieves the last updated date of the content.
   *
   * @return {string} The formatted last updated date string.
   */
  get lastUpdatedDate(): string {
    const a = this.formatDate(this.lastUpdate());
    return `<small>Last Update : ${a}</small>`;
  }
  /**
   * Calculates the estimated reading time of the content and returns it as a formatted string.
   *
   * @return {string} The formatted string representing the reading time.
   */
  get readingTime(): string {
    const a = this.readTime(this.content);
    return `<small>Reading Time : ${a} minutes</small>`;
  }
  /**
   * Returns a JSON string representation of the file content.
   *
   * @return {string} The JSON string representation of the file content.
   */
  get json(): string {
    return JSON.stringify(this.filecontent());
  }
  /**
   * Returns the converted content of the object as a string.
   *
   * @return {string} The converted content as a string.
   */
  get convertedContent(): string {
    return this.convert().makeHtml(this.content);
  }

  /**
   * Retrieves the post HTML content with converted content, title, date, reading time, and last update.
   *
   * @return {string} The post HTML content.
   */
  get postHtml(): string {
    return htmlTemplate({
      postContent: this.convertedContent,
      postTitle: this.postTitle,
      postDate: this.postDate,
      readingTime: this.readingTime,
      lastUpdate: this.lastUpdatedDate,
    });
  }

  /**
   * Retrieves the page HTML content with converted content, title, date, reading time, and last update.
   *
   * @return {string} The page HTML content.
   */
  get pageHtml(): string {
    return htmlTemplate({
      postContent: this.convertedContent,
      postTitle: "",
      postDate: "",
      readingTime: "",
      lastUpdate: "",
    });
  }
}

export default Converter;
