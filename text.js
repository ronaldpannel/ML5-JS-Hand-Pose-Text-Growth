class Text {
  constructor(x, y) {
    this.x = x;
    this.y = y;

    this.angle = 0;
    this.radius = 10;
    this.hue = 0;
  }
  update() {
    if(this.hue < 360){
      this.hue++
    }else{
      this.hue = 0
    }

  }

  draw() {
   
    text("Hi Rosie", this.x, this.y);
   
    
  }
}
