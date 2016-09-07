const anime = require("animejs");
const Animations = require('./hash_animations');

function HashView($rootEl, hash) {
  this.$rootEl = $rootEl;
  this.hash = hash || {};
  this.$hash = this.generateHash(hash);
  this.$container = $rootEl.find(".hash-info");
  this.$content = this.$container.find(".content");
  this.$content.append(this.$hash);

  this.$content.slideToggle();
}

HashView.prototype.generateHash = function (hash) {
  const $buckets = $("<ul class='hash__buckets'/>").append(
    [0, 1, 2, 3, 4, 5, 6, 7].map(idx => {
      return `<li class='${idx}''><span>${idx}</span></li>`;
    })
  );
  const $keys = $("<ul class='hash__keys'/>").append(
    Object.keys(hash).map(k => {
      let idx = Math.abs(hashCode(k) % 8);
      $buckets.find(`.${idx}`).append(hash[k]).addClass("hasData");
      return `<li class="hash__key">${k}</li>`;
    })
  );
  const $hashFunction = $("<div class='hash__function'/>");

  return $("<div class='hash'/>").append(
    [$keys, $hashFunction, $buckets]
  );
};

const hashCode = function(str){
    var hash = 0;
    if (str.length === 0) return hash;
    for (let i = 0; i < str.length; i++) {
        let char = str.charCodeAt(i);
        hash = ((hash<<5)-hash)+char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
};

module.exports = HashView;
