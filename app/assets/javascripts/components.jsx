// Babel polyfill
import injectTapEventPlugin from 'react-tap-event-plugin';
import 'babel-polyfill';
import 'jquery-ujs';
import 'oauthio-web';
import RootRoute from './routes/rootRoute.es6';
import NavBar from './components/navbar.es6';
import Footer from './components/footer.es6';
import DeveloperRoute from './routes/developerRoute.es6';
import Home from './components/home.es6';
import Search from './components/search.es6';
import DevelopersList from './components/developers/list.es6';
import DeveloperShow from './components/developers/show.es6';
import DeveloperEdit from './components/developers/edit.es6';
import DeveloperLogin from './components/developers/login.es6';
import ReactHelper from './utils/reactHelper.es6';
import renderComponents from './bootstrapper.es6';
import EmployerRoute from './routes/employerRoute.es6';
import EmployerShow from './components/employers/show.es6';
import EmployerEdit from './components/employers/edit.es6';
import EmployerRegistration from './components/employers/registration.es6';
import EmployerLogin from './components/employers/login.es6';
import EmployerNewPassword from './components/employers/newPassword.es6';
import EmployerUpdatePassword from './components/employers/updatePassword.es6';
import './analytics.es6';

injectTapEventPlugin();

ReactHelper.registerComponent({
  NavBar,
  Home,
  DevelopersList,
  DeveloperShow,
  DeveloperEdit,
  Footer,
  EmployerLogin,
  EmployerRegistration,
  EmployerNewPassword,
  EmployerUpdatePassword,
  Search,
  EmployerShow,
  EmployerEdit,
  DeveloperLogin,
});

ReactHelper.registerRoute({
  RootRoute,
  EmployerRoute,
  DeveloperRoute,
});

// Render components to DOM
renderComponents();
