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

export default function BuyOrder({ stockName }) {
    const [open, setOpen] = React.useState(false);
    const [quantity, setQuantity] = React.useState(1)
    const [price, setPrice] = React.useState(0)
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleQuantityChange = (event, v) => {
        setQuantity(event.target.value)
    }

    const handlePriceChange = (event, v) => {
        setPrice(event.target.value)
    }

    const handlePurchase = () => {
        // console.log(`NICE! you bought ${quantity} ${stockName} stocks for ${price}`)
        helperFetch(`/api/buy_orders/${stockName}?quantity=${quantity}&price=${price}`).then(response => {
            console.log(response)
            if (response.status === "Success") {
              handleClose()
            }
        })
    }
  
    return (
      <div>
        <Button 
        onClick={handleOpen}
        variant="outlined" 
        color="success">
            Buy Stock
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Buying {stockName} stock
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
                Create Buy Order
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