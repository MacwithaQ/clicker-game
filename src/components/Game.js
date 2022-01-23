import React, { useEffect } from "react";
import { useState } from "react";
import EnemyFight from "./EnemyFight";
import purchasesound from "../assets/purchasesound.wav";
import attack from "../assets/attack.wav";

const Game = () => {
  // Setting states
  const [troops, setTroops] = useState(0);
  const [coins, setCoins] = useState(0);
  const [infirmaryPrice, setInfirmaryPrice] = useState(100);
  const [autoPrice, setAutoPrice] = useState(500);
  const [armoryPrice, setArmoryPrice] = useState(3000);
  const [barracksPrice, setBarracksPrice] = useState(5000);
  const [troopMult, setTroopMult] = useState(1);
  const [troopCoinMultiplier, setTroopCoinMultiplier] = useState(1);
  const [autoTroopMult, setAutoTroopMult] = useState(1);
  const [autoCoinMult, setAutoCoinlMult] = useState(1);
  const [troopsTillnextBattle, setTroopsTillNextBattle] = useState(300);

  let purchaseSound = new Audio(purchasesound);
  let attackSound = new Audio(attack);

  // autodeploy useEffect
  useEffect(() => {
    const interval = setInterval(autoDeploy, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [autoCoinMult, autoTroopMult]);

  // DEPLOY FUNCTIONS

  // Manual Deploy function
  function deployTroop() {
    setTroops((troops) => troops + 1 * troopMult);
    setCoins((coins) => coins + 10 * troopCoinMultiplier * troopMult);
  }

  //   AutoDeploy function
  function autoDeploy() {
    setTroops((troops) => troops + 1 * autoTroopMult);
    setCoins((coins) => coins + 10 * autoCoinMult * autoTroopMult);
  }

  // Invasion functions

  // Random multiplier
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  }

  // Attack button
  function attackEnemy() {
    setTroopsTillNextBattle(troops * getRandomInt(2, 4));
  }

  function coinSteal() {
    attackSound.play();
    setCoins((coins) => coins - 200);
  }

  // SHOP FUNCTIONS

  // Shop - buy Infirmary function
  function buyInfirmary() {
    purchaseSound.play();
    setCoins(coins - infirmaryPrice);
    setTroopMult(troopMult + 1);
    setInfirmaryPrice(infirmaryPrice + 1000);
  }

  // Shop - buy Armory function
  function buyArmory() {
    purchaseSound.play();
    setTroopCoinMultiplier(troopCoinMultiplier + 1);
    setCoins(coins - armoryPrice);
    setArmoryPrice(armoryPrice + 4000);
  }

  // Shop - buy AutoPower function
  function buyAutoPower() {
    purchaseSound.play();
    setAutoCoinlMult(autoCoinMult + 0.2);
    setCoins(coins - autoPrice);
    setAutoPrice(autoPrice + 1000);
  }

  // Shop - buy Barracks
  function buyBarracks() {
    purchaseSound.play();
    setAutoTroopMult(autoTroopMult + 1);
    setCoins(coins - barracksPrice);
    setBarracksPrice(barracksPrice * 1.5);
  }

  // HTML RENDERING

  return (
    <div>
      <div className="playerStats">
        {/* Manual Deploy Player Stats */}
        <div className="manualData">
          <h5>Deploy Stats:</h5>
          <h5>{`Warrior / Deployment: ${Math.ceil(troopMult)}`}</h5>

          <h5>{`Coins 🪙 / Warrior Deployed: ${Math.ceil(
            troopMult * troopCoinMultiplier * 10
          )}`}</h5>
        </div>

        {/* Auto Deploy Player Stats */}

        <div className="autoData">
          <h5>Auto Deploy Stats:</h5>
          <h5>{`Warrior / Sec: ${Math.ceil(autoTroopMult)}`}</h5>
          <h5>{`Coins 🪙 / Sec: ${Math.ceil(
            10 * autoCoinMult * autoTroopMult
          )}`}</h5>
        </div>
      </div>

      {/* Player Hud */}
      <div className="playerHud">
        <h3>Coins 🪙: {Math.ceil(coins)}</h3>
        <h3>Warriors: {Math.ceil(troops)}</h3>

        {/* Deploy button */}
        <button className="deployBtn" onClick={deployTroop}>
          Deploy
        </button>
      </div>

      {/* Invasion */}

      {troops >= troopsTillnextBattle && (
        <EnemyFight coinSteal={coinSteal} attackEnemy={attackEnemy} />
      )}

      {/* Item Shop Data */}
      <div className="theShop">
        <h3>Item Shop</h3>
        <div className="shopItems">
          {coins >= infirmaryPrice && (
            <div className="storeItem" onClick={buyInfirmary}>
              <h1>{`Infirmary - ${infirmaryPrice} coins`}</h1>
              <p>
                {`You have the ability to mend the wounded. This increases the morale allowing you to deploy ${
                  1 * (troopMult + 1)
                } soldiers per click.`}
              </p>
            </div>
          )}
          {coins >= autoPrice && (
            <div className="storeItem" onClick={buyAutoPower}>
              <h1>{`Auto-Deploy Power - ${autoPrice} coins`}</h1>
              <p>{`You're warriors make 20% more on auto deploy`}</p>
            </div>
          )}
          {coins >= armoryPrice && (
            <div className="storeItem" onClick={buyArmory}>
              <h1>{`Armory - ${armoryPrice} coins`}</h1>
              <p>{`You buy your troops better armor allowing them to fare better in battle. Each troop will make ${
                1 * troopCoinMultiplier
              } times more coins.`}</p>
            </div>
          )}
          {coins >= barracksPrice && (
            <div className="storeItem" onClick={buyBarracks}>
              <h1>{`Barracks - ${barracksPrice} coins`}</h1>
              <p>{`You have more housing for your troops, allowing you to deploy more troops automatically. Your troop auto-deployment is increased by ${1} extra troop per second.`}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Game;
