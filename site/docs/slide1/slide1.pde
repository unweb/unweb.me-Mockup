ArrayList<graphLine> points = new ArrayList<graphLine>();
int counter = 0;

void setup() {
  size(896, 320, P2D);
  background(252);
  frameRate(20);
}

void draw() {
  stroke(80);
  noFill();
  for (int i=0; i<points.size();i++) {
    graphLine l = points.get(i);
    l.draw();
    l.step();
  }
  while (points.size() < 10) {
    points.add(new graphLine());
  }
  counter++;
  if (counter >20) {
    fill(252,50);
    noStroke();
    rect(0, 0, width, height);
    counter = 0;
  }
}

class graphLine {
  float curX, curY;
  float uX, uY;
  graphLine() {
    init();
  }
  void init() {
    curX = 0;
    curY = height - random(10);
    uX = 3 + random(15);
    uY = 0;
  }
  void step() {
    curX += uX;
    curY += uY;
    if (random(1)<0.1) {
      uY -= ((int)random(3) - 1)*(curX * 0.01 + 1);
      uY = min(3, max(-6, uY));
    }
    if (curY > height * 0.5) {
      uY = min(0, uY);
    }
    if (curX > width || curY > height || curY < 0) {
      init();
    }
  }
  void draw() {
    line(curX, curY, curX + uX, curY + uY);
  }
}
