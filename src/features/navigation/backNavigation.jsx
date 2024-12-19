import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function PreventBackNavigation({ children }) {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {

    const protectedRoutes = ["/ForgotPassword", "/forgotpassword/otp", "/otp", "/createpassword"];

    if (protectedRoutes.includes(location.pathname)) {
      const handlePopState = () => {
        navigate("/login", { replace: true });
      };

      window.addEventListener("popstate", handlePopState);

      return () => {
        window.removeEventListener("popstate", handlePopState);
      };
    }
  }, [location, navigate]);

  return children;
}

export default PreventBackNavigation;
