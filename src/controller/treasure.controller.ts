import { PostSchema } from '../schema/treasure.shema';
import TreasureService from '../service/treasure.service';

const treasureService = new TreasureService();

class TreasureController {
  async getRequestLists(): Promise<any> {
		try {
			var response = await treasureService.getRequestLists();
			var data = [...response];
			return data;
		} catch (err) {
			console.log(`getRequestLists ERR! ${err}`);
		}
  }
	async getNotices(): Promise<any> {
		try {
			var response = await treasureService.getNotices();
			var data = [...response];
			return data;
		} catch (err) {
			console.log(`getNotices ERR! ${err}`);
		}
	}
	async getList(condition: Array<string>, mode: string): Promise<any> {
		try {
			var response = await treasureService.getList(condition, mode);
			var data = [...response];
			return data;
		} catch (err) {
			console.log(`getList ERR! ${err}`);
		}
	}

	async getContent(idx: number): Promise<any> {
		try {
			var response = await treasureService.getContent(idx);
			var data = [...response];
			return data;
		} catch (err) {
			console.log(`getContent ERR! ${err}`);
		}
	}

	async getCategory(type: string, condition: string): Promise<any> {
		try {
			var response = await treasureService.getCategory(type, condition);
			var data = [...response];
			return data;
		} catch (err) {
			console.log(`getCategory ERR! ${err}`);
		}
	}

	async setContent(data: PostSchema): Promise<any> {
		try {
			var response = await treasureService.setContent(data);
			return response;
		} catch (err) {
			console.log(`setContent ERR! ${err}`);
		}
	}

	async editContent(data: PostSchema): Promise<any> {
		try {
			var response = await treasureService.editContent(data);
			return response;
		} catch (err) {
			console.log(`editContent Error! ${err}`);
		}
	}

	async deleteContent(idx: number): Promise<any> {
		try {
			var response = await treasureService.deleteContent(idx);
			return response;
		} catch (err) {
			console.log(`deleteContent ERR! ${err}`);
		}
	}
}

module.exports = TreasureController;
