import React from 'react';
import {getChannels, getUploadPlaylistItems, getVideos} from '../apis/youtube';
import ArchiveSection from '../components/ArchiveSection';
import Container from '../components/Container';
import '../styles/style.css';
import channelIDsTestData from '../../test-data/ChannelIDs.json';

type IndexProps = {
}

type IndexState = {
  channels: Channel[],
  playlistItems: PlaylistItem[],
  videos: Video[]
}

class Index extends React.Component<IndexProps, IndexState> {
  constructor(props: IndexProps) {
    super(props);

    this.state = {
      channels: [],
      playlistItems: [],
      videos: []
    };
  }

  async componentDidMount(): Promise<void> {
    const channels = await getChannels(this.getChannelIDs());
    this.setState({channels: this.sortChannels(channels)});

    const playlistItems = (await Promise.all(
      channels.map(channel => getUploadPlaylistItems(channel))
    )).reduce((flat, next) => flat.concat(next), []);
    this.setState({playlistItems: playlistItems});

    const videos = await getVideos(playlistItems);
    this.setState({videos: videos});
  }

  getChannelIDs(): string[] {
    return channelIDsTestData.channelIDs;
  }

  sortChannels(channels: Channel[]): Channel[] {
    const channelIDs = this.getChannelIDs();
    return channelIDs.map(id => channels.filter(channel => channel.id === id))
      .reduce((flat, next) => flat.concat(next), []);
  }

  getChannelVideos(channel: Channel): Video[] {
    return this.state.videos
      .filter(video => video.channelID === channel.id)
      .filter(video => video.broadcastType === "none");
  }

  render(): React.ReactElement {
    return (
      <Container>
        <ArchiveSection channels={this.state.channels} videos={this.state.videos} />
      </Container>
    );
  }
}

export default Index;


















// import React from "react";
// import { Link } from "gatsby"

// import Layout from "../components/layout"
// import Image from "../components/image"
// import SEO from "../components/seo"

// const IndexPage = (): React.ReactElement => (
//   <Layout>
//     <SEO title="Home" />
//     <h1>Hi people</h1>
//     <p>Welcome to your new Gatsby site.</p>
//     <p>Now go build something great.</p>
//     <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
//       <Image />
//     </div>
//     <Link to="/page-2/">Go to page 2</Link> <br />
//     <Link to="/using-typescript/">Go to "Using TypeScript"</Link>
//   </Layout>
// )

// export default IndexPage
