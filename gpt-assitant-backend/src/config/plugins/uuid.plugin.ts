import { nanoid } from 'nanoid'

export class UUID {
  static uuidv4 = () => crypto.randomUUID()
  static nano = () => nanoid()
}
