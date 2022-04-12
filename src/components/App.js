import React, {useState, useEffect} from "react";
import Header from "./Header";
import MainContainer from "./MainContainer";

function App() {
  
  const [myPortfolio,setMyPortfolio]=useState([])

 


  return (
    <div>
      <Header />
      <MainContainer />
    </div>
  );
}

export default App;
