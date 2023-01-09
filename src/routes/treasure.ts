import * as express from 'express';

const TreasureController = require('../controller/treasure.controller.ts');

const routerT = express.Router();

routerT.get('/reqdetail', async (req: express.Request, res: express.Response) => {
	const controller = new TreasureController();
	const response = await controller.getRequestById(req.query.id);
	res.send(response);
});

routerT.get('/request', async (req: express.Request, res: express.Response) => {
	const controller = new TreasureController();
	const response = await controller.getRequestLists();
	res.send(response);
});

routerT.get('/notice', async (req: express.Request, res: express.Response) => {
	const controller = new TreasureController();
	const response = await controller.getNotices();
	res.send(response);
});

routerT.get('/list', async (req: express.Request, res: express.Response) => {
	const controller = new TreasureController();
	const response = await controller.getList(req.query.condition, req.query.mode);
	res.send(response);
});

routerT.get('/detail', async (req: express.Request, res: express.Response) => {
	const controller = new TreasureController();
	const response = await controller.getContent(req.query.id);
	res.send(response);
});

routerT.get('/category', async (req: express.Request, res: express.Response) => {
	const controller = new TreasureController();
	const response = await controller.getCategory(
		req.query.type,
		req.query.condition,
	);
	res.send(response);
});

routerT.post('/post', async (req: express.Request, res: express.Response) => {
	const controller = new TreasureController();
	const response = await controller.setContent(req.body);
	res.send(response);
});

routerT.post('/edit', async (req: express.Request, res: express.Response) => {
	console.log(req.body);
	const controller = new TreasureController();
	const response = await controller.editContent(req.body);
	res.send(response);
});

routerT.delete('/delete', async (req: express.Request, res: express.Response) => {
	const controller = new TreasureController();
	const response = await controller.deleteContent(req.body.idx);
	res.send(response);
});

module.exports = routerT;
