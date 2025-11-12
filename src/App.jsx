import { Route, Routes } from "react-router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { lazy, Suspense } from "react";
import AdminProtectedRoute from "./utils/AdminProtectedRoute";
const AdminOrdersPage = lazy(() => import("./pages/adminOrder/AdminOrderPage"));
const AdminLayout = lazy(() => import("./component/layout/AdminLayout"));
const AdminProductPage = lazy(() =>
  import("./pages/adminProductPage/AdminProductPage")
);
const AdminCreateFormPage = lazy(() =>
  import("./pages/adminCreateForm/AdminCreateFormPage")
);

import LoginPage from "./pages/auth/LoginPage";
import InventaryPage from "./pages/inventaryPage/InventaryPage";
import OrderManagementPage from "./pages/orderManagementPage/OrderManagementPage";
import SalesPage from "./pages/salesPage/SalesPage";
import CrmPage from "./pages/crmPage/CrmPage";
import MarketingToolsPage from "./pages/marketinToolsPage/MarketingToolPage";
import UiManagementpage from "./pages/uiManagementPage/UiManagementpage";
// import BlogManagementPage from "./pages/blogPage/blogPage";
import StockAlertPage from "./pages/inventaryPage/StockAlertPage";
import VendorPerformancePage from "./pages/inventaryPage/VendorPerformancePage";
import BestSellerPage from "./pages/inventaryPage/BestSellerPage";
import MakeOnlineOrderPage from "./pages/orderManagementPage/MakeOnlineOrderPage";
import ProductExchangePage from "./pages/orderManagementPage/ProductExhangePage";
import ProductReturnedPage from "./pages/orderManagementPage/ProductReturnedPage";
import GenerateInvoicePage from "./pages/orderManagementPage/GenerateInstantInvoicePage";
import TotalSalesPage from "./pages/salesPage/TotalSalesPage";
import TotalExpenditurePage from "./pages/salesPage/TotalExpenditurePage";
import NetProfitPage from "./pages/salesPage/NetProfitPage";
import TotalOrderPage from "./pages/salesPage/TotalOrderPage";
import ReturningCustomerPage from "./pages/salesPage/ReturningCustomerPage";
import OnlineSalesListPage from "./pages/salesPage/OnlineSalesListPage";
import MakeToOrderPage from "./pages/salesPage/MakeToOrderPage";
import MakeToOrderList from "./component/salesManagement/makeToOrderList/MakeToOrderList";
import OfflineSalesListPage from "./pages/salesPage/OfflineSalesListPage";
import AllVisitorsListPage from "./pages/crmPage/AllvisitorsPage";
import AnniversaryReminderpage from "./pages/crmPage/AnniversaryReminderPage";
import CustomerListPage from "./pages/crmPage/CustomerListPage";
import BirthdayReminderPage from "./pages/crmPage/BirthdayReminderPage";
import AllVisitorsDetails from "./component/crmManagerment/allVisitorsList/allVisitorsDetails.jsx/AllVisitorsDetails";
import BirthdayReminderDetails from "./component/crmManagerment/birthdayReminder/birthdayReminderDetails/BirthdayReminderDetails";
import CustomerListDetails from "./component/crmManagerment/customerList/customerListDetails/CustomerListDetails";
import ActivePromotionPage from "./pages/marketinToolsPage/ActivePromotionPage";
import ExpiredPromotionPage from "./pages/marketinToolsPage/ExpiredPromotionPage";
import BirthdayPromotionPage from "./pages/marketinToolsPage/BirthdayPromotionPage";
import BlogManagementPage from "./pages/blogPage/BlogManagementPage";
import AddNewBlogPage from "./pages/blogPage/AddNewBlogPage";
function App() {


  return (
    <>
      <ToastContainer />
      {/* <ApiLoader /> */}
      <Suspense >
      {/* <Suspense fallback={<Loading />}> */}
        <Routes>
        <Route path="/login"element={<LoginPage /> }/>
       <Route path="*" element={<LoginPage />} />

          <Route path="/admin" element={<AdminProtectedRoute> <AdminLayout /> </AdminProtectedRoute>} >
            {/* inventary route */}
              <Route  path="inventary" element={ <AdminProtectedRoute>  <InventaryPage />  </AdminProtectedRoute> }/>
              <Route  path="stock-alert" element={ <AdminProtectedRoute>  <StockAlertPage />  </AdminProtectedRoute> }/>
              <Route  path="vendor-performance" element={ <AdminProtectedRoute>  <VendorPerformancePage />  </AdminProtectedRoute> }/>
              <Route  path="best-seller" element={ <AdminProtectedRoute>  <BestSellerPage />  </AdminProtectedRoute> }/>
            {/* inventary route */}

             {/* Order route */}
             <Route  path="order" element={ <AdminProtectedRoute>  <OrderManagementPage />  </AdminProtectedRoute> }/>
             <Route  path="order-online" element={ <AdminProtectedRoute>  <MakeOnlineOrderPage />  </AdminProtectedRoute> }/>
             <Route  path="make-order" element={ <AdminProtectedRoute>  <MakeToOrderPage />  </AdminProtectedRoute> }/>
             <Route  path="product-exchange" element={ <AdminProtectedRoute>  <ProductExchangePage />  </AdminProtectedRoute> }/>
             <Route  path="product-returned" element={ <AdminProtectedRoute>  <ProductReturnedPage />  </AdminProtectedRoute> }/>
             <Route  path="generate-invoice" element={ <AdminProtectedRoute>  <GenerateInvoicePage />  </AdminProtectedRoute> }/>
             {/* Order route */}

             {/* crm routes */}
             <Route  path="crm" element={ <AdminProtectedRoute>  <CrmPage />  </AdminProtectedRoute> }/>
             <Route  path="crm-all-visitors-list" element={ <AdminProtectedRoute>  <AllVisitorsListPage />  </AdminProtectedRoute> }/>
             <Route  path="crm-all-visitors-list/:id" element={ <AdminProtectedRoute>  <AllVisitorsDetails />  </AdminProtectedRoute> }/>
             <Route  path="crm-customer-list" element={ <AdminProtectedRoute>  <CustomerListPage />  </AdminProtectedRoute> }/>
             <Route  path="crm-customer-list/:id" element={ <AdminProtectedRoute>  <CustomerListDetails />  </AdminProtectedRoute> }/>
             <Route  path="crm-birthday-reminder" element={ <AdminProtectedRoute>  <BirthdayReminderPage />  </AdminProtectedRoute> }/>
             <Route  path="crm-birthday-reminder/:id" element={ <AdminProtectedRoute>  <BirthdayReminderDetails />  </AdminProtectedRoute> }/>
             <Route  path="crm-anniversary-reminder" element={ <AdminProtectedRoute>  <AnniversaryReminderpage />  </AdminProtectedRoute> }/>
             {/* crm route */}
             
             {/* Sales route */}
             <Route  path="sales" element={ <AdminProtectedRoute>  <SalesPage />  </AdminProtectedRoute> }/>
             <Route  path="total-sales" element={ <AdminProtectedRoute>  <TotalSalesPage />  </AdminProtectedRoute> }/>
             <Route  path="total-expenditure" element={ <AdminProtectedRoute>  <TotalExpenditurePage />  </AdminProtectedRoute> }/>
             <Route  path="net-profit" element={ <AdminProtectedRoute>  <NetProfitPage />  </AdminProtectedRoute> }/>
             <Route  path="total-order" element={ <AdminProtectedRoute>  <TotalOrderPage />  </AdminProtectedRoute> }/>
             <Route  path="returning-customer" element={ <AdminProtectedRoute>  <ReturningCustomerPage />  </AdminProtectedRoute> }/>
             <Route  path="online-sales" element={ <AdminProtectedRoute>  <OnlineSalesListPage />  </AdminProtectedRoute> }/>
             <Route  path="make-order-list" element={ <AdminProtectedRoute>  <MakeToOrderList />  </AdminProtectedRoute> }/>
             <Route  path="offline-sales-list" element={ <AdminProtectedRoute>  <OfflineSalesListPage />  </AdminProtectedRoute> }/>
           
           {/* Marketing route */}
             <Route  path="marketing" element={ <AdminProtectedRoute>  <MarketingToolsPage />  </AdminProtectedRoute> }/>
             <Route  path="active-promotion" element={ <AdminProtectedRoute>  <ActivePromotionPage />  </AdminProtectedRoute> }/>
             <Route  path="expired-promotion" element={ <AdminProtectedRoute>  <ExpiredPromotionPage />  </AdminProtectedRoute> }/>
             <Route  path="birthday-promotion" element={ <AdminProtectedRoute>  <BirthdayPromotionPage />  </AdminProtectedRoute> }/>
           
           {/* Blog section */}
             <Route  path="blog" element={ <AdminProtectedRoute>  <BlogManagementPage />  </AdminProtectedRoute> }/>
             <Route  path="add-new-blog" element={ <AdminProtectedRoute>  <AddNewBlogPage />  </AdminProtectedRoute> }/>

           
             <Route  path="ui-management" element={ <AdminProtectedRoute>  <UiManagementpage />  </AdminProtectedRoute> }/>
           
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default App;























//  <Route
//               path="products"
//               element={
//                 <AdminProtectedRoute>
//                   <AdminProductPage />
//                 </AdminProtectedRoute>
//               }
//             />
//             <Route
//               path="create-product"
//               element={
//                 <AdminProtectedRoute>
//                   <AdminCreateFormPage />
//                 </AdminProtectedRoute>
//               }
//             />
//             <Route
//               path="order"
//               element={
//                 <AdminProtectedRoute>
//                   <AdminOrdersPage />
//                 </AdminProtectedRoute>
//               }
//             />
//             <Route
//               path="invoice"
//               element={
//                 <AdminProtectedRoute>
//                   <AdminInvoicePage />
//                 </AdminProtectedRoute>
//               }
//             />
//             <Route
//               path="generate-invoice"
//               element={
//                 <AdminProtectedRoute>
//                   <GenerateInvoiceForm />
//                 </AdminProtectedRoute>
//               }
//             />
            
