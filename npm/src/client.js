'use strict';

var _cashDom = require('cash-dom');

var _cashDom2 = _interopRequireDefault(_cashDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function ($) {
  var $nav_sections = $('.ComponentServerNav__section');
  var $current_link = $('.ComponentServerNav').find('[href*="' + window.location.pathname + '"]');

  var $current_section = $current_link && $current_link.parents('.ComponentServerNav__section');

  $current_section.addClass('is-active');

  $nav_sections.find('.ComponentServerNav__sectionHeader').on('click', function (e) {
    e.preventDefault();
    $nav_sections.removeClass('is-active');
    $current_section = $(this).parents('.ComponentServerNav__section');
    $current_section.addClass('is-active');
  });

  $(".RenderComponent__wrapper").each(function () {
    var child = this.childNodes[0];
    if (child.constructor.name == "Comment") {
      // must be a blank node, bail here
      return;
    }
    var childStyles = window.getComputedStyle(child);
    var origHeight = child.offsetHeight;

    this.style.height = '990px';
    if (child.offsetHeight !== origHeight) {
      this.style.height = '100vh';
    } else if (["absolute", "fixed"].indexOf(childStyles.position) !== -1) {
      this.style.minHeight = origHeight + 40 + 'px';
    } else {
      this.style.height = null;
    }
  });
})(_cashDom2.default);