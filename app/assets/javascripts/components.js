// Babel polyfill
require("babelify/polyfill");
// Setup app into global name space
var app = window.app = global.app = {};

// Component::Manifest
var NavBar = require('./components/navbar.es6.js');
var Footer = require('./components/footer.es6.js');
var Jumbotron = require('./components/jumbotron.es6.js');
var Search = require('./components/search.es6.js');
var DeveloperMeta = require('./components/developer_meta.es6.js');
var DevelopersList = require('./components/developers_list.es6.js');
var DeveloperShow = require('./components/developer_show.es6.js');
var DeveloperStatus = require('./components/developer_status.es6.js');
var Developer = require('./components/developer.es6.js');
var Languages = require('./components/languages.es6.js');
var Pagination = require('./components/pagination.es6.js');
var NoContent = require('./components/no_content.es6.js');
var EmptyList = require('./components/empty_list.es6.js');
var CookiesTracker = require('./components/cookies.es6.js');

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
