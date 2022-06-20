package Quoridor;

/**A class representing the 'Options' window, and its corresponding GUI.
 * In this window, the user can adjust player settings or display settings. 
 * 
 */

import java.awt.*;
import java.awt.event.*;
import javax.swing.*;
import javax.swing.event.ChangeEvent;
import javax.swing.event.ChangeListener;
import javax.swing.JSpinner.DefaultEditor;

public class OptionsMenu extends JDialog implements SwingConstants, ActionListener{
	
	private JPanel mainPanel;
	private JButton playerSettings, displaySettings, back;
	private JDialog PlayerSettingsMenu, DisplaySettingsMenu;
	private MainMenu mainmenu;
	private GridBagLayout layout;
	private GridBagConstraints gbc;
	public int player_count;
	
	public OptionsMenu(MainMenu mainmenu) {
		this.setSize(300,328);
		this.mainmenu = mainmenu;
		layout = new GridBagLayout();
		mainPanel = new JPanel(layout);
		gbc = new GridBagConstraints(); 
        gbc.gridwidth = GridBagConstraints.REMAINDER;										//specifying constraints for the GridBagLayout used to lay out the 
        gbc.ipadx = 12;																		//components in the window GUI
        gbc.ipady = 30;
        gbc.insets = new Insets(10,0,10,0);
		playerSettings = new JButton("Player Settings");
		playerSettings.setFont(new Font("Arial",Font.PLAIN,28));
		displaySettings = new JButton("Display Settings");
		displaySettings.setFont(new Font("Arial",Font.PLAIN,28));
		back = new JButton("Back to Menu");
		back.setFont(new Font("Arial",Font.PLAIN,24));
		
		playerSettings.addActionListener(this);											//creating buttons for viewing player or display settings and for returning
		displaySettings.addActionListener(this);										//to main menu
		back.addActionListener(this);
		
		mainPanel.add(playerSettings,gbc);
		gbc.ipadx = 0;
		mainPanel.add(displaySettings,gbc);
		gbc.ipady = 10;
		mainPanel.add(back,gbc);
		getContentPane().add(mainPanel);
		setDefaultCloseOperation(WindowConstants.DO_NOTHING_ON_CLOSE);					
		setLocationRelativeTo(mainmenu);
		setResizable(false);
		setVisible(true);
	}
	
	public void actionPerformed(ActionEvent ae) {
		Object selected = ae.getSource();
		if(selected.equals(playerSettings)) {
			SpringLayout curr_layout = new SpringLayout();									//setting up player settings GUI in SpringLayout
			PlayerSettingsMenu = new JDialog(OptionsMenu.this, "Player Settings", true);
			PlayerSettingsMenu.getContentPane().setLayout(curr_layout);
			PlayerSettingsMenu.setSize(355,225);
			
			SpinnerNumberModel num_of_players = new SpinnerNumberModel(1,1,4,1);			//creating a JSpinner to choose the number of players as required
			JSpinner selector = new JSpinner(num_of_players);
			((DefaultEditor) selector.getEditor()).getTextField().setEditable(false);
			((DefaultEditor) selector.getEditor()).getTextField().setFont(new Font("Arial",Font.PLAIN,28));
			
			selector.addChangeListener(new ChangeListener() {								//listener for the JSpinner created above. It resets the player count
				public void stateChanged(ChangeEvent ce) {									//in current class when its used
					SpinnerModel num_of_players = selector.getModel();
					if(num_of_players instanceof SpinnerModel) {
						Object num = num_of_players.getValue();
						if(num instanceof Integer) { 
							OptionsMenu.this.player_count = (int) num;
							}
						}
					}
				}
			);
			
			String[] player_diff = {"Easy", "Hard"};
			JComboBox player_diff_select = new JComboBox(player_diff);
			player_diff_select.setSelectedIndex(0);											//create a dropdown for player difficulty, where user can set the
			player_diff_select.setFont(new Font("Arial",Font.PLAIN,28));					//difficulty of bots in the game
			JLabel player_count_label = new JLabel("Player Count:");
			player_count_label.setFont(new Font("Arial",Font.PLAIN,28));
			JLabel player_diff_label = new JLabel("Bot Difficulty:");
			player_diff_label.setFont(new Font("Arial",Font.PLAIN,28));
			
			PlayerSettingsMenu.getContentPane().add(player_count_label);
			PlayerSettingsMenu.getContentPane().add(selector);
			PlayerSettingsMenu.getContentPane().add(player_diff_label);
			PlayerSettingsMenu.getContentPane().add(player_diff_select);
			
			curr_layout.putConstraint(SpringLayout.WEST, player_count_label, 60, SpringLayout.WEST, this.getContentPane());		//lay out components in current
			curr_layout.putConstraint(SpringLayout.NORTH, player_count_label, 40, SpringLayout.NORTH, this.getContentPane());	//window in SpringLayout
			curr_layout.putConstraint(SpringLayout.WEST, selector, 22, SpringLayout.EAST, player_count_label);
			curr_layout.putConstraint(SpringLayout.NORTH, selector, 40, SpringLayout.NORTH, this.getContentPane());
			curr_layout.putConstraint(SpringLayout.NORTH, player_diff_label, 35, SpringLayout.SOUTH, player_count_label);
			curr_layout.putConstraint(SpringLayout.WEST, player_diff_label, 30, SpringLayout.WEST, this.getContentPane());
			curr_layout.putConstraint(SpringLayout.NORTH, player_diff_select, 30, SpringLayout.SOUTH, selector);
			curr_layout.putConstraint(SpringLayout.WEST, player_diff_select, 12, SpringLayout.EAST, player_diff_label);
			
			PlayerSettingsMenu.setLocationRelativeTo(OptionsMenu.this);
			PlayerSettingsMenu.setDefaultCloseOperation(WindowConstants.HIDE_ON_CLOSE);
			PlayerSettingsMenu.setVisible(true);
		}
		
		if(selected.equals(displaySettings)) {
			DisplaySettingsMenu = new JDialog(OptionsMenu.this, "Display Settings", true);
			DisplaySettingsMenu.setSize(300,328);
			DisplaySettingsMenu.getContentPane().setLayout(new FlowLayout(FlowLayout.CENTER,10,10));
			DisplaySettingsMenu.setLocationRelativeTo(OptionsMenu.this);
			DisplaySettingsMenu.setDefaultCloseOperation(WindowConstants.DISPOSE_ON_CLOSE);
			DisplaySettingsMenu.setVisible(true);
		}
		
		if(selected.equals(back)) { 
			updateMenuSelection();														//before this button closes the window, it calls this method to update 
			OptionsMenu.this.dispose();													//the player count and bot count in main menu 
		}
	}
	
	public int getPlayerCount() { return this.player_count; }
	
	public void setPlayerCount(int count) { this.player_count = count; }
	
	public void updateMenuSelection() {
		for(int i = 0; i < 4; i++) {mainmenu.players[i].setBackground(Color.decode("#EEEEEE"));}			//this method updates player count and bot count,
																											//and also sets up the players labels in main menu
		for(int i = 3; i >= this.player_count; i--) { mainmenu.players[i].setBackground(Color.GRAY); }		//that show the players who will be in the next match
		
		mainmenu.bots_box.setText("    "+(4-this.player_count)+"    ");
		mainmenu.player_count = this.player_count;
		mainmenu.bot_count = 4 - this.player_count;
	}
}