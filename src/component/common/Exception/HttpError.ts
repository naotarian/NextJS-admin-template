import type { SerializedHttpError } from '@/component/common/Exception/type'
export class HttpError extends Error {
  status: number
  constructor(message: string, status: number) {
    super(message)
    this.status = status
  }

  serialize(): SerializedHttpError {
    return {
      message: this.message,
      status: this.status
    }
  }

  public deserialize(data: SerializedHttpError) {
    return new HttpError(data.message, data.status)
  }
}
