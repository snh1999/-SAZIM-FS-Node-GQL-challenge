import { createRoutesFromElements, createBrowserRouter, Route } from "react-router-dom";
import ErrorPage from "./ErrorPage";
import MainLayout from "./layout/Mainlayout";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import { Homepage } from "./Homepage";
import AddProductPage from "./product/AddProductPage";
import MyProducts from "./product/MyProducts";
import AllProducts from "./product/AllProducts";
import ViewProduct from "./product/ViewProduct";
import EditProductPage from "./product/EditProductPage";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<MainLayout />}>
            <Route index element={<Homepage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/product">
                <Route index element={<AllProducts />} />
                <Route path="new" element={<AddProductPage />} />
                <Route path="my" element={<MyProducts />} />
                <Route path=":id" element={<ViewProduct />} />
                <Route path="my/:id" element={<EditProductPage />} />
            </Route>
            <Route path="*" element={<ErrorPage />} />
        </Route>
    )
);

export default router;

// const router = createBrowserRouter(
//     createRoutesFromElements(
// <Route path="/" element={<Root />} loader={rootLoader} action={rootAction} errorElement={<ErrorPage />}>
//             {/* <Route errorElement={<ErrorPage />}>
//           <Route index element={<Index />} />
//           <Route
//             path="contacts/:contactId"
//             element={<Contact />}
//             loader={contactLoader}
//             action={contactAction}
//           />
//           <Route
//             path="contacts/:contactId/edit"
//             element={<EditContact />}
//             loader={contactLoader}
//             action={editAction}
//           />
//           <Route
//             path="contacts/:contactId/destroy"
//             action={destroyAction}
//           /> */}
//             {/* </Route> */}
//         </Route>
//     )
// );
