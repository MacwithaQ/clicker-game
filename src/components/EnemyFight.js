import React from "react";
import { useEffect } from "react";
import orc from "../assets/orc.png"

const EnemyFight = ({ attackEnemy, coinSteal }) => {
  useEffect(() => {
    const interval = setInterval(coinSteal, 2000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="attackEvent">
      <h2>
        Enemy orcs are raiding your coin reserve, attack or lose 200 coins every
        2 seconds!
      </h2>
      <img className="enemyPic" src="https://pngimg.com/uploads/orc/orc_PNG22.png" alt=""></img>
      <button className="deployBtn" onClick={attackEnemy}>
        Attack Invading Troops
      </button>
    </div>
  );
};

export default EnemyFight;
