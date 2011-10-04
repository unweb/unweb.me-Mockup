/* @pjs transparent=true; */

ArrayList<graphLine> points = new ArrayList<graphLine>();

float Ht = (float)height * 0.6f;

void setup() {
  size(320, 320, P2D);
  background(0,0);
  frameRate(16);

}

void draw() {
  background(0,0);
  strokeWeight(1);
  noFill();
  stroke(255,30);
  line(1,height*0.2, 1,height*0.8);
  line(width,height*0.2, width,height*0.8);
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
    float ipos = random(width + Ht);
    if (ipos < Ht) {
      curX = 0;
      curY = height * 0.2 + ipos;
      print("GG");
    } else {
      curX = ipos - Ht;
      curY = height * 0.2 + Ht;
    }
    uX = 1 + random(6);
    uY = 0;
    uY -= ((int)random(3) - 1)*(curX * 0.01 + 1);
    uY = min(0, max(-2, uY));
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
      if (localPoints.size()<20 && random(1)<0.1) {
        uY -= ((int)random(3) - 1)*(curX * 0.01 + 1);
        uY = min(2, max(-2, uY));
        localPoints.add(new PVector(curX,curY,0));
      }
      if (curY > height * 0.8 && uY > 0 || curY < height * 0.2 && uY < 0) {
        uY = 0;
        localPoints.add(new PVector(curX,curY,0));
      }
    }
  }
  void draw() {
    stroke(255, opacity);
    beginShape();
    for (PVector p : localPoints) {
      vertex(p.x,p.y);
    }
    vertex(curX, curY);
    endShape();
  }
}
