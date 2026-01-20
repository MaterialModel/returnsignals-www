export type Message = {
  type: 'incoming' | 'outgoing'
  content?: 'text' | 'image'
  text?: string
  imageSrc?: string
  imageAlt?: string
  timestamp?: string
}
