import React, { useState, useEffect } from 'react';
import { Chart } from 'react-google-charts';
import helperFetch from './../helpers/helperFetch'


const LineChartExample = (props) => {
  const [stockName, setStockName] = useState("GOOGL")
  const [chartData, setChartData] = useState([['Days', 'Closed', 'High', 'Low', 'Opened']])
  const [stockPrice, setStockPrice] = useState(0)
  const [stock, setStock] = useState({
    c: [],
    h: [],
    l: [],
    o: []
  });

  useEffect(() => {
    helperFetch(`/api/stocks?stock=${stockName}`).then(replyData => {
      setStock(replyData)
    })
    helperFetch(`/api/stocks/${stockName}`).then(replyData => {
      setStockPrice(replyData)
    })
	}, []);

  useEffect(() => {
    const data = stock.c.map((data, index) => {
      return [`${index}`, data, stock.h[index], stock.l[index], stock.o[index]]
    })
    setChartData(chartData.concat(data))
  }, [stock])

  return (
    <div className={'my-pretty-chart-container'} >
      <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'row'}}>
        <div>
          <h2>The {stockName} price is ${stockPrice}</h2>
        </div>
        <div>
          <h2>History of the {stockName} stock</h2>
        </div>
      </div>
        <Chart
          chartType="LineChart"
          data={chartData}
          options={{}}
          graph_id="LineChart"
          width="100%"
          height="400px"
        />
    </div>
  );
}

export default LineChartExample