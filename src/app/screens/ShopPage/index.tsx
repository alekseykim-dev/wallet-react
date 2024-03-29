import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import { ChosenProduct } from "./chosenProduct";
import { OneShop } from "./oneShop";
import { AllShops } from "./allShops";
import "../../../css/shop.css"

export function ShopPage(props: any) {
  let shop = useRouteMatch();
  console.log(shop);
  return (
    <div className="shop_page">
      <Switch>
        <Route path={`${shop.path}/products/:product_id`}>
          <ChosenProduct
            onAdd={props.onAdd}
            onAddFav={props.onAddFav}
          />
        </Route>
        <Route path={`${shop.path}/:shop_id`}>
          <OneShop
            onAdd={props.onAdd}
            onAddFav={props.onAddFav}
          />
        </Route>
        <Route path={`${shop.path}`}>
          <AllShops />
        </Route>
      </Switch>
    </div>
  );
}
