import React from "react";

import HomeView from "@/layers/viewLayer/home/index.view";

export default function HomeController() {
  const [count, setCount] = React.useState(0);

  return <HomeView />;
}
