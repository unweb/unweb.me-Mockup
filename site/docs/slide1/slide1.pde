/* @pjs transparent=true; */

ArrayList<vPoint> points = new ArrayList<vPoint>();
int counter = 0;
float C = 71;
float R2 = 10000;
float S = 0.0007;
float F = 1;
float zDim = 120;

void setup() {
  size(896, 320, P2D);
  background(0,0);
  frameRate(15);
  while (points.size() < 50) {
    points.add(new vPoint());
  }
}

void draw() {
  background(0,0);
  fill(200);
  stroke(255);
  for (vPoint p : points) {
    p.step();
    ellipse(p.x, p.y, 1, 1);
    //line(p.x-8, p.y-4, p.x, p.y-4);
  }
  stepAndDrawSprings();
}

class vPoint {
  float x, y, z;
  float px, py, pz;
  float fx = random(0.5) - 0.25;
  float fy = random(0.5) - 0.25;
  float fz = random(0.5) - 0.25;
  
  public vPoint() {
    x = px = width*0.65 + random(60);
    y = py = height*0.5 + random(60) - 30;
    z = pz = zDim*0.5 + random(60);
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
    if (x > width - 30) {
      fx -= 0.2;
    }
    if (x < width*0.4) {
      fx += 0.2;
    }
    if (y > height - 30) {
      fy -= 0.2;
    }
    if (y < 30) {
      fy += 0.2;
    }
    if (z > zDim) {
      fz -= 0.2;
    }
    if (z < 0) {
      fz += 0.2;
    }
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
        float x = L2;
        float A1 = 0.4*R2;
        float A2 = 0.8*R2;
        stroke(140, 180, 240, max(0, 255 * (x - A2)/(A1 - A2) ));
        strokeWeight(1);
        line(p1.x,p1.y,p2.x,p2.y);
      } 
    }
  }
}
