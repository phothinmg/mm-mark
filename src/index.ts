import frontmatter from "ptm-frontmatter";
import showdown from "showdown";
import fs from "node:fs";
import htmlTemplate from "./postTemp.js";
import ShowdownMathjax from "showdown-mathjax";
import showdownPrism from "showdown-prism";

class Converter {
  filePath: string;
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

  readTime(text: string): number {
    const wpm = 225;
    const words = text.trim().split(/\s+/).length;
    return Math.ceil(words / wpm);
  }

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

  filecontent(): any {
    return frontmatter(this.filePath);
  }

  get data(): any {
    return frontmatter(this.filePath).data;
  }
  get content(): any {
    return frontmatter(this.filePath).content;
  }
  get postTitle(): any {
    return this.data.title;
  }
  get postDate(): any {
    return this.formatDate(this.data.date);
  }
  get lastUpdatedDate(): string {
    const a = this.formatDate(this.lastUpdate());
    return `<small>Last Update : ${a}</small>`;
  }
  get readingTime(): string {
    const a = this.readTime(this.content);
    return `<small>Reading Time : ${a} minutes</small>`;
  }
  get json(): string {
    return JSON.stringify(this.filecontent());
  }
  get convertedContent(): string {
    return this.convert().makeHtml(this.content);
  }

  get postHtml(): string {
    return htmlTemplate({
      postContent: this.convertedContent,
      postTitle: this.postTitle,
      postDate: this.postDate,
      readingTime: this.readingTime,
      lastUpdate: this.lastUpdatedDate,
    });
  }

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
