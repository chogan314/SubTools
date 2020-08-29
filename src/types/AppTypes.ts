type ThumbnailData = {
  url: string,
  width: number,
  height: number
}

type Thumbnail = {
  default: ThumbnailData,
  medium: ThumbnailData,
  high: ThumbnailData
}

type Channel = {
  name: string,
  description: string,
  thumbnail: Thumbnail,
  uploadsPlaylistID: string
}