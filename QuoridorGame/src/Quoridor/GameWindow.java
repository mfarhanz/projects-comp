package Quoridor;

/**This class represents the game GUI, with the game board, fences and player pawns.
 * 
 */

import java.awt.*;
import java.awt.event.*;
import javax.swing.*;
import javax.swing.GroupLayout.Alignment;
import javax.swing.border.EtchedBorder;
import java.util.*;

public class GameWindow extends JFrame implements SwingConstants, ActionListener, MouseListener{
	
	private JPanel centerPanel, fencePanel, p1, p2, p3, p4;				
	private JLabel fenceCounter, p1_fences, p2_fences, p3_fences, p4_fences, p1_name, p2_name, p3_name, p4_name;
	private JButton savegame, options, help, putFence;
	public Square [][] gridSquares;
	private int rows, columns, bot_count, p1_fence_ctr = 5, p2_fence_ctr = 5, p3_fence_ctr = 5, p4_fence_ctr = 5;
	private String name, difficulty;
	private MainMenu mainmenu;
	private Pawn pawn1, pawn2, pawn3, pawn4;
	private Player player1, player2, player3, player4;
	private int xcoord1, xcoord2, xcoord3, xcoord4, ycoord1, ycoord2, ycoord3, ycoord4;
	
	public ArrayList<Pawn> pawnList;
	public ArrayList<Player> playerList;
	
	final static boolean shouldFill = true;
    final static boolean shouldWeightX = true;
    final static boolean RIGHT_TO_LEFT = false;
	
	public GameWindow(int rows, int columns, MainMenu mainmenu) {
		this.rows = rows;
		this.columns = columns;
		this.setSize(1280,800);
		this.mainmenu = mainmenu;
		this.name = "Game "+mainmenu.game_count;
		this.bot_count = mainmenu.bot_count;													//Set the number of bots for current game as specified in main menu
		this.difficulty = (String) mainmenu.diff_select.getItemAt(mainmenu.diff_select.getSelectedIndex()); //Sets game difficulty as selected in main menu
		
		
		fencePanel = new JPanel(new FlowLayout(FlowLayout.CENTER,5,9));
		fencePanel.setBorder(BorderFactory.createLineBorder(Color.BLACK, 2));
		
		
		p1 = new JPanel();
		p2 = new JPanel();
		p3 = new JPanel();
		p4 = new JPanel();
		
		p1_name = new JLabel("Player 1");
		p1_name.setFont(new Font("Arial",Font.PLAIN,27));										//These panels represent the player names in the current game
		p2_name = new JLabel("Player 2");														//and also lets user know who is making their turn
		p2_name.setFont(new Font("Arial",Font.PLAIN,27));
		p3_name = new JLabel("Player 3");
		p3_name.setFont(new Font("Arial",Font.PLAIN,27));
		p4_name = new JLabel("Player 4");
		p4_name.setFont(new Font("Arial",Font.PLAIN,27));
		
		fenceCounter = new JLabel("Fence Counter");
		fenceCounter.setFont(new Font("Arial",Font.BOLD,21));
		p1_fences = new JLabel("Player 1 : "+p1_fence_ctr);										//A panel that displays the number of fences available to each
		p1_fences.setFont(new Font("Arial",Font.PLAIN,22));										//player in current game
		p2_fences = new JLabel("Player 2 : "+p2_fence_ctr);
		p2_fences.setFont(new Font("Arial",Font.PLAIN,22));
		p3_fences = new JLabel("Player 3 : "+p3_fence_ctr);
		p3_fences.setFont(new Font("Arial",Font.PLAIN,22));
		p4_fences = new JLabel("Player 4 : "+p4_fence_ctr);
		p4_fences.setFont(new Font("Arial",Font.PLAIN,22));
		
		//create buttons to place fence, view help box, view display settings
		//and to save and return to the main menu
		putFence = new JButton("Place Fence");
		putFence.setFont(new Font("Arial",Font.TRUETYPE_FONT,32));
		
		ImageIcon fence = new ImageIcon("src/Quoridor/fence.png");
		ImageIcon fence1 = new ImageIcon("src/Quoridor/fence1.png");
		JLabel label = new JLabel(fence); 
		JLabel label1 = new JLabel(fence1); 
//		DragMouseAdapter listener = new DragMouseAdapter(); 
		
//		label.addMouseListener(listener);
		label.setTransferHandler(new TransferHandler("icon"));
		label1.setTransferHandler(new TransferHandler("icon"));
		
		label.addMouseListener(this);
		label1.addMouseListener(this);

		int w = fence.getIconWidth();
        int h = fence.getIconHeight();
//      setPreferredSize(new Dimension(w, h));
        
		savegame = new JButton("Save and Return");											
		savegame.setFont(new Font("Arial",Font.PLAIN,24));
		
		options = new JButton("Options");
		options.setFont(new Font("Arial",Font.BOLD,18));
		
		help = new JButton("?");
		help.setFont(new Font("Arial",Font.BOLD,19));
		help.addActionListener(new ActionListener() 
		{
			public void actionPerformed(ActionEvent aevnt) 
			{
				Object selected = aevnt.getSource();
				if ( selected.equals(help) ) 
				{
					RuleBook instructions = new RuleBook();
				}
			}
		}
		);
		
		savegame.addActionListener(this);
		
		p1.add(p1_name);
		p1.setBorder(BorderFactory.createEtchedBorder(EtchedBorder.LOWERED, Color.GRAY, Color.GRAY));			
		p2.add(p2_name);
		p2.setBorder(BorderFactory.createEtchedBorder(EtchedBorder.LOWERED, Color.GRAY, Color.GRAY));
		p3.add(p3_name);
		p3.setBorder(BorderFactory.createEtchedBorder(EtchedBorder.LOWERED, Color.GRAY, Color.GRAY));
		p4.add(p4_name);
		p4.setBorder(BorderFactory.createEtchedBorder(EtchedBorder.LOWERED, Color.GRAY, Color.GRAY));	
		
		fencePanel.add(p1_fences);
		fencePanel.add(p2_fences);
		fencePanel.add(p3_fences);
		fencePanel.add(p4_fences);
		
		//sets up the game board, arranged in a GridLayout and adds a listener
		//to each tile to record player moves
		
		//centerPanel = new JPanel(new GridLayout(rows, columns));	
		centerPanel = new JPanel(new GridBagLayout());
		centerPanel.setPreferredSize(new Dimension(800,800));
		
		gridSquares = new Square[columns][rows];
		for(int y = 0; y < columns; y++) 
		{
			for(int x = 0; x < rows; x++) 
			{													
				gridSquares[x][y] = new Square(x,y);
				gridSquares[x][y].setColor();							
				gridSquares[x][y].setOpaque(true);
				gridSquares[x][y].setBorder(BorderFactory.createLineBorder(Color.black));
				//gridSquares[x][y].addMouseListener(this);		
				gridSquares[x][y].setLayout(new BorderLayout());
				GridBagConstraints constraint = new GridBagConstraints();
				if (shouldFill)
				{
				    //natural height, maximum width
				    constraint.fill = GridBagConstraints.BOTH;
				}
				constraint.gridwidth = 1;
				constraint.gridheight = 1;
				if( x % 2 > 0 ) 
				{
					//constraint.fill = GridBagConstraints.BOTH;
					constraint.ipadx = 5;
					//constraint.ipady = 5;
					constraint.gridx = x;
					constraint.gridy = y;
					constraint.weightx = 0;
					constraint.weighty = 0;
					constraint.insets = new Insets(0,0,0,0);
					Dimension prefDim = new Dimension(gridSquares[x][y].getBounds().width, gridSquares[x][y].getBounds().height); 
					gridSquares[x][y].setFocusable(false);
					gridSquares[x][y].setTransferHandler(new TransferHandler("icon"));
					gridSquares[x][y].setPreferredSize(prefDim);
				}
				else if( y % 2 > 0 )
				{
					//constraint.ipadx = 5;
					//constraint.fill = GridBagConstraints.BOTH;
					constraint.ipady = 5;
					constraint.gridx = x;
					constraint.gridy = y;
					constraint.weightx = 0;
					constraint.weighty = 0;
					constraint.insets = new Insets(0,0,0,0);
					Dimension prefDim = new Dimension(gridSquares[x][y].getBounds().width, gridSquares[x][y].getBounds().height); 
					gridSquares[x][y].setFocusable(false);
					gridSquares[x][y].setTransferHandler(new TransferHandler("icon"));
					gridSquares[x][y].setPreferredSize(prefDim);
				}
				else 
					{
							constraint.ipadx = 5;
							constraint.ipady = 5;
							constraint.gridx = x;
							constraint.gridy = y;
							constraint.weightx = 0.5;
							constraint.weighty = 0.5;
					}

				centerPanel.add(gridSquares[x][y], constraint);
			}
		}
		
		ArrayList<Pawn>  pawnList= new ArrayList<Pawn>(4);
		ArrayList<Player>  playerList= new ArrayList<Player>(4);
		
		//Create and add pawns to the board
		xcoord1 = gridSquares[16][8].getXcoord();
		ycoord1 = gridSquares[16][8].getYcoord();
		pawn1 = new Pawn(xcoord1, ycoord1, 60, 60, Color.red);
		pawn1.addMouseListener(this);
		gridSquares[16][8].add(pawn1, BorderLayout.CENTER);
		pawnList.add(pawn1);
		        
		xcoord2 = gridSquares[0][8].getXcoord();
		ycoord2 = gridSquares[0][8].getYcoord();
		pawn2  = new Pawn(xcoord2, ycoord2, 60, 60, Color.blue);
		pawn2.addMouseListener(this);
		gridSquares[0][8].add(pawn2, BorderLayout.CENTER);
		pawnList.add(pawn2);
		        
		xcoord3 = gridSquares[8][16].getXcoord();
		ycoord3 = gridSquares[8][16].getYcoord();
		pawn3 = new Pawn(xcoord3,  ycoord3, 60, 60, Color.yellow);
		pawn3.addMouseListener(this);
		gridSquares[8][16].add(pawn3, BorderLayout.CENTER);
		pawnList.add(pawn3);
		        
		xcoord4 = gridSquares[8][0].getXcoord();
		ycoord4 = gridSquares[8][0].getYcoord();
		pawn4 = new Pawn(xcoord4, ycoord4, 60, 60, Color.green);
		pawn4.addMouseListener(this);
		gridSquares[8][0].add(pawn4, BorderLayout.CENTER);
		pawnList.add(pawn4);
		createLayout(label, label1);
		
		setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);					
		setLocationRelativeTo(null);	
		setResizable(true);
		setVisible(true);
	}
	
	private void createLayout(JComponent... arg) 
	{
		GroupLayout layout = new GroupLayout(getContentPane());
		getContentPane().setLayout(layout);													//sets up the window GUI using GroupLayout
		layout.setAutoCreateGaps(true);
		layout.setAutoCreateContainerGaps(true); 
		layout.setHorizontalGroup(layout.createSequentialGroup()
			.addGroup(layout.createParallelGroup(GroupLayout.Alignment.CENTER)
				.addComponent(savegame)
				.addGap(260)
				.addComponent(fenceCounter)
				.addComponent(fencePanel, Alignment.CENTER, 70, 120, 150))
			.addComponent(centerPanel)
			.addGroup(layout.createParallelGroup(GroupLayout.Alignment.TRAILING)
				.addGroup(layout.createSequentialGroup()
					.addComponent(options)
					.addComponent(help))
				.addGroup(layout.createParallelGroup(GroupLayout.Alignment.LEADING)
					.addGap(100)
					.addComponent(p1, Alignment.CENTER, GroupLayout.PREFERRED_SIZE, GroupLayout.DEFAULT_SIZE, GroupLayout.PREFERRED_SIZE)
					.addGap(20)
					.addComponent(p2, Alignment.CENTER, GroupLayout.PREFERRED_SIZE, GroupLayout.DEFAULT_SIZE, GroupLayout.PREFERRED_SIZE)
					.addGap(20)
					.addComponent(p3, Alignment.CENTER, GroupLayout.PREFERRED_SIZE, GroupLayout.DEFAULT_SIZE, GroupLayout.PREFERRED_SIZE)
					.addGap(20)
					.addComponent(p4, Alignment.CENTER, GroupLayout.PREFERRED_SIZE, GroupLayout.DEFAULT_SIZE, GroupLayout.PREFERRED_SIZE)
					.addGap(90)
					.addComponent(putFence, Alignment.CENTER)
					.addGap(20)
					.addComponent(arg[0], GroupLayout.DEFAULT_SIZE, GroupLayout.DEFAULT_SIZE, Integer.MAX_VALUE)
					.addGap(20)
					.addComponent(arg[1], GroupLayout.DEFAULT_SIZE, GroupLayout.DEFAULT_SIZE, Integer.MAX_VALUE)))
				);
		
		layout.setVerticalGroup(layout.createSequentialGroup()
			.addGroup(layout.createParallelGroup(GroupLayout.Alignment.BASELINE)
				.addComponent(savegame)
				.addComponent(options)
				.addComponent(help))
			.addGroup(layout.createParallelGroup(GroupLayout.Alignment.LEADING)
				.addGroup(layout.createSequentialGroup()
					.addGap(260)
					.addComponent(fenceCounter)
					.addComponent(fencePanel, 70, 120, 150))
				.addComponent(centerPanel)
				.addGroup(layout.createSequentialGroup()
					.addGap(100)
					.addComponent(p1, GroupLayout.PREFERRED_SIZE, GroupLayout.DEFAULT_SIZE, GroupLayout.PREFERRED_SIZE)
					.addGap(20)
					.addComponent(p2, GroupLayout.PREFERRED_SIZE, GroupLayout.DEFAULT_SIZE, GroupLayout.PREFERRED_SIZE)
					.addGap(20)
					.addComponent(p3, GroupLayout.PREFERRED_SIZE, GroupLayout.DEFAULT_SIZE, GroupLayout.PREFERRED_SIZE)
					.addGap(20)
					.addComponent(p4, GroupLayout.PREFERRED_SIZE, GroupLayout.DEFAULT_SIZE, GroupLayout.PREFERRED_SIZE)
					.addGap(120)
					.addComponent(putFence)
					.addGap(20)
					.addComponent(arg[0])
					.addGap(20)
					.addComponent(arg[1])))
			);
	}
	
	@Override
	public String getName() { return this.name; }											//returns name of the current match, as "Game" followed by the match no.
	
	public int getNumOfBots() { return this.bot_count; }									//returns number of bots in current game
	
	public String getDifficulty() { return this.difficulty; }								//returns the current game's difficulty
		
	 public void mouseClicked(MouseEvent mevt) {    
	        Object selected = mevt.getSource();      
	        
	        if(selected instanceof Pawn) 
	        {
	            Pawn pawn = (Pawn) selected;
	            
	            try
	            {
	                int north = pawn.getNxCoord();
	                int tempY = pawn.getY();
	                Square northSquare = gridSquares[north][tempY];
	                northSquare.switchColor();
	                
	                northSquare.addMouseListener(new MouseListener()
	                		{
	                			public void mouseClicked(MouseEvent msevt) 
	                			{
	                				Object slcted = msevt.getSource();
	                				
	                				if(slcted instanceof Square) 
	                				{
	                					Square square = (Square) slcted;
	                					int tempX = pawn.getX();
	                					int tempY = pawn.getY();
	                					
	                					legalMoves(pawn);
	                				
	                					int south = square.getSxCoord();
	                					
	                					gridSquares[south][tempY].remove(pawn);
	                					pawn.movePawn(square);
	                					repaint();
	                					
	                					
	                					tempX = square.getXcoord();
	                					tempY = square.getYcoord();
	                					
	                					pawn.setX(tempX);
	                					pawn.setY(tempY);
	                				}
	                			}

	                			public void mouseEntered(MouseEvent arg0){}					
	                			public void mouseExited(MouseEvent arg0) {}						
	                			public void mousePressed(MouseEvent arg0) {}					
	                			public void mouseReleased(MouseEvent arg0) {}
	                	
	                		}
	                		);
	            }
				catch(ArrayIndexOutOfBoundsException i){}
				
				try
	            {
	                int south = pawn.getSxCoord();
	                int tempY = pawn.getY();
	                Square southSquare = gridSquares[south][tempY];
	                southSquare.switchColor();
	                
	                southSquare.addMouseListener(new MouseListener()
	        		{
	        			public void mouseClicked(MouseEvent msevt) 
	        			{
	        				Object slcted = msevt.getSource();
	        				
	        				if(slcted instanceof Square) 
	        				{
	        					Square square = (Square) slcted;
	        					
	        					int tempX = pawn.getX();
	        					int tempY = pawn.getY();
	        					
	        					
	        					legalMoves(pawn);
	        					
	            				int north = square.getNxCoord();
	        					
	        	                
	        					gridSquares[north][tempY].remove(pawn);
	        					pawn.movePawn(square);
	        					repaint();
	        					
	        					tempX = square.getXcoord();
	        					tempY = square.getYcoord();
	        					
	        					pawn.setX(tempX);
	        					pawn.setY(tempY);
	        						
	        				}
	        			}

	        			public void mouseEntered(MouseEvent arg0){}					
	        			public void mouseExited(MouseEvent arg0) {}						
	        			public void mousePressed(MouseEvent arg0) {}					
	        			public void mouseReleased(MouseEvent arg0) {}
	        	
	        		}
	        		);
	            }
				catch(ArrayIndexOutOfBoundsException i){}
				
				try
	            {
	                int east = pawn.getEyCoord();
	                int tempX = pawn.getX();
	                Square eastSquare = gridSquares[tempX][east];
	                eastSquare.switchColor();
	                
	                eastSquare.addMouseListener(new MouseListener()
	        		{
	        			public void mouseClicked(MouseEvent msevt) 
	        			{
	        				Object slcted = msevt.getSource();
	        				
	        				if(slcted instanceof Square) 
	        				{
	        					Square square = (Square) slcted;
	        					
	        					
	        					int tempX = pawn.getX();
	        					int tempY = pawn.getY();
	        					
	        					legalMoves(pawn);
	        					
	            				int west = square.getWyCoord();
	        					
	        					
	        					gridSquares[tempX][west].remove(pawn);
	        					pawn.movePawn(square);
	        					repaint();
	        					
	        					tempX = square.getXcoord();
	        					tempY = square.getYcoord();
	        					
	        					pawn.setX(tempX);
	        					pawn.setY(tempY);
	        					
	        				}
	        			}
	        			

	        			public void mouseEntered(MouseEvent arg0){}					
	        			public void mouseExited(MouseEvent arg0) {}						
	        			public void mousePressed(MouseEvent arg0) {}					
	        			public void mouseReleased(MouseEvent arg0) {}
	        	
	        		}
	        		);
	            }
				catch(ArrayIndexOutOfBoundsException i){}
				
				try
	            {
	                int west = pawn.getWyCoord();
	                int tempX = pawn.getX();
	                Square westSquare = gridSquares[tempX][west];
	                westSquare.switchColor();
	                
	                westSquare.addMouseListener(new MouseListener()
	        		{
	        			public void mouseClicked(MouseEvent msevt) 
	        			{
	        				Object slcted = msevt.getSource();
	        				int tempX = pawn.getX();
	    					int tempY = pawn.getY();
	        				
	        				if(slcted instanceof Square) 
	        				{
	        					Square square = (Square) slcted;
	        					
	        					
	        					legalMoves(pawn);
	        					
	            				int east = square.getEyCoord();
	        					
	        					
	        					gridSquares[tempX][east].remove(pawn);
	        					pawn.movePawn(square);
	        					repaint();
	        					
	        					tempX = square.getXcoord();
	        					tempY = square.getYcoord();
	        					
	        					pawn.setX(tempX);
	        					pawn.setY(tempY); 
	            				
	        				}
	        			}

	        			public void mouseEntered(MouseEvent arg0){}					
	        			public void mouseExited(MouseEvent arg0) {}						
	        			public void mousePressed(MouseEvent arg0) {}					
	        			public void mouseReleased(MouseEvent arg0) {}
	        	
	        		}
	        		);
	            }
				catch(ArrayIndexOutOfBoundsException i){}
				pawn.setmoveMade(true);
	             if(pawn1.getmoveMade()==true)
	             {
	            	 pawn1.removemouse();
	            	 pawn1.setmoveMade(false);	                                        
	            	 pawn2.addMouseListener(this);
	            	 }
	             else if(pawn2.getmoveMade()==true)
	             {
	            	 pawn2.removemouse();
	            	 pawn2.setmoveMade(false);
	            	 pawn3.addMouseListener(this);
	            	 }
	             else if(pawn3.getmoveMade()==true)
	             {
	            	 pawn3.removemouse();
	            	 pawn3.setmoveMade(false);
	            	 pawn4.addMouseListener(this);
	            	 }
	             else if(pawn4.getmoveMade()==true)
	             {
	            	 pawn4.removemouse();
	            	 pawn4.setmoveMade(false);
	            	 pawn1.addMouseListener(this);
	            	 }
			}
		}
	    
	public void legalMoves(Pawn pawn)
	{
		int tempX = pawn.getX();
		int tempY = pawn.getY();
		
		try
        {
			int east = pawn.getEyCoord();
			gridSquares[tempX][east].switchColor();
        }
		catch(ArrayIndexOutOfBoundsException i){}
		
			
		try
        {
			int west = pawn.getWyCoord();
			gridSquares[tempX][west].switchColor();
        }
		catch(ArrayIndexOutOfBoundsException i){}
		
		
		try
        {
			int north = pawn.getNxCoord();
			gridSquares[north][tempY].switchColor();
        }
		catch(ArrayIndexOutOfBoundsException i){}
		
		try
        {
			int south = pawn.getSxCoord();
			gridSquares[south][tempY].switchColor();
        }
		catch(ArrayIndexOutOfBoundsException i){}
	}
	
	public void actionPerformed(ActionEvent aevt) 
	{
		Object selected = aevt.getSource();
		if(selected.equals(savegame)) {
			if(mainmenu.games.contains(GameWindow.this)==false) { mainmenu.games.add(GameWindow.this); }		//here, when a match is saved, it gets added to
			mainmenu.setVisible(true);																			//a list of saved games in MainMenu
			dispose();
		}
	}
	
	public void mousePressed(MouseEvent e) 
	{
		try 
		{
		JComponent c = (JComponent) e.getSource();
		TransferHandler handler = c.getTransferHandler();
		handler.exportAsDrag(c, e, TransferHandler.COPY);
		}
		catch(NullPointerException i) {}
	}
	
	 private class DragMouseAdapter extends MouseAdapter 
	 {
	        public void mousePressed(MouseEvent e) 
	        {
	            JComponent c = (JComponent) e.getSource();
	            TransferHandler handler = c.getTransferHandler();
	            handler.exportAsDrag(c, e, TransferHandler.COPY);
	        }
	 }
	 public void mouseEntered(MouseEvent arg0){}					
	 public void mouseExited(MouseEvent arg0) {}						
	 public void mouseReleased(MouseEvent arg0) {}	
	
	 
}