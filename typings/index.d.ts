/// <reference types="node" />
import { EventEmitter } from "events";
import type { JsonData } from "./types";
export default class Sidonie extends EventEmitter {
    private path;
    private cache;
    private needFetch;
    private isWriting;
    constructor(path: string);
    init(): Promise<void>;
    fetch(): Promise<JsonData | null>;
    getAll(fetch?: boolean): Promise<JsonData>;
    /**
     * If fetch is true, and we need to fetch, then fetch, and if the result is truthy, then set the cache
     * to the result, and set needFetch to false.
     * @param {string | number} item - The item to get from the cache.
     * @param {boolean} [fetch=false] - boolean = false
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
