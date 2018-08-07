# React Service Worker

> A headless React component that wraps around the Navigator Service Worker API.

## Table of Contents

- [React Service Worker](#react-service-worker)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Usage](#usage)
    - [Basic](#basic)
    - [Less basic](#less-basic)
  - [`<WithServiceWorker>` props](#withserviceworker-props)
    - [publicServiceWorkerDest](#publicserviceworkerdest)
    - [publicUrl](#publicurl)
    - [onError](#onerror)
    - [onInstalled](#oninstalled)
    - [onUpdated](#onupdated)
    - [registerOnMount](#registeronmount)
    - [`children` Render Props](#children-render-props)
      - [registration](#registration)
      - [register](#register)
      - [update](#update)
      - [unregister](#unregister)
  - [License](#license)

## Installation

```
npm install @medipass/react-service-worker --save
```

or install with [Yarn](https://yarnpkg.com) if you prefer:

```
yarn add @medipass/react-service-worker
```

## Usage

### Basic

Import the `<WithServiceWorker>` component and wrap it around your application.

```jsx
import React from 'react';
import WithServiceWorker from 'react-service-worker';

import App from './App';

export default () => (
  <WithServiceWorker publicServiceWorkerDest="/service-worker.js">
    <App />
  </WithServiceWorker>
);
```

### Less basic

```jsx
import React from 'react';
import WithServiceWorker from 'react-service-worker';

import App from './App';

export default () => (
  <WithServiceWorker
    onError={err => console.log(`An error occured: ${err}`)}
    onInstalled={err => console.log('Service worker installed')}
    onUpdated={err => console.log('Service worker updated')}
    publicServiceWorkerDest="/service-worker.js"
  >
    {({ registration, update, unregister }) => (
      <div>
        <App />
        <button onClick={update}>Update service worker</button>
        <button onClick={unregister}>Unregister service worker</button>
      </div>
    )}
  </WithServiceWorker>
);
```

## `<WithServiceWorker>` props

### publicServiceWorkerDest

> `string`

The destination of where your service worker is located.

Example usage:

`<WithServiceWorker publicServiceWorkerDest="/service-worker.js">`

### publicUrl

> `string` | Optional

The public URL of your application. Defaults to the root origin.

Example usage:

`<WithServiceWorker publicUrl="https://example.com/app">`

### onError

> `function(error: Error)` | Optional

Invoked when an error occurs during service worker registration.

Example usage:

```<WithServiceWorker onError={err => console.log(`An error occured! Error: ${err}`)}>```

### onInstalled

> `function()` | Optional

Invoked when the service worker is installed.

Example usage:

```<WithServiceWorker onInstalled={err => console.log('Service worker successfully installed.')}>```

### onUpdated

> `function()` | Optional

Invoked when the service worker is updated.

Example usage:

```<WithServiceWorker onUpdated={err => console.log('Service worker successfully updated.')}>```

### registerOnMount

> `boolean` | Optional | Default: `true`

Invoked when the service worker is updated.

Example usage:

```<WithServiceWorker registerOnMount={process.env.PRODUCTION}>```

### `children` Render Props

#### registration

> `Object`

The instance of the registered service worker.

#### register

> `function()`

When invoked, `register` will register the service worker.

#### update

> `function()`

When invoked, `update` will update the service worker.

#### unregister

> `function()`

When invoked, `unregister` will unregister the service worker.

## License

MIT © [Medipass Solutions Pty. Ltd.](https://github.com/medipass)

