package Quoridor;

/**A class that defines a square/tile on the board.
 * 
 */

import java.util.Random;
import java.awt.Color;
import javax.swing.*;

public class Square extends JButton
{
	private int xcoord, ycoord;
	Random rand = new Random();
	public Square(int xcoord, int ycoord) {
		super();
		this.xcoord = xcoord;
		this.ycoord = ycoord;
	}
	
	public void setColor() {								
		this.setBackground(Color.WHITE);
	}
	
	public Color getColor() 
	{
		return this.getColor();
	}
	
	public void switchColor() {								
		Color colour = (getBackground() == Color.DARK_GRAY) ? Color.WHITE : Color.DARK_GRAY;
		this.setBackground(colour);
	}
	
	public void legalSquares() 
	{
		
	}
	
	public boolean checkColor() {							
		return (getBackground() == Color.DARK_GRAY) ? true : false;
	}
	
	public int getXcoord() {								
		return xcoord;
	}
	
	public int getYcoord() {
		return ycoord;
	}
	
	public int getFenceNxCoord()   { return xcoord-1; }
    
    public int getFenceSxCoord()   { return xcoord+1; }
    
    public int getFenceEyCoord()   { return ycoord+1; }
    
    public int getFenceWyCoord()   { return ycoord-1; }
	
	public int getNxCoord()   { return xcoord-2; }
    
    public int getSxCoord()   { return xcoord+2; }
    
    public int getEyCoord()   { return ycoord+2; }
    
    public int getWyCoord()   { return ycoord-2; }
}

