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
export function convertToDeclaration(
  files: { [name: string]: string },
  compilerOptions: ts.CompilerOptions = {},
  tsModule: typeof ts = require("typescript")
): { [name: string]: string } {
  const optionsWithChanges: ts.CompilerOptions = {
    ...compilerOptions,
    declaration: true,
    emitDeclarationOnly: true,
    allowJs: true,
  };

  const outFiles = {};

  const host = tsModule.createCompilerHost(optionsWithChanges);
  host.readFile = (fileName: string) => files[fileName];
  host.writeFile = (fileName: string, contents: string) => {
    outFiles[fileName] = contents;
  };

  const program = tsModule.createProgram(
    Object.keys(files),
    optionsWithChanges,
    host
  );
  const emitResult = program.emit();

  if (emitResult.emitSkipped) {
    throw new Error(
      "Conversion failed:\n" +
        emitResult.diagnostics
          .map((diag) => {
            const fileName = diag.file?.fileName || "<unknown file>";

            // Some versions of typescript mistakenly provide an object as messageText instead of a string
            const messageText =
              typeof diag.messageText === "string"
                ? diag.messageText
                : JSON.stringify(diag.messageText);

            return fileName + ": " + messageText;
          })
          .join("\n")
    );
  }

  return outFiles;
}
