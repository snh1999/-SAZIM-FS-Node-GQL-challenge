import { createRoutesFromElements, createBrowserRouter, Route } from "react-router-dom";
import ErrorPage from "./ErrorPage";
import MainLayout from "./layout/Mainlayout";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import { Homepage } from "./Homepage";
import AddProductPage from "./product/AddProductPage";
import MyProducts from "./product/MyProductsPage";
import AllProductsPage from "./product/AllProductsPage";
import ViewProduct from "./product/ViewProductPage";
import EditProductPage from "./product/EditProductPage";
import RequireAuth from "./layout/RequireAuth";
import HistoryPage from "./HistoryPage";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<MainLayout />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route element={<RequireAuth />}>
                <Route index element={<Homepage />} />
                <Route path="/product">
                    <Route index element={<AllProductsPage />} />
                    <Route path="new" element={<AddProductPage />} />
                    <Route path="my" element={<MyProducts />} />
                    <Route path=":id" element={<ViewProduct />} />
                    <Route path="my/:id" element={<EditProductPage />} />
                </Route>
                <Route path="/history" element={<HistoryPage />} />
            </Route>
            <Route path="*" element={<ErrorPage />} />
        </Route>
    )
);

export default router;
