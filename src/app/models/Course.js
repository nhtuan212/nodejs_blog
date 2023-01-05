const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const Schema = mongoose.Schema;

const Course = new Schema(
    {
        _id: { type: Number },
        name: { type: String, default: '', required: true, maxLength: 255 },
        description: { type: String, default: '', maxLength: 600 },
        image: { type: String, default: '', maxLength: 255 },
        slug: { type: String, default: '', maxLength: 50, slug: 'name', unique: true },
        deletedAt: { type: String, default: null, maxLength: 50 },
    },
    {
        _id: false,
        timestamps: true,
    },
);

// Add Plugin
mongoose.plugin(slug);
Course.plugin(mongooseDelete, { overrideMethods: 'all' });
Course.plugin(AutoIncrement);
// Course.plugin(AutoIncrement, { inc_field: 'name' });

module.exports = mongoose.model('products', Course);
