/* @pjs transparent=true; */

ArrayList<vPoint> points = new ArrayList<vPoint>();
int counter = 0;
float C = 35;
float R2 = C*C*1.2;
float S = 0.035;
float F = 0.9;
float zDim = 120;
float counter = 0;
float sinc, cosc;
float offsetX;
float offsetY;

float Sc = 0.08;
float Cc = 130;
float Cc2 = Cc*Cc;

vPoint centr = new vPoint(0,0,0);

void setup() {
  size(896, 320, P2D);
  background(0,0);
  frameRate(15);
  while (points.size() < 80) {
    points.add(new vPoint());
  }
  offsetX = width*0.7;
  offsetY = height*0.5;
}

void draw() {
  background(0,0);
  
  counter += 0.01;
  if (counter > 0.4) F = 1;
  sinc = sin(counter);
  cosc = cos(counter);
  
  fill(255);
  stroke(255);
  for (vPoint p : points) {
    p.step();
    ellipse(offsetX + p.x * sinc + p.z * cosc, offsetY + p.y, p.s, p.s);
  }
  
  centerForce();
  stepAndDrawSprings();
  if (S<0.01) S+=.0005;
}

class vPoint {
  float x, y, z;
  float px, py, pz;
  float fx = random(0.5) - 0.25;
  float fy = random(0.5) - 0.25;
  float fz = random(0.5) - 0.25;
  float s = 30*(1/sqrt(2*PI))*pow(2.71828, -0.5*pow(random(18)-9,2)) + 2;
  
  public vPoint() {
    x = px = random(60) - 30;
    y = py = random(60) - 30;
    z = pz = random(60) - 30;
  }
  
  void step() {
    float tx = x;
    float ty = y;
    float tz = z;
    x += (tx - px) * F + fx;
    y += (ty - py) * F + fy;
    z += (tz - pz) * F + fz;
    px = tx;
    py = ty;
    pz = tz;
    fx = fy = fz = 0;
  }
}

void stepAndDrawSprings() {
  noFill();
  float dx, dy, dz, L2, d, lx, ly, lz;
  for (int i=0;i<points.size();i++) {
    vPoint p1 = points.get(i);
    for (int j=i+1;j<points.size();j++) {
      vPoint p2 = points.get(j);
      dx=p2.x-p1.x;
      dy=p2.y-p1.y;
      dz=p2.z-p1.z;
      L2 = dx*dx+dy*dy+dz*dz;
      if (L2<R2) {
        d = C + L2/C; 
        d = (float)(d*.25 + L2/d);
        d = (float)(S*(1-(C/d)));
        lx=d*dx;
        ly=d*dy;
        lz=d*dz;
        p1.fx+=lx;
        p1.fy+=ly;
        p1.fz+=lz;
        p2.fx-=lx;
        p2.fy-=ly;
        p2.fz-=lz;
      }
      float T = 189*p1.s*p2.s;
      if (L2<T) {
        float x = L2;
        float A1 = 1.1*R2;
        float A2 = T;
        stroke(255, max(0, 255 * (x - A2)/(A1 - A2) ));
        strokeWeight(1);
        line(offsetX + p1.x * sinc + p1.z * cosc,offsetY + p1.y, offsetX + p2.x * sinc + p2.z*cosc,offsetY + p2.y);
      }
    }
  }
}

void centerForce() {
  noFill();
  float dx, dy, dz, L2, d, lx, ly, lz;
  for (int i=0;i<points.size();i++) {
    vPoint p = points.get(i);
      dx=centr.x-p.x;
      dy=centr.y-p.y;
      dz=centr.z-p.z;
      L2 = dx*dx+dy*dy+dz*dz;
      if (Cc2 < L2) {
        d = Cc + L2/Cc; 
        d = (float)(d*.25 + L2/d);
        d = (float)(Sc*(1-(Cc/d)));
        lx=d*dx;
        ly=d*dy;
        lz=d*dz;
        p.fx+=lx;
        p.fy+=ly;
        p.fz+=lz;
    }
  }
}
