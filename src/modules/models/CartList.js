const { model, Schema, Types } = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const CartListSchema = new Schema({
  item_id: String,
  user_id: String,
  product_count: Number,
  createdAt: Date,
})
CartListSchema.plugin(mongoosePaginate)

module.exports = model('cartLists', CartListSchema);
