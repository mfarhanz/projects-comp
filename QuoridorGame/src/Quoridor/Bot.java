package Quoridor;

import java.awt.Color;

public class Bot extends Player 
{
	private int fenceCount;
	private Pawn token;
	private GameWindow game;
	
	public Bot(Pawn pawn, int botNum, GameWindow game) {
		super(pawn, "Bot "+botNum, game);
		this.token = pawn;
		this.game = game;
	}
	
    public int getFenceCount() { return this.fenceCount; }

}
