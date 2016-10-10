/* eslint-disable */

// Babel polyfill
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
require('babel-polyfill');
require('jquery-ujs');

// Component::Manifest
import RootRoute from './routes/rootRoute.es6';
import NavBar from './components/navbar.es6';
import Footer from './components/footer.es6';
import DeveloperRoute from './routes/developerRoute.es6';
import DevelopersList from './components/developers_list.es6';
import DeveloperShow from './components/developer_show.es6';
import CookiesTracker from './components/cookies.es6';

import ReactHelper from './utils/reactHelper.es6';

ReactHelper.registerComponent({
  NavBar,
  DevelopersList,
  DeveloperShow,
  CookiesTracker,
  Footer,
});

ReactHelper.registerRoute({
  RootRoute,
  DeveloperRoute,
});

// Bootstrap components
import './bootstrapper.es6';
