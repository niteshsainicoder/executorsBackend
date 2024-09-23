import { exec } from "child_process";
import { promises as fs } from "fs";
import path from "path";

const TEMP_DIR = path.join(process.cwd(), "temp");

// Ensure the temp directory exists
fs.mkdir(TEMP_DIR, { recursive: true }).catch(console.error);

 export const executeCode = async (language, code) => {
  if (typeof code !== "string" || !code.trim()) {
    throw new Error("Code is required and must be a non-empty string");
  }

  const uniqueId = Date.now(); // or use a UUID library
  const tempFile = path.join(
    TEMP_DIR,
    `temp_${uniqueId}.${language === "python" ? "py" : "js"}`
  );

  // Log the temp file creation

  await fs.writeFile(tempFile, code);

  const command =
    language === "python" ? `python ${tempFile}` : `node ${tempFile}`;

  return new Promise((resolve, reject) => {
    const timeout = setTimeout(
      () => reject(new Error("Execution timed out")),
      15000
    );

    const startTime = process.hrtime();

    exec(command, (error, stdout, stderr) => {
      clearTimeout(timeout);

      const [seconds, nanoseconds] = process.hrtime(startTime);
      const executionTime = seconds + nanoseconds / 1e9;

      if (error) return reject(`Error: ${error.message}`);
      if (stderr) return reject(`Stderr: ${stderr}`);

      fs.unlink(tempFile).catch(console.error);
      resolve({ stdout, executionTime });
    });
  });
};
