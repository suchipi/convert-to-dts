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
