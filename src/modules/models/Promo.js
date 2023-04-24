const { model, Schema, Types } = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const promoSchema = new Schema({
  file: String,
  thumb: String,
  type: String,
  size: String,
  createdAt: Date,
})
promoSchema.plugin(mongoosePaginate)

module.exports = model('Promo', promoSchema);
