import mongoose, { Schema } from "mongoose";
//import paginate from "mongoose-paginate-v2";

const UserSchema = new Schema({
  firstName: { type: Schema.Types.String, required: true },
  lastName: { type: Schema.Types.String, required: true },
  email: { type: Schema.Types.String, unique: true, required: true },
  age: { type: Schema.Types.Number },
  password: { type: Schema.Types.String, required: true }
});

const UserModel = mongoose.model('users', UserSchema)

export default UserModel;