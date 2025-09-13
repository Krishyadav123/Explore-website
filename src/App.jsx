// import { Home } from "lucide-react"
import { BrowserRouter } from "react-router-dom"
import Navbar from "./component/Navbar"
import Home from "./pages/Home/Home"
import AllRoutes from "./routes/routes"
import "./App.css";
import { CategoryProvider } from "./context/CategoryContext";
// import 'swiper/css';
// import 'swiper/css/effect-coverflow';
// import 'swiper/css/pagination';



const App = () => {
  return (
    <div>
      <CategoryProvider>
        <BrowserRouter>
          <AllRoutes />
        </BrowserRouter>
      </CategoryProvider>
    </div>
  )
}

export default App

