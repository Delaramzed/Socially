import { useNavigate } from "react-router-dom";

function SideSignInCard() {
   const navigate = useNavigate();
  return (
    <div className="card bg-base-100 border-base-300 hidden border px-6 shadow-sm lg:block">
      <div className="card-body items-center gap-2 text-center">
        <h2 className="card-title text-lg font-extrabold whitespace-nowrap">
          Welcome Back!
        </h2>
        <p className="text-base-content/50 max-w-sm">
          Sign in to access your profile and connect with others.
        </p>
      </div>
      <div className="w-full space-y-3">
        <button className="btn btn-outline btn-md border-base-content/20 hover:bg-base-content/10 text-base-content w-full border font-medium capitalize"  onClick={() => navigate("/Login")}>
          Sign in
        </button>
        <button className="btn bg-base-content btn-md border-base-content/20 hover:bg-base-content/90 text-base-300 mb-6 w-full border font-medium capitalize" onClick={() => navigate("/Register")}>
          Sign up
        </button>
      </div>
    </div>
  );
}

export default SideSignInCard;
