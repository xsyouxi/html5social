package rpg

/**
 * Created with IntelliJ IDEA.
 * User: kblanchard
 * Date: 3/28/13
 * Time: 1:11 PM
 * To change this template use File | Settings | File Templates.
 */
class Game {

    def random

    def processPlayer (player) {
        player.updateTime()
        if (player.isCom()) {
            def move = getMove()
            player.nextAction = move
        } else if (!player1.isResting()) {
            def action = player1.getNextAction()
            makeMove(move, player1, player2)
        }
    }

    def start () {
        random = new Random()
        def player1 = new Player(id:  "player1")
        def player2 = new Player(id:  "player2")

        Boolean done = false
        println "Starting Game"
        while (!done) {
           processPlayer(player1)
           processPlayer(player2)
           if (player1.isDead() || player2.isDead()) {
                done = true
           }
        }
        println "Game Over"
        println player1.stats()
        println player2.stats()

    }

    def makeMove (move, source, target) {
        switch (move)  {
            case "attack":
                attack(source, target)
            case "defend":
                source.defendBonus = 10
            case "counter":
                counterAttack(source, target)
        }
    }

    def getMove () {
        def move = random.nextInit(3)
        if (move == 3) {
            return "attack"
        } else if (move == 2) {
            return "counter"
        }
        else if (move == 3) {
            return "defend"
        }
    }

    def attack (source, target) {
        target.health = target.health - (source.attack - target.trueDefence())
        target.defenceBonus = 0

    }

    def counterAttack (source, target) {
        def health
        health = target.health - (source.attack - target.trueDefence())
        target.health = health / 2
        target.attackTime = target.attackMax
    }

}
