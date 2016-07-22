const anime = require("animejs");

module.exports = {
  resetElements() {
    $('.array__err').css("opacity", "0");
    anime({
      targets: '.array__el div',
      opacity: 1
    });
    anime({
      targets: `.array__el`,
      translateY: "0.2rem",
      color: "#354F00",
      'border-color': "#7A9F35",
      'background-color': "#A5C663",
      // easing: "easeOutBack",
      elasticity: 500,
    });
  },
  getIndex(idx) {
    const returnPointer = anime({
      autoplay: false,
      targets: '.js-pointer',
      left: [`${1.5 + (idx * 4)}rem`, "-2.5rem"],
      elasticity: 100,
      complete: anime({
        targets: ".js-pointer",
        opacity: "0.3",
        autoplay: false
      }).play
    });
    const revealVal = () => {
      anime({
        targets: `.el-${idx} div`,
        opacity: 0
      });
      anime({
        targets: `.el-${idx}`,
        translateY: "-0.2rem",
        color: "#661141",
        'border-color': "#882D60",
        'background-color': "#CD88AF",
        // easing: "easeOutBack",
        elasticity: 500,
      });
      anime({
        targets: '.js-pointer',
        translateY: "-0.3rem",
        duration: 500,
        direction: "reverse",
        complete: returnPointer.play
      });
    };
    const movePointer = anime({
      targets: ".js-pointer",
      duration: 1500,
      left: ["-2.5rem", `${1.5 + (idx * 4)}rem`],
      autoplay: false,
      elasticity: 200,
      complete: revealVal
    });
    anime({
      targets: ".js-pointer",
      duration: 500,
      opacity: "1",
      complete: movePointer.play
    });
  },
  outOfBounds(length) {
    function rippleArr() {

    }
    function bounceBack() {
      console.log("BB");
      $('.array__err').css("opacity", "1");
      anime({
        targets: '.array__err',
        translateY: ["-.6rem", "0rem"]
      });
      anime({
        targets: ".array__el",
        translateY: "-0.2rem",
        color: "#DB6C40",

        // duration: 300,
        // easing: "easeInOutCirc",
        delay: function(el, idx) {
          return (length - idx) * 80;
        }
      });

      anime({
        targets: '.js-pointer',
        easing: "easeOutCubic",
        duration: 500,
        opacity: {
          value: '0.3'
        },
        left: [`${1.5 + (length-1) * 4}rem`, "-2.5rem"]
      });
    }
    const moveOOB = anime({
      targets: '.js-pointer',
      duration: 500,
      // direction: "alternate",
      // elasticity: 1000,
      easing: "easeInCubic",
      left: ["-2.5rem", `${1.5 + (length-1) * 4}rem`],
      autoplay: false,
      complete: bounceBack
    });
    this.revealPointer(moveOOB);
  },

  revealPointer(complete) {
    anime({
      targets: ".js-pointer",
      duration: 500,
      opacity: "1",
      complete: complete.play()
    });
  }
};
