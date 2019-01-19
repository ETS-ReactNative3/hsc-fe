import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { browserHistory } from 'react-router-dom';

import configureStore from '../../../configureStore';
import Auth from '../index';

describe('<Auth />', () => {
  let store;
  beforeAll(() => {
    store = configureStore({}, browserHistory);
  });

  it('should render the repos list', () => {
    const renderedComponent = mount(
      <Provider store={store}>
        <Auth
          match={{
            params: {
              token: 'pippo',
            },
          }}
        />
      </Provider>
    );
    expect(renderedComponent.find(Auth).find('h1')).toContainEqual(<h1>pippo</h1>);
  });
});
