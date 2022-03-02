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

  const result = convertToDeclaration({
    "code.ts": code,
  });

  expect(result).toMatchInlineSnapshot(`
    {
      "code.d.ts": "import path from \\"path\\";
    /**
     * Comment :D
     */
    export declare class Something {
        blah: typeof path;
        constructor();
    }
    ",
    }
  `);
});

test("multiple files", () => {
  const result = convertToDeclaration({
    "one.ts": `export const one = 1;`,
    "two.ts": `
      import {one} from "./one";
      export const two = one + one;
    `,
  });

  expect(result).toMatchInlineSnapshot(`
    {
      "one.d.ts": "export declare const one = 1;
    ",
      "two.d.ts": "export declare const two: any;
    ",
    }
  `);
});

test("errors properly", () => {
  const code = `
    declare var blah: dsjfkldsjlkf;
    declare var blah: d43y89jf4yituh4eruoi9cm43yt87h4reiy;
  `;

  expect(() => {
    convertToDeclaration({
      "code.ts": code,
    });
  }).toThrowErrorMatchingInlineSnapshot(`
"Conversion failed:
code.ts: Exported variable 'blah' has or is using private name 'dsjfkldsjlkf'.
code.ts: Exported variable 'blah' has or is using private name 'd43y89jf4yituh4eruoi9cm43yt87h4reiy'."
`);
});
