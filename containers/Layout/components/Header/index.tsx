import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Popup } from 'semantic-ui-react';

import { ScrollBar, Link } from '@/components';
import { StoreProps } from '@/lib/store';

import './styles/header.scss';

const HEADER_HEIGHT = 60;

const MENU_ITEMS: { name: string; route: string }[] = [{ name: 'Setting', route: '/setting' }, { name: 'Profile', route: '/profile' }];

@inject('login')
@inject('scroll')
@observer
export default class LayoutHeader extends Component<StoreProps> {
  renderUserMenus = () => {
    const { logout, showLoginPopup, userInformation } = this.props.login || {
      showLoginPopup: () => console.error('showLoginPopop Error'),
      logout: () => console.error('logout Error'),
      userInformation: { username: undefined },
    };

    return userInformation && userInformation.username ? (
      <li className="user-menu-items">
        <Popup
          trigger={
            <div>
              <Link route={`/@${userInformation.id}`}>
                <a>{userInformation.username}</a>
              </Link>
            </div>
          }
          flowing
          hoverable
          hideOnScroll
        >
          <Popup.Content>
            <ul className="user-menu-items-popup">
              {MENU_ITEMS.map(menu => (
                <li>
                  <Link route={menu.route}>
                    <a>{menu.name}</a>
                  </Link>
                </li>
              ))}
              <li>
                <a onClick={logout}>Logout</a>
              </li>
            </ul>
          </Popup.Content>
        </Popup>
      </li>
    ) : (
      <li>
        <a onClick={showLoginPopup}>Login</a>
      </li>
    );
  };

  render() {
    const { movedScrollY, scrollY, height } = this.props.scroll || { movedScrollY: 0, scrollY: 0, height: 0 };

    return (
      <header style={{ top: movedScrollY > 0 ? -HEADER_HEIGHT : 0 }}>
        <nav>
          <div>
            <Link route="/">
              <a>Portfolio</a>
            </Link>
          </div>
          <ul>{this.renderUserMenus()}</ul>
        </nav>
        <ScrollBar top={HEADER_HEIGHT} scroll={scrollY} height={height} />
      </header>
    );
  }
}
