import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TextField } from '@mui/material';
import helperFetch from '../helpers/helperFetch';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function TradeSharesModel({ stockName, type, currentPrice }) {
    const [open, setOpen] = React.useState(false);
    const [quantity, setQuantity] = React.useState(1)
    const [price, setPrice] = React.useState(0)
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    React.useEffect(() => {
      console.log(currentPrice)
      setPrice(currentPrice)
    }, [currentPrice])

    const handleQuantityChange = (event, v) => {
        setQuantity(event.target.value)
    }

    const handlePriceChange = (event, v) => {
        setPrice(event.target.value)
    }

    const handlePurchase = () => {
      if (type === 'buy') {
        helperFetch(`/api/buy_orders/${stockName}?quantity=${quantity}&price=${price}`).then(response => {
          if (response.status === "Success") {
            handleClose()
          }
        })
      } else {
        helperFetch(`/api/sell_orders/${stockName}?quantity=${quantity}&price=${price}`).then(response => {
          if (response.status === "Success") {
            handleClose()
          }
        })
      }
    }
  
    return (
      <div>
        {type === "buy"
        ?         
        <Button 
        onClick={handleOpen}
        variant="outlined" 
        color="success">
            Buy Stock
        </Button>
        :         
        <Button 
        onClick={handleOpen}
        variant="outlined">
            Sell Stock
        </Button>}

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {type === "buy" ? 'Buying' : 'Selling'} {stockName} stock
            </Typography>

            <div className={'stock-graph-footer'}>
                <div className="buy-order-field">
                    <TextField component={'span'} className="buy-order-field" label="Quantity" variant="outlined" value={quantity} onChange={handleQuantityChange}/>
                </div>
                <div className="buy-order-field">
                    <TextField component={'span'} className="buy-order-field" label="Price" variant="outlined" value={price} onChange={handlePriceChange}/>
                </div>
            </div>

            <div className={'stock-graph-footer'}>
                <Button onClick={handlePurchase} color="success" variant="outlined" >
                Create {type === "buy" ? 'Buy' : 'Sell'} Order
                </Button>

                <Button onClick={handleClose} color="error" variant="outlined" >
                Cancel
                </Button>
            </div>
          </Box>
        </Modal>
      </div>
    );
}