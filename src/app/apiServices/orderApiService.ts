import assert from "assert";
import axios from "axios";
import { serverApi } from "../../lib/config";
import { Definer } from "../../lib/Definer";
import { Order } from "../../types/order";
import { CartItem } from "../../types/others";

class OrderApiService {
  private readonly path: string;

  constructor() {
    this.path = serverApi;
  }

  async createOrder(data: CartItem[]): Promise<boolean> {
    try {
      const url = "/orders/create",
        result = await axios.post(this.path + url, data, {
          withCredentials: true,
        });

      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data?.state !== "Failed", result?.data?.message);
      console.log("state:", result.data.data);

      const order: any = result.data.data;
      console.log("order :::", order);

      return true;
    } catch (err: any) {
      console.log(`createOrder :::, ERROR: ${err.message}`);
      throw err;
    }
  }
  async getMyOrders(order_status: string): Promise<Order[]> {
    try {
      const url = `/orders?status=${order_status}`,
        result = await axios.get(this.path + url, {
          withCredentials: true,
        });

      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data?.state !== "Failed", result?.data?.message);
      console.log("state:", result.data.data);

      const orders: Order[] = result.data.data;
      console.log("order:::::", orders);

      return orders;
    } catch (err: any) {
      console.log(`getMyOrders, ERROR: ${err.message}`);
      throw err;
    }
  }

  async updateOrderStatus(data: any): Promise<Order> {
    try {
      const url = `/orders/edit`,
        result = await axios.post(this.path + url, data, {
          withCredentials: true,
        });

      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data?.state !== "Failed", result?.data?.message);
      console.log("state:", result.data.data);

      const order: Order = result.data.data;
      return order;
    } catch (err: any) {
      console.log(`updateOrderStatus, ERROR: ${err.message}`);
      throw err;
    }
  }
}

export default OrderApiService;
