/* @pjs transparent=true; */

ArrayList<graphLine> points = new ArrayList<graphLine>();

void setup() {
  size(896, 320, P2D);
  background(0,0);
  frameRate(16);
}

void draw() {
  background(0,0);
  strokeWeight(2);
  noFill();
  for (int i=0; i<points.size();i++) {
    graphLine l = points.get(i);
    l.draw();
    l.step();
  }
  if (points.size() < 10) {
    points.add(new graphLine());
  }
}

class graphLine {
  ArrayList<PVector> localPoints;
  float curX, curY;
  float uX, uY;
  float opacity;
  graphLine() {
    init();
  }
  void init() {
    curX = 0;
    curY = height - random(10);
    uX = 2 + random(10);
    uY = 0;
    localPoints = new ArrayList<PVector>();
    localPoints.add(new PVector(curX, curY));
    opacity = 250;
  }
  void step() {
    if (curX > width || curY > height || curY < 0) {
      opacity-=5;
      if (opacity<5) init();
    } else {
      // Modify position
      curX += uX;
      curY += uY;

      // Modify velocity
      if (curX > width* 0.2 && localPoints.size()<20 && random(1)<0.1) {
        uY -= ((int)random(3) - 1)*(curX * 0.01 + 1);
        uY = min(3, max(-3, uY));
        localPoints.add(new PVector(curX,curY,0));
      }
      if (curY > height * 0.5 && uY>0) {
        uY = 0;
        localPoints.add(new PVector(curX,curY,0));
      }
    }
  }
  void draw() {
    stroke(145, 185, 240, opacity);
    beginShape();
    for (PVector p : localPoints) {
      vertex(p.x,p.y);
    }
    vertex(curX, curY, 0);
    endShape();
  }
}
