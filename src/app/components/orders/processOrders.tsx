import { Box, Stack } from "@mui/material";
import Button from "@mui/material/Button";
import TabPanel from "@mui/lab/TabPanel";
import moment from "moment";

// REDUX
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import {
  retrievePausedOrders,
  retrieveProcessOrders,
} from "../../screens/OrdersPage/selector";

import { Order } from "../../../types/order";
import { Product } from "../../../types/product";
import { serverApi } from "../../../lib/config";
import OrderApiService from "../../apiServices/orderApiService";
import {
  sweetErrorHandling,
  sweetFailureProvider,
} from "../../../lib/sweetAlert";
import { verifiedMemberData } from "../../apiServices/verify";

/* REDUX SELECTOR */
const processOrdersRetriever = createSelector(
  retrieveProcessOrders,
  (processOrders) => ({
    processOrders,
  })
);

export default function ProcessOrders(props: any) {
  /* INITIALIZATIONS */
  const { processOrders } = useSelector(processOrdersRetriever);  // from OrdersPage selector.ts  access redux store

  /* HANDLES */
  const finishOrderHandler = async (event: any) => {
    try {
      const order_id = event.target.value;
      const data = { order_id: order_id, order_status: "FINISHED" };

      if (!verifiedMemberData) {
        sweetFailureProvider("Please login first!", true);
      }

      let confirmation = window.confirm(
        "Confirm your order"
      );
      if (confirmation) {
        const orderService = new OrderApiService();
        await orderService.updateOrderStatus(data);
        props.setOrderRebuild(new Date());
      }
    } catch (err) {
      console.log("deleteOrderHandler, ERROR:", err);
      sweetErrorHandling(err).then();
    }
  };

  return (
    <TabPanel value={"2"}>
      <Stack>
        {processOrders?.map((order: Order) => {
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

              <Box className={"total_price_box blue_solid"}>
                <Box className={"boxTotal1"}>
                  <p>Price</p>
                  <p style={{ fontWeight: "400" }}>
                    ${order.order_total_amount - order.order_delivery_cost}
                  </p>
                  <img
                    src={"/icons/plus.svg"}
                    alt="plus"
                  />
                  <p>Delivery fee</p>
                  <p style={{ fontWeight: "400" }}>
                    ${order.order_delivery_cost}
                  </p>
                  <img
                    src={"/icons/Pause.svg"}
                    alt="equals"
                  />
                  <p>Total</p>
                  <p style={{ fontWeight: "400" }}>
                    ${order.order_total_amount}
                  </p>
                </Box>
                <p style={{ fontSize: "16px", fontWeight: "400", color: "#1f1f1f" }}>
                  {moment(order.createdAt).format("YY-MM-DD hh:mm")}
                </p>
                <Button
                  variant="contained"
                  style={{
                    background: "primary",
                    color: "#1f1f1f",
                    borderRadius: "4px",
                    boxShadow:
                      "0px 4px 4px rgba(0, 0, 0, 0.25), inset 0px 4px 4px rgba(0, 0, 0, 0.25);",
                  }}
                  value={order._id}
                  onClick={finishOrderHandler}
                >
                  Pay
                </Button>
              </Box>
            </Box>
          );
        })}
      </Stack>
    </TabPanel>
  );
}
