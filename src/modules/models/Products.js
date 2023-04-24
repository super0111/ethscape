const { model, Schema, Types } = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const productModalDataSchema = new Schema({
  title: String,
  description: String,
  images: String,
})

const ProductsSchema = new Schema({
  item_id: String,
  item_name: String,
  item_price: Number,
  item_discount: Number,
  category: String,
  image_url: String,
  description: String,
  product_modal_data: { productModalDataSchema },
})
ProductsSchema.plugin(mongoosePaginate)

module.exports = model('products', ProductsSchema);
