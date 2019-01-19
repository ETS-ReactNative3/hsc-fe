import React from 'react';
// import PropTypes from 'prop-types';
import { Grid } from 'semantic-ui-react';
class Posts extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      activeIndex: 0,
      activeName: 'Viet Ngu',
      isReloadList: false,
    };
  }

  handleTabChange = (e, { activeIndex }) => {
    this.setState({
      activeIndex,
      activeName: this.capitalizeFirstLetter(e.target.text),
      isReloadList: true,
    });
  };

  capitalizeFirstLetter = (str) => {
    const temp = str.toLowerCase();
    return temp[0].toUpperCase() + temp.slice(1);
  };

  handleDisableReloadList = () => {
    this.setState({
      isReloadList: false,
    });
  };

  render() {
    return (
      <div>
        <Grid className="header-list">
          <Grid.Row>
            {/* <Grid.Column computer={2} tablet={2} largeScreen={1} mobile={2}>
              <Icon name="id card" size="huge" />
            </Grid.Column> */}
            <Grid.Column computer={16} tablet={16} largeScreen={16} mobile={16}>
              {/* <h2>HSC</h2>
              <span>Test HSC</span> */}
              <iframe title="facebook test" src="https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2FHSC.DCGTeamjoy%2Fvideos%2F536792843472616%2F&show_text=0&width=100" width="100%" height="600px" style={{ border: 'none', overflow: 'hidden' }} scrolling="no" frameBorder="0" allowTransparency="true" allowFullScreen="true"></iframe>
            </Grid.Column>
            <Grid.Column computer={8} tablet={8} largeScreen={8} mobile={16}>
              <iframe title="facebook-post-1" src="https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2FHSC.DCGTeamjoy%2Fvideos%2F729208994125734%2F&show_text=1&width=560" width="100%" height="460" style={{ border: 'none', overflow: 'hidden' }} scrolling="no" frameBorder="0" allowTransparency="true" allow="encrypted-media"></iframe>
            </Grid.Column>
            <Grid.Column computer={8} tablet={8} largeScreen={8} mobile={16}>
              <iframe title="facebook-post-2" src="https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2FHSC.DCGTeamjoy%2Fvideos%2F536792843472616%2F&show_text=1&width=560" width="100%" height="460" style={{ border: 'none', overflow: 'hidden' }} scrolling="no" frameBorder="0" allowTransparency="true" allow="encrypted-media" allowFullScreen="true"></iframe>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        {/* <iframe src="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2FHSC.DCGTeamjoy%2Fposts%2F340746749848531&width=500" width="500" height="460" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowTransparency="true" allow="encrypted-media"></iframe> */}
      </div>
    );
  }
}

Posts.propTypes = {
  // elementId: PropTypes.string,
};

export default Posts;
