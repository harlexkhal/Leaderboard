import './index.css';
import Icon from './assets/images/loading.gif';
import Application from '../custom_modules/application/application.js';

const loader = document.querySelector('.loading');
loader.src = Icon;

const application = new Application();
application.initApp();