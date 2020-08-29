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

async function getChannels(channelIDs: string[]): Promise<Channel[]> {
  type ChannelResponse = {
    items: [{
      snippet: {
        title: string,
        description: string,
        thumbnails: Thumbnail
      }
      contentDetails: {
        relatedPlaylists: {
          uploads: string
        }
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
    name: item.snippet.title,
    description: item.snippet.description,
    thumbnail: item.snippet.thumbnails,
    uploadsPlaylistID: item.contentDetails.relatedPlaylists.uploads
  }));
}
