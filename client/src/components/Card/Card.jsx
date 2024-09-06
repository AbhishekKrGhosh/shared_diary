import React from "react";
import "./style.css";

const Card = () => {
  let description = "Duis vestibulum justo non turpis ultricies, vel malesuada justo aliquet. Phasellus aliquet lobortis tincidunt. Mauris dolor sem, bibendum ut dolor nec, convallis bibendum lacus. Maecenas non cursus tortor. In quis justo blandit arcu bibendum pharetra. Aenean at nunc maximus, feugiat neque id, tempus tortor. Ut molestie non ligula sit amet sodales. Donec eu arcu vel eros congue fringilla vitae porta leo. Nulla est libero, egestas ut felis quis, blandit sodales risus. Vestibulum lobortis nisl in eros venenatis ornare. Nam quis libero augue. Cras elementum orci eget semper lobortis.".slice(0,400)
  let tags = "#Etiam et purus turpis pellentesque tempor".split(" ").join(" #").toLocaleLowerCase()
  return (
    <div className="card" style={{ background: `rgba(4, 59, 92, 0.5)` }}>
      <div className="title">Lorem ipsum dolor sit amet</div>
      <div className="description">
        {description}...
      </div>
      <div className="tags">
      {tags}
      </div>
    </div>
  );
};

export default Card;
