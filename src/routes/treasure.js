const express = require('express');

const TreasureController = require('../controller/treasure.controller.js');

const router = express.Router();

router.get('/notice', async (req, res) => {
	const controller = new TreasureController();
	const response = await controller.getNotices();
	res.send(response);
});

router.get('/list', async (req, res) => {
	const controller = new TreasureController();
	const response = await controller.getList(req.query.condition, req.query.mode);
	res.send(response);
});

router.get('/detail', async (req, res) => {
	const controller = new TreasureController();
	const response = await controller.getContent(req.query.id);
	res.send(response);
});

router.get('/category', async (req, res) => {
	const controller = new TreasureController();
	const response = await controller.getCategory(
		req.query.type,
		req.query.condition,
	);
	res.send(response);
});

router.post('/post', async (req, res) => {
	const controller = new TreasureController();
	const response = await controller.setContent(req.body);
	res.send(response);
});

router.post('/edit', async (req, res) => {
	console.log(req.body);
	const controller = new TreasureController();
	const response = await controller.editContent(req.body);
	res.send(response);
});

router.delete('/delete', async (req, res) => {
	const controller = new TreasureController();
	const response = await controller.deleteContent(req.body.idx);
	res.send(response);
});

module.exports = router;
