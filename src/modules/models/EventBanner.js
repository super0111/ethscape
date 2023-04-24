const { model, Schema, Types } = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const eventBannerSchema = new Schema({
  text: String,
  createdAt: Date,
})
eventBannerSchema.plugin(mongoosePaginate)

module.exports = model('EventBanner', eventBannerSchema);
