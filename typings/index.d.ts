/// <reference types="node" />
import { EventEmitter } from "node:events";
import type { JsonData } from "./types";
export declare class Sidonie extends EventEmitter {
    private path;
    private cache;
    private needFetch;
    private isWriting;
    constructor(path: string);
    /**
     * > The function `init` will initialize database.
     */
    init(): Promise<void>;
    /**
     * It reads the file, parses it, and returns the parsed data
     * @returns The data from the file.
     */
    fetch(): Promise<JsonData | null>;
    /**
     * If the fetch flag is true and the needFetch flag is true, then fetch the data and set the cache to
     * the result
     * @param {boolean} [fetch=false] - If true, fetch the data.
     * @returns The cache
     */
    getAll(fetch?: boolean): Promise<JsonData>;
    /**
     * If fetch is true, and we need to fetch, then fetch, and if the result is truthy, then set the cache
     * to the result, and set needFetch to false.
     * @param {string | number} item - The item to get from the cache.
     * @param {boolean} [fetch=false] - If true, fetch the data.
     * @returns The value of the item in the cache.
     */
    get(item: string | number, fetch?: boolean): Promise<any>;
    /**
     * It takes a new data object, converts it to JSON, saves it to the cache, and then writes it to the
     * file
     * @param {JsonData} newData - The new data to be saved.
     * @returns {boolean} Return true if data as been corectly saved.
     */
    setData(newData: JsonData): Promise<boolean>;
    saveData(newData: JsonData): Promise<boolean>;
}
