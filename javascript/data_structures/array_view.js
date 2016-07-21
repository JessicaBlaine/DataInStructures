
function ArrayView($rootEl, array) {
  this.$rootEl = $rootEl;
  this.array = array || [];
  this.$array = this.generateArray(array);
  this.$array.addClass("array");
  this.$container = $rootEl.find(".array-info");
  this.$content = this.$container.find(".content");
  this.$content.append(this.$array);

  this.$content.slideToggle();
}
ArrayView.prototype.generateArray = function (array) {
  const $data = $("<ul/>").append(
    array.map(el => `<li class='array__el'>${el}</li>`)
  );

  const methods = [
    $("<div><input/></div>").prepend( new MethodButton("Get", this.getIndex) ),
  ];
  methods.forEach(method => method.addClass("method input-method"));
  const $methods = $("<div/>").append(methods);
  $methods.addClass("array__methods");
  return $("<div/>").append([$data, $methods]);
};

ArrayView.prototype.getIndex = function (event) {
  console.log("get");
};

function MethodButton(methodName, method) {
  return $(`<button>${methodName}</button>`).click(method);
}

// Array methods: Index (get & set), Shift & Unshift, Pop & Push, Find(?)

module.exports = ArrayView;
