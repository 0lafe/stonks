import { Button } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { Chart } from 'react-google-charts';
import helperFetch from '../helpers/helperFetch'
import TradeSharesModel from './BuyOrder';

const StockHistoryChart = ({ stockName, companyName, index, handleRemoveChart, quantity, averageCost }) => {
  const [chartData, setChartData] = useState([['Days', 'Closed', 'High', 'Low', 'Opened']])
  const [stockPrice, setStockPrice] = useState(0)
  const [stockHistory, setStockHistory] = useState({
    c: [],
    h: [],
    l: [],
    o: []
  });

  const gains = ( stockPrice > averageCost )
  const netColor = gains ? "stock-net" : "stock-loss"

  useEffect(() => {
    helperFetch(`/api/stocks/${stockName}`).then(replyData => {
      setStockHistory(replyData.history)
      setStockPrice(replyData.current_price)
    })
	}, []);

  useEffect(() => {
    const data = stockHistory.c.map((data, index) => {
      return [`${index}`, data, stockHistory.h[index], stockHistory.l[index], stockHistory.o[index]]
    })
    setChartData(chartData.concat(data))
  }, [stockHistory])

  return (
    <div className="stock-graph">
      <div className="stock-flex-row">
        <div className="stock-header">
          <h4 >The current price of {companyName} ({stockName}) is ${stockPrice.toFixed(2)}</h4>
        </div>
      </div>
      {quantity > 0 
        ? <>
        <div className="stock-flex-row">
          <div className="stock-header">
            <h4>You bought <strong>{quantity}</strong> of this stock for an average of <strong>${averageCost.toFixed(2)}</strong> a share</h4>
          </div>
        </div>
        <div className="stock-flex-row">
          <div className="stock-header">
            <h4>
              Selling your shares now would
                 <span className={netColor}><strong>{averageCost < stockPrice ? ' Net ' : ' Lose '}</strong></span> 
              you 
              <span className={netColor}><strong> ${(Math.abs(averageCost - stockPrice)).toFixed(2)}</strong></span> a share
              </h4>
          </div>
        </div>
    </>
      : null}
      <Chart
        chartType="LineChart"
        data={chartData}
        options={{}}
        graph_id={stockName}
        width="100%"
        height='400px'
      />
      <div className="stock-graph-footer">
        <Button 
        variant="outlined" 
        color="error"
        onClick={() => handleRemoveChart(index)}>
          Remove Graph
        </Button>

        {quantity > 0 
        ? <TradeSharesModel stockName={stockName} type="sell" currentPrice={stockPrice}/>
        : null}

        <TradeSharesModel stockName={stockName} type="buy" currentPrice={stockPrice}/>
      </div>
    </div>
  );
}

export default StockHistoryChart