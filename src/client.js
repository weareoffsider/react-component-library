import cash from 'cash-dom'

(function ($) {
  const $nav_sections = $('.ComponentServerNav__section')
  const $current_link = $('.ComponentServerNav').find('[href*="' + window.location.pathname + '"]')

  let $current_section = $current_link && $current_link.parents('.ComponentServerNav__section')

  $current_section.addClass('is-active')

  $nav_sections
    .find('.ComponentServerNav__sectionHeader')
    .on('click', function (e) {
      e.preventDefault()
      $nav_sections.removeClass('is-active')
      $current_section = $(this).parents('.ComponentServerNav__section')
      $current_section.addClass('is-active')
    })

  $(".RenderComponent__wrapper").each(function() {
    const child = this.childNodes[0];
    const childStyles = window.getComputedStyle(child)
    const origHeight = child.offsetHeight;

    this.style.height = '990px'
    if (child.offsetHeight !== origHeight) {
      this.style.height = '100vh';
    } else if (["absolute", "fixed"].indexOf(childStyles.position) !== -1) {
      this.style.minHeight = (origHeight + 40) + 'px'
    } else {
      this.style.height = null;
    }
  })
})(cash)
