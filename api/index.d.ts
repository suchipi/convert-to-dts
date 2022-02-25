import ts from "typescript";
/**
 * Converts a string of TypeScript or JavaScript code into
 * an equivalent .d.ts code string.
 *
 * @param code The code to convert, eg "export class Dog {}"
 * @param compilerOptions Options for the TypeScript compiler, as found in your tsconfig.json's "compilerOptions" property
 * @param tsLib An alternate version of the "typescript" module to use for compilation, instead of the bundled one.
 * @returns A string of `.d.ts` code, generated from your input `code` string.
 */
export declare function convertToDeclaration(
  code: string,
  compilerOptions?: ts.CompilerOptions,
  tsLib?: typeof ts
): string;
