"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../../");
const path_1 = require("path");
const database = new __1.default((0, path_1.join)(__dirname, "../db.sidonie.json"));
database.on("warn", (warn) => {
    console.log(warn);
});
database.on("error", (err) => {
    console.log(err);
});
const users = [
    { name: "John", age: 30 },
    { name: "Jane", age: 20 },
    { name: "Jack", age: 25 },
];
const users2 = [{ name: "Smaug", age: 45 }];
async function get() {
    console.log(await database.setData({ users }));
    console.log(await database.getAll());
    console.log(await database.saveData({ users2 }));
    console.log(await database.getAll());
}
get();
