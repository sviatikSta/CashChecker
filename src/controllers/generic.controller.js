const boom = require('boom');

const genericCrud = (model, { get = '', getAll = '' } = {}) => ({
  async get(req, res) {
    try {
      const item = await model
        .findById(req.params.id)
        .find({ user: { $eq: req.headers.userid } })
        .populate(get);
      return res.status(200).send(item);
    } catch (err) {
      return res.status(400).send(boom.boomify(err));
    }
  },
  async getAll(req, res) {
    try {
      const items = await model
        .find({ user: { $eq: req.headers.userid } })
        .populate(getAll);
      return res.status(200).send(items);
    } catch (err) {
      return res.status(400).send(boom.boomify(err));
    }
  },
  async create({ body }, res) {
    try {
      const item = new model(body);
      const newItem = await item.save();
      return res.status(200).send(newItem);
    } catch (err) {
      return res.status(400).send(boom.boomify(err));
    }
  },
  async update({ params: { id }, body }, res) {
    try {
      const item = await model.findByIdAndUpdate(id, body, { new: true });
      return res.status(200).send(item);
    } catch (err) {
      return res.status(400).send(boom.boomify(err));
    }
  },
  async delete({ params: { id } }, res) {
    try {
      await model.findByIdAndDelete(id);
      return res.status(200).send({ status: 'OK', message: 'item deleted' });
    } catch (err) {
      return res.status(400).send(boom.boomify(err));
    }
  },
});

module.exports = genericCrud;
