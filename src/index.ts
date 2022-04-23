import { stat, readFile, writeFile } from "node:fs/promises";
import { EventEmitter } from "node:events";

import type { JsonData } from "./types";

export default class Sidonie extends EventEmitter {
  private path: string;
  private cache: JsonData | null;
  private needFetch: boolean = true;
  private isWriting: boolean = false;
  constructor(path: string) {
    super();
    if (!path) throw new Error("[MISSING_PARAMETER] : path must be provided");
    this.path = path;
    this.cache = null;
    this.init();
  }
  /**
   * > The function `init` will initialize database.
   */
  async init() {
    await stat(this.path).catch(() => {
      throw new Error(
        `[INVALID_PARAMETER] : cannot find the file ${this.path}`
      );
    });
  }
  /**
   * It reads the file, parses it, and returns the parsed data
   * @returns The data from the file.
   */
  async fetch(): Promise<JsonData | null> {
    try {
      const data = await readFile(this.path, { encoding: "utf-8" });
      if (!data || (data && data.length < 2)) {
        this.emit("warn", "The json file is malformed or is empty.");
      }
      this.cache = await JSON.parse(data);
      return this.cache;
    } catch (e) {
      this.needFetch = true;
      this.emit("error", TypeError("The json file is malformed"));
      return null;
    }
  }
  /**
   * If the fetch flag is true and the needFetch flag is true, then fetch the data and set the cache to
   * the result
   * @param {boolean} [fetch=false] - If true, fetch the data.
   * @returns The cache
   */
  async getAll(fetch: boolean = false) {
    if (fetch && this.needFetch) {
      const result = await this.fetch();
      if (result) this.cache = result;
      this.needFetch = false;
    }
    return this.cache;
  }
  /**
   * If fetch is true, and we need to fetch, then fetch, and if the result is truthy, then set the cache
   * to the result, and set needFetch to false.
   * @param {string | number} item - The item to get from the cache.
   * @param {boolean} [fetch=false] - If true, fetch the data.
   * @returns The value of the item in the cache.
   */
  async get(item: string | number, fetch: boolean = false) {
    if (fetch && this.needFetch) {
      const result = await this.fetch();
      if (result) this.cache = result;
      this.needFetch = false;
    }
    return this.cache![item];
  }

  /**
   * It takes a new data object, converts it to JSON, saves it to the cache, and then writes it to the
   * file
   * @param {JsonData} newData - The new data to be saved.
   * @returns {boolean} Return true if data as been corectly saved.
   */
  async setData(newData: JsonData): Promise<boolean> {
    if (!newData)
      throw new Error("[MISSING_PARAMETER] new data must be provided.");
    const newDataJson = JSON.stringify(newData);

    this.cache = JSON.parse(newDataJson);
    if (this.isWriting) return false;
    try {
      this.isWriting = true;
      await writeFile(this.path, newDataJson, {
        encoding: "utf8", // Default value
      });
      this.isWriting = false;
      return true;
    } catch {
      this.emit("warn", "Error during saving data.");
      return false;
    }
  }
  async saveData(newData: JsonData): Promise<boolean> {
    if (!newData)
      throw new Error("[MISSING_PARAMETER] new data must be provided.");

    const curentData = await this.getAll(true);

    if (!curentData) {
      return this.setData(newData);
    }
    for (const [key, value] of Object.entries(newData)) {
      console.log(key, value);

      curentData[key] = value;
    }

    if (this.isWriting) return false;
    try {
      this.isWriting = true;
      await writeFile(this.path, JSON.stringify(curentData), {
        encoding: "utf8", // Default value
      });
      this.isWriting = false;
      // Set the cache to the new data
      this.cache = curentData;
      return true;
    } catch {
      this.emit("warn", "Error during saving data.");
      return false;
    }
  }
}
