import { Menu, Dropdown, DropdownMenu } from 'semantic-ui-react';
import React from 'react';
import PropTypes from 'prop-types';
import './css/styles.css';
// import { Link } from 'react-router-dom';

// as={Link} to={'/'}
export class CustomLogout extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
  }
  render() {
    const trigger = (
      <div><div>{this.props.user}</div><div className="user-profile">{this.props.profile}</div></div>
    );
    return (
      <Menu className="wrapper-logout">
        { this.props.user &&
        <Menu.Menu position="right">
          <DropdownMenu>
            <Dropdown
              className="container-user-info"
              item
              trigger={trigger}
              icon="user circle outline"
            >
              <Dropdown.Menu>
                <Dropdown.Menu scrolling>
                  <Dropdown.Item key={'LOGOUT'} text="Log out" icon="log out" onClick={this.props.onLogout} />
                </Dropdown.Menu>
              </Dropdown.Menu>
            </Dropdown>
          </DropdownMenu>
        </Menu.Menu >
        }
      </Menu>
    );
  }
}

CustomLogout.propTypes = {
  onLogout: PropTypes.func,
  user: PropTypes.string,
  profile: PropTypes.string,
};

export default CustomLogout;
