import "./App.css";
import { useState, useEffect } from 'react'


export default function App() {
  const [data, setData] = useState([])
  const [filteredPlayers, setFilteredPlayers] = useState([])
  const [timer, setTimer] = useState(null)

  const onInputChange = ({ currentTarget }) => {
    if (timer) {
      clearTimeout(timer)
      setTimer(null)
    }

    setTimer(setTimeout(() => {
      let playersPair = [];
      let tempCopy = [...data]
      for (let i = tempCopy.length - 1; i >= 0; i--) {
        const currPlayer = tempCopy.pop();
        tempCopy.forEach((player) => {
          if ((Number(player.h_in) + Number(currPlayer.h_in)) === Number(currentTarget.value)) {
            playersPair.push([`${player.first_name} ${player.last_name}`, `${currPlayer.first_name} ${currPlayer.last_name}`])
          }
        });
      }
      setFilteredPlayers(playersPair)
    }, 500))
  }

  useEffect(() => {
    fetch('https://mach-eight.uc.r.appspot.com')
      .then(res => res.json())
      .then(res => {
        if (res.values) {
          setData(res.values)
        }
      })
      .catch(err => console.log("Ups, something failed.", err))
  }, [])

  return (
    <div className="App">
      <input onChange={onInputChange} type="number" placeholder="Player height" />
      {
        filteredPlayers.length > 0 ?
          (
            <ul>
              {
                filteredPlayers.map((playersArr, idx) =>
                  <li key={`${playersArr[0]}${idx}`}>
                    <span>{playersArr[0]}</span>
                    <span>{playersArr[1]}</span>
                  </li>
                )
              }
            </ul>
          )
          :
          (<h3>Not matches found</h3>)
      }
    </div>
  );
}