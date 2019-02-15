import defaultsDeep from 'lodash/defaultsDeep';
import base from './base';

const config = {};

export default Object.freeze(defaultsDeep(config, base));
