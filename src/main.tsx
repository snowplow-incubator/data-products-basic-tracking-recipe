import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "todomvc-app-css/index.css";
import Todo from "./pages/Todo";
import "./styles.css";

import {
  enableActivityTracking,
  newTracker,
  trackPageView,
} from "@snowplow/browser-tracker";
import {
  LinkClickTrackingPlugin,
} from "@snowplow/browser-plugin-link-click-tracking";

newTracker("t1", "https://collector-sales-aws.snowplow.io", {
  appId: "todo-web-dev",
  plugins: [LinkClickTrackingPlugin()],
});

enableActivityTracking({
  minimumVisitLength: 30,
  heartbeatDelay: 10,
});

trackPageView();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Todo />
  </StrictMode>
);
