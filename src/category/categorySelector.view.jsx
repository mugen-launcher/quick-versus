const React = require("react");
const ArrowLeft = require("../assets/arrow-left-x.svg").default;
const ArrowRight = require("../assets/arrow-right-y.svg").default;

module.exports = function CategorySelector({ image }) {
  return (
    <div class="category-selector">
      <ArrowLeft class="category-arrow-left"/>
      <img class="category-image" src={image} />
      <ArrowRight class="category-arrow-right"/>
    </div>
  );
};
