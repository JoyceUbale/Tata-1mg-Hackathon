import Dashboard from "@/pages/Dashboard";
import LightsControl from "@/pages/LightsControl";
import ThermostatControl from "@/pages/ThermostatControl";
import SecurityControl from "@/pages/SecurityControl";
import VoiceControlPage from "@/pages/VoiceControlPage";
import DeviceHistoryPage from "@/pages/DeviceHistoryPage";
import Settings from "@/pages/Settings";
import NotFound from "@/pages/NotFound";

const routes = [
  {
    path: "/",
    index: true,
    component: Dashboard,
    clientFetcher: () => Promise.resolve({ status: "success" }),
    serverFetcher: () => Promise.resolve({ status: "success" })
  },
  {
    path: "/lights",
    component: LightsControl,
    clientFetcher: () => Promise.resolve({ status: "success" }),
    serverFetcher: () => Promise.resolve({ status: "success" })
  },
  {
    path: "/thermostat",
    component: ThermostatControl,
    clientFetcher: () => Promise.resolve({ status: "success" }),
    serverFetcher: () => Promise.resolve({ status: "success" })
  },
  {
    path: "/security",
    component: SecurityControl,
    clientFetcher: () => Promise.resolve({ status: "success" }),
    serverFetcher: () => Promise.resolve({ status: "success" })
  },
  {
    path: "/voice",
    component: VoiceControlPage,
    clientFetcher: () => Promise.resolve({ status: "success" }),
    serverFetcher: () => Promise.resolve({ status: "success" })
  },
  {
    path: "/history",
    component: DeviceHistoryPage,
    clientFetcher: () => Promise.resolve({ status: "success" }),
    serverFetcher: () => Promise.resolve({ status: "success" })
  },
  {
    path: "/settings",
    component: Settings,
    clientFetcher: () => Promise.resolve({ status: "success" }),
    serverFetcher: () => Promise.resolve({ status: "success" })
  },
  {
    path: "*",
    component: NotFound
  }
];

export default routes;
