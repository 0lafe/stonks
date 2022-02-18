import React, { useEffect, useState } from "react"
import MuiAutocomplete from "../helpers/MuiAutoComplete"
import StockHistoryChart from "./StockHistoryChart"


const ChartContainer = (props) => {
    const [charts, setCharts] = useState([])

    const handleNewStock = (event, input) => {
        if (event.type === "click" && input) {
            setCharts(charts.concat([
                {
                    symbol: input.symbol,
                    name: input.name,
                }
            ]))
        }
    }  

    const handleRemoveChart = (index) => {
        const chartsI = [...charts]
        chartsI.splice(index, 1)
        setCharts(chartsI)
    }

    const handleBuyOrder = (symbol) => {
        
    }

    return (
        <>
            <div className="center-div">
                <h1 className="landing-title">Companies You Follow</h1>
                <div className="tip">
                    <p className="tip-text">Find your <strong>stock</strong> with search to see the data</p>

                </div>

                <div className="add-stock">
                    <MuiAutocomplete label="Companies" callback={handleNewStock}/>
                </div>

                <div className="graph-container">
                    {charts.map((chartData, index) => {
                        return (
                            <StockHistoryChart 
                                stockName={chartData.symbol} 
                                companyName={chartData.name}
                                index={index}
                                handleRemoveChart={handleRemoveChart}
                                key={chartData.symbol}
                            />
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default ChartContainer