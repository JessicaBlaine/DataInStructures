const anime = require("animejs");


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
    array.map((el, i) => {
      return `<li class='array__el el-${i}'><div>${i}</div>${el}</li>`
    })
  );

  const $pointer = $("<img class='js-pointer' src='./css/cursor.png'></img>");
  $data.append($pointer);

  const methods = [
    $("<div><input placeholder='0' maxlength='2'/></div>")
      .prepend( new MethodButton("Get", this.getIndex.bind(this)) ),
  ];
  methods.forEach(method => method.addClass("method input-method"));
  const $methods = $("<div/>").append(methods);
  $methods.addClass("array__methods");

  return $("<div/>").append([$data, $methods]);
};

ArrayView.prototype.getIndex = function (event) {
  const idx = parseInt( $(event.target).next().val() );
  if (!Number.isNaN(idx)) {
    const revealVal = () => {
      anime({
        targets: [`.el-${idx}`, `.el-${idx} div`],
        opacity: function(el, i) {
          if (i === 1) return 0;
        },
        translateY: "-0.2rem",
        color: "#661141",
        'border-color': "#882D60",
        'background-color': "#CD88AF",
        easeing: "easeInBack",
        elasticity: 500,
      });
      anime({
        targets: '.js-pointer',
        translateY: "-0.3rem",
        direction: "reverse"
      });

    };
    const movePointer = anime({
      targets: ".js-pointer",
      duration: 1500,
      left: ["-1.5rem", `${1.5 + (idx * 4)}rem`],
      autoplay: false,
      complete: revealVal
    });
    anime({
      targets: ".js-pointer",
      duration: 500,
      opacity: "1",
      complete: movePointer.play
    });

  }

  console.log(anime.getValue(".array__el", "left"));
};

function MethodButton(methodName, method) {
  return $(`<button>${methodName}</button>`).click(method);
}

// Array methods: Index (get & set), Shift & Unshift, Pop & Push, Find(?)

module.exports = ArrayView;
