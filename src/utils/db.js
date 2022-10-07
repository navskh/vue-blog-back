import sql from 'mssql';
import path from 'path';
import { decrypt } from './crypto.js';

const config = JSON.parse(decrypt(process.env.TREASURE_DB));
export const poolPromise = new sql.ConnectionPool(config)
	.connect()
	.then(pool => {
		console.log(`SQL SERVER: ${config.server} connect success!`);
		return pool;
	})
	.catch(err => console.error('Error creating connection pool', err));

export async function execProcedure(procName, params, isSets) {
	try {
		const pool = await poolPromise;
		if (!pool) throw Error('No poolPromise');
		const request = await pool.request();
		if (params) {
			for (let param of params) {
				const { name, type, value } = param;
				const sqlType = sql[type];
				await request.input(name, sqlType, value);
			}
		}
		const res = await request.execute(procName);
		const recordsets = res.recordset;
		return recordsets;
		// return res.recordsets as sql.IRecordSet<T>[]
	} catch (error) {
		const errorObject = { error: true, message: error };
		throw errorObject;
	}
}

export async function execQuery(Query) {
	try {
		const pool = await poolPromise;
		if (!pool) throw Error('No poolPromise');
		const request = await pool.request();
		const res = await request.query(Query);
		const recordsets = res.recordset;
		return recordsets;
		// return res.recordsets as sql.IRecordSet<T>[]
	} catch (error) {
		const errorObject = { error: true, message: error };
		throw errorObject;
	}
}

export async function execQuery2(Query) {
	try {
		const pool = await poolPromise;
		if (!pool) throw Error('No poolPromise');
		const request = await pool.request();
		const res = await request.query(Query);
		return res;
		// return res.recordsets as sql.IRecordSet<T>[]
	} catch (error) {
		const errorObject = { error: true, message: error };
		throw errorObject;
	}
}
