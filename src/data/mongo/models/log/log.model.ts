import mongoose, { Connection } from 'mongoose'

export class LogModel {
  private readonly logSchema

  constructor(private readonly logsDbConnection: Connection) {
    this.logSchema = new mongoose.Schema({
      createdAt: {
        type: Date,
        required: true,
      },
      level: {
        type: String,
        enum: ['ERROR', 'WARN', 'INFO', 'HTTP', 'VERBOSE', 'DEBUG', 'SILLY'],
        required: true,
      },
      message: {
        type: String,
        required: true,
      },
      service: {
        type: String,
        required: false,
      },
      metadata: {
        type: Object,
        required: false,
      },
    })

    this.logSchema.set('toJSON', {
      virtuals: true,
      versionKey: false,
      transform: function (doc, ret, options) {
        delete ret._id
      },
    })
  }

  public get model() {
    return this.logsDbConnection.model('Log', this.logSchema)
  }
}
