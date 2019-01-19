import React from 'react';
import PropTypes from 'prop-types';
import { Popup, Grid, Icon } from 'semantic-ui-react';
import './css/styles.css';

export class EditorPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReload: false,
      open: false,
    };
  }
  onOpenPopup = () => {
    this.setState({
      open: true,
    });
  }
  onCloseItem = () => {
    this.setState({
      open: false,
    });
  }
  render() {
    const { customNames, hasCustom, hasEdit, hasRemove, hasView, actionEdit, actionRemove, actionView, triggerItem, position } = this.props;
    const arr = [];
    if (customNames) {
      customNames.forEach((element) => {
        const column = (
          <Grid.Column width={16} onClick={element.action} key={element.name}>
            <Icon name={element.icon} size="large" className="popup-icon" />
            <span>{element.name}</span>
          </Grid.Column>
        );
        arr.push(column);
      });
    }
    return (
      <Popup wide trigger={triggerItem} onClose={this.onCloseItem} open={this.state.open} onOpen={this.onOpenPopup} on={'click'} position={`${position} center`} className="popup-container">
        <Popup.Content onClick={this.onCloseItem}>
          <Grid>
            {hasEdit ?
              <Grid.Column width={16} onClick={actionEdit}>
                <Icon name="edit" size="large" className="popup-icon" />
                <span>Modify</span>
              </Grid.Column>
              : null}
            {hasView ?
              <Grid.Column width={16} onClick={actionView}>
                <Icon name="eye" size="large" className="popup-icon" />
                <span>View</span>
              </Grid.Column>
              : null}
            {hasCustom ?
              arr
              : null}
            {hasRemove ?
              <Grid.Column width={16} onClick={actionRemove}>
                <Icon name="remove" size="large" className="popup-icon" />
                <span>Remove</span>
              </Grid.Column>
              : null}
          </Grid>
        </Popup.Content>
      </Popup>
    );
  }
}

EditorPopup.propTypes = {
  triggerItem: PropTypes.any,
  customNames: PropTypes.array,
  hasCustom: PropTypes.bool,
  hasView: PropTypes.bool,
  hasEdit: PropTypes.bool,
  hasRemove: PropTypes.bool,
  actionEdit: PropTypes.func,
  actionView: PropTypes.func,
  actionRemove: PropTypes.func,
  position: PropTypes.string,
};

export default EditorPopup;
