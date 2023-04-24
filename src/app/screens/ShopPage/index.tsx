import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import { ChosenDish } from "./chosenProduct";
import { OneShop } from "./oneShop";
import { AllShops } from "./allShops";
import "../../../css/shop.css"

export function ShopPage(props: any) {
  let shop = useRouteMatch();
  console.log(shop);
  return (
    <div className="shop_page">
      <Switch>
        <Route path={`${shop.path}/dish/:dish_id`}>
          <ChosenDish onAdd={props.onAdd} />
        </Route>
        <Route path={`${shop.path}/:shop_id`}>
          <OneShop onAdd={props.onAdd} />
        </Route>
        <Route path={`${shop.path}`}>
          <AllShops />
        </Route>
      </Switch>
    </div>
  );
}
