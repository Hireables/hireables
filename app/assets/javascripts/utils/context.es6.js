/**
  * Get the available context, { window || global }
  * @returns { boolean|Window|*|context }
*/

/* global window */

export default function context() {
  return ((typeof window !== 'undefined') && window) ||
    ((typeof global !== 'undefined') && global) ||
    this;
}
