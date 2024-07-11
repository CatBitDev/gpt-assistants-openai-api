import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
  isEmailValidated: {
    type: Boolean,
    default: false,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: [String],
    enum: ['ADMIN', 'USER'],
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
})

userSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret, options) {
    delete ret._id
    delete ret.password
  },
})

export const UserModel = mongoose.model('User', userSchema)
