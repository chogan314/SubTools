import React from 'react';
import {getChannels} from '../apis/youtube';
import Channel from '../components/ChannelBadge';

type IndexProps = {
}

type IndexState = {
  channelData: Channel[]
}

class Index extends React.Component<IndexProps, IndexState> {
  constructor(props: IndexProps) {
    super(props);

    this.state = {
      channelData: []
    };
  }

  channelIDs: string[] = [
    '***REMOVED***',
    '***REMOVED***'
  ];

  componentDidMount(): void {
    getChannels(this.channelIDs).then(x => this.setState({channelData: x}));
  }

  render(): React.ReactElement {
    return (
      <div>
        {this.state.channelData.map(c => {
          return <Channel key={c.id} channel={c} />;
        })}
      </div>
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
