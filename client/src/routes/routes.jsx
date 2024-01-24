import UserRoot from "../UserRoot";
import Admin from "../pages/admin";
import Basket from "../pages/basket";
import Details from "../pages/details";
import Home from "../pages/home";
import Wishlist from "../pages/whislist.jsx";

export const ROUTES = [
    {
        path: "/",
        element: <UserRoot />,
        children: [
          {
            path: '/home',
            element: <Home />
          },
          
          {
            path: '/admin',
            element: <Admin />
          },
          {
            path: '/details/:id',
            element: <Details />
          },
          {
            path: '/basket',
            element: <Basket />
          },
          {
            path: '/wishlist',
            element: <Wishlist />
          },
        ]
      },
]
