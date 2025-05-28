"use client"
import { useEffect, useState } from "react"
import { Heart, Cherry, Apple, RotateCcw, Play, CircleMinus, CirclePlus, Coins } from "lucide-react"

const AdvanceLottery = () => {
  const [lifeCount, setLifeCount] = useState(3)
  const [randomId, setRandomId] = useState([2, 2, 2])
  const [gameMsg, setGameMsg] = useState(
    "Welcome to the Lottery Game! You have 3 lives. Match all three items to win a prize!",
  )
  const [amount, setAmount] = useState(50)
  const [winner, setWinner] = useState(0)
  const [totalWining, setTotalWining] = useState(0)

  const items = [
    { icon: <Cherry className="w-12 h-12 text-red-500" />, displayed: false, name: "Cherry" },
    { icon: <Apple className="w-12 h-12 text-green-500" />, displayed: false, name: "Apple" },
    { icon: <span className="text-4xl font-bold text-yellow-500">7</span>, displayed: false, name: "Seven" },
  ]

  useEffect(() => {
    if (lifeCount == 0) {
      if (winner) {
        setGameMsg(`💀 Game Over! You have won $${totalWining} .Click Reset to play again.`)
      }
    }
  }, [lifeCount, winner])

  const reset = () => {
    setGameMsg("Welcome to the Lottery Game! You have 3 lives. Match all three items to win a prize!")
    setLifeCount(3)
    setRandomId([2, 2, 2])
    setAmount(50)
    setTotalWining(0)
  }

  const generateRandomIds = () => {
    const firstDraw = Math.floor(Math.random() * 3)
    const secondDraw = Math.floor(Math.random() * 3)
    const thirdDraw = Math.floor(Math.random() * 3)
    console.log(firstDraw, secondDraw, thirdDraw)
    if (firstDraw === secondDraw && secondDraw === thirdDraw) {
        let winAmount=0
      if ( firstDraw === 2) {
        winAmount =amount * 10
        setGameMsg(`🎉 JACKPOT! You won $${winAmount}!`)
      } else {
        winAmount=amount * 4
        setGameMsg(`🎉 Congralutation! You won $${winAmount}!`)
      }
      setWinner(winAmount)
      setTotalWining((prev) => (prev) + winAmount)
    } else {
      if (lifeCount > 0) {
        setLifeCount(lifeCount - 1)
      }
    }
    setRandomId([firstDraw, secondDraw, thirdDraw])
  }

  const betAmountMinus = () => {
    if (amount > 50) setAmount(amount - 10)
  }
  const betAmountPlus = () => {
    setAmount(amount + 10)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20 max-w-md w-full">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-white mb-2">🎰 Lucky Slots</h1>
          <div className="bg-black/30 rounded-lg p-4 border border-yellow-400/30">
            <p className="text-yellow-200 text-sm leading-relaxed">{gameMsg}</p>
          </div>
        </div>

        <div className="flex justify-center gap-2 mb-6">
          <div className="bg-black/20 rounded-full px-4 py-2 border border-red-400/30">
            <div className="flex gap-1 items-center">
              <span className="text-white text-sm font-medium mr-2">Lives:</span>
              {lifeCount >= 1 && <Heart className="w-5 h-5 text-red-500 fill-red-500" />}
              {lifeCount >= 2 && <Heart className="w-5 h-5 text-red-500 fill-red-500" />}
              {lifeCount >= 3 && <Heart className="w-5 h-5 text-red-500 fill-red-500" />}
              {lifeCount === 0 && <span className="text-red-400 text-sm">💀 No lives left </span>}
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-b from-yellow-400 to-yellow-600 rounded-2xl p-6 mb-6 shadow-lg border-4 border-yellow-300">
          <div className="bg-black rounded-xl p-4">
            <div className="flex justify-center gap-2">
              {randomId.map((item, id) => (
                <div
                  key={id}
                  className="bg-white rounded-lg w-20 h-20 flex items-center justify-center shadow-inner border-2 border-gray-300 transform transition-transform duration-200 hover:scale-105"
                >
                  <div className="flex items-center justify-center">{items[item].icon}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-between mt-4 px-2">
            <div className="w-4 h-4 bg-red-500 rounded-full shadow-lg animate-pulse"></div>
            <div
              className="w-4 h-4 bg-green-500 rounded-full shadow-lg animate-pulse"
              style={{ animationDelay: "0.5s" }}
            ></div>
            <div
              className="w-4 h-4 bg-blue-500 rounded-full shadow-lg animate-pulse"
              style={{ animationDelay: "1s" }}
            ></div>
          </div>
        </div>

        <div className="bg-black/20 rounded-xl p-4 mb-6 border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <span className="text-white font-medium flex items-center gap-2">
              <Coins className="w-5 h-5 text-yellow-400" />
              Bet Amount:
            </span>
            <div className="text-2xl font-bold text-yellow-400">${amount}</div>
          </div>

          <div className="flex gap-3 justify-center mb-4">
            <button
              onClick={betAmountMinus}
              disabled={lifeCount === 0}
              className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 disabled:from-gray-500 disabled:to-gray-600 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-xl shadow-lg transform transition-all duration-200 hover:scale-105 active:scale-95 flex items-center gap-2"
            >
              BET
              <CircleMinus className="w-5 h-5" />
            </button>
            <button
              onClick={betAmountPlus}
              disabled={lifeCount === 0}
              className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 disabled:from-gray-500 disabled:to-gray-600 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-xl shadow-lg transform transition-all duration-200 hover:scale-105 active:scale-95 flex items-center gap-2"
            >
              BET
              <CirclePlus className="w-5 h-5" />
            </button>
            <button
              onClick={generateRandomIds}
              disabled={lifeCount === 0}
              className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 disabled:from-gray-500 disabled:to-gray-600 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-xl shadow-lg transform transition-all duration-200 hover:scale-105 active:scale-95 flex items-center gap-2"
            >
              <Play className="w-5 h-5" />
              Spin
            </button>
          </div>

          <button
            onClick={reset}
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg transform transition-all duration-200 hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-5 h-5" />
            Reset
          </button>
        </div>
      </div>
    </div>
  )
}

export default AdvanceLottery
