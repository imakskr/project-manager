import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('authorize');
  this.route('homepage');
  this.route('showrepo');
  this.route('login');
});

export default Router;
