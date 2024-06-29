import { Schema, model } from 'mongoose';
import { User, UserMethods, UserModel } from '../types/user.type';

const userSchema = new Schema<User, UserModel, UserMethods>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  address: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  lastModified: { type: Date, default: Date.now },
});

userSchema.methods.toClient = function() {
  const { _id, name, email, address, phoneNumber } = this;
  return { id: _id.toString(), name, email, address, phoneNumber };
};

const UserModel = model<User, UserModel>('User', userSchema);
export default UserModel;