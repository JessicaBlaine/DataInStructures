const anime = require("animejs");
const Animations = require('./array_animations');

function ArrayView($rootEl, array) {
  this.$rootEl = $rootEl;
  this.array = array || [];
  this.$array = this.generateArray(array);
  this.$array.addClass("array");
  this.$container = $rootEl.find(".array-info");
  this.$content = this.$container.find(".content");
  this.$content.append(this.$array);

  this.$content.slideToggle();
  anime({
    targets: `.array__el`,
    translateY: "0.2rem",
    color: "#354F00",
    'border-color': "#7A9F35",
    'background-color': "#A5C663",
    easeing: "easeInBack",
    elasticity: 500,
  });
}
ArrayView.prototype.generateArray = function (array) {
  const $data = $("<ul/>").append(
    array.map((el, i) => {
      return `<li class='array__el el-${i}'><div>${i}</div>${el}</li>`;
    })
  );

  const $pointer = $("<img class='js-pointer' src='./css/cursor.png'></img>");
  $data.append($pointer);

  const methods = [
    $("<div><input placeholder='idx' maxlength='2'/></div>")
      .prepend( new MethodButton("Get", this.getIndex.bind(this)) ),
  ];
  methods.forEach(method => method.addClass("method input-method"));
  const $methods = $("<div/>").append(methods);
  $methods.addClass("array__methods");

  return $("<div/>").append(
    [$data, $methods, "<span class='array__err'>Out of Bounds</span>"]
  );
};

ArrayView.prototype.getIndex = function (event) {
  // anime.remove(anime.list);
  Animations.resetElements();
  this.$array.remove(".array__err");

  const idx = parseInt( $(event.target).next().val() );
  if (!Number.isNaN(idx)) {
    if (idx < 0 || idx >= this.array.length) {
      Animations.outOfBounds(this.array.length);
      this.$array.append();
    }
    else Animations.getIndex(idx);
  }
};

function MethodButton(methodName, method) {
  return $(`<button>${methodName}</button>`).click(method);
}

// Array methods: Index (get & set), Shift & Unshift, Pop & Push, Find(?)

module.exports = ArrayView;
