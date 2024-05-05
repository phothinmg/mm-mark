import Showdown, { ShowdownOptions } from "showdown";

namespace MmMark {
  export const Converter = (options?: ShowdownOptions) => {
    return new Showdown.Converter(options);
  };
}

MmMark.Converter
