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
import RevealOnScroll from './modules/RevealOnScroll'
import $ from 'jquery'
import StickyHeader from './modules/StickyHeader'
import Modal from './modules/Modal'

var mobileMenu = new MobileMenu();
new RevealOnScroll($('.feature-item'), "85%");
new RevealOnScroll($('.testimonial'), "60%");

var stickyHeader = new StickyHeader();
var modal = new Modal();