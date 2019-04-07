import express from 'express';
import fs from 'file-system';
import mongoose from  'mongoose';

const storyElementSchema = mongoose.Schema({
	right: mongoose.Schema.Types.ObjectId,
	left: mongoose.Schema.Types.ObjectId,
	data: {
		name: String,
		story: String,
		image: String,
		sound: String
	}
});

const autoPopulateChildren = function(next) {
	this.populate('left').populate('right');
	next();
};

storyElementSchema
	.pre('findOne', autoPopulateChildren)
	.pre('find', autoPopulateChildren);

const StoryElement = mongoose.model('StoryElement', storyElementSchema);

const create = (req, res) => {
	const x = new StoryElement({
		data: {
			name: '',
			story: '',
			image: '',
			sound: ''
		}
	});
	x.save().then((doc) => {
		res.send(doc);
	}, (err) => {
		res.status(500).send(err);
	});
};

const parse = (req, res) => {
	StoryElement.findOne({ '_id': '5ca97b13e1c56f0038b228bb' }).then((doc) => {
		const data = JSON.stringify(doc);
		fs.writeFile('data.json', data, {}, (err) => {
			if (err) {
				res.status(500).send(err);
			} else {
				res.send(doc);
			}
		});
	});
};

let router = express.Router();
router.post('/create', create);
router.post('/parse', parse);
export default router;