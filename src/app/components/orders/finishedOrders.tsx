import { Box, Stack } from "@mui/material";
import TabPanel from "@mui/lab/TabPanel";
import React from "react";

// REDUX
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrieveFinishedOrders } from "../../screens/OrdersPage/selector";

import { Order } from "../../../types/order";
import { Product } from "../../../types/product";
import { serverApi } from "../../../lib/config";

/* REDUX SELECTOR */
const finishedOrdersRetriever = createSelector(
  retrieveFinishedOrders,
  (finishedOrders) => ({
    finishedOrders,
  })
);

export default function FinishedOrders(props: any) {
  /* INITIALIZATIONS */
  const { finishedOrders } = useSelector(finishedOrdersRetriever); // from OrdersPage selector.ts  access redux store

  return (
    <TabPanel value={"3"}>
      <Stack>
        {finishedOrders?.map((order: Order) => {
          return (
            <Box className="order_main_box" key={order._id}>
              <Box className="order_box_scroll">
                {order.order_items.map((item) => {
                  const product: Product = order.product_data.filter(
                    (ele) => ele._id === item.product_id
                  )[0];
                  const image_path = `${serverApi}/${product.product_images[0]}`;

                  return (
                    <Box className="ordersName_price" key={item._id}>
                      <img
                        src={image_path}
                        className={"order_product_img"}
                        alt="product"
                      />
                      <p className="title_product">{product.product_name}</p>
                      <Box className={"priceBox"}>
                        <p>${item.item_price}</p>
                        <img src={"/icons/Close.svg"} alt="multiply" />
                        <p>{item.item_quantity}</p>
                        <img src={"/icons/Pause.svg"} alt="equals" />
                        <p style={{ marginLeft: "15px" }}>
                          ${item.item_price * item.item_quantity}
                        </p>
                      </Box>
                    </Box>
                  );
                })}
              </Box>

              <Box className={"total_price_box red_solid"}>
                <Box className={"boxTotal2"}>
                  <p>Payment completed! </p>
                  <p>Price:</p>
                  <p style={{ fontWeight: "400" }}>
                    ${order.order_total_amount - order.order_delivery_cost}
                  </p>
                  <img
                    src={"/icons/plus.svg"}
                    alt="plus"
                  />
                  <p>Delivery fee:</p>
                  <p style={{ fontWeight: "400" }}>
                    ${order.order_delivery_cost}
                  </p>
                  <img
                    src={"/icons/Pause.svg"}
                    alt="multiply"
                  />
                  <p>Total price:</p>
                  <p style={{ fontWeight: "400" }}>
                    ${order.order_total_amount}
                  </p>
                </Box>
              </Box>
            </Box>
          );
        })}
      </Stack>
    </TabPanel>
  );
}
