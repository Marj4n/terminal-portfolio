import directory from "@/data/data-directory.json";
import { get } from "lodash";
import { DirectoryItem } from "@/interfaces/directory";
import { formatDir } from "../formatDir";

export const cat = async (args: string[]): Promise<string> => {
  if (!args[0]) {
    return "Usage: cat [arg], example: cat README.md";
  }
  
  const filePath = args[0].toLowerCase();
  const formattedFilePath = filePath.replace(/^\.\//, '').split('.')[0];

  if (!formattedFilePath) {
    return "Invalid file path";
  }

  // Validate input to disallow consecutive forward slashes
  if (formattedFilePath.match(/\/{2,}/)) {
    return "Invalid file path";
  }

  const currentDir = localStorage.getItem("directory");
  const targetPath = `${currentDir}/${formattedFilePath}`;
  const formattedTargetPath = formatDir(targetPath);
  const fileContent = getFileContent(formattedTargetPath);

  if (fileContent) {
    return fileContent;
  } else {
    return "File not found, try typing 'ls' to see the available files";
  }
};

const getFileContent = (filePath: string): string | undefined => {
  const isValidFile = get(directory, filePath) as DirectoryItem;

  if (isValidFile?.type === "file") {
    return isValidFile.content;
  }

  return undefined;
};
