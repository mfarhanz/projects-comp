package Quoridor;

import javax.swing.*;
import java.util.*;
import java.awt.*;

public class Fence extends JPanel
{
	private int numFences, x, y;
	private Color c;
	private ImageIcon fence;
	
	
	public Fence() 
	{
		super();
		loadImage();
        initPanel();
        
	}
	
	private void loadImage() 
	{

        fence = new ImageIcon("fence.jpg");
    }
	
	private void initPanel() 
	{

        int w = fence.getIconWidth();
        int h = fence.getIconHeight();
        setPreferredSize(new Dimension(w, h));
    }  
	
	public void paintComponent(Graphics g) 
    {
		super.paintComponent(g);

       fence.paintIcon(this, g, 0, 0);
        
    }
	
	public void placeFence() 
	{
		
	}

	public int getNumFences() 
	{
		return numFences;
	}

	public void setNumFences(int numFences) 
	{
		this.numFences = numFences;
	}

	public int getX() 
	{
		return x;
	}

	public void setX(int x) 
	{
		this.x = x;
	}

	public int getY() {
		return y;
	}

	public void setY(int y) 
	{
		this.y = y;
	}

	public Color getC()
	{
		return c;
	}

	public void setC(Color c) 
	{
		this.c = c;
	}

}
