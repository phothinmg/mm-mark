import {
  type MmExtension,
  registerExtension,
} from "../manage-extensions/index.ts";
/**
 * Twitter Extension
 * Support for twitter @username and hashtag
 * Usage:
 * @username   ->  <a href="http://twitter.com/username">@username</a>
 * #hashtag    ->  <a href="http://twitter.com/search/%23hashtag">#hashtag</a>
 */
function twitter(): MmExtension[] {
  return [
    // @username syntax
    {
      type: "lang",
      regex: "\\B(\\\\)?@([\\S]+)\\b",
      replace: (match: string, leadingSlash: string, username: string) => {
        // Check if we matched the leading \ and return nothing changed if so
        if (leadingSlash === "\\") {
          return match;
        }
        return `<a href="http://twitter.com/${username}">@${username}</a>`;
      },
    },
    // #hashtag syntax
    {
      type: "lang",
      regex: "\\B(\\\\)?#([\\S]+)\\b",
      replace: (match: string, leadingSlash: string, tag: string) => {
        // Check if we matched the leading \ and return nothing changed if so
        if (leadingSlash === "\\") {
          return match;
        }
        return `<a href="http://twitter.com/search/%23${tag}">#${tag}</a>`;
      },
    },
    // Escaped @'s
    {
      type: "lang",
      regex: "\\\\@",
      replace: "@",
    },
  ];
}
registerExtension("twitter", twitter());

export default twitter;
