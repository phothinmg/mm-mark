export type Temprops = {
  postContent: string;
  postTitle: string;
  postDate: string;
  readingTime: string;
  lastUpdate: string;
};
const htmlTemplate = ({
  postContent,
  postTitle,
  postDate,
  readingTime,
  lastUpdate,
}: Temprops): string => {
  const pc = postContent === undefined ? console.error("Error") : postContent;
  const tt = postTitle === undefined ? "" : postTitle;
  const dat = postDate === undefined ? "" : postDate;
  const rt = readingTime === undefined ? "" : readingTime;
  const lud = lastUpdate === undefined ? "" : lastUpdate;
  const html = /* html */ `
      <div id="mm-mark">
          <h2>${tt}</h2>
          <small>${dat}</small>
            ${rt}
          <div>${pc}</div>
          ${lud}
      </div>
        
    `;
  return html;
};

export default htmlTemplate;
