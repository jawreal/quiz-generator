import { Schema, model, type Document } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface UserInfo {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
}

interface IUser extends UserInfo, Document {
  createdAt?: string;
  updatedAt: string;
  validatePassword: (plainPassword: string, username: string) => Promise<boolean>;
}



const userSchema = new Schema<IUser>({
  firstName: { type: String, required: true }, 
  lastName: { type: String, required: true }, 
  username: { type: String, required: true, unique: true }, 
  password: { type: String, required: true }, 
}, {
  timestamps: true, 
  toJSON: { virtuals: true },
  toObject: { virtuals: true }, 
});

userSchema.methods.validatePassword = async function <T extends string>(
  plainPassword: T,
  username: T
): Promise<boolean> {
  const result = await bcrypt.compare(plainPassword, this.password);
  return result && username === this.username;
};

userSchema
  .virtual("fullName")
  .get(function (this: { firstName: string; lastName: string }) {
    return `${this.firstName} ${this.lastName}`;
  });

userSchema.pre("updateOne", async function (next) {
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

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});



const UserModel = model<IUser>("UserModel", userSchema)

export { UserModel, IUser };