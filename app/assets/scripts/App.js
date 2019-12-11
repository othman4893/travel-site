/* require function is from nodejs
var Person = require('./modules/Person');
 -- import is from ES6
*/


/* this is a nodejs way
module.exports = Person;

// this is the ES6 way
export default Person;
*/

import MobileMenu from './modules/MobileMenu'

var mobileMenu = new MobileMenu();
