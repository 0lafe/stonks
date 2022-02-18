import React, { useEffect, useState } from "react"
import MuiAutocomplete from "../helpers/MuiAutoComplete"
import StockHistoryChart from "./StockHistoryChart"


const ChartContainer = ({ user }) => {
    const [charts, setCharts] = useState([])

    useEffect(() => {
        if (user) {
            console.log(user)
            if (user.stock_display) {
                setCharts(user.stock_display.map(stock => {
                    return (
                        {
                            symbol: stock.symbol,
                            name: stock.name,
                            quantity: stock.quantity,
                            averageCost: stock.cost
                        }
                    )
                }))
            }
        }
    }, [user])

    const handleNewStock = (event, input) => {
        if (event.type === "click" && input) {
            setCharts(charts.concat([
                {
                    symbol: input.symbol,
                    name: input.name,
                    quantity: 0,
                    averageCost: 0
                }
            ]))
        }
    }  

    const handleRemoveChart = (index) => {
        const chartsI = [...charts]
        chartsI.splice(index, 1)
        setCharts(chartsI)
    }

    return (
        <>
            <div className="center-div">
                <h1 className="landing-title">Stocks You Own</h1>
                <div className="tip stock-flex-row-space">
                    <p className="tip-text">Find your <strong>stock</strong> with search to see the data</p>
                    <MuiAutocomplete label="Add Companies" callback={handleNewStock}/>
                </div>

                <div className="graph-container">
                    {charts.map((chartData, index) => {
                        return (
                            <StockHistoryChart 
                                stockName={chartData.symbol} 
                                companyName={chartData.name}
                                index={index}
                                handleRemoveChart={handleRemoveChart}
                                quantity={chartData.quantity}
                                averageCost={chartData.averageCost}
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