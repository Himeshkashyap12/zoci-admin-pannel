import { useParams } from "react-router-dom";
import ReturningCustomerDetails from "../../component/salesManagement/returnCustomer/returningCustomerDetails/ReturningCustomerDetails";

const ReturningCustomerDetailsPage=()=>{
    const {id}=useParams();

    return(
        <>
        <ReturningCustomerDetails id={id}/>

        </>
    )
}
export default ReturningCustomerDetailsPage;