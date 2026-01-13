import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';

const UserSchema = new Schema(
  {
    studioId: {
      type: Schema.Types.ObjectId,
      ref: 'Studio',
      required: true,
    },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ['ARTIST', 'DIRECTOR', 'PRODUCER'],
      required: true,
    },
  },
  { timestamps: true }
);

// Hash password
UserSchema.pre('save', async function (_next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
});

export const UserModel = model('User', UserSchema);
