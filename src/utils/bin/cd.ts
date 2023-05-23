import directory from "@/data/data-directory.json";
import { formatDir } from "../formatDir";
import { get } from "lodash";
import { DirectoryItem } from "@/interfaces/directory";

export const cd = async (args: string[]): Promise<string> => {
  const defaultDirectory = "/home";
  const newDirectory = args[0] ? args[0].replace(/^\.\/+/, '') : defaultDirectory;

  if (!newDirectory) {
    return "Invalid directory input";
  }

  // Validate input to disallow consecutive forward slashes
  if (newDirectory.match(/\/{2,}/)) {
    return "Invalid directory input";
  }

  let currentDir = localStorage.getItem("directory") || defaultDirectory;

  if (newDirectory === "..") {
    // Move to the parent directory
    if (currentDir !== defaultDirectory) {
      currentDir = currentDir.substring(0, currentDir.lastIndexOf("/")) || defaultDirectory;
    } else {
      return "Directory limit reached";
    }
  } else if (newDirectory === "user" && currentDir === defaultDirectory) {
    return "This directory is secret, you can't access it";
  } else {
    // Move to the specified directory
    const targetDir = `${currentDir}/${newDirectory}`;
    const formattedTargetDir = formatDir(targetDir);
    const isValidDir = get(directory, formattedTargetDir) as DirectoryItem;

    if (isValidDir?.type === "directory") {
      currentDir = targetDir;
    } else {
      return "Directory not found, try typing 'ls' to see the available directories";
    }
  }

  localStorage.setItem("directory", currentDir);

  return "";
};
