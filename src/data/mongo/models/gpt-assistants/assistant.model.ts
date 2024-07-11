import mongoose from 'mongoose'

const AssistantSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  id: {
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

AssistantSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret, options) {
    delete ret._id
  },
})

export const AssistantModel = mongoose.model('Assistant', AssistantSchema)
