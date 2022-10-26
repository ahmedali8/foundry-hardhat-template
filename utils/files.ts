/* eslint-disable @typescript-eslint/no-explicit-any */
import fs, { PathLike } from "fs-extra";
import path from "path";

const existsAsync = fs.pathExists;
const makeDirectoryAsync = fs.mkdir;
const readFileAsync = fs.readFile;
const writeFileAsync = fs.writeFile;

export const ensureDirectoryExists = async (directory: PathLike): Promise<void> => {
  try {
    await makeDirectoryAsync(directory, { recursive: true });
  } catch (err) {
    console.log(err);
  }
};

export const writeFile = async (filePath: string, data: any): Promise<void> => {
  await ensureDirectoryExists(path.dirname(filePath));
  await writeFileAsync(filePath, data);
};

export const writeJSONFile = async (filePath: string, data: any): Promise<void> => {
  await writeFile(filePath, JSON.stringify(data, null, 2));
};

export const parseFile = async (filePath: string): Promise<any> => {
  if (await existsAsync(filePath)) {
    const contents = await readFileAsync(filePath);
    return JSON.parse(contents.toString());
  }

  return null;
};

export const deleteFolderRecursive = (directoryPath: string) => {
  if (fs.existsSync(directoryPath)) {
    fs.readdirSync(directoryPath).forEach((file) => {
      const curPath = path.join(directoryPath, file);
      if (fs.lstatSync(curPath).isDirectory()) {
        // recurse
        deleteFolderRecursive(curPath);
      } else {
        // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(directoryPath);
  }
};
