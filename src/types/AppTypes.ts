type Thumbnail = {
  url: string,
  width: number,
  height: number
}

type ChannelThumbnails = {
  default: Thumbnail,
  medium: Thumbnail,
  high: Thumbnail
}

type Channel = {
  id: string,
  name: string,
  description: string,
  thumbnails: ChannelThumbnails,
  uploadsPlaylistID: string
  url: string,
  viewCount: number,
  subscriberCount: number,
  videoCount: number
}

type PlaylistItem = {
  playlistID: string,
  channelID: string,
  position: number,
  publishDate: string,
  videoID: string
}

type LiveStreamingDetails = {
  actualStartTime: string,
  actualEndTime: string,
  scheduledStartTime: string
}

type VideoThumbnails = {
  default: Thumbnail,
  medium: Thumbnail,
  high: Thumbnail,
  standard: Thumbnail,
  maxres: Thumbnail
}

// const enum BroadcastType {
//   Archive,
//   Live,
//   Upcoming
// }

type Video = {
  id: string,
  duration: string,
  isPublic: boolean,
  embeddable: boolean,
  viewCount: number,
  likeCount: number,
  dislikeCount: number,
  favoriteCount: number,
  commentCount: number,
  playerEmbedHtml: string,
  liveStreamingDetails: LiveStreamingDetails,
  channelID: string,
  title: string,
  description: string,
  thumbnails: VideoThumbnails,
  broadcastType: string,
  publishDate: string,
  url: string
}