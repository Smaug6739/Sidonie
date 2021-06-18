import { stat, readFile, writeFile } from 'fs/promises'
import { EventEmitter } from 'events'

import type { IObject } from './types'

export default class Sidonie extends EventEmitter {
	private path: string;
	private cache: IObject | null;
	private isWriting: boolean = false;
	constructor(path: string) {
		super()
		if (!path) throw new Error('[MISSING_PARAMETER] : path must be provided')
		this.path = path;
		this.cache = null
		this.init()

	}
	private async fetchDB() {
		try {
			const data = await readFile(this.path, { encoding: 'utf-8' })
			if (!data || data && data.length < 2) {
				this.emit('warn', 'The json file is malformed or is empty.')
			}
			this.cache = await JSON.parse(data);
			return this.cache
		} catch (e) {
			this.emit('error', TypeError('The json file is malformed'))
		}
	}
	async init() {
		await stat(this.path)
			.catch(() => {
				throw new Error(`[INVALID_PARAMETER] : cannot find the file ${this.path}`)
			})
		//await this.fetchDB()
	}
	async get(item: string) {
		if (!this.cache) await this.fetchDB()
		return this.cache![item]
	}
	async getAll() {
		if (!this.cache) await this.fetchDB()
		return this.cache
	}
	async putData(newData: any) {
		if (!newData) throw new Error('[MISSING_PARAMETER] new data must be provided.')
		const newDataJson = JSON.stringify(newData)

		//if (typeof newDataJson != 'object') throw new Error('[MISSING_PARAMETER] new data must be an object.')
		this.cache = JSON.parse(newDataJson)

		try {
			this.isWriting = true;
			await writeFile(this.path, newDataJson, {
				encoding: 'utf8', // Default value
			})
			this.isWriting = false;
		} catch {
			console.warn('Error during saving data.');

		}
	}
}