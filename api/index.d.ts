import type ts from "typescript";
/**
 * Converts a string of TypeScript or JavaScript code into
 * an equivalent .d.ts code string.
 *
 * @param files An object map of filenames and strings (file content) of files to convert, eg { "Dog.ts": "export class Dog {}" }
 * @param compilerOptions Options for the TypeScript compiler, as found in your tsconfig.json's "compilerOptions" property
 * @param tsModule An alternate version of the "typescript" module to use for compilation, instead of the one included with convert-to-dts.
 * @returns An object map of filenames and strings (file content) of output (.d.ts) files.
 */
export declare function convertToDeclaration(
  files: {
    [name: string]: string;
  },
  compilerOptions?: ts.CompilerOptions,
  tsModule?: typeof ts
): {
  [name: string]: string;
};
