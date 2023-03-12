import React,{ Fragment } from "react";
import './App.css';
import Inputstore from "./components/InputStore"
import Liststores from"./components/ListStores"
import Inputmealplan from "./components/InputMealPlan"
import Listmealplan from "./components/ListMealPlans"
import Inputrecipes from "./components/InputRecipes"
import Listgroceries from "./components/ListGroceries"
import Listrecipes from "./components/ListRecipes"
import InputDescription from "./components/InputDescription"
import Inputgroups from "./components/InputGroups"
function App() {
  return (
    <Fragment>
      <div className="container">
      <Inputstore/>
      <Liststores/>
      <Inputgroups/>
      <Inputmealplan/>
      <Listmealplan/>
      <InputDescription/>
      <Inputrecipes/>
      <Listrecipes/>
      <Listgroceries/>
      </div>
      </Fragment>
  );
}

export default App;
