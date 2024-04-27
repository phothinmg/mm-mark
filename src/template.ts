export type Temprops = {
  postContent: string;
  postTitle?: string | {};
  postDate?: string | {};
  readingTime?: string;
};
/**
 * Generates an HTML template with the provided post content, title, date, reading time, and last update.
 *
 * @param {Temprops} props - An object containing the post content, title, date, reading time, and last update.
 * @param {string} props.postContent - The content of the post.
 * @param {string | {}} props.postTitle - The title of the post.
 * @param {string | {}} props.postDate - The date of the post.
 * @param {string} props.readingTime - The reading time of the post.
 * @return {string} The generated HTML template.
 */
export const htmlTemplate = ({
  postContent,
  postTitle,
  postDate,
  readingTime,
}: Temprops): string => {
  const pc = postContent === undefined ? console.error("Error") : postContent;
  const tt = postTitle === undefined ? "" : postTitle;
  const dat = postDate === undefined ? "" : postDate;
  const rt = readingTime === undefined ? "" : readingTime;

  const html = /* html */ `
        <div id="mm-mark">
            <h2>${tt}</h2>
            <small>${dat}</small>
              ${rt}
            <div>${pc}</div>
           
        </div>
          
      `;
  return html;
};
