import mongoose, { Connection } from 'mongoose'

export class AssistantModel {
  private readonly assistantSchema

  constructor(private readonly assistantsDbConnection: Connection) {
    this.assistantSchema = new mongoose.Schema({
      createdAt: {
        type: Date,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      instructions: {
        type: String,
        required: true,
      },
      model: {
        type: String,
        enum: ['gpt-4o', 'gpt-3.5-turbo'],
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      openaiId: {
        type: String,
        required: true,
      },
      temperature: {
        type: Number,
        required: true,
      },
      topP: {
        type: Number,
        required: true,
      },
      userId: {
        type: String,
        required: true,
      },
    })
    this.assistantSchema.set('toJSON', {
      virtuals: true,
      versionKey: false,
      transform: function (doc, ret, options) {
        delete ret._id
      },
    })
  }

  public get model() {
    return this.assistantsDbConnection.model('Assistant', this.assistantSchema)
  }
}
