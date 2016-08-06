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
  this.$info = $("<div/>").load(
                                "../../html/array_view.html",
                                this.addInfoButtons.bind(this)
                              );
  this.$content.append(this.$info);



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

ArrayView.prototype.addInfoButtons = function () {
  $(".Get").prepend( new MethodButton("Get", this.getIndex.bind(this)) );
  $(".Set")
    .append( new MethodButton("=", this.setIndex.bind(this)) )
    .append("<input value='new' readonly='readonly' class='text'/>");

  const changeInfo = function(event) {
    $('.array__info').removeClass("selected");
    $(`.array__info.${event.target.className.slice(-1)}`).addClass("selected");
  };
  $(".js-1").click(changeInfo);
  $(".js-2").click(changeInfo);
  $(".js-3").click(changeInfo);
  $(".js-4").click(changeInfo);
};

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

    $("<div><input placeholder='idx' maxlength='2'/></div")
      .append( new MethodButton("=", this.setIndex.bind(this)) )
      .append("<input placeholder='value' maxlength='5' class='text'/>"),

    $("<div><input placeholder='value' maxlength='5' class='text'/></div")
      .prepend( new MethodButton("Push", this.push.bind(this)) ),

    $("<div></div>").append( new MethodButton("Pop", this.pop.bind(this)) ),

  ];
  methods.forEach(method => method.addClass("method input-method"));
  const $methods = $("<div><h2>Array Methods</h2></div>").append(methods);
  $methods.addClass("array__methods");

  return $("<div/>").append(
    [$data, $methods, "<span class='array__err'>Out of Bounds</span>"]
  );
};

ArrayView.prototype.pop = function (event) {
  this.getIndex(event, this.array.length - 1);
  // setTimeout(
    // () => $(`.el-${this.array.length}`).addClass("el-popped"),
    // 1100);

  const removeEl = () => {
    $(`.el-${this.array.length - 1}`).remove();
    this.array.pop();
    anime({
      targets: [".array__el"],
      // easing: "easeInOutCirc",
      left: ["-2rem", "0rem"],
      complete: () => {
      }
    });
  };

  anime({
    targets: `.el-${this.array.length - 1}`,
    delay: 2000,
    translateY: "5rem",
    easing: "easeOutQuad",
    opacity: "0",
    complete: removeEl
  });


};

ArrayView.prototype.push = function (event) {
  // $('.method button').prop("disabled", true);
  if (this.array.length > 10) {
    Animations.outOfBounds();
  }
  else {
    const value = $(event.target).next().val();
    if (value) {
      const $element = $(`<li>${value}</li>`)
        .addClass(`array__el el-hidden el-${this.array.length}`)
        .prepend(`<div>${this.array.length}</div>`);
      this.array.push(value);
      this.$array.find("ul").append($element);
      setTimeout(() => $element.removeClass("el-hidden"), 300);

      this.getIndex(event, this.array.length - 1);
    }
  }
};

ArrayView.prototype.setIndex = function (event) {
  // $('.method button').prop("disabled", true);
  console.log("set");
  const idx = parseInt( $(event.target).prev().val() );
  const value = $(event.target).next().val();
  if (idx < this.array.length) this.array[idx] = value;
  console.log(idx, value, this.array);
  this.$array.find(`.el-${idx}`).html(`<div>${idx}</div>${value}`);
  this.getIndex(event, idx);
};

ArrayView.prototype.getIndex = function (event, i) {
  // anime.remove(anime.list);
  Animations.resetElements();
  this.$array.remove(".array__err");

  const idx = i || parseInt( $(event.target).next().val() );
  if (!Number.isNaN(idx)) {
    $('.method button').prop("disabled", true);
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
