import mongoose, { Document, Schema } from "mongoose";
import { compareValue, hashValue } from "../utils/bcrypt";

export interface UserDocument extends Document {
  _id: string;
  name: string;
  email: string;
  password?: string;
  profilePicture: string | null;
  isActive: boolean;
  lastLogin: Date | null;
  createdAt: Date;
  updatedAt: Date;
  currentWorkspace: mongoose.Types.ObjectId | null; // Reference to the workspace table  
  comparePassword(value: string): Promise<boolean>; //Method to compare a plain text password with the hashed password.
  omitPassword(): Omit<UserDocument, "password">; // Method to return user document data without the password field.
}

const userSchema = new Schema<UserDocument>(
  {
    name: {
      type: String,
      required: false,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: { type: String, select: true },
    profilePicture: {
      type: String,
      default: null,
    },
    currentWorkspace: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Workspace",
    },
    isActive: { type: Boolean, default: true },
    lastLogin: { type: Date, default: null },
  },
  {
    timestamps: true,//Automatically adds createdAt and updatedAt fields to the schema.
  }
);
// A middleware function that runs before a user document is saved.
userSchema.pre("save", async function (next) {
  // this.isModified("password"): Checks if the password field has been modified.
  if (this.isModified("password")) {
    if (this.password) {
      // : Hashes the password before saving it to the database.
      this.password = await hashValue(this.password);
    }
  }
  next();
});
// Adds a method to the schema to remove the password from the user object.
userSchema.methods.omitPassword = function (): Omit<UserDocument, "password"> {
  const userObject = this.toObject(); //Converts the Mongoose document to a plain JavaScript object.
  delete userObject.password;
  return userObject;
};
// Adds a method to compare a plain text password with the hashed password.

userSchema.methods.comparePassword = async function (value: string) {
// Uses the bcrypt utility function to compare the provided value with the stored hashed password.
  return compareValue(value, this.password);
};

const UserModel = mongoose.model<UserDocument>("User", userSchema);
export default UserModel;