// export default{
//     GET: {
//         '/': startMessage,
//         '/health': checkingServer,
//         '/products': getProducts,
//         '/cart': showCartByCustomerId,
//         '/account/balance': showBalanceOfId,
//         '/orders': showTheHistoryOrders
//     },
//     POST: {
//         '/cart/items': addItemsOfCart,
//         '/orders/checkout': makeCheckoutAndCreateOrders
//     },
//     DELETE: {
//         '/cart/items/:productId': deleteItemsInCart
//     }
// }

import express from 'express'
const router = express.Router();

router.get("/products", (req,res) => {
    const
})


export default router;