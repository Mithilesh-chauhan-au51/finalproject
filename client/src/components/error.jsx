import {Navigate} from "react-router-dom"
const Errorpage=()=>{
  return(
    <>
    {/* <h1>404 error page is not found</h1> */}
      <Navigate to={"/"} />
    </>
  )
}
export default Errorpage