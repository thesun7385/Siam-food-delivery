import Header from "./components/Header.jsx";
import Meals from "./components/Meals.jsx";
// import Cart from "./components/Cart.jsx";
import { CartContextProvider } from "./store/CartContext.jsx";
import { UserProgressContextProvider } from "./store/UserProgressContext.jsx";
import Cart from "./components/Cart.jsx";
import Checkout from "./components/Checkout.jsx";
import Home from "./components/Home.jsx";
import Services from "./components/Services.jsx";
import AboutUs from "./components/AboutUs.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
  return (
    <>
      <UserProgressContextProvider>
        <CartContextProvider>
          <Header />
          <main class="l-main">
            <Home />
            <Services />
            <Meals />
            <Cart />
            <Checkout />
            <AboutUs />
            <Contact />
            <Footer />
          </main>
        </CartContextProvider>
      </UserProgressContextProvider>
    </>
  );
}
