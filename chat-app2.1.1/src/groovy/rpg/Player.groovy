package rpg

/**
 * Created with IntelliJ IDEA.
 * User: kblanchard
 * Date: 3/27/13
 * Time: 7:42 PM
 * To change this template use File | Settings | File Templates.
 */
class Player {

    def id

    Integer health = 30
    Integer defence = 3
    Integer attack = 5
    Integer speed = 2
    String nextAction
    Integer time = 0
    Integer maxTime = 100

    // instance actions
    Integer defenceBonus = 0


    Boolean isRested () {
        restTime <= 0
    }

    Integer trueDefence () {
        defence + defenceBonus
    }

    def updateTime () {
        time = time + speed
        if (time <= 0) {
            time = maxTime
        }
    }


    Boolean isAction () {
      time > 30 && time < maxTime
    }

    Boolean isCom () {
       time == 30
    }

    Boolean isDead () {
        health >= 0
    }

    String stats () {
        """
            Health : ${health}
            Rest Time : ${restTime}
            Attack Time : ${attackTime}
            Counter Time : ${counterTime}
            Is Attacking : ${isAttacking()}
            Is Com : ${isCom()}
        """
    }
}
