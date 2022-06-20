package Quoridor;

/**A class that represents the 'Load Games' menu, where the user can view the details
 * of a match and choose to resume it from a list of saved games, 
 * 
 */

import java.awt.*;
import java.awt.event.*;
import javax.swing.*;

public class LoadGameMenu extends JDialog implements SwingConstants, ActionListener, MouseListener{
	
	private JPanel mainPanel;
	private JScrollPane listPanel;
	private JDialog info;
	private MainMenu mainmenu;
	private GridBagLayout layout;
	private GridBagConstraints gbc;
	
	public LoadGameMenu(MainMenu mainmenu) {
		this.setSize(400,500);
		this.mainmenu = mainmenu;
		layout = new GridBagLayout();
		mainPanel = new JPanel(layout);
		gbc = new GridBagConstraints();
        gbc.gridwidth = GridBagConstraints.REMAINDER;
        gbc.ipadx = 150;      
        gbc.ipady = 50;
		listPanel = new JScrollPane(mainPanel, JScrollPane.VERTICAL_SCROLLBAR_ALWAYS, JScrollPane.HORIZONTAL_SCROLLBAR_NEVER);
		
		for (GameWindow game : mainmenu.games) {
			JLabel game_name = new JLabel(game.getName(),CENTER);
			game_name.setFont(new Font("Arial",Font.PLAIN,37));
			game_name.setOpaque(true);
			game_name.addMouseListener(this);
			mainPanel.add(game_name,gbc);
		}
		
		setDefaultCloseOperation(WindowConstants.DISPOSE_ON_CLOSE);					
		getContentPane().add(listPanel);
		setLocationRelativeTo(mainmenu);
		setResizable(false);
		setVisible(true);
	}
	
	public void mouseClicked(MouseEvent mev) {
		Object selected = mev.getSource();
		JLabel bots, difficulty;
		JButton resumeGame; 
		String game_name, diff;
		if(selected instanceof JLabel) {
			int game_num;
			info = new JDialog(LoadGameMenu.this, "Game Info", true);
			info.setSize(300,180);
			
			game_name = ((JLabel) selected).getText();
			game_num = Integer.parseInt(game_name.substring(game_name.length()-1))-1;
			bots = new JLabel("CPU Players: "+LoadGameMenu.this.mainmenu.games.get(game_num).getNumOfBots());
			bots.setFont(new Font("Arial",Font.PLAIN,24));
			difficulty = new JLabel("Difficulty: "+LoadGameMenu.this.mainmenu.games.get(game_num).getDifficulty());
			difficulty.setFont(new Font("Arial",Font.PLAIN,24));
			resumeGame = new JButton("Resume");
			resumeGame.setFont(new Font("Arial",Font.PLAIN,24));
			
			resumeGame.addActionListener(new ActionListener() {
				public void actionPerformed(ActionEvent aevt) {
					Object selected = aevt.getSource();
					if(selected.equals(resumeGame)) {
						LoadGameMenu.this.mainmenu.games.get(game_num).setVisible(true);
						dispose();
						}
					}
				}
			);
			
			info.getContentPane().setLayout(new FlowLayout(FlowLayout.CENTER,10,10));
			info.getContentPane().add(bots);
			info.getContentPane().add(difficulty);
			info.getContentPane().add(resumeGame);
			info.setLocationRelativeTo(LoadGameMenu.this);
			info.setDefaultCloseOperation(WindowConstants.DISPOSE_ON_CLOSE);
			info.setVisible(true);
		}
	}	
	
	public void mouseEntered(MouseEvent mev){
		Object cursorObject = mev.getSource();
		if(cursorObject instanceof JLabel) { 
			((JLabel) cursorObject).setBackground(Color.decode("#DED9EF"));
		}
	}					
	
	public void mouseExited(MouseEvent mev) {
		Object cursorObject = mev.getSource();
		if(cursorObject instanceof JLabel) { 
			((JLabel) cursorObject).setBackground(Color.decode("#EEEEEE"));
		}
	}						
	
	public void mousePressed(MouseEvent arg0) {}					
	public void mouseReleased(MouseEvent arg0) {}
	
	@Override
	public void actionPerformed(ActionEvent e) {}
}
