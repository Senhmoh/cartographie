import React from "react";

const House = () => {
  return (
    <div className="house-container">
      <img src="/images/image-removebg-preview.png" alt="Maison" className="house-image" />
      {/* Annotations */}
      <div className="annotation charpente-toiture">Charpente - Toiture</div>
      <div className="annotation facades-murs">Façades - <br /> Murs extérieurs</div>
      <div className="annotation murs-mitoyens">Murs mitoyens</div>
      <div className="annotation murs-porteurs">Murs porteurs intérieurs</div>
      <div className="annotation dalles-planchers">Dalles - Planchers</div>
      <div className="annotation escaliers">Escaliers</div>
    </div>
  );
};

export default House;
