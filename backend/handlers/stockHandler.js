const Stock = require('../models/stock');
const {sendMessageToClients} = require('../realtime/socketService');

const updateProductQuantity = (productId, newQuantity, res) => {
    Stock.findOneAndReplace(
        {
          product: productId
        },
        {
          product: productId,
          quantity: newQuantity
        }
      ).then((response) => {
        console.log('Stock updated, sending to clients');
        sendMessageToClients("stockUpdated-" + productId, { newStock:  {
            product: productId,
            quantity: newQuantity
          }});
        res?.send(response);
      }).catch((error) => {
        console.log(`there was a problem...${error.message}`);
      });
}

module.exports = updateProductQuantity;