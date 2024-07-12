import mongoose, { Connection } from 'mongoose'

export class UserModel {
  private readonly userSchema

  constructor(private readonly assistantsDbConnection: Connection) {
    this.userSchema = new mongoose.Schema({
      createdAt: {
        type: Date,
        required: true,
      },
      email: {
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

    this.userSchema.set('toJSON', {
      virtuals: true,
      versionKey: false,
      transform: function (doc, ret, options) {
        delete ret._id
        delete ret.password
      },
    })
  }

  public get model() {
    return this.assistantsDbConnection.model('User', this.userSchema)
  }
}
