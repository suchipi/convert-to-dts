import type ts from "typescript";

/**
 * Converts a string of TypeScript or JavaScript code into
 * an equivalent .d.ts code string.
 *
 * @param code The code to convert, eg "export class Dog {}"
 * @param compilerOptions Options for the TypeScript compiler, as found in your tsconfig.json's "compilerOptions" property
 * @param tsModule An alternate version of the "typescript" module to use for compilation, instead of the one included with convert-to-dts.
 * @returns A string of `.d.ts` code, generated from your input `code` string.
 */
export function convertToDeclaration(
  code: string,
  compilerOptions: ts.CompilerOptions = {},
  tsModule: typeof ts = require("typescript")
): string {
  const optionsWithChanges: ts.CompilerOptions = {
    ...compilerOptions,
    declaration: true,
    emitDeclarationOnly: true,
    allowJs: true,
  };

  const host = tsModule.createCompilerHost(optionsWithChanges);
  host.readFile = (_fileName: string) => code;
  let output = "";
  host.writeFile = (_fileName: string, contents: string) => {
    output = contents;
  };

  const program = tsModule.createProgram(
    ["<input code string>"],
    optionsWithChanges,
    host
  );
  const emitResult = program.emit();

  if (emitResult.emitSkipped) {
    throw new Error(
      "Conversion failed:\n" +
        emitResult.diagnostics
          .map((diag) =>
            typeof diag.messageText === "string"
              ? diag.messageText
              : JSON.stringify(diag.messageText)
          )
          .join("\n")
    );
  }

  return output;
}
