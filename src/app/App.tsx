import React, { useState, useEffect } from "react";
import "../css/App.css";
import "../css/navbar.css";
import "../css/footer.css";
import "../css/communityChat.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { ShopPage } from "./screens/ShopPage";
import { CommunityPage } from "./screens/CommunityPage";
import { OrdersPage } from "./screens/OrdersPage";
import { MemberPage } from "./screens/MemberPage";
import { HelpPage } from "./screens/HelpPage";
import { LoginPage } from "./screens/LoginPage";
import { HomePage } from "./screens/HomePage";
import { NavbarHome } from "./components/header";
import { NavbarShop } from "./components/header/shop";
import { NavbarOthers } from "./components/header/others";
import { Footer } from "./components/footer";
// import Car from "./screens/testCar";
import AuthenticationModal from "./components/auth";
import { Member } from "../types/user";
import { serverApi } from "../lib/config";
import {
  sweetFailureProvider,
  sweetTopSmallSuccessAlert,
} from "../lib/sweetAlert";
import MemberApiService from "./apiServices/memberApiService";
import { Definer } from "../lib/Definer";

import "../app/apiServices/verify";
import { CartItem, FavItem } from "../types/others";
import { Product } from "../types/product";
import { CommunityChats } from "./components/header/communityChats";
import { Responsive } from "./screens/Responsive";
import { useHistory } from "react-router-dom";

function App() {
  /** INITIALIZATION */


  const [path, setPath] = useState();
  const main_path = window.location.pathname;
  const [signUpOpen, setSignUpOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [orderRebuild, setOrderRebuild] = useState<Date>(new Date());

  const cartJson: any = localStorage.getItem("cart_data");
  const current_cart: CartItem[] = JSON.parse(cartJson) ?? []; // if TRUE cartJson, if FALSE  array
  const [cartItems, setCartItems] = useState<CartItem[]>(current_cart);

  const favJson: any = localStorage.getItem("fav_data");
  const current_fav: FavItem[] = JSON.parse(favJson) ?? []; // if TRUE cartJson, if FALSE  array
  const [favItems, setFavItems] = useState<FavItem[]>(current_fav);


  /** HANDLERS */
  const handleSignUpOpen = () => setSignUpOpen(true);
  const handleSignUpClose = () => setSignUpOpen(false);
  const handleLoginOpen = () => setLoginOpen(true);
  const handleLoginClose = () => setLoginOpen(false);

  const handleLogOutClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseLogOut = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(null);
  };

  const handleLogOutRequest = async () => {
    try {
      const memberApiService = new MemberApiService();
      await memberApiService.logOutRequest();
      await sweetTopSmallSuccessAlert("Get back soon!👋", 1000, true); // reload
    } catch (err: any) {
      console.log(err);
      sweetFailureProvider(Definer.general_err1);
    }
  };

  const onAdd = async (product: Product) => {
    // console.log("product:::", product)  => check if the click works
    const exist: any = cartItems.find(
      (item: CartItem) => item._id === product._id
    );
    if (exist) {
      const cart_updated = cartItems.map((item: CartItem) =>
        item._id === product._id
          ? { ...exist, quantity: exist.quantity + 1 }
          : item
      );
      setCartItems(cart_updated);
      localStorage.setItem("cart_data", JSON.stringify(cart_updated));
      await sweetTopSmallSuccessAlert("Added to cart", 1000, false); // reload
    } else {
      const new_item: CartItem = {
        _id: product._id,
        quantity: 1,
        name: product.product_name,
        price: product.product_price,
        image: product.product_images[0],
      };
      const cart_updated = [...cartItems, { ...new_item }];
      setCartItems(cart_updated);
      localStorage.setItem("cart_data", JSON.stringify(cart_updated));
    }
  };
  const onRemove = (item: CartItem) => {
    const item_data: any = cartItems.find(
      (ele: CartItem) => ele._id === item._id
    );
    if (item_data.quantity === 1) {
      const cart_updated = cartItems.filter(
        (ele: CartItem) => ele._id !== item._id
      ); // deletes if  less than 1

      setCartItems(cart_updated);
      localStorage.setItem("cart_data", JSON.stringify(cart_updated));
    } else {
      const cart_updated = cartItems.map((ele: CartItem) =>
        ele._id === item._id
          ? { ...item_data, quantity: item_data.quantity - 1 }
          : ele
      );
      setCartItems(cart_updated);
      localStorage.setItem("cart_data", JSON.stringify(cart_updated));
    }
  };
  const onDelete = (item: CartItem) => {
    const cart_updated = cartItems.filter(
      (ele: CartItem) => ele._id !== item._id
    );
    setCartItems(cart_updated);
    localStorage.setItem("cart_data", JSON.stringify(cart_updated));
  };
  const onDeleteAll = () => {
    setCartItems([]);
    localStorage.removeItem("cart_data");
  };


  /** Favorites */

   const onAddFav = (product: Product) => {
     // console.log("product:::", product)  => check if the click works
     const exist: any = favItems.find(
       (item: FavItem) => item._id === product._id
     );
     if (exist) {
       const fav_updated = favItems.map((item: FavItem) =>
         item._id === product._id
           ? { ...exist, quantity: exist.quantity + 1 }
           : item
       );
       setFavItems(fav_updated);
       localStorage.setItem("fav_data", JSON.stringify(fav_updated));
     } else {
       const new_item: FavItem = {
         _id: product._id,
         quantity: 1,
         name: product.product_name,
         price: product.product_price,
         image: product.product_images[0],
       };
       const fav_updated = [...favItems, { ...new_item }];
       setFavItems(fav_updated);
       localStorage.setItem("fav_data", JSON.stringify(fav_updated));
     }
   };

   const onDeleteFav = (item: FavItem) => {
     const fav_updated = favItems.filter(
       (ele: FavItem) => ele._id !== item._id
     );
     setFavItems(fav_updated);
     localStorage.setItem("fav_data", JSON.stringify(fav_updated));
   };
  
    const onDeleteAllFav = () => {
      setFavItems([]);
      localStorage.removeItem("fav_data");
    };
      const history = useHistory<History>();
    const handleClickOpenAlert = () => {
      history.push("/construction");
    };
  
  return (
    <Router>
      {main_path === "/" ? (
        <NavbarHome
          setPath={setPath}
          handleLoginOpen={handleLoginOpen}
          handleSignUpOpen={handleSignUpOpen}
          anchorEl={anchorEl}
          open={open}
          handleLogOutClick={handleLogOutClick}
          handleCloseLogOut={handleCloseLogOut}
          handleLogOutRequest={handleLogOutRequest}
          cartItems={cartItems}
          onAdd={onAdd}
          onRemove={onRemove}
          onDelete={onDelete}
          onDeleteAll={onDeleteAll}
          favItems={favItems}
          onAddFav={onAddFav}
          onDeleteFav={onDeleteFav}
          onDeleteAllFav={onDeleteAllFav}
          setOrderRebuild={setOrderRebuild}
        />
      ) : main_path.includes("/shop") ? (
        <NavbarShop
          setPath={setPath}
          handleLoginOpen={handleLoginOpen}
          handleSignUpOpen={handleSignUpOpen}
          anchorEl={anchorEl}
          open={open}
          handleLogOutClick={handleLogOutClick}
          handleCloseLogOut={handleCloseLogOut}
          handleLogOutRequest={handleLogOutRequest}
          cartItems={cartItems}
          onAdd={onAdd}
          onRemove={onRemove}
          onDelete={onDelete}
          onDeleteAll={onDeleteAll}
          favItems={favItems}
          onAddFav={onAddFav}
          onDeleteFav={onDeleteFav}
          onDeleteAllFav={onDeleteAllFav}
          setOrderRebuild={setOrderRebuild}
        />
      ) : (
        <NavbarOthers
          setPath={setPath}
          handleLoginOpen={handleLoginOpen}
          handleSignUpOpen={handleSignUpOpen}
          anchorEl={anchorEl}
          open={open}
          handleLogOutClick={handleLogOutClick}
          handleCloseLogOut={handleCloseLogOut}
          handleLogOutRequest={handleLogOutRequest}
          cartItems={cartItems}
          onAdd={onAdd}
          onRemove={onRemove}
          onDelete={onDelete}
          onDeleteAll={onDeleteAll}
          favItems={favItems}
          onAddFav={onAddFav}
          onDeleteFav={onDeleteFav}
          onDeleteAllFav={onDeleteAllFav}
          setOrderRebuild={setOrderRebuild}
        />
      )}

      {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
      <Switch>
        <Route path="/shop">
          <ShopPage onAdd={onAdd} onAddFav={onAddFav} />
        </Route>
        <Route path="/community">
          <CommunityPage />
        </Route>
        <Route path="/orders">
          <OrdersPage
            orderRebuild={orderRebuild}
            setOrderRebuild={setOrderRebuild}
          />
        </Route>
        <Route path="/member-page">
          <MemberPage />
        </Route>
        <Route path="/help">
          <HelpPage />
        </Route>
        <Route path="/login">
          <LoginPage />
        </Route>
        <Route path="/construction">
          <Responsive
            handleClickOpenAlert={handleClickOpenAlert}
            setPath={setPath}
          />
        </Route>
        <Route path="/">
          {/* <Car/> */}
          <HomePage />
        </Route>
      </Switch>

      <Footer />
      <CommunityChats />
      <AuthenticationModal
        loginOpen={loginOpen}
        handleLoginOpen={handleLoginOpen}
        handleLoginClose={handleLoginClose}
        signUpOpen={signUpOpen}
        handleSignUpOpen={handleSignUpOpen}
        handleSignUpClose={handleSignUpClose}
      />
    </Router>
  );
}


export default App;

// function Home() {
//   return (
//     <Container>
//       <h2>Home</h2>
//     </Container>
//   );
// }
