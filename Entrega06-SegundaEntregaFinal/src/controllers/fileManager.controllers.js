import fs from "fs";

class FileManager {
  constructor(filename = "./db.json") {
    this.filename = filename;
  }
  get = async () =>
    await fs.promises
      .readFile(this.filename, "utf-8")
      .then((r) => JSON.parse(r))
      .catch((e) => []);
  set = async (data) =>
    await fs.promises
      .writeFile(this.path, JSON.stringify(data, null, "\t"), this.format)
      .catch();
}

export default FileManager;
