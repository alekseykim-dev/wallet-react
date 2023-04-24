import { BoArticle } from "./boArticle";
import { Follower, Following } from "./follow";
import { Order } from "./order";
import { Product } from "./product";
import { Member, Shop } from "./user";

/* REACT APP STATE || Root */
export interface AppRootState {
  homePage: HomePageState;
  shopPage: ShopPageState;
  ordersPage: OrdersPageState;
  communityPage: CommunityPageState;
  memberPage: MemberPageState
}

/* HomePage */
export interface HomePageState {
  topShops: Shop[];
  bestShops: Shop[];
  trendProducts: Product[];
  bestBoArticles: BoArticle[];
  trendBoArticles: BoArticle[];
  newsBoArticles: BoArticle[];
}

/* SHOP PAGE*/
export interface ShopPageState {
  targetShops: Shop[];
  randomShops: Shop[];
  chosenShop: Shop | null;
  targetProducts: Product[];
  chosenProduct: Product | null;
}

/** ORDERS PAGE */
export interface OrdersPageState {
  pausedOrders: Order[];
  processOrders: Order[];
  finishedOrders: Order[];
}


/** COMMUNITY PAGE */
export interface  CommunityPageState {
  targetBoArticles: BoArticle[];

}


/* MEMBER PAGE */
export interface MemberPageState {
  chosenMember: Member | null;
  chosenMemberBoArticles: BoArticle[];
  chosenSingleBoArticles: BoArticle | null;
  memberFollowers: Follower[];
  memberFollowings: Following[];
}
/** 1. interface
 * 2. data type
 * 3. connect to root
 */