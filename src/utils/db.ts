const sql = require('mssql');
const path = require('path');
const { decrypt } = require('./crypto.ts');
const dotenv = require('dotenv');

console.log(process.env.NODE_ENV);


if (process.env.NODE_ENV == 'outterdev') {
  console.log('dev!');
  console.log(__dirname);
  dotenv.config({
    path: path.join(__dirname, `../../.env.development`),
  });  
}
else if (process.env.NODE_ENV == 'innerdev') {
  console.log('real!');

  dotenv.config({
    path: path.join(__dirname, `../../.env.local`),
  });
}

const config = JSON.parse(decrypt(process.env.TREASURE_DB));
console.log(config);
export const poolPromise = new sql.ConnectionPool(config)
	.connect()
	.then((pool: any) => {
		console.log(`SQL SERVER: ${config.server} connect success!`);
		return pool;
	})
  .catch((err: any) => console.error('Error creating connection pool', err));
  
export async function execProcedure(procName: any, params: any, isSets: any) {
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

export async function execQuery(Query: any) {
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

export async function execTransactionQuery(Query: any) {
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
