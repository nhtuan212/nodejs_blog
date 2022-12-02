exports.multipleMongooseToObject = (mongoose) => {
    return mongoose.map((items) => items.toObject());
};
exports.mongooseToObject = (mongoose) => {
    return mongoose ? mongoose.toObject() : mongoose;
};
