import React, { Component } from 'react';
import { Menu, Icon, Image } from 'semantic-ui-react';
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

  render() {
    const tmpPathName = this.props.location.pathname.split('/')[1];
    let activeMenu = tmpPathName;
    if (activeMenu === null) {
      activeMenu = 'editorials';
    }

    const listMenu = [];
    const classImpostazioni = 'menu-item-impostazioni';
    this.props.listItem.map((menuItem) => {
      let itemInMenu = (
        <Menu.Item
          key={menuItem.key}
          name={menuItem.key}
          active={activeMenu === menuItem.key}
          onClick={this.handleItemClick}
          style={{ width: '25%' }}
        >
          <Icon name={menuItem.icon} />
          <p className="wrapper-menu-p">{menuItem.name}</p>
        </Menu.Item>
      );
      if (menuItem.key === 'impostazioni') {
        itemInMenu = (
          <Menu.Item
            className={classImpostazioni}
            key={menuItem.key}
            name={menuItem.key}
            active={activeMenu === menuItem.key}
            onClick={this.handleItemClick}
          >
            <Icon name={menuItem.icon} />
            <p className="wrapper-menu-p">{menuItem.name}</p>
          </Menu.Item>
        );
      }
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
          <Image alt={''} src="/logohsc.png" />
        </Menu.Item>
        {listMenu}
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
};
export default CustomMenu;
