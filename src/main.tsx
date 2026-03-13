import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Initialize Facebook Pixel
declare global {
  interface Window {
    fbq: any;
  }
}

export const trackFacebookEvent = (eventName: string, data?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', eventName, data);
  }
};

// Track page views
if (typeof window !== 'undefined' && window.fbq) {
  window.fbq('track', 'PageView');
}

createRoot(document.getElementById("root")!).render(<App />);
