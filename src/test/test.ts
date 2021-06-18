import db from '../index';
import { join } from 'path'
const database = new db(join(__dirname, 'db.json'))


database.on('warn', (warn) => {
	console.log(warn);
})

database.on('error', (err) => {
	console.log(err);
})

async function get() {
	console.log(await database.getAll());
}
get()
// setTimeout(() => {
// 	async function get() {
// 		console.log(await database.get('test'));
// 	}
// 	get()

// }, 1000)

