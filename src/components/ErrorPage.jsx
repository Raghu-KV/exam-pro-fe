import { Link } from "react-router-dom";
import { MdArrowBackIos } from "react-icons/md";

function ErrorPage() {
  return (
    <div className="container mx-auto px-5">
      <div className="flex flex-col items-center justify-center min-h-screen font-inter gap-4 text-center">
        <h1 className="font-bold text-3xl text-appDarkBlue">
          404 Request could not be found
        </h1>
        <p className=" text-appGray">
          Pease check the route your are in or The page does not exist
        </p>
        <Link to="/dashboard">
          <p className=" w-40 py-3 bg-appGreen text-white rounded-xl flex items-center justify-center duration-300 hover:scale-105">
            <MdArrowBackIos />
            Dashboard
          </p>
        </Link>
      </div>
    </div>
  );
}

export default ErrorPage;
