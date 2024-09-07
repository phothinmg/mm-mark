export type HtmlOptions = {
  lang?: string;
  title?: string;
  cssLinks?: string[];
  /**
   * Only .ico type
   */
  favicon?: string;
  metaTags?: Array<{
    name: string;
    content: string;
  }>;
  scriptTags?: {
    head?: {
      scriptNormalTags?: string[];
      scriptModuleTags?: string[];
    };
    body?: {
      scriptNormalTags?: string[];
      scriptModuleTags?: string[];
    };
  };
};

const htmlDoc = (text: string, options?: HtmlOptions): string => {
  const lang = options?.lang ?? "en";
  const metaTags = options?.metaTags ?? [{ name: "", content: "" }];
  const cssLinks = options?.cssLinks ?? [""];
  const favicon = options?.favicon ?? "";
  const hnst = options?.scriptTags?.head?.scriptNormalTags ?? [""];
  const hmst = options?.scriptTags?.head?.scriptModuleTags ?? [""];
  const title = options?.title ?? "";
  const bnst = options?.scriptTags?.body?.scriptNormalTags ?? [""];
  const bmst = options?.scriptTags?.body?.scriptModuleTags ?? [""];
  const html = `
    <!DOCTYPE html>
      <html lang=${lang}>
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          ${metaTags.map((i) => `<meta name=${i.name} content=${i.content}>`)}
          ${cssLinks.map((i) => `<link rel="stylesheet" href=${i}>`)}
          <link rel="shortcut icon" href=${favicon} type="image/x-icon">
           ${hnst.map((i) => ` <script src=${i}></script>`)}
           ${hmst.map((i) => `<script type="module" src=${i}></script>`)}
          <title>${title}</title>
      </head>
      <body>
          ${text}
            ${bnst.map((i) => ` <script src=${i}></script>`)}
           ${bmst.map((i) => `<script type="module" src=${i}></script>`)}
      </body>
      </html>
  `;
  return html;
};

export default htmlDoc;
