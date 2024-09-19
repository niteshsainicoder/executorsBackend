import { exec } from "child_process";
import { promises as fs } from "fs";
import path from "path";

const TEMP_DIR = path.join(process.cwd(), "temp");

// Ensure the temp directory exists
fs.mkdir(TEMP_DIR, { recursive: true }).catch(console.error);

const executeCode = async (language, code) => {
  if (typeof code !== "string" || !code.trim()) {
    throw new Error("Code is required and must be a non-empty string");
  }

  // Create a temporary file with the code
  const tempFile = path.join(
    TEMP_DIR,
    `temp.${language === "python" ? "py" : "js"}`
  );
  await fs.writeFile(tempFile, code);

  // Define the command based on the language
  const command =
    language === "python" ? `python ${tempFile}` : `node ${tempFile}`;

  // Return a promise that resolves with the command output
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(
      () => reject(new Error("Execution timed out")),
      10000
    ); // 10 seconds timeout

    exec(command, (error, stdout, stderr) => {
      clearTimeout(timeout);

      // Handle errors and output
      if (error) return reject(`Error: ${error.message}`);
      if (stderr) return reject(`Stderr: ${stderr}`);
      fs.writeFile(tempFile, "");

      resolve(stdout);
    });
  });
};

export { executeCode };
