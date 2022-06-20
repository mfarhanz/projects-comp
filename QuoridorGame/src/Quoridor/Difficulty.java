package Quoridor;

import java.util.ArrayList;

public class Difficulty {
	private ArrayList<String> difficulties;
	private GameWindow game;
	private MainMenu mainmenu;
	public Difficulty(GameWindow game, MainMenu mainmenu) {
		this.game = game;
//		this.mainmenu = mainmenu;
		difficulties = new ArrayList<>();
		difficulties.add("Easy");
		difficulties.add("Hard");
	}
	public void setDifficultyInMenu(int index) {
		mainmenu.diff_select.setSelectedIndex(index);
	}
	public void easyMode(Player player) {
		//set up game in easy mode
	}
	public void hardMode(Player player) {
		//set up game in hard mode
	}
	public ArrayList<String> getDifficulties() { return this.difficulties; }
}
