import React, { useEffect } from "react";
import { useState } from "react";

const Game = () => {
  const [troops, setTroops] = useState(0);
  const [coins, setCoins] = useState(0);
  const [infirmary, setInfirmary] = useState(false);
  const [coinsPers, setCoinsPers] = useState(0);
  const [infirmaryPrice, setInfirmaryPrice] = useState(100);
  const [multiplier, setMultiplier] = useState(1);
  const [intervalMult, setIntervalMult] = useState(1);
  const [autoPrice, setAutoPrice] = useState(500);

  // autodeploy useEffect
  useEffect(() => {
    const interval = setInterval(autoDeploy, 1500);
    return () => {
      clearInterval(interval);
    };
  }, [intervalMult]);

  //   AutoDeploy function
  function autoDeploy() {
    setTroops((troops) => troops + 1);
    setCoins((coins) => coins + 10 * intervalMult);
  }

  function deployTroop() {
    if (infirmary) {
      setTroops(troops + 2);
      setCoins(coins + 10 * multiplier);
    } else {
      setTroops(troops + 1);
      setCoins(coins + 10);
    }
  }

  function buyInfirmary() {
    setInfirmary(true);
    setCoins(coins - infirmaryPrice);
    setMultiplier(multiplier + 1);
    setInfirmaryPrice(infirmaryPrice + 1000);
  }

  function buyAutoPower() {
    setIntervalMult(intervalMult + 0.2);
    setCoins(coins - autoPrice);
    setAutoPrice(autoPrice + 1000);
  }

  return (
    <div>
      <h3>Coins: {coins}</h3>
      <h2>{troops}</h2>
      <button className="deployBtn" onClick={deployTroop}>
        Deploy
      </button>
      <div className="theShop">
        <h2>Item Shop</h2>
      </div>
      {coins >= infirmaryPrice && (
        <div className="storeItem" onClick={buyInfirmary}>
          <h1>{`Infirmary - ${infirmaryPrice} coins`}</h1>
          <p>
            {`You have the ability to mend the wounded. This increases the morale making each soldier make ${
              10 * multiplier
            } coins`}
          </p>
        </div>
      )}
      {coins >= autoPrice && (
        <div className="storeItem" onClick={buyAutoPower}>
          <h1>{`Auto-Deploy Power - ${autoPrice} coins`}</h1>
          <p>{`You're auto deploy will increase by 20%`}</p>
        </div>
      )}
    </div>
  );
};

export default Game;
