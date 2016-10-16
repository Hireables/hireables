/**
  * Register Route to global Map()
  * @param routes { route1: route1, route2: route2, etc. }
  * Get the context, be it window or global
  * @returns { name, route }
*/

/* eslint no-console: 0 */

const routesMap = new Map();

export default {
  register(routes) {
    Object.keys(routes).forEach((name) => {
      if (routesMap.has(name)) {
        console.warn('Called register for route that is already registered', name);
      }

      const route = routes[name];
      if (!route) {
        throw new Error(`Called register with null route named ${name}`);
      }

      routesMap.set(name, {
        name,
        route,
      });
    });
  },

  /**
   * @param name
   * @returns { name, route }
  */
  get(name) {
    if (routesMap.has(name)) {
      return routesMap.get(name);
    }

    const keys = Array.from(routesMap.keys()).join(', ');
    throw new Error(`Could not find route registered with name ${name}. \
Registered route names include [ ${keys} ]. Maybe you forgot to register the route?`);
  },

  /**
   * Get a Map containing all registered routes. Useful for debugging.
   * @returns Map where key is the route name and values are the
   * { name, route}
  */
  routes() {
    return routesMap;
  },
};
