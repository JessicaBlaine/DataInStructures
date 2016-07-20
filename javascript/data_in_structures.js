window.$ = require('jquery');

const ArrayView = require('./data_structures/array_view');

document.addEventListener("DOMContentLoaded", () => {
  const $rootEl = $("#root");
  new ArrayView($rootEl, ["one", "two", "three", "four"]);

  let $title = $rootEl.find('.js-title');
  let copy   = '.js-copy';
  console.log($title.html());
  $title.on("click", function (event) {
    $(event.target).next(copy).slideToggle();
    $(event.target)
      .parent()
      .siblings()
      .children()
      .next()
      .slideUp();
      // .removeClass("accordion__copy--open");
    return false;
  });
});
