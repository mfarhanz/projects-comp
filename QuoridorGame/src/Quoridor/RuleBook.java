package Quoridor;

import java.awt.BorderLayout;
import java.awt.Font;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.JTextArea;
import javax.swing.SwingConstants;
import javax.swing.JFrame;

public class RuleBook extends JFrame implements SwingConstants {
	private JPanel ruleBook;
	private JLabel ruleTitle;
	
	public RuleBook() {
		this.setSize(500, 600);
		ruleBook = new JPanel();
		JTextArea rulez = new JTextArea(
				 "GAME PLAY:\n" + 
		         "Each player in turn, chooses to move his pawn or to put up one of his fences." +
				 "When he has run out of fences, the player must move his pawn."  +
				 "\n\n"+
				 "PAWN MOVES:\n" +
				  "The pawns are moved one square at a time, horizontally or vertically, forwards or backwards, never diagonally." +
				  "The pawns must bypass the fences  If, while you move, you face your opponent's pawn you can jump over." +
				  "\n\n"+
				  "POSITIONING OF THE FENCES:\n"+
				  "The fences must be placed between 2 sets of 2 squares." +
				  "By placing fences, you force your opponent to move around it and increase the number of moves they need to make." +
				  "But be careful, you are not allowed to lock up to lock up your opponents pawn, it must always be able to reach it's goal by at least one square." +
				  "\n\n"+
				  "FACE TO FACE\n"+
				  "When two pawns face each other on neighboring squares which are not separated by a fence, the player whose turn it is can jump the opponent's pawn " +
				  "(and place himself behind him), thus advancing an extra square" + 
				  "If there is a fence behind the said pawn, the player can place his pawn to the left or the right of the other pawn." +
				  "\n\n" +
				  "END OF GAME:\n" + 
				  "The first player who reaches one of the 9 squares opposite his base line is the winner.", 40, 40
						);
		
		rulez.setFont(new Font("Sans Serif", Font.ITALIC, 14));
		rulez.setEditable(false);
		rulez.setLineWrap(true);
		rulez.setWrapStyleWord(true);
		
		ruleBook.add(rulez, BorderLayout.CENTER);
		getContentPane().setLayout(new BorderLayout());
		getContentPane().add(ruleBook);
		
		setLocationRelativeTo(null);	
		setResizable(true);
		setVisible(true);
	}
}
