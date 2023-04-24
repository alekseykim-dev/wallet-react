
import assert from "assert";
import axios from "axios";
import { serverApi } from "../../lib/config";
import { Definer } from "../../lib/Definer";
import { BoArticle, BoArticleInput , SearchArticlesObj, SearchMemberArticlesObj } from "../../types/boArticle";

class CommunityApiService {
  private readonly path: string; // state doesn't change and can't retrieve it outside the community page

  constructor() {
    this.path = serverApi;
  }

  public async uploadImageToServer(image: any): Promise<string> {
    try {
      let formData = new FormData();
      formData.append("community_image", image);

      console.log(image);
      const result = await axios(`${this.path}/community/image`, {
        method: "POST",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data?.state !== "Failed", result?.data?.message);
      console.log("state:", result.data.data);

      const image_name: string = result.data.data;
      return image_name;
    } catch (err: any) {
      console.log(`ERROR: uploadImageToServer  ${err.message}`);
      throw err;
    }
  }

  public async createArticle(data: BoArticleInput): Promise<BoArticle> {
    try {
      const result = await axios.post(this.path + "/community/create", data, {
        withCredentials: true,
      });

      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data?.state !== "Failed", result?.data?.message);
      console.log("state:", result.data.data);

      const article: BoArticle = result.data.data;
      return article;
    } catch (err: any) {
      console.log(`createArticle, ERROR: ${err.message}`);
      throw err;
    }
  }


  public async getTargetArticles(
    data: SearchArticlesObj // interface name
  ): Promise<BoArticle[]> {
    try {
      let url = `/community/target?bo_id=${data.bo_id}&page=${data.page}&limit=${data.limit}`;
      if (data.order) url += `&order=${data.order}`;

      const result = await axios.get(this.path + url, {
        withCredentials: true,
      });

      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data?.state !== "Failed", result?.data?.message);
      console.log("state:", result.data.data);

      const articles: BoArticle[] = result.data.data;

      return articles;
    } catch (err: any) {
      console.log(`getTargetArticles, ERROR: ${err.message}`);
      throw err;
    }
  }

  public async getMemberCommunityArticles(
    data: SearchMemberArticlesObj
  ): Promise<BoArticle[]> {
    try {
      let url = `/community/articles?mb_id=${data.mb_id}&page=${data.page}&limit=${data.limit}`;
      const result = await axios.get(this.path + url, {
        withCredentials: true,
      });

      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data?.state !== "Failed", result?.data?.message);
      console.log("state:", result.data.data);

      const articles: BoArticle[] = result.data.data;
      return articles;
    } catch (err: any) {
      console.log(`getMemberCommunityArticles, ERROR: ${err.message}`);
      throw err;
    }
  }

  public async getChosenArticle(art_id: string): Promise<BoArticle> {
    try {
      let url = `/community/single-article/${art_id}`;
      const result = await axios.get(this.path + url, {
        withCredentials: true,
      });

      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data?.state !== "Failed", result?.data?.message);
      console.log("state:", result.data.data);

      const articles: BoArticle = result.data.data;
      return articles;
    } catch (err: any) {
      console.log(`getChosenArticle, ERROR: ${err.message}`);
      throw err;
    }
  }
}

export default CommunityApiService;

