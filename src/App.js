import { useSelector } from 'react-redux';
import {
  Navigate,
  Route, RouterProvider, createBrowserRouter, createRoutesFromElements
} from "react-router-dom";
import { selectIsAuthChecked } from './features/auth/AuthSlice';
import { Logout } from './features/auth/components/Logout';

import { useAuthCheck } from "./hooks/useAuth/useAuthCheck";
import { useFetchLoggedInUserDetails } from "./hooks/useAuth/useFetchLoggedInUserDetails";
import { AddProductPage, AdminOrdersPage, CartPage, CheckoutPage, ForgotPasswordPage, HomePage, LoginPage, OrderSuccessPage, OtpVerificationPage, ProductDetailsPage, ProductUpdatePage, ResetPasswordPage, SignupPage, UserOrdersPage, UserProfilePage, WishlistPage, AddBrandAndCategoryPage, AdminBrandCategoryPage, AdminProfilePage, PrivacyPolicyPage, TermsOfUsePage, FAQPage, ContactPage } from './pages';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { NotFoundPage } from './pages/NotFoundPage';


function App() {

  const isAuthChecked=useSelector(selectIsAuthChecked)
  


  useAuthCheck();
  


  const routes = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path='/signup' element={<SignupPage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/verify-otp' element={<OtpVerificationPage/>}/>
        <Route path='/forgot-password' element={<ForgotPasswordPage/>}/>
        <Route path='/reset-password/:userId/:passwordResetToken' element={<ResetPasswordPage/>}/>
        <Route exact path='/logout' element={<Logout/>}/>
        <Route exact path='/product-details/:id' element={<ProductDetailsPage/>}/>

        {/* Admin Routes */}
        <Route path='/admin/dashboard' element={<AdminDashboardPage/>}/>
        <Route path='/admin/product-update/:id' element={<ProductUpdatePage/>}/>
        <Route path='/admin/add-product' element={<AddProductPage/>}/>
        <Route path='/admin/add-brand-category' element={<AddBrandAndCategoryPage/>}/>
        <Route path='/admin/manage-brands-categories' element={<AdminBrandCategoryPage/>}/>
        <Route path='/admin/orders'  element={<AdminOrdersPage/>}/>
        <Route path='/admin/profile' element={<AdminProfilePage/>}/>

        {/* User Routes */}
        <Route path='/' element={<HomePage/>}/>
        <Route path='/cart' element={<CartPage/>}/>
        <Route path='/profile' element={<UserProfilePage/>}/>
        <Route path='/checkout' element={<CheckoutPage/>}/>
        <Route path='/order-success/:id' element={<OrderSuccessPage/>}/>
        <Route path='/orders' element={<UserOrdersPage/>}/>
        <Route path='/wishlist' element={<WishlistPage/>}/>

        {/* Static Pages */}
        <Route path='/privacy-policy' element={<PrivacyPolicyPage/>}/>
        <Route path='/terms-of-use' element={<TermsOfUsePage/>}/>
        <Route path='/faq' element={<FAQPage/>}/>
        <Route path='/contact' element={<ContactPage/>}/>

        <Route path='*' element={<NotFoundPage/>} />

      </>
    )
  )

  
  return isAuthChecked ? <RouterProvider router={routes}/> : "";
}

export default App;
