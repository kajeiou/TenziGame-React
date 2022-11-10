import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import De from './components/De/De'
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
export default function App() {
  const [count,setCount]= useState({count:0});
  const [dices, setDices]= useState(init());
  const [winned, setWinned]= useState(false);
  const [selectedValue, setSelectedValue ] = useState(0)
  const [allScores, setAllScores] = useState([])

  function init() {

    let dicesRandom = []

    for (let i = 0; i < 10; i++) {
      dicesRandom.push({value: Math.floor(Math.random() * (6 - 1) + 1), validated :false})
    }

    return dicesRandom
  }

  function incrementScore() {
    setCount(prevCount => {
      return {
        count : prevCount.count + 1
      }
    }) 
    toast.info("+1 score : "+ (count.count+1))
      
  }
  function verifGame() {
    let total=0;
    for(let i=0;i<dices.length;i++) {
      if(dices[i].value === selectedValue && dices[i].validated === true) {
        total++
      }
    }
    if(total === dices.length) {
      setWinned(true)
      return true
    }
    else {
      setWinned(false)
      return false
    }
    
  }

  function launchDices() {
    if(selectedValue>0) {
      let dicesRandom = [...dices]
    
      for(let i=0;i<dicesRandom.length;i++) {
        if(!dicesRandom[i].validated || dicesRandom[i].value !== selectedValue) {
          dicesRandom[i].validated = false
          dicesRandom[i].value = Math.floor(Math.random() * (6 - 1) + 1)
        }
      }
      
      if(!winned) {
        changeDices(dicesRandom)
        incrementScore()
      }
      else {
        toast.warning("Tu as déjà terminé la partie.")
      }
    }
    else {
      toast.warning("Sélectionne d'abord un dé de départ")
    }
    
  }
  function addScore(newScore) {
    setAllScores([...allScores, newScore ])
}

  function changeDices(newDices) {
    setDices(newDices) 
  }
  function setValidatedDice(index) {
    let dicesRandom = [...dices]
    dicesRandom[index].validated = true
    changeDices(dicesRandom)
  }
  
  
  function deClicked(index) {
    if(!selectedValue) {
      toast.info("Votre dé choisi est "+ dices[index].value)
      setSelectedValue(dices[index].value)
      setValidatedDice(index)
    }
    else {
      setValidatedDice(index)
      verifGame()
      if(verifGame()) {
        let find = false
        for(let i=0;i<allScores.length;i++) {
          if(count.count == allScores[i]) {
            find = true
            break
          }
        }
        if(!find) {
          addScore(count.count)
          toast.success("Bravo ! tu as terminé la partie !")
        }
      }


    }
    verifGame()
    if(winned) {
      let find = false
      for(let i=0;i<allScores.length;i++) {
        if(count.count == allScores[i]) {
          find = true
          break
        }
      }
      if(!find) {
        addScore(count.count)
        toast.success("Bravo ! tu as terminé la partie !")
      }
      else {
        toast.info("Rejouez pour battre votre record !")
      }
    }
    
  }
  function replay() {

    setWinned(false) ;
    setSelectedValue(0)
    setCount({count : 0}) 
    setDices(init())


  }
  
  useEffect(() => {
  }, [dices])

    return (
      
      <div className="App" >
        <ToastContainer />
        <div className="card text-center">
          <div className="card-header">
            Fait par Nabil Kajeiou
          </div>
          <div className="card-body">
            <h5 className="card-title">
              Jeu de Tenzi
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-controller" viewBox="0 0 16 16">
                <path d="M11.5 6.027a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zm-1.5 1.5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1zm2.5-.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zm-1.5 1.5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1zm-6.5-3h1v1h1v1h-1v1h-1v-1h-1v-1h1v-1z"/>
                <path d="M3.051 3.26a.5.5 0 0 1 .354-.613l1.932-.518a.5.5 0 0 1 .62.39c.655-.079 1.35-.117 2.043-.117.72 0 1.443.041 2.12.126a.5.5 0 0 1 .622-.399l1.932.518a.5.5 0 0 1 .306.729c.14.09.266.19.373.297.408.408.78 1.05 1.095 1.772.32.733.599 1.591.805 2.466.206.875.34 1.78.364 2.606.024.816-.059 1.602-.328 2.21a1.42 1.42 0 0 1-1.445.83c-.636-.067-1.115-.394-1.513-.773-.245-.232-.496-.526-.739-.808-.126-.148-.25-.292-.368-.423-.728-.804-1.597-1.527-3.224-1.527-1.627 0-2.496.723-3.224 1.527-.119.131-.242.275-.368.423-.243.282-.494.575-.739.808-.398.38-.877.706-1.513.773a1.42 1.42 0 0 1-1.445-.83c-.27-.608-.352-1.395-.329-2.21.024-.826.16-1.73.365-2.606.206-.875.486-1.733.805-2.466.315-.722.687-1.364 1.094-1.772a2.34 2.34 0 0 1 .433-.335.504.504 0 0 1-.028-.079zm2.036.412c-.877.185-1.469.443-1.733.708-.276.276-.587.783-.885 1.465a13.748 13.748 0 0 0-.748 2.295 12.351 12.351 0 0 0-.339 2.406c-.022.755.062 1.368.243 1.776a.42.42 0 0 0 .426.24c.327-.034.61-.199.929-.502.212-.202.4-.423.615-.674.133-.156.276-.323.44-.504C4.861 9.969 5.978 9.027 8 9.027s3.139.942 3.965 1.855c.164.181.307.348.44.504.214.251.403.472.615.674.318.303.601.468.929.503a.42.42 0 0 0 .426-.241c.18-.408.265-1.02.243-1.776a12.354 12.354 0 0 0-.339-2.406 13.753 13.753 0 0 0-.748-2.295c-.298-.682-.61-1.19-.885-1.465-.264-.265-.856-.523-1.733-.708-.85-.179-1.877-.27-2.913-.27-1.036 0-2.063.091-2.913.27z"/>
              </svg>
              </h5>
            <p className="card-text">L'objectif du jeu est d'obtenir le même nombre sur les 10 dés</p>
              
            {(count.count>0) ? 
              <button className='btn btn-info text-white' onClick={replay}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-clockwise" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
                <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
              </svg>
              Recommencer</button>
              :<br/>
            }
            
            
          </div>
          <div className="card-footer text-muted">
            Votre score actuel {count.count}
          </div>
        </div>

        <br/>
        <button className='btn w-50 btn-success' onClick={launchDices}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-dice-3" viewBox="0 0 16 16">
          <path d="M13 1a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h10zM3 0a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V3a3 3 0 0 0-3-3H3z"/>
          <path d="M5.5 4a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm8 8a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm-4-4a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
        </svg>
          Lancer les dés</button>
        <br/>
        
    
        <br/>

        <div style={{display: "inline-block"}}>

          {dices.map((element, i) => {   

            return (element.validated) ?(
              <div className='test'>
                <button className="btn btn-success" onClick={() => deClicked(i)}>
                  <De key={i} De={element} validated={element.validated} ></De>
                  
                </button>
              </div>
            ) : (
              <div className='test'>
                <button className="btn btn-light" onClick={() => deClicked(i)}>
                  <De key={i} De={element} validated={element.validated} ></De>
                  
                </button>
              </div>
            )
          })}
          <br/>
          <br/>
          <ul className="list-group w-50">
            {allScores.map((score, i) => {   
              return(
                <li className="list-group-item text-center">
                  Partie numéro : {i+1}<br/>
                  Ton score : {score} 
                </li>
              ) 
            })}
          </ul>
          <br/>
        </div>
      </div>
    );
  
}




