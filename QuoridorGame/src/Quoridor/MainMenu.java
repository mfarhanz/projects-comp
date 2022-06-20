package Quoridor;

/**A class that represents the Main Menu of the game. 
 * Here the user is able to create a new game, or load an earlier one, view the game rules
 * and adjust game settings in 'Options'.
 * 
 */

import java.awt.*;
import java.awt.event.*;
import javax.swing.*;
import javax.swing.GroupLayout.Alignment;
import javax.swing.border.BevelBorder;
import java.util.ArrayList;

public class MainMenu extends JFrame implements SwingConstants, ActionListener{
	
	private JPanel p1, p2, p3, p4, newgamePanel, mainPanel;
	private JLabel logo, bots, diff, diff_box;
	private JButton newgame, loadgame, options, quit, help;
	public JComboBox diff_select;
	public JLabel bots_box;
	public JLabel[] player_names;
	public JPanel[] players;
	public int player_count = 1, bot_count, game_count = 0;
	public ArrayList<GameWindow> games;
	
	public MainMenu() {
		this.setSize(800, 650);
		games = new ArrayList<>();
		logo = new JLabel("QUORIDOR", CENTER);
		logo.setPreferredSize(new Dimension(400,200));
		logo.setFont(new Font("Arial",Font.ITALIC,60));
		
		p1 = new JPanel();
		p2 = new JPanel();
		p3 = new JPanel();
		p4 = new JPanel();
		players = new JPanel[] {p1,p2,p3,p4};
		player_names = new JLabel[4];
		for(int i = 0; i <= 3; i++) {
			player_names[i] = new JLabel("Player "+(i+1));
			player_names[i].setFont(new Font("Arial",Font.PLAIN,27));
			players[i].add(player_names[i]);
			players[i].setBorder(BorderFactory.createLineBorder(Color.GRAY));
		}
		for(int i = 3; i >= player_count; i--) { players[i].setBackground(Color.GRAY); }
//		for(int i = 0; i <= 3; i++) { 
//			if(players[i].getBackground() == Color.GRAY) { player_names[i].setText("CPU"+i); }
//		}

//		p1_name = new JLabel("Player 1");
//		p1_name.setFont(new Font("Arial",Font.PLAIN,27));
//		p2_name = new JLabel("Player 2");
//		p2_name.setFont(new Font("Arial",Font.PLAIN,27));
//		p3_name = new JLabel("Player 3");
//		p3_name.setFont(new Font("Arial",Font.PLAIN,27));
//		p4_name = new JLabel("Player 4");
//		p4_name.setFont(new Font("Arial",Font.PLAIN,27));
		
		bot_count = 4 - player_count;
		bots = new JLabel("Bots");
		bots.setBorder(BorderFactory.createLineBorder(Color.DARK_GRAY));
		bots.setFont(new Font("Arial",Font.PLAIN,22));
		bots_box = new JLabel("    "+bot_count+"    ", CENTER);
		bots_box.setBorder(BorderFactory.createLineBorder(Color.DARK_GRAY));
		bots_box.setFont(new Font("Arial",Font.PLAIN,22));
		diff = new JLabel("Difficulty          ");
		diff.setBorder(BorderFactory.createLineBorder(Color.DARK_GRAY));
		diff.setFont(new Font("Arial",Font.PLAIN,22));
		diff_box = new JLabel(" E ", CENTER);
		diff_box.setBorder(BorderFactory.createLineBorder(Color.DARK_GRAY));
		diff_box.setFont(new Font("Arial",Font.PLAIN,22));
		
//		p1.add(p1_name);
//		p1.setBorder(BorderFactory.createLineBorder(Color.GRAY));
//		p2.add(p2_name);
//		p2.setBorder(BorderFactory.createLineBorder(Color.GRAY));
//		p3.add(p3_name);
//		p3.setBorder(BorderFactory.createLineBorder(Color.GRAY));
//		p4.add(p4_name);
//		p4.setBorder(BorderFactory.createLineBorder(Color.GRAY));
		
		newgame = new JButton("New Game");
		newgame.setFont(new Font("Arial",Font.PLAIN,36));
		loadgame = new JButton("Load Game");
		loadgame.setFont(new Font("Arial",Font.PLAIN,36));
		options = new JButton("Options");
		options.setFont(new Font("Arial",Font.PLAIN,36));
		quit = new JButton("Quit");
		quit.setFont(new Font("Arial",Font.PLAIN,26));
		
		help = new JButton("?");
		help.setFont(new Font("Arial",Font.PLAIN,23));
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
		
		newgame.addActionListener(this);
		loadgame.addActionListener(this);
		options.addActionListener(this);
		quit.addActionListener(this);
		
		String[] levels = {"Easy", "Hard"};
		diff_select = new JComboBox(levels);
		diff_select.setSelectedIndex(0);
		diff_select.setFont(new Font("Arial",Font.PLAIN,17));
		diff_select.addActionListener(this);
		
		JTextArea rules = new JTextArea(
			    "Quoridor - a simplistic strategy " +
			    "based game. Move your pawn or slow " +
			    "down your opponent by placing fences. " +
			    "First to reach the baseline opposite " +
			    "theirs wins the game.", 7, 12
			);
		rules.setFont(new Font("Sans Serif", Font.ITALIC, 20));
		rules.setBackground(Color.decode("#EEEEEE"));
		rules.setEditable(false);
		rules.setLineWrap(true);
		rules.setWrapStyleWord(true);
		
		mainPanel = new JPanel();
		newgamePanel = new JPanel();
		mainPanel.add(newgamePanel);
		getContentPane().setLayout(new BorderLayout());
		getContentPane().add(logo, BorderLayout.PAGE_START);
		getContentPane().add(mainPanel, BorderLayout.CENTER);
		
		GroupLayout button_layout = new GroupLayout(newgamePanel);
		newgamePanel.setLayout(button_layout);
		button_layout.setHorizontalGroup(button_layout.createParallelGroup(GroupLayout.Alignment.LEADING)
			.addComponent(newgame)
			.addGroup(button_layout.createSequentialGroup()
				.addComponent(bots, GroupLayout.PREFERRED_SIZE, GroupLayout.DEFAULT_SIZE, GroupLayout.PREFERRED_SIZE)
				.addComponent(bots_box, GroupLayout.PREFERRED_SIZE, GroupLayout.DEFAULT_SIZE, GroupLayout.PREFERRED_SIZE))
			.addGroup(button_layout.createSequentialGroup()
				.addComponent(diff, GroupLayout.PREFERRED_SIZE, GroupLayout.DEFAULT_SIZE, GroupLayout.PREFERRED_SIZE)
				.addComponent(diff_select, GroupLayout.PREFERRED_SIZE, GroupLayout.DEFAULT_SIZE, GroupLayout.PREFERRED_SIZE))
			);
		
		button_layout.linkSize(SwingConstants.HORIZONTAL, bots, diff);
		
		button_layout.setVerticalGroup(button_layout.createSequentialGroup()
			.addComponent(newgame)
			.addGroup(button_layout.createParallelGroup(GroupLayout.Alignment.BASELINE)
					.addComponent(bots, Alignment.LEADING, GroupLayout.PREFERRED_SIZE, GroupLayout.DEFAULT_SIZE, GroupLayout.PREFERRED_SIZE)
					.addComponent(bots_box, Alignment.TRAILING, GroupLayout.PREFERRED_SIZE, GroupLayout.DEFAULT_SIZE, GroupLayout.PREFERRED_SIZE))
			.addGroup(button_layout.createParallelGroup(GroupLayout.Alignment.BASELINE)
				.addComponent(diff, Alignment.LEADING, GroupLayout.PREFERRED_SIZE, GroupLayout.DEFAULT_SIZE, GroupLayout.PREFERRED_SIZE)
				.addComponent(diff_select, Alignment.TRAILING, GroupLayout.PREFERRED_SIZE, GroupLayout.DEFAULT_SIZE, GroupLayout.PREFERRED_SIZE))
			);
		
		GroupLayout layout = new GroupLayout(mainPanel);
		mainPanel.setLayout(layout);
		layout.setAutoCreateGaps(true);
		layout.setAutoCreateContainerGaps(true);
		layout.setHorizontalGroup(layout.createSequentialGroup()
			.addPreferredGap(LayoutStyle.ComponentPlacement.RELATED,GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
			.addGroup(layout.createParallelGroup(GroupLayout.Alignment.TRAILING)
				.addComponent(p1, Alignment.CENTER, 20, 40, 50)
				.addComponent(p3, Alignment.CENTER, 20, 40, 50)
				.addGap(20)
				.addComponent(newgamePanel))
			.addPreferredGap(LayoutStyle.ComponentPlacement.RELATED,GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
			.addGroup(layout.createParallelGroup(GroupLayout.Alignment.CENTER)
				.addComponent(p2, Alignment.CENTER, 20, 40, 50)
				.addComponent(p4, Alignment.CENTER, 20, 40, 50)
				.addGap(20)
				.addComponent(loadgame)
				.addComponent(options)
				.addComponent(quit))
			.addPreferredGap(LayoutStyle.ComponentPlacement.RELATED,GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
			.addGroup(layout.createParallelGroup(GroupLayout.Alignment.TRAILING)
				.addComponent(help)
				.addComponent(rules, Alignment.LEADING, GroupLayout.PREFERRED_SIZE, GroupLayout.DEFAULT_SIZE, GroupLayout.PREFERRED_SIZE))
			);
		
		layout.linkSize(SwingConstants.HORIZONTAL, p1,p2,p3,p4,options);
		
		layout.setVerticalGroup(layout.createSequentialGroup()
			.addGroup(layout.createParallelGroup(GroupLayout.Alignment.LEADING)
				.addGroup(layout.createSequentialGroup()
					.addComponent(p1, 20, 40, 50)
					.addComponent(p3, 20, 40, 50))
				.addGroup(layout.createSequentialGroup()
					.addComponent(p2, 20, 40, 50)
					.addComponent(p4, 20, 40, 50))
				.addComponent(help))
			.addGroup(layout.createParallelGroup(GroupLayout.Alignment.LEADING)
				.addGroup(layout.createSequentialGroup()
					.addGap(20)
					.addComponent(newgamePanel))
				.addGroup(layout.createSequentialGroup()
					.addGap(20)
					.addComponent(loadgame)
					.addComponent(options)
					.addComponent(quit))
				.addGroup(layout.createSequentialGroup()
					.addComponent(rules, GroupLayout.PREFERRED_SIZE, GroupLayout.DEFAULT_SIZE, GroupLayout.PREFERRED_SIZE)))
			);
		
		setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);					
		setLocationRelativeTo(null);	
		setResizable(false);
		setVisible(true);
	}
	
	public void actionPerformed(ActionEvent ae) {
		Object selected = ae.getSource();
		if(selected.equals(newgame)) {
			game_count++;
			GameWindow game = new GameWindow(17, 17, MainMenu.this);
			MainMenu.this.setVisible(false);
		}
		
		if(selected.equals(loadgame)) { 
			LoadGameMenu savesmenu = new LoadGameMenu(MainMenu.this); 
		}
		
		if(selected.equals(options)) {
			OptionsMenu settingsmenu = new OptionsMenu(MainMenu.this);
		}
		
		if(selected.equals(quit)) {
			System.exit(0);
		}
	}
}
