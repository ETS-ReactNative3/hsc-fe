import React, { Component } from 'react';
import { Menu, Icon, Image, Dropdown } from 'semantic-ui-react';
import PropTypes from 'prop-types';

// import { Route, browserHistory } from 'react-router';
// import './css/styles.css';

class CustomMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItemMenu: null,
    };
  }

  handleDisplayMenu() {
    // TODO: remove DOM reference and manipulations
    /* const windowSize = window.innerWidth;
    if (windowSize < 769) {
      const classListP = convertToArray(document.getElementsByClassName('wrapper-menu-p'));
      const classListMenu = document.getElementsByClassName('wrapper-menu')[0].className;
      const isShowMenu = classListP[0].className.indexOf('show');
      if (isShowMenu !== -1) {
        classListP.forEach((item, idx) => {
          classListP[idx].className = item.className.slice(0, item.className.length - 5);
        });
        document.getElementsByClassName('wrapper-menu')[0].className = classListMenu.slice(0, classListMenu.length - 13);
      } else {
        document.getElementsByClassName('wrapper-menu')[0].className += ' collapse-menu';
        setTimeout(() => {
          classListP.forEach((item, idx) => {
            classListP[idx].className += ' show';
          });
        }, 300);
      }
    } */
  }

  redirect(to) {
    this.props.history.push(to);
  }

  handleItemClick = (e, { name }) => {
    this.props.history.push(name);
    if (this.props.location.pathname === `/${name}`) {
      this.redirect(`/${name}`);
    }
    this.setState({ activeItemMenu: name });
  };

  logoutFunc() {
    localStorage.clear();
    window.location.href = '/login';
  }

  render() {
    const tmpPathName = this.props.location.pathname.split('/')[1];
    let activeMenu = tmpPathName;
    if (activeMenu === null) {
      activeMenu = 'editorials';
    }
    const listMenu = [];
    const widthMenuItem = 65 / this.props.listItem.length;
    this.props.listItem.map((menuItem) => {
      const itemInMenu = (
        <Menu.Item
          key={menuItem.key}
          name={menuItem.key}
          active={activeMenu === menuItem.key}
          onClick={this.handleItemClick}
          style={{ width: `${widthMenuItem}%` }}
        >
          <Icon name={menuItem.icon} />
          <p className="wrapper-menu-p">{menuItem.name}</p>
        </Menu.Item>
      );
      listMenu.push(itemInMenu);
      return true;
    });

    return (
      // <div className="wrapper-menu">
      <Menu icon="labeled" stackable={false}>
        <Menu.Item
          onClick={this.handleDisplayMenu}
          style={{ margin: -1, marginBottom: 1, width: '25%' }}
        >
          <Image alt={'Logo'} src="/logohsc.png" />
        </Menu.Item>
        {listMenu}
        <Dropdown text={`${this.props.userName}\nDCG Teamjoy`} pointing className="link item" style={{ width: '10%' }}>
          <Dropdown.Menu>
            <Dropdown.Header><Image alt={'teamjoy'} src="/DCG_Teamjoy.jpg" />{this.props.userRole}</Dropdown.Header>
            <Dropdown.Divider />
            <Dropdown.Item>Log out</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Menu>
      // </div>
    );
  }
}

/* function convertToArray(obj) {
  const array = [];
  for (let i = 0; i < obj.length; i += 1) {
    array.push(obj[i]);
  }
  return array;
} */

CustomMenu.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object,
  listItem: PropTypes.array,
  userName: PropTypes.string,
  userRole: PropTypes.string,
};
export default CustomMenu;
