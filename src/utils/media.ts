const VIDEO_EXTENSIONS = /\.(mp4|webm|mov|avi|mkv|m4v|ogv)(\?.*)?$/i
const IMAGE_EXTENSIONS = /\.(jpg|jpeg|png|gif|webp|svg|bmp|avif)(\?.*)?$/i

export function isVideoUrl(url: string | null | undefined): boolean {
  if (!url) return false
  return VIDEO_EXTENSIONS.test(url)
}

export function isImageUrl(url: string | null | undefined): boolean {
  if (!url) return false
  return IMAGE_EXTENSIONS.test(url)
}
