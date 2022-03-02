import { expect, test } from "vitest";
import { convertToDeclaration } from "./index";

test("basic usage", () => {
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

  const result = convertToDeclaration(code);

  expect(result).toMatchInlineSnapshot(`
    "import path from \\"path\\";
    /**
     * Comment :D
     */
    export declare class Something {
        blah: typeof path;
        constructor();
    }
    "
  `);
});

test("errors properly", () => {
  const code = `
    declare var blah: dsjfkldsjlkf;
    declare var blah: d43y89jf4yituh4eruoi9cm43yt87h4reiy;
  `;

  expect(() => {
    convertToDeclaration(code);
  }).toThrowErrorMatchingInlineSnapshot(`
"Conversion failed:
Exported variable 'blah' has or is using private name 'dsjfkldsjlkf'.
Exported variable 'blah' has or is using private name 'd43y89jf4yituh4eruoi9cm43yt87h4reiy'."`);
});
