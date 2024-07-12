import { nanoid } from 'nanoid'
// import { v4 as uuidv4 } from 'uuid'

export class UUID {
  static uuidv4 = () => crypto.randomUUID()
  static nano = () => nanoid()
}
