import { AiOutlineHome } from "react-icons/ai";
import { BsArrowReturnLeft } from "react-icons/bs";
import { Link, useNavigate, useRouteError } from "react-router-dom";

const Error = () => {
  const error = useRouteError();
  const navigate = useNavigate();
  return (
    <div className="">
      <h1>Uh oh! We've got a problem.</h1>
      <p>{error.message || error.statusText}</p>
      <div className="">
        <button className="" onClick={() => navigate(-1)}>
          <span>Go Back</span>
          <BsArrowReturnLeft width={20} />
        </button>
        <Link to="/" className="">
          <spam>Go Home</spam>
          <AiOutlineHome width={20} />
        </Link>
      </div>
    </div>
  );
};

export default Error;
