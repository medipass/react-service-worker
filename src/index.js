import { Component } from 'react';
import PropTypes from 'prop-types';

const isLocalhost = Boolean(
  typeof window !== 'undefined' &&
    (window.location.hostname === 'localhost' ||
      // [::1] is the IPv6 localhost address.
      window.location.hostname === '[::1]' ||
      // 127.0.0.1/8 is considered localhost for IPv4.
      window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/))
);

export default class extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]).isRequired,
    onError: PropTypes.func,
    onInstalled: PropTypes.func,
    onUpdated: PropTypes.func,
    publicServiceWorkerDest: PropTypes.string.isRequired,
    publicUrl: PropTypes.string,
    registerOnMount: PropTypes.bool
  };

  static defaultProps = {
    onError: null,
    onInstalled: null,
    onUpdated: null,
    publicUrl: '',
    registerOnMount: true
  };

  state = {
    registration: null,
    serviceWorkerUrl: `${this.props.publicUrl}${this.props.publicServiceWorkerDest}`
  };

  componentDidMount = () => {
    const { registerOnMount } = this.props;
    if (registerOnMount) {
      this.register();
    }
  };

  register = () => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      // The URL constructor is available in all browsers that support SW.
      const publicUrl = new URL(this.props.publicUrl, window.location);
      if (publicUrl.origin !== window.location.origin) {
        // Our service worker won't work if PUBLIC_URL is on a different origin
        // from what our page is served on. This might happen if a CDN is used to
        // serve assets; see https://github.com/facebookincubator/create-react-app/issues/2374
        return;
      }
      if (isLocalhost) {
        // This is running on localhost. Lets check if a service worker still exists or not.
        this.checkValidServiceWorker();
        // Add some additional logging to localhost, pointing developers to the
        // service worker/PWA documentation.
        navigator.serviceWorker.ready.then(() => {
          console.log(
            'This web app is being served cache-first by a service ' +
              'worker. To learn more, visit https://goo.gl/SC7cgQ'
          );
        });
      } else {
        // Is not local host. Just register service worker
        this.registerValidServiceWorker();
      }
    }
  };

  checkValidServiceWorker = async () => {
    const { serviceWorkerUrl } = this.state;
    try {
      const response = await fetch(serviceWorkerUrl);
      // Ensure service worker exists, and that we really are getting a JS file.
      if (response.status === 404 || response.headers.get('content-type').indexOf('javascript') === -1) {
        // No service worker found. Probably a different app. Reload the page.
        navigator.serviceWorker.ready.then(async registration => {
          await registration.unregister();
          window.location.reload();
        });
      } else {
        // Service worker found. Proceed as normal.
        this.registerValidServiceWorker();
      }
    } catch (err) {
      console.log('No internet connection found. App is running in offline mode.');
    }
  };

  registerValidServiceWorker = async () => {
    const { onError, onInstalled, onUpdated } = this.props;
    const { serviceWorkerUrl } = this.state;
    try {
      const registration = await navigator.serviceWorker.register(serviceWorkerUrl);
      this.setState({ registration });
      registration.onupdatefound = () => {
        const installingWorker = registration.installing;
        installingWorker.onstatechange = () => {
          if (installingWorker.state === 'installed') {
            if (navigator.serviceWorker.controller) {
              onUpdated && onUpdated();
            }
            onInstalled && onInstalled();
          }
        };
      };
    } catch (err) {
      console.error('Error during service worker registration:', err);
      onError && onError(err);
    }
  };

  unregister = () => {
    const { registration } = this.state;
    registration && registration.unregister();
  };

  update = () => {
    const { registration } = this.state;
    registration && registration.update();
  };

  render = () => {
    const { children } = this.props;
    const { registration } = this.state;
    return typeof children === 'function'
      ? children({ registration, register: this.register, update: this.update, unregister: this.unregister })
      : children;
  };
}
