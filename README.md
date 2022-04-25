# Sidonie

Sidonie is a prototype of module for manipulate json data.

## Getting started

This instructions will help you to get started with Sidonie.

### Prerequisites

- Node.js version 16.0.0 or higher [nodejs.org](https://nodejs.org/en/download/)
- TypeScript version 4.5.0 or higher [typescriptlang.org](https://www.typescriptlang.org/) (optional, only if you want to compile yourself the code)

### Installation

#### Using npm

```bash
npm install @smaug6739/sidonie
```

#### Using yarn

```bash
yarn add @smaug6739/sidonie
```

## Usage

### Create a new instance

To use Sidonie, you need to create a new instance of client.

#### Parameters

- `path`: path to the json file. Type: [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

```js
const database = new Sidonie("/path/to/database.json");
```

- **Properties**

  - [path](#path)

- **Methods**

  - [fetch()](#async-fetch)
  - [getAll()](#async-getall)
  - [get()](#async-get)
  - [setData()](#async-setdata)
  - [saveData()](#async-savedata)

- **Events**

  - [warn](#warn)
  - [error](#error)

## Properties

### path

Return the path of the json file.

Type: [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

## Methods

### [async] fetch()

This method will fetch the json file and return the data.

Type: Any

```js
const data = await database.fetch();
```

### [async] getAll()

- **Parameters**
  - `fetch`: If the function need to fetch file when cache is outdated. Type: [Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)

This method will return all the data in cache.

Type: Any

```js
const data = await database.getAll(true);
```

### [async] get()

- **Parameters**
  - `item`: The item to get in file. Type: [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
  - `fetch`: If the function need to fetch file when cache is outdated. Type: [Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)

This method will return the data in cache.

Type: Any

```js
const data = await database.get("users", true);
```

### [async] setData()

- **Parameters**
  - `data`: The data to save. Type: Any

This method will set data and write it to the file.

Type: Any

```js
const data = await database.setData(
  {
    users: [
      { name: "John", age: 30 },
      { name: "Jane", age: 20 },
      { name: "Jack", age: 25 },
    ],
  },
  true
);
```

### [async] saveData()

- **Parameters**
  - `data`: The data to save. Type: Any

This method will save data and write it to the file without overide data.

Type: Any

```js
const data = await database.saveData(
  {
    users: [
      { name: "John", age: 30 },
      { name: "Jane", age: 20 },
      { name: "Jack", age: 25 },
    ],
  },
  true
);
```

## Events

### warn

This event will be triggered when a warning is thrown.

- **Parameters**
  - `message`: The message of the warning. Type: [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

```js
database.on("warn", (message) => {
  console.log(message);
});
```

### error

This event will be triggered when an error is thrown.

- **Parameters**
  - `message`: The message of the error. Type: [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

```js
database.on("error", (message) => {
  console.log(message);
});
```
