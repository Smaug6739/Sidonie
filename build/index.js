"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const promises_1 = require("fs/promises");
const events_1 = require("events");
class Sidonie extends events_1.EventEmitter {
    constructor(path) {
        super();
        this.isWriting = false;
        if (!path)
            throw new Error('[MISSING_PARAMETER] : path must be provided');
        this.path = path;
        this.cache = null;
        this.init();
    }
    fetchDB() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield promises_1.readFile(this.path, { encoding: 'utf-8' });
                if (!data || data && data.length < 2) {
                    this.emit('warn', 'The json file is malformed or is empty.');
                }
                this.cache = yield JSON.parse(data);
                return this.cache;
            }
            catch (e) {
                this.emit('error', TypeError('The json file is malformed'));
            }
        });
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            yield promises_1.stat(this.path)
                .catch(() => {
                throw new Error(`[INVALID_PARAMETER] : cannot find the file ${this.path}`);
            });
            //await this.fetchDB()
        });
    }
    get(item) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.cache)
                yield this.fetchDB();
            return this.cache[item];
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.cache)
                yield this.fetchDB();
            return this.cache;
        });
    }
    putData(newData) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!newData)
                throw new Error('[MISSING_PARAMETER] new data must be provided.');
            const newDataJson = JSON.stringify(newData);
            //if (typeof newDataJson != 'object') throw new Error('[MISSING_PARAMETER] new data must be an object.')
            this.cache = JSON.parse(newDataJson);
            try {
                this.isWriting = true;
                yield promises_1.writeFile(this.path, newDataJson, {
                    encoding: 'utf8', // Default value
                });
                this.isWriting = false;
            }
            catch (_a) {
                console.warn('Error during saving data.');
            }
        });
    }
}
exports.default = Sidonie;
