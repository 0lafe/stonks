import { Button } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { Chart } from 'react-google-charts';
import helperFetch from '../helpers/helperFetch'
import BuyOrder from './BuyOrder';

const StockHistoryChart = ({ stockName, companyName, index, handleRemoveChart, handleBuyOrder }) => {
  const [chartData, setChartData] = useState([['Days', 'Closed', 'High', 'Low', 'Opened']])
  const [stockPrice, setStockPrice] = useState(0)
  const [stockHistory, setStockHistory] = useState({
    c: [],
    h: [],
    l: [],
    o: []
  });

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
      <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'row'}}>
        <div className="stock-header">
          <h4>The {companyName} ({stockName}) price is ${stockPrice}</h4>
        </div>
        <div className="stock-header">
          <h4>History of the {companyName} ({stockName}) stock</h4>
        </div>
      </div>
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

        <BuyOrder stockName={stockName}/>
      </div>
    </div>
  );
}

export default StockHistoryChart