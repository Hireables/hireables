/*
  Mount and Unmount react components at nodes
*/

/* global document */

import ReactDOM from 'react-dom';
import Relay from 'react-relay';
import React from 'react';
import ReactHelper from './reactHelper.es6';

// Notification components
import LoadingComponent from '../components/shared/loadingComponent';
import ErrorComponent from '../components/shared/errorComponent';

export const getComponentNodes = () => (
  document.getElementsByClassName('react-component')
);

// UnMount components fro2m Nodes
export const unmountComponents = () => {
  const nodes = getComponentNodes();
  for (let i = 0; i < nodes.length; i += 1) {
    const node = nodes[i];
    ReactDOM.unmountComponentAtNode(
      document.getElementById(node.getAttribute('id'))
    );
  }
};

// Mount components at Nodes
export const mountComponents = () => {
  const nodes = getComponentNodes();

  for (let i = 0; i < nodes.length; i += 1) {
    const node = nodes[i];

    const componentName = node.getAttribute('data-component-name');
    const domNodeId = node.getAttribute('id');
    const hydratedProps = JSON.parse(node.getAttribute('data-component-props'));
    const routeName = node.getAttribute('data-component-route');

    // Get the Component and Route Object
    const { component } = ReactHelper.getComponent(componentName);

    // Mount the root component to domNodeId
    if (routeName) {
      const { route } = ReactHelper.getRoute(routeName);
      if (hydratedProps.id) {
        route.params = {};
        route.params.id = hydratedProps.id;
      }
      ReactDOM.render(
        <Relay.Renderer
          Container={component}
          queryConfig={route}
          environment={Relay.Store}
          render={({ props, error, retry }) => {
            if (props) {
              return (
                React.createElement(component, props)
              );
            } else if (error) {
              return <ErrorComponent retry={retry} />;
            }

            return <LoadingComponent />;
          }}
        />,
        document.getElementById(domNodeId)
      );
    } else {
      ReactDOM.render(
        React.createElement(component, hydratedProps),
        document.getElementById(domNodeId)
      );
    }
  }
};
