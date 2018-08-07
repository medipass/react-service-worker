import React from 'react';

import { storiesOf } from '@storybook/react';

import WithServiceWorker from './index';

storiesOf('<WithServiceWorker>', module)
  .add('basic', () => <WithServiceWorker publicServiceWorkerDest="/service-worker.js">Hello world!</WithServiceWorker>)
  .add('register', () => (
    <WithServiceWorker
      onInstalled={() => console.log('Service worker successfully installed.')}
      publicServiceWorkerDest="/service-worker.js"
      registerOnMount={false}
    >
      {({ registration, register }) => <button onClick={register}>Register service worker</button>}
    </WithServiceWorker>
  ))
  .add('update', () => (
    <WithServiceWorker
      onUpdated={() => console.log('Service worker successfully updated.')}
      publicServiceWorkerDest="/service-worker.js"
    >
      {({ registration, update }) => <button onClick={update}>Update service worker</button>}
    </WithServiceWorker>
  ))
  .add('unregister', () => (
    <WithServiceWorker publicServiceWorkerDest="/service-worker.js">
      {({ registration, unregister }) => <button onClick={unregister}>Unregister service worker</button>}
    </WithServiceWorker>
  ));
