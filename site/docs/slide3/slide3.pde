/* @pjs transparent=true; */

ArrayList<vPoint> points = new ArrayList<vPoint>();
int counter = 0;
float C = 65;
float R2 = C*C;
float S = 0.07;

float Sc = 0.9;
float Cc = 130;

float F = 0.7;
float zDim = 400;

float counter = 0;

PVector cf = new PVector(0,0,0);

vPoint centr;

void setup() {
  size(896, 320, P2D);
  background(0,0);
  frameRate(15);
  while (points.size() < 80) {
    points.add(new vPoint());
  }
  centr = new vPoint(width*0.65, height*0.5, zDim*0.5);
  noLoop();
}

void draw() {
  background(0,0);
  fill(255,200);
  noStroke();
  for (vPoint p : points) {
    p.step();
    ellipse(p.x, p.y, 3, 3);
  }
  stepSprings();
  constantForce();
  centerForce();
  counter += .07;
  //if (random(1)<0.05) {
    cf.x = 4*sin(counter*.43 + 0.1);
    cf.y = 4*cos(counter*1.2);
    cf.z = 4*-cos(counter*1 + 0.5);
  //}
}

class vPoint {
  float x, y, z;
  float px, py, pz;
  float fx,fy,fz;
  
  
  public vPoint() {
    x = px = width*0.65 + random(90);
    y = py = height*0.5 + random(90) - 30;
    z = pz = zDim*0.5 + random(90);
    fx = random(0.5) - 0.25;
    fy = random(0.5) - 0.25;
    fz = random(0.5) - 0.25;
  }
  
  public vPoint(float nx, float ny, float nz) {
    x = px = nx;
    y = py = ny;
    z = pz = nz;
    fx = fy = fz = 0;
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

void stepSprings() {
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
        float x = L2;
        float A1 = 0.1*R2;
        float A2 = 0.4*R2;
        stroke(255, max(0, 255 * (x - A2)/(A1 - A2) ));
        strokeWeight(1);
        line(p1.x,p1.y,p2.x,p2.y);
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
      d = Cc + L2/Cc; 
      d = (float)(d*.25 + L2/d);
      d = (float)(Sc*(1-(Cc/d)));
      lx=d*dx;
      ly=d*dy;
      lz=d*dz;
      p.fx+=lx;
      p.fy+=ly;
      p.fz+=lz;
      //c.fx-=lx;
      //c.fy-=ly;
      //c.fz-=lz;
  }
}

void constantForce() {
  for (int i=0;i<points.size();i++) {
    vPoint p = points.get(i);
      p.fx+=cf.x;
      p.fy+=cf.y;
      p.fz+=cf.z;
  }
}
