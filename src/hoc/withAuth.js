import { redirect, usePathname } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const withAuthValidation = (Component) => {
  const Auth = (props) => {
    const pathname = usePathname();
    const isLoggedIn = useSelector((state) => state?.user?.isLoggedIn);
    useEffect(() => {
      if (!isLoggedIn) {
        if (
          pathname !== "/login" &&
          pathname !== "/" &&
          !pathname.startsWith("/verify-account")
        ) {
          redirect("/login");
        }
      } else if (isLoggedIn) {
        if (
          pathname === "/login" ||
          pathname === "/" ||
          pathname.includes("/verify-account")
        ) {
          redirect("/all-business");
        }
      }
    }, [isLoggedIn, pathname]);

    return <Component {...props} />;
  };

  if (Component.getInitialProps) {
    Auth.getInitialProps = Component.getInitialProps;
  }

  return Auth;
};

export default withAuthValidation;
