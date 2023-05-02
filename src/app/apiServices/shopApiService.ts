import axios from "axios";
import assert from "assert";
import { Definer } from "../../lib/Definer";
import { serverApi } from "../../lib/config";
import { Shop } from "../../types/user";
import { SearchObj } from "../../types/others";

class ShopApiService {
  private readonly path: string;

  constructor() {
    this.path = serverApi;
  }

  async getTopShops(): Promise<Shop[]> {
    try {
      const url = "/shops?order=top&page=1&limit=10",
        result = await axios.get(this.path + url, { withCredentials: true });
      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data?.state !== "Failed", result?.data?.message);
      console.log("state:", result.data.data);
      const top_shops: Shop[] = result.data.data; // 1st is from axios  2nd is from backend
      return top_shops;
    } catch (err: any) {
      console.log(`ERROR::: getTopShops ${err.message}`);
      throw err;
    }
  }

  async getShops(data: SearchObj): Promise<Shop[]> {
    // from shop js
    try {
      const url = `/shops?order=${data.order}&page=${data.page}&limit=${data.limit}`,
        result = await axios.get(this.path + url, { withCredentials: true });
      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data?.state !== "Failed", result?.data?.message);
      console.log("state:", result.data.data);
      const shops: Shop[] = result.data.data; // 1st is from axios  2nd is from backend

      // ": => type"
      return shops;
    } catch (err: any) {
      console.log(`ERROR::: getShops ${err.message}`);
      throw err;
    }
  }

  async getChosenShop(id: string): Promise<Shop> {
    try {
      const url = `/shops/${id}`,
        result = await axios.get(this.path + url, { withCredentials: true });
      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data?.state !== "Failed", result?.data?.message);
      console.log("state:", result.data.data);
      const top_shops: Shop = result.data.data;
      return top_shops;
    } catch (err: any) {
      console.log(`ERROR::: getChosenShop ${err.message}`);
      throw err;
    }
  }
}

export default ShopApiService;
