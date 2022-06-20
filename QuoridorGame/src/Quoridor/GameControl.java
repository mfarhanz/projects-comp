package Quoridor;

import java.util.ArrayList;
import java.util.concurrent.Semaphore;

public class GameControl {
	private ArrayList<Player> players;
	private GameWindow game;
	private Semaphore sem;
	
	public GameControl(ArrayList<Player> players, GameWindow game) {
		for(Player player : players) {
			new Thread(player).start();
		}
	}
	
	private GameControl(Player player) {}
	
}