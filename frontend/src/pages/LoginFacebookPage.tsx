import React, { useEffect } from "react";
import LoginLayout from "layouts/LoginLayout";
import LoginContainer from "containers/LoginContainer";
import FacebookLogin from "react-facebook-login";

declare global {
  interface Window {
    fbAsyncInit: () => void;
    FB: any;
  }
}
const LoginFacebookPage: React.FC = () => {
  // useEffect(() => {
  //   window.fbAsyncInit = function () {
  //     window.FB.init({
  //       appId: "531932561113193", // replaced this with my app id
  //       cookie: true,
  //       xfbml: true,
  //       version: "v3.1",
  //     });
  //     // window.FB.Event.subscribe("auth.statusChange", (res: any) => {
  //     //   if (res.authResponse) {
  //     //     this.updateLoggedInState(res);
  //     //   } else {
  //     //     this.updateLoggedOutState();
  //     //   }
  //     // }).bind(this);
  //     (function (d: any, s: any, id: any) {
  //       const fjs = d.getElementsByTagName(s)[0];
  //       if (d.getElementById(id)) {
  //         return;
  //       }
  //       const js = d.createElement(s);
  //       js.id = id;
  //       js.src = "https://connect.facebook.net/en_US/sdk.js";
  //       fjs.parentNode.insertBefore(js, fjs);
  //     })(document, "script", "facebook-jssdk");
  //   };
  // }, []);
  const componentClicked = (data: any) => {
    console.log(`data:${data}`);
  };
  const responseFacebook = (response: any) => {
    console.log(response);
  };
  return (
    <FacebookLogin
      appId="1287688628300034"
      autoLoad
      fields="name,email,picture"
      onClick={componentClicked}
      callback={responseFacebook}
    />
  );
};

export default LoginFacebookPage;
