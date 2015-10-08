// Babel polyfill
require("babelify/polyfill");

// Setup app into global name space
var app = window.app = global.app = {};

// Component::Manifest
var NavBar = require('./components/navbar.es6.js');
var Jumbotron = require('./components/jumbotron.es6.js');
var OrganizationsList = require('./components/organizations_list.es6.js');
var OrganizationsShow = require('./components/organizations_show.es6.js');
var Search = require('./components/search.es6.js');
var OrganizationMeta = require('./components/organization_meta.es6.js');
var MembersList = require('./components/members_list.es6.js');
var Member = require('./components/member.es6.js');
var Pagination = require('./components/pagination.es6.js');

var NoContent = require('./components/no_content.es6.js');

// Include into app namespace
app.NavBar = NavBar;
app.Jumbotron = Jumbotron;
app.OrganizationsList = OrganizationsList;
app.OrganizationsShow = OrganizationsShow;
app.Search = Search;
app.OrganizationMeta = OrganizationMeta;
app.MembersList = MembersList;
app.Member = Member;
app.NoContent = NoContent;
app.Pagination = Pagination;


