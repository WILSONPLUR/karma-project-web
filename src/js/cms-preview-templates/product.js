import React from "react";

const ProductPreview = ({ entry, widgetFor, widgetsFor }) => {
  const title = entry.getIn(["data", "title"]);
  const description = entry.getIn(["data", "description"]);
  const image = entry.getIn(["data", "image"]);
  const price = entry.getIn(["data", "price"]);
  const currency = entry.getIn(["data", "currency"]);
  const specs = widgetsFor("specs");
  const body = widgetFor("body");

  return React.createElement(
    "div",
    { className: "product-preview" },
    React.createElement(
      "div",
      { className: "product-hero" },
      React.createElement(
        "div",
        { className: "product-info" },
        React.createElement("h1", null, title),
        React.createElement("p", { className: "description" }, description),
        React.createElement(
          "div",
          { className: "price" },
          price,
          " ",
          currency
        )
      ),
      image && React.createElement("img", {
        src: image,
        alt: title,
        className: "product-image"
      })
    ),
    specs && React.createElement(
      "div",
      { className: "specs" },
      React.createElement("h3", null, "Характеристики"),
      React.createElement(
        "ul",
        null,
        specs.map((spec, index) =>
          React.createElement(
            "li",
            { key: index },
            React.createElement("strong", null, spec.getIn(["data", "label"]), ":"),
            " ",
            spec.getIn(["data", "value"])
          )
        )
      )
    ),
    React.createElement(
      "div",
      { className: "product-content" },
      body
    )
  );
};

export default ProductPreview;
