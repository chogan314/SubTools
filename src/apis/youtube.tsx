import axios from 'axios';

function youtube(part: string, maxResults: number) {
  return axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3/',
    params: {
        part: part,
        maxResults: maxResults,
        key: process.env.GATSBY_YOUTUBE_DATA_API_KEY
    }
  });
}

function youtubeNoMaxResults(part: string) {
  return axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3/',
    params: {
        part: part,
        key: process.env.GATSBY_YOUTUBE_DATA_API_KEY
    }
  });
}

export async function getChannels(channelIDs: string[]): Promise<Channel[]> {
  type ChannelResponse = {
    items: [{
      id: string,
      snippet: {
        title: string,
        description: string,
        thumbnails: ChannelThumbnails
      }
      contentDetails: {
        relatedPlaylists: {
          uploads: string
        }
      }
      statistics: {
        viewCount: string,
        subscriberCount: string,
        videoCount: string
      }
    }]
  }

  const parts = 'snippet,contentDetails';
  const response = await youtube(parts, channelIDs.length).get<ChannelResponse>('/channels', {
    params: {
      id: channelIDs.join(',')
    }
  });

  return response.data.items.map((item): Channel => ({
    id: item.id,
    name: item.snippet.title,
    description: item.snippet.description,
    thumbnails: item.snippet.thumbnails,
    uploadsPlaylistID: item.contentDetails.relatedPlaylists.uploads,
    url: `https://www.youtube.com/channel/${item.id}`,
    subscriberCount: parseInt(item.statistics.subscriberCount),
    videoCount: parseInt(item.statistics.videoCount),
    viewCount: parseInt(item.statistics.viewCount)
  }));
}

export async function getUploadPlaylist(channel: Channel): Promise<PlaylistItem[]> {
  type PlaylistResponse = {
    items: [{
      snippet: {
        channelId: string,
        playlistId: string,
        position: string,
      }
      contentDetails: {
        videoId: string,
        videoPublishedAt: string
      }
    }]
  }

  const parts = 'contentDetails,snippet';
  const response = await youtube(parts, 20).get<PlaylistResponse>('/playlistItems', {
    params: {
      playlistId: channel.uploadsPlaylistID
    }
  });

  return response.data.items.map((item): PlaylistItem => ({
    channelID: item.snippet.channelId,
    playlistID: item.snippet.playlistId,
    position: parseInt(item.snippet.position),
    publishDate: item.contentDetails.videoPublishedAt,
    videoID: item.contentDetails.videoPublishedAt
  }));
}

export async function getVideos(playlistItems: PlaylistItem[]): Promise<Video[]> {
  type VideoResponse = {
    items: [{
      id: string,
      snippet: {
        publishedAt: string,
        channelId: string,
        title: string,
        description: string,
        thumbnails: VideoThumbnails,
        liveBroadcastContent: string
      }
      contentDetails: {
        duration: string
      }
      status: {
        uploadStatus: string,
        privacyStatus: string,
        embeddable: string
      }
      statistics: {
        viewCount: string,
        likeCount: string,
        dislikeCount: string,
        favoriteCount: string,
        commentCount: string
      },
      player: {
        embedHtml: string
      },
      liveStreamingDetails: {
        actualStartTime: string,
        actualEndTime: string,
        scheduledStartTime: string
      }
    }]
  }

  const parts = 'contentDetails,liveStreamingDetails,player,statistics,status,snippet';
  const response = await youtubeNoMaxResults(parts).get<VideoResponse>('/videos', {
    params: {
      id: playlistItems.map(playlistItem => playlistItem.videoID).join(',')
    }
  });

  const getBroadcastType = (liveBroadcastContent: string): BroadcastType => {
    let broadcastType: BroadcastType = BroadcastType.Archive;

    if (liveBroadcastContent === 'live') {
      broadcastType = BroadcastType.Live;
    } else if (liveBroadcastContent === 'upcoming') {
      broadcastType = BroadcastType.Upcoming;
    }

    return broadcastType;
  };

  return response.data.items.map((item): Video => ({
    broadcastType: getBroadcastType(item.snippet.liveBroadcastContent),
    channelID: item.snippet.channelId,
    commentCount: parseInt(item.statistics.commentCount),
    description: item.snippet.description,
    dislikeCount: parseInt(item.statistics.dislikeCount),
    duration: item.contentDetails.duration,
    embeddable: item.status.embeddable === 'true',
    favoriteCount: parseInt(item.statistics.favoriteCount),
    id: item.id,
    isPublic: item.status.privacyStatus === 'public',
    likeCount: parseInt(item.statistics.likeCount),
    liveStreamingDetails: {
      actualStartTime: item.liveStreamingDetails.actualStartTime,
      actualEndTime: item.liveStreamingDetails.actualEndTime,
      scheduledStartTime: item.liveStreamingDetails.scheduledStartTime
    },
    playerEmbedHtml: item.player.embedHtml,
    publishDate: item.snippet.publishedAt,
    thumbnails: item.snippet.thumbnails,
    title: item.snippet.title,
    viewCount: parseInt(item.statistics.viewCount)
  }));
}
