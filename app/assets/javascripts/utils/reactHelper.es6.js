/*
  * Set of global helper functions
  * To fetch and attach { components and Route } to global scope
*/

import context from './context.es6.js';
import ComponentRegistery from './componentRegistry.es6.js';
import RouteRegistry from './routeRegistry.es6.js';

const ctx = context();

ctx.ReactHelper = {

  /**
    * Allows registration of react component globally
    * @param components (key is component name, value is the component object)
  */

  registerComponent(components) {
    return ComponentRegistery.register(components);
  },


  /**
    * Allows registration of relay routes globally
    * @param routes (key is route name, value is the route object)
  */

  registerRoute(routes) {
    return RouteRegistry.register(routes);
  },

  /**
    * Get the component that you registered
    * @param name
    * @returns {name, component}
  */

  getComponent(name) {
    return ComponentRegistery.get(name);
  },

  /**
    * Get the route that you registered
    * @param name
    * @returns {name, route}
  */

  getRoute(name) {
    return RouteRegistry.get(name);
  },

};

export default ctx.ReactHelper;
