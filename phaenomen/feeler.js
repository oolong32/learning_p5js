function Feeler() {
  this.deployed = true;
  this.vector = this.dir.setMag(10);
  this.pos = createVectror(0, 0); 
  this.segments = [];

  /*
   * ein Fühler ist eine Sammlung aus Vektoren.
   * diese Vektoren bilden eine Kette
   * sie entwachsen einem Partikel/Host (oder einem Knoten?)
   * sie beginnen zu wachen, wenn sie genug Zeit haben.
   *
   */

  this.growSegment = function() {
    //
  };
}

