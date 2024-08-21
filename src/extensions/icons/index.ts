import Mmmark from "../../index.js";

function showdownIcons(): Mmmark.ShowdownExtension[] {
  return [
    {
      type: "lang",
      regex: "\\B(\\\\)?@fa-([\\S]+)\\b",
      replace: function (a: any, b: string, c: string) {
        return b === "\\" ? a : '<i class="fa fa-' + c + '">' + "</i>";
      },
    },
    {
      type: "output",
      filter: (text: string) => {
        const scriptTag = `
        <script>
        var script = document.createElement("script");
        script.src = "https://kit.fontawesome.com/50c925d5df.js";
        script.crossorigin = "anonymous";
        document.head.appendChild(script);
        </script>`;
        return scriptTag + text;
      },
    },
  ];
}

Mmmark.registerExtension("showdownIcons", showdownIcons());

export default showdownIcons;
