import mongoose, { Schema } from "mongoose";
import paginate from "mongoose-paginate-v2";

const UserSchema = new Schema({
  firstName: { type: Schema.Types.String, required: true },
  lastName: { type: Schema.Types.String, required: true },
  email: { type: Schema.Types.String, unique: true, required: true },
  age: { type: Schema.Types.Number },
  role: { type: Schema.Types.ObjectId, index: true, ref: 'roles' },
  isAdmin: { type: Schema.Types.Boolean, default: false },
  password: { type: Schema.Types.String, required: true }
});

UserSchema.plugin(paginate);

UserSchema.pre('find', function () {
  this.populate(['role']);
});

UserSchema.pre('findOne', function () {
  this.populate(['role']);
});

const UserModel = mongoose.model('users', UserSchema)

export default UserModel;

