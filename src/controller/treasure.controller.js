const { execProcedure, execQuery, execQuery2 } = require('../utils/db.js');

const TreasureService = require('../service/treasure.service');

const treasureService = new TreasureService();

class TreasureController {
	async getNotices() {
		try {
			var response = await treasureService.getNotices();
			var data = [...response];
			return data;
		} catch (err) {
			console.log(`getNotices ERR! ${err}`);
		}
	}
	async getList(condition) {
		try {
			var response = await treasureService.getList(condition);
			var data = [...response];
			return data;
		} catch (err) {
			console.log(`getList ERR! ${err}`);
		}
	}

	async getContent(idx) {
		try {
			var response = await treasureService.getContent(idx);
			var data = [...response];
			return data;
		} catch (err) {
			console.log(`getContent ERR! ${err}`);
		}
	}

	async getCategory(type, condition) {
		try {
			var response = await treasureService.getCategory(type, condition);
			var data = [...response];
			return data;
		} catch (err) {
			console.log(`getCategory ERR! ${err}`);
		}
	}

	async setContent(data) {
		try {
			var response = await treasureService.setContent(data);
			return response;
		} catch (err) {
			console.log(`setContent ERR! ${err}`);
		}
	}

	async editContent(data) {
		try {
			var response = await treasureService.editContent(data);
			return response;
		} catch (err) {
			console.log(`editContent Error! ${err}`);
		}
	}

	async deleteContent(idx) {
		try {
			var response = await treasureService.deleteContent(idx);
			return response;
		} catch (err) {
			console.log(`deleteContent ERR! ${err}`);
		}
	}
}

module.exports = TreasureController;
