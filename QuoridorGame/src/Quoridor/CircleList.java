package Quoridor;

import java.util.*;
import java.awt.Graphics2D;
class CircleList {
  static class Circle {
    public int x, y, radius;
  }

  ArrayList<Circle> circles;

  public CircleList() {
    circles = new ArrayList<Circle>();
  }

  public void draw(Graphics2D g) { // draw must be called by paintComponent of the panel
    for (Circle c : circles)
      g.fillOval(c.x, c.y, c.radius, c.radius);
  }
}
