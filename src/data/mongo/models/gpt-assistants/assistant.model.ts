import mongoose, { Schema } from 'mongoose'

const AssistantSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  openaiId: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: 'No description provided',
  },
  instructions: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    default: ['gpt-3.5-turbo'],
    enum: ['gpt-4o', 'gpt-3.5-turbo'],
  },
  name: {
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
})

AssistantSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret, options) {
    delete ret._id
  },
})

export const AssistantModel = mongoose.model('Assistant', AssistantSchema)
