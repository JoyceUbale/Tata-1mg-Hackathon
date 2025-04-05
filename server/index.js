// hooks.js (CommonJS style)

  let preServerInit = () => {
    console.log("[Catalyst] Server initializing...");
  };
  let onServerError = (error) => {
    console.error("[Catalyst] Server failed to start:", error);
  };
  let onRouteMatch = (match, req) => {
    console.log(`[Catalyst] Route matched: ${req.url}`);
  };
  let onFetcherSuccess = (data) => {
    console.log("[Catalyst] Data fetching completed successfully");
  };
  let onRenderError = (error) => {
    console.error("[Catalyst] Rendering error:", error);
  };
  let onRequestError = (error) => {
    console.error("[Catalyst] Request error:", error);
  }

module.exports = {
  preServerInit,
  onServerError,
  onRouteMatch,
  onFetcherSuccess,
  onRenderError,
  onRequestError
};
