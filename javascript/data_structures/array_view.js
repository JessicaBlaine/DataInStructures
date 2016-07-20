
function ArrayView($rootEl, array) {
  this.$rootEl = $rootEl;
  this.array = array || [];
  this.$array = $("<ul/>").append(array.map(el => `<li>${el}</li>`));
  this.$array.addClass("array");
  this.$container = $rootEl.find(".array-info");
  this.$content = this.$container.find(".content");
  this.$content.append(this.$array);
}

ArrayView.prototype.toggleView = function (event) {
  // console.log(this.$container);
  this.$container.find(".content").length
    ? this.$content.detach()
    : this.$container.append(this.$content);
  console.log(this.$content.html());
};

module.exports = ArrayView;
