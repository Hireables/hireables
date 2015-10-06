// Babel polyfill
require("babelify/polyfill");

// Setup app into global name space
var app = window.app = global.app = {};

// Component::Manifest

// Requite React componets/modules into global app namespace
var NavBar = require('./components/navbar.es6.js');
var Home = require('./components/home.es6.js');
var OrganizationsList = require('./components/organizations_list.es6.js');

// Include into app namespace
app.NavBar = NavBar;
app.Home = Home;
app.OrganizationsList = OrganizationsList;