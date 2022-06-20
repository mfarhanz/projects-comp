package Quoridor;

import javax.swing.*;
import java.util.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.MouseEvent;
import java.awt.event.MouseListener;
import java.util.ArrayList;

public class Pawn extends JPanel implements Cloneable, MouseListener
{
    private int x, y, r, h;
    private int numWalls;
    private Color c;
    private int count, off_count;
    private boolean movemade;
    
    public Pawn() {}
    
    public Pawn(int xcoord, int ycoord, int radius, int height, Color color)
    {
        super();
        this.x = xcoord;
        this.y = ycoord;
        this.c = color; 
        this.r = radius;
        this.h = height;
        this.setBackground(Color.black);
        this.setOpaque(false);
    }
    
    @Override  
    public void paintComponent(Graphics g) 
    {
        super.paintComponent(g);
        
        
        g.setColor(c);
        g.fillOval(0, 0, r, h);
        //g.drawOval(cntrX-radius, cntrY-radius, radius*2, radius*2);
        //g.fillOval(cntrX-radius, cntrY-radius, radius*2, radius*2);
        g.drawOval(0, 0, r, h);
        
    }  
    
    public Pawn clone() throws CloneNotSupportedException
    {
        return (Pawn) super.clone();
    }
    
    public void movePawn(Square square) 
    {
        square.add(this);
    
    }
    
   public void removemouse(){
       this.removeMouseListener(this);
    }
    
     public void setX(int x) {
        this.x = x;
    }

    public void setY(int y) {
        this.y = y;
    }

    public int getX()
     {
          return x;
     }
     
     public int getY()
     {
          return y;
     }
     
     public int getNumWalls()
     {
          return numWalls;
     }
     
     public void setColor(Color color)
     {
          c = color;
     }
     
     public Color getColor()
     {
          return c;
     }
     public void setmoveMade(boolean x)
    {
        this.movemade = x;
    }
    public boolean getmoveMade()
    {
        return this.movemade;
    }
     
     //Getters for the coordinates of squares surrounding the selected square
     public int getNxCoord()   { return x-2; }
     
     public int getSxCoord()   { return x+2; }
     
     public int getEyCoord()   { return y+2; }
     
     public int getWyCoord()   { return y-2; }
     
     //Getters for the coordinates of a fence
     public int getFenceNxCoord()   { return x-1; }
     
     public int getFenceSxCoord()   { return x+1; }
     
     public int getFenceEyCoord()   { return y+1; }
     
     public int getFenceWyCoord()   { return y-1; }
     
     public void mouseClicked(MouseEvent arg0) {}
     public void mouseEntered(MouseEvent arg0) {}                   
     public void mouseExited(MouseEvent arg0) {}                        
     public void mousePressed(MouseEvent arg0) {}                   
     public void mouseReleased(MouseEvent arg0) {}

}
