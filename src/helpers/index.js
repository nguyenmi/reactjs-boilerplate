import {
  get as getLodash
} from 'lodash';

export default class Helpers {
  /**
   * Get value of a property in an object by a path, example: "post.user.name"
   * @param {object} obj The object to query.
   * @param {string} path The path of the property to get., like "post.user.name" or "name"
   * @param {*} defaultValue the default value
   * @returns {*} the value
   * @static
   * @memberof Helpers
   */
  static get = (obj = {}, path = '', defaultValue) => getLodash(obj, path, defaultValue)
}
