package Quoridor;

import java.awt.Color;
import java.awt.Graphics;
import java.util.*;

public class Circle
{
    private int radius;
    private int x,y,r;
    
    public Circle(int x, int y, int r, Color c, String name)
    {
        this.x = x;
        this.y = y;
        this.radius = r;
    }
    
    public Circle(int x, int y, int r, Color c)
    {
        this (x, y, r, c, "");
    }
    
    public void draw (Graphics g)
    {
        g.drawOval (x, y, radius*2, radius*2);
    }
    
}
