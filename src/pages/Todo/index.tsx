import App from "./components/App";
import Info from "./components/Info";
import { enableLinkClickTracking } from "@snowplow/browser-plugin-link-click-tracking";
import { useEffect } from "react";

const Todo = function () {
  useEffect(() => {
    enableLinkClickTracking();
  }, [])
  return (
    <div>
      <App />
      <Info />
    </div>
  );
};

export default Todo;
