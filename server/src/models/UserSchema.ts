import { Schema, model, type Document } from 'mongoose';
import bcrypt from 'bcryptjs';

interface IUser extends Document {
  fullName: string;
  username: string;
  password: string;
  createdAt?: string;
  updatedAt: string;
  validatePassword: (plainPassword: string, username: string) => Promise<boolean>;
}

const UserSchema = new Schema<IUser>({
  fullName: { type: String, required: true }, 
  username: { type: String, required: true, unique: true }, 
  password: { type: String, required: true }, 
}, {
  timestamps: true
});

UserSchema.methods.validatePassword = async function <T extends string>(
  plainPassword: T,
  username: T
): Promise<boolean> {
  const result = await bcrypt.compare(plainPassword, this.password);
  return result && username === this.username;
};

UserSchema.pre("updateOne", async function (next) {
  const update = this.getUpdate() as any;

  if (update?.$set?.password) {
    update.$set.password = await bcrypt.hash(update.$set.password, 10);
  }

  if (update?.password) {
    update.password = await bcrypt.hash(update.password, 10);
  }

  this.setUpdate(update);
  next();
});

UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});



const UserModel = model<IUser>("UserModel", UserSchema)

export { UserModel, IUser };