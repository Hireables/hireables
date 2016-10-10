/**
  * Register Component to global Map()
  * @param components { component1: component1, component2: component2, etc. }
  * Get the context, be it window or global
  * @returns { name, component }
*/
/* eslint no-console: 0 */

const componentsMap = new Map();

export default {
  register(components) {
    Object.keys(components).forEach(name => {
      if (componentsMap.has(name)) {
        console.warn('Called register for component that is already registered', name);
      }

      const component = components[name];
      if (!component) {
        throw new Error(`Called register with null component named ${name}`);
      }

      componentsMap.set(name, {
        name,
        component,
      });
    });
  },

  /**
   * @param name
   * @returns { name, component }
  */

  get(name) {
    if (componentsMap.has(name)) {
      return componentsMap.get(name);
    } else {
      const keys = Array.from(componentsMap.keys()).join(', ');
      throw new Error(
        `Could not find component registered with name ${name}. \
        Registered component names include [ ${keys} ].
        Maybe you forgot to register the component?`
      );
    }
  },
};
