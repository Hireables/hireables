/* eslint-disable */

// Babel polyfill
require('babelify/polyfill');
const app = window.app = global.app = {};

// Component::Manifest
import NavBar from './components/navbar.es6.jsx';
import Footer from './components/footer.es6.jsx';
import Jumbotron from './components/jumbotron.es6.jsx';
import Search from './components/search.es6.jsx';
import DeveloperMeta from './components/developer_meta.es6.jsx';
import DevelopersList from './components/developers_list.es6.jsx';
import DeveloperShow from './components/developer_show.es6.jsx';
import DeveloperStatus from './components/developer_status.es6.jsx';
import Developer from './components/developer.es6.jsx';
import Languages from './components/languages.es6.jsx';
import Pagination from './components/pagination.es6.jsx';
import NoContent from './components/no_content.es6.jsx';
import EmptyList from './components/empty_list.es6.jsx';
import CookiesTracker from './components/cookies.es6.jsx';

// Include into app namespace
app.NavBar = NavBar;
app.Footer = Footer;
app.Jumbotron = Jumbotron;
app.Search = Search;
app.DeveloperMeta = DeveloperMeta;
app.DevelopersList = DevelopersList;
app.DeveloperShow = DeveloperShow;
app.Languages = Languages;
app.DeveloperStatus = DeveloperStatus;
app.Developer = Developer;
app.NoContent = NoContent;
app.EmptyList = EmptyList;
app.Pagination = Pagination;
app.CookiesTracker = CookiesTracker;
