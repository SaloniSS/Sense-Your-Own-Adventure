import express from 'express';

const parser = (req, res) => {

	res.send();
};

let router = express.Router();
router.post('/', parser);
export default router;