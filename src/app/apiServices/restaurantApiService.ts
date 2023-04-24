import axios from "axios";
import assert from "assert";
import { Definer } from "../../lib/Definer";
import { serverApi } from "../../lib/config";
import { Restaurant } from "../../types/user";
import { SearchObj } from "../../types/others";

class RestaurantApiService {
  private readonly path: string;

  constructor() {
    this.path = serverApi;
  }

  async getTopRestaurants(): Promise<Restaurant[]> {
    try {
      const url = "/restaurants?order=top&page=1&limit=4",
        result = await axios.get(this.path + url, { withCredentials: true });
      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data?.state !== "Failed", result?.data?.message);
      console.log("state:", result.data.data);
      const top_restaurants: Restaurant[] = result.data.data; // 1st is from axios  2nd is from backend
      return top_restaurants;
    } catch (err: any) {
      console.log(`ERROR::: getTopRestaurants ${err.message}`);
      throw err;
    }
  }

  async getRestaurants(data: SearchObj): Promise<Restaurant[]> {
    // from restaurant js
    try {
      const url = `/restaurants?order=${data.order}&page=${data.page}&limit=${data.limit}`,
        result = await axios.get(this.path + url, { withCredentials: true });
      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data?.state !== "Failed", result?.data?.message);
      console.log("state:", result.data.data);
      const restaurants: Restaurant[] = result.data.data; // 1st is from axios  2nd is from backend

      // ": => type"
      return restaurants;
    } catch (err: any) {
      console.log(`ERROR::: getRestaurants ${err.message}`);
      throw err;
    }
  }

  async getChosenRestaurant(id: string): Promise<Restaurant> {
    try {
      const url = `/restaurants/${id}`,
        result = await axios.get(this.path + url, { withCredentials: true });
      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data?.state !== "Failed", result?.data?.message);
      console.log("state:", result.data.data);
      const top_restaurants: Restaurant = result.data.data;
      return top_restaurants;
    } catch (err: any) {
      console.log(`ERROR::: getChosenRestaurant ${err.message}`);
      throw err;
    }
  }
}

export default RestaurantApiService;
