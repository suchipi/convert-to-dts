# convert-to-dts

Converts the source code for any `.js` or `.ts` file into the equivalent `.d.ts` code TypeScript would generate.

## Usage

```js
import { convertToDeclaration } from "convert-to-dts";

const code = `
  import fs from "fs";
  import path from "path";

  /**
   * Comment :D
   */
  export class Something {
    blah!: typeof path;

    constructor() {
      console.log("hi");
    }
  }
`;

const converted = convertToDeclaration(code);
console.log(converted);

// Logs:
//
// import path from "path";
// /**
//  * Comment :D
//  */
// export declare class Something {
//     blah: typeof path;
//     constructor();
// }
```

## API Documentation

Please see [api/index.d.ts](https://github.com/suchipi/convert-to-dts/blob/main/api/index.d.ts) for API documentation. There are lots of comments.

## License

MIT
