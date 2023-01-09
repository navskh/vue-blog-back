import * as express from 'express';

const TreasureController = require('../controller/treasure.controller.ts');

const routerT = express.Router();

routerT.get('/notice', async (req: express.Request, res) => {
	const controller = new TreasureController();
	const response = await controller.getNotices();
	res.send(response);
});

routerT.get('/list', async (req, res) => {
	const controller = new TreasureController();
	const response = await controller.getList(req.query.condition, req.query.mode);
	res.send(response);
});

routerT.get('/detail', async (req, res) => {
	const controller = new TreasureController();
	const response = await controller.getContent(req.query.id);
	res.send(response);
});

routerT.get('/category', async (req, res) => {
	const controller = new TreasureController();
	const response = await controller.getCategory(
		req.query.type,
		req.query.condition,
	);
	res.send(response);
});

routerT.post('/post', async (req, res) => {
	const controller = new TreasureController();
	const response = await controller.setContent(req.body);
	res.send(response);
});

routerT.post('/edit', async (req, res) => {
	console.log(req.body);
	const controller = new TreasureController();
	const response = await controller.editContent(req.body);
	res.send(response);
});

routerT.delete('/delete', async (req, res) => {
	const controller = new TreasureController();
	const response = await controller.deleteContent(req.body.idx);
	res.send(response);
});

module.exports = routerT;
