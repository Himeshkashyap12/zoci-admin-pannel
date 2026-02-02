import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const AdminLayout = lazy(() => import("./component/layout/AdminLayout"));

// CRM
const CrmPage = lazy(() => import("./pages/crmPage/CrmPage"));
const AllVisitorsListPage = lazy(() => import("./pages/crmPage/AllvisitorsPage"));
const AllVisitorsDetails = lazy(() =>
  import("./component/crmManagerment/allVisitorsList/allVisitorsDetails.jsx/AllVisitorsDetails")
);
const CustomerListPage = lazy(() => import("./pages/crmPage/CustomerListPage"));
const CustomerListDetails = lazy(() =>
  import("./component/crmManagerment/customerList/customerListDetails/CustomerListDetails")
);
const BirthdayReminderPage = lazy(() => import("./pages/crmPage/BirthdayReminderPage"));
const BirthdayReminderDetails = lazy(() =>
  import("./component/crmManagerment/birthdayReminder/birthdayReminderDetails/BirthdayReminderDetails")
);
const AnniversaryReminderpage = lazy(() => import("./pages/crmPage/AnniversaryReminderPage"));

// Inventory
const InventaryPage = lazy(() => import("./pages/inventaryPage/InventaryPage"));
const CreateNewProductPage = lazy(() => import("./pages/inventaryPage/CreateNewProduct"));
const StockAlertPage = lazy(() => import("./pages/inventaryPage/StockAlertPage"));
const BestSellerPage = lazy(() => import("./pages/inventaryPage/BestSellerPage"));
const VendorPerformancePage = lazy(() => import("./pages/inventaryPage/VendorPerformancePage"));
const VendorPerformanceAnalysisDetailsPage = lazy(() =>
  import("./pages/inventaryPage/VendorPerformanceAnalysisDetailsPage")
);

// Marketing
const MarketingToolsPage = lazy(() => import("./pages/marketinToolsPage/MarketingToolPage"));
const ActivePromotionPage = lazy(() => import("./pages/marketinToolsPage/ActivePromotionPage"));
const ExpiredPromotionPage = lazy(() => import("./pages/marketinToolsPage/ExpiredPromotionPage"));
const BirthdayPromotionPage = lazy(() => import("./pages/marketinToolsPage/BirthdayPromotionPage"));

// Order Management
const OrderManagementPage = lazy(() => import("./pages/orderManagementPage/OrderManagementPage"));
const AddNewOrderPage = lazy(() => import("./pages/orderManagementPage/AddNewOrderPage"));
const MakeOnlineOrderPage = lazy(() => import("./pages/orderManagementPage/MakeOnlineOrderPage"));
const AddOrderToShipRocketPage = lazy(() =>import("./pages/orderManagementPage/AddOrderToShipRocketPage"));
const GenerateInvoicePage = lazy(() =>import("./pages/orderManagementPage/GenerateInstantInvoicePage")
);
const ProductExchangePage = lazy(() => import("./pages/orderManagementPage/ProductExhangePage"));
const ProductReturnedPage = lazy(() => import("./pages/orderManagementPage/ProductReturnedPage"));

// Sales
const SalesPage = lazy(() => import("./pages/salesPage/SalesPage"));
const OnlineSalesListPage = lazy(() => import("./pages/salesPage/OnlineSalesListPage"));
const OfflineSalesListPage = lazy(() => import("./pages/salesPage/OfflineSalesListPage"));
const TotalSalesPage = lazy(() => import("./pages/salesPage/TotalSalesPage"));
const TotalOrderPage = lazy(() => import("./pages/salesPage/TotalOrderPage"));
const NetProfitPage = lazy(() => import("./pages/salesPage/NetProfitPage"));
const TotalExpenditurePage = lazy(() => import("./pages/salesPage/TotalExpenditurePage"));
const ReturningCustomerPage = lazy(() => import("./pages/salesPage/ReturningCustomerPage"));
const ReturningCustomerDetailsPage = lazy(() =>import("./pages/salesPage/ReturningCustomerDetailsPage"));
const MakeToOrderPage = lazy(() => import("./pages/salesPage/MakeToOrderPage"));
const MakeToOrderList = lazy(() =>import("./component/salesManagement/makeToOrderList/MakeToOrderList"));

// Blog
const BlogManagementPage = lazy(() => import("./pages/blogPage/BlogManagementPage"));
const AddNewBlogPage = lazy(() => import("./pages/blogPage/AddNewBlogPage"));

// UI Management
const UiManagementpage = lazy(() => import("./pages/uiManagementPage/UiManagementpage"));

// FAQ
const FaqPage = lazy(() => import("./pages/faqPage/FaqPage"));

//Login
import LoginPage from "./pages/auth/LoginPage";
//protected
import AdminProtectedRoute from "./utils/AdminProtectedRoute";
import Loader from "./component/loader/Loader";
import BlogDetailsPage from "./pages/blogPage/BlogDetailsPage";

function App() {
  return (
    <>
      <ToastContainer />
      {/* <ApiLoader /> */}
      <Suspense  fallback={<Loader/>} >
      {/* <Suspense fallback={<Loading />}> */}
        <Routes>
        <Route path="/login"element={<LoginPage /> }/>
       <Route path="*" element={<LoginPage />} />

          <Route path="/admin" element={<AdminProtectedRoute> <AdminLayout /> </AdminProtectedRoute>} >
            {/* inventary route */}
              <Route  path="inventary" element={ <AdminProtectedRoute>  <InventaryPage />  </AdminProtectedRoute> }/>
              <Route  path="stock-alert" element={ <AdminProtectedRoute>  <StockAlertPage />  </AdminProtectedRoute> }/>
              <Route  path="vendor-performance" element={ <AdminProtectedRoute>  <VendorPerformancePage />  </AdminProtectedRoute> }/>
              <Route  path="vendor-performance/:id" element={ <AdminProtectedRoute>  <VendorPerformanceAnalysisDetailsPage />  </AdminProtectedRoute> }/>
              <Route  path="best-seller" element={ <AdminProtectedRoute>  <BestSellerPage />  </AdminProtectedRoute> }/>
              <Route  path="create-product" element={ <AdminProtectedRoute>  <CreateNewProductPage />  </AdminProtectedRoute> }/>
            {/* inventary route */}

             {/* Order route */}
             <Route  path="order" element={ <AdminProtectedRoute>  <OrderManagementPage />  </AdminProtectedRoute> }/>
             <Route  path="order-online" element={ <AdminProtectedRoute>  <MakeOnlineOrderPage />  </AdminProtectedRoute> }/>
             <Route  path="make-order" element={ <AdminProtectedRoute>  <MakeToOrderPage />  </AdminProtectedRoute> }/>
             <Route  path="product-exchange" element={ <AdminProtectedRoute>  <ProductExchangePage />  </AdminProtectedRoute> }/>
             <Route  path="product-returned" element={ <AdminProtectedRoute>  <ProductReturnedPage />  </AdminProtectedRoute> }/>
             <Route  path="generate-invoice" element={ <AdminProtectedRoute>  <GenerateInvoicePage />  </AdminProtectedRoute> }/>
             <Route  path="add-new-order" element={ <AdminProtectedRoute>  <AddNewOrderPage />  </AdminProtectedRoute> }/>
             <Route  path="add-order-shiprocket" element={ <AdminProtectedRoute>  <AddOrderToShipRocketPage />  </AdminProtectedRoute> }/>
            
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
             <Route  path="returning-customer/:id" element={ <AdminProtectedRoute>  <ReturningCustomerDetailsPage />  </AdminProtectedRoute> }/>
             <Route  path="online-sales" element={ <AdminProtectedRoute>  <OnlineSalesListPage />  </AdminProtectedRoute> }/>
             <Route  path="make-order-list" element={ <AdminProtectedRoute>  <MakeToOrderList />  </AdminProtectedRoute> }/>
             <Route  path="offline-sales-list" element={ <AdminProtectedRoute>  <OfflineSalesListPage />  </AdminProtectedRoute> }/>
           
           {/* Marketing route */}
             <Route  path="marketing" element={ <AdminProtectedRoute>  <MarketingToolsPage />  </AdminProtectedRoute> }/>
             <Route  path="active-promotion" element={ <AdminProtectedRoute>  <ActivePromotionPage />  </AdminProtectedRoute> }/>
             <Route  path="expired-promotion" element={ <AdminProtectedRoute>  <ExpiredPromotionPage />  </AdminProtectedRoute> }/>
             <Route  path="birthday-promotion" element={ <AdminProtectedRoute>  <BirthdayPromotionPage />  </AdminProtectedRoute> }/>
           
           {/* Blog section route*/}
             <Route  path="blog" element={ <AdminProtectedRoute>  <BlogManagementPage />  </AdminProtectedRoute> }/>
             <Route  path="blog/:id" element={ <AdminProtectedRoute>  <BlogDetailsPage />  </AdminProtectedRoute> }/>
             <Route  path="add-new-blog" element={ <AdminProtectedRoute>  <AddNewBlogPage />  </AdminProtectedRoute> }/>


           {/* ui management route */}
             <Route  path="ui-management" element={ <AdminProtectedRoute>  <UiManagementpage />  </AdminProtectedRoute> }/>
           {/* faq management route */}
             <Route  path="faq" element={ <AdminProtectedRoute>  <FaqPage />  </AdminProtectedRoute> }/>

          </Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default App;











