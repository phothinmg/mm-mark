import {
  registerExtension,
  type MmExtension,
} from "../manage-extensions/index.js";

/**
 *
 */
declare global {
  interface Window {
    copyCodeListener?: boolean;
  }
}

/**
 * Adds an event listener to the window that listens for clicks.
 * @param {String} className The class name of the button.
 */
function addListener(className: string) {
  if (typeof window !== "undefined" && window.copyCodeListener !== true) {
    window.addEventListener("click", (e) => {
      const target = e.target as HTMLElement;
      if (
        target?.classList?.contains(className) &&
        target.nextElementSibling?.tagName === "PRE"
      ) {
        navigator.clipboard.writeText(
          (target.nextElementSibling as HTMLPreElement).innerText
        );
      }
    });
    window.copyCodeListener = true;
  }
}
/**
 * showdownCopyCode
 *
 * Showdown extension that adds a button above code blocks to quickly and easily copy code to the clipboard.
 *
 * @function
 */
function copyCode({ className = "copy-code" } = {}): MmExtension[] {
  return [
    {
      type: "output",
      filter: function (text: string) {
        addListener(className);

        return text.replace(
          /<pre.*><code/g,
          `<button class="${className}">Copy</button>$&`
        );
      },
    },
  ];
}

registerExtension("copyCode", copyCode());
export default copyCode;
