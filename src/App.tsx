import { useState } from "react";
import "./App.css";
import { Route, Routes, useLocation } from "react-router";
import Base from "./components/Base";
import Header from "./components/Header";
import Home from "./components/Home";
import Order from "./components/Order";
import Toppings from "./components/Toppings";
import { AnimatePresence } from "motion/react";
import Modal from "./components/Modal";

function App() {
  const location = useLocation();
  const [pizza, setPizza] = useState<{ base: string; toppings: string[] }>({
    base: "",
    toppings: [],
  });
  const [showModal, setShowModal] = useState(false);

  const addBase = (base: string) => {
    setPizza({ ...pizza, base });
  };

  const addTopping = (topping: string) => {
    let newToppings;
    if (!pizza.toppings.includes(topping)) {
      newToppings = [...pizza.toppings, topping];
    } else {
      newToppings = pizza.toppings.filter((item) => item !== topping);
    }
    setPizza({ ...pizza, toppings: newToppings });
  };

  return (
    <>
      <Header />
      <Modal showModal={showModal} setShowModal={setShowModal} />
      <AnimatePresence onExitComplete={() => setShowModal(false)}>
        <Routes location={location} key={location.key}>
          <Route
            path="/base"
            element={<Base addBase={addBase} pizza={pizza} />}
          ></Route>
          <Route
            path="/toppings"
            element={<Toppings addTopping={addTopping} pizza={pizza} />}
          ></Route>
          <Route
            path="/order"
            element={<Order pizza={pizza} setShowModal={setShowModal} />}
          ></Route>
          <Route path="/" element={<Home />}></Route>
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default App;
