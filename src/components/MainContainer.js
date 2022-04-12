import React, {useState,useEffect} from "react";
import StockContainer from "./StockContainer";
import PortfolioContainer from "./PortfolioContainer";
import SearchBar from "./SearchBar";

function MainContainer() {
  const [stocks,setStocks]=useState([])
  const [myPortfolio,setMyPortfolio]=useState([])
  const [sortStock,setSortStocks]=useState('')

  useEffect(()=>{
    fetch("http://localhost:3001/stocks")
    .then(res=>res.json())
    .then(stock=>setStocks(stock))
  },[])

  function buyStocks(stock){
    if(!myPortfolio.includes(stock)){
      const updatedMyPortfolio=[...myPortfolio,stock]
      setMyPortfolio(updatedMyPortfolio)
    }
    else{
      alert("Already have the stock")
    } 
  }

  function sellStock(stock){
    const updatedMyStocks=myPortfolio.filter(myStock=>myStock.id !== stock.id)
    setMyPortfolio(updatedMyStocks)
  }

  useEffect(()=>{
    if(sortStock==="Alphabetically"){
      const sortedStocks=sortByName();
      setStocks(sortedStocks)
    }
    else{
      const sortedStocksPrice=sortbyPrice();
      setStocks(sortbyPrice)

    }
  },[sortStock])


  const sortByName=()=>{
    return[...stocks].sort(function(a, b){
      var nameA=a.name.toUpperCase()
      var nameB=b.name.toUpperCase()
      if(nameA<nameB){
        return -1
      }
      if(nameA>nameB){
        return 1
      }
      return 0;
  })
  }


const sortbyPrice=()=>{
  return[...stocks].sort(function(a, b){
    return a.price-b.price
})

}

  function sortStocks(e){
    setSortStocks(e.target.value)
  }

  
  return (
    <div>
      <SearchBar sortStocks={sortStocks} />
      <div className="row">
        <div className="col-8">
          <StockContainer stocks={stocks} handleClick={buyStocks} />
        </div>
        <div className="col-4">
          <PortfolioContainer handleClick={sellStock} stocks={myPortfolio}/>
        </div>
      </div>
    </div>
  );
}

export default MainContainer;
