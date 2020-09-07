export function getPremierDate(video: Video): Date {
  return video.liveStreamingDetails?.actualStartTime ?? video.publishDate;
}