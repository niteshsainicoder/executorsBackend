import fs from "fs";
import path from "path";
import { exec } from "child_process";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const executeCode = async (req, res) => {
  console.time("Execution Time");
  const { codeContent, language } = req.body;

  if (!codeContent) {
    return res
      .status(400)
      .json({ message: "Please provide code", error: true });
  }

  try {
    let extension;
    let dockerCommand;

    switch (language) {
      case "python":
        extension = "py";
        dockerCommand = "python3 /usr/src/app/scripts/script.py";
        break;
      case "javascript":
        extension = "js";
        dockerCommand = "node /usr/src/app/scripts/script.js";
        break;
      default:
        return res
          .status(400)
          .json({ message: "Unsupported language", error: true });
    }

    const scriptPath = path.join(
      __dirname,
      "..",
      "executors",
      language,
      "scripts",
      `script.${extension}`
    );
    const scriptDir = path.dirname(scriptPath);

    // Ensure directory exists
    if (!fs.existsSync(scriptDir)) {
      fs.mkdirSync(scriptDir, { recursive: true });
    }

    // Write the code to the file
    await fs.promises.writeFile(scriptPath, codeContent);

    // Define the Docker command
    const command = `docker run --rm -v ${scriptDir}:/usr/src/app/scripts --memory="500m" --memory-swap="1g" --cpus="2.0" ${language}-executor ${dockerCommand}`;

    // Execute the Docker command
    exec(command, { timeout: 10000 }, (err, stdout, stderr) => {
      if (err || stderr) {
        console.error("Error executing Docker command:", err || stderr);
        return res
          .status(500)
          .json({ message: "Failed to execute code", error: true });
      }

      console.timeEnd("Execution Time");

      return res.status(200).json({
        message: "Code executed successfully",
        output: stdout,
        error: stderr,
      });
    });
  } catch (error) {
    console.error("An error occurred:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: true });
  }
};
