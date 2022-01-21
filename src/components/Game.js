import React, { useEffect } from "react";
import { useState } from "react";

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
    setTroops(troops + 1 * troopMult);
    setCoins(coins + 10 * troopCoinMultiplier * troopMult);
  }

  //   AutoDeploy function
  function autoDeploy() {
    setTroops((troops) => troops + 1 * autoTroopMult);
    setCoins((coins) => coins + 10 * autoCoinMult * autoTroopMult);
  }

  // SHOP FUNCTIONS

  // Shop - buy Infirmary function
  function buyInfirmary() {
    setCoins(coins - infirmaryPrice);
    setTroopMult(troopMult + 1);
    setInfirmaryPrice(infirmaryPrice + 1000);
  }

  // Shop - buy Armory function
  function buyArmory() {
    setTroopCoinMultiplier(troopCoinMultiplier + 1);
    setCoins(coins - armoryPrice);
    setArmoryPrice(armoryPrice + 4000);
  }

  // Shop - buy AutoPower function
  function buyAutoPower() {
    setAutoCoinlMult(autoCoinMult + 0.2);
    setCoins(coins - autoPrice);
    setAutoPrice(autoPrice + 1000);
  }

  // Shop - buy Barracks
  function buyBarracks() {
    setAutoTroopMult(autoTroopMult + 1);
    setCoins(coins - barracksPrice);
    setBarracksPrice(barracksPrice * 1.5);
  }

  // RENDERING

  return (
    <div>
      <div className="manualData">
        <h2>{`soldier / deployment: ${Math.ceil(troopMult)}`}</h2>

        <h2>{`🪙 / soldier deployed: ${Math.ceil(
          troopMult * troopCoinMultiplier * 10
        )}`}</h2>
      </div>

      <div className="autoData">
        <h5>{`soldier / auto-deployment: ${Math.ceil(autoTroopMult)}`}</h5>
        <h5>{`🪙 / sec: ${Math.ceil(10 * autoCoinMult * autoTroopMult)}`}</h5>
      </div>
      <div className="playerHud">
        <h1>🪙: {coins}</h1>
        <h1>Soldiers: {troops}</h1>
        <button className="deployBtn" onClick={deployTroop}>
          Deploy
        </button>
      </div>

      {/* Item Shop Data */}
      <div className="theShop">
        <h2>Item Shop</h2>

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
            <p>{`You're auto deploy will increase by 20%`}</p>
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
  );
};

export default Game;
