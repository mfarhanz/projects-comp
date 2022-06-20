package Quoridor;

import java.util.*;
import java.util.concurrent.*;
import javax.swing.*;


public class Player implements Runnable
{
	private int fenceCount;
    private String name;
    private Pawn token;
    private GameWindow game;
    
    public Player(Pawn pawn, String name, GameWindow game)
    {
        this.token = pawn;
        this.name = name;
        this.game = game;
    }
    
    public void run() {
		
	} 
    
    public int getFenceCount() { return this.fenceCount; }
    
}
