"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { CLIENT_CONFIG } from "@/config/client";

interface SuccessStepProps {
  email: string;
}

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Cal?: any;
  }
}

export function SuccessStep({ email }: SuccessStepProps) {
  const { brand, quiz } = CLIENT_CONFIG;
  const { calEmbed } = quiz;
  const scriptInjected = useRef(false);

  useEffect(() => {
    if (scriptInjected.current) return;
    scriptInjected.current = true;

    const elementId = `my-cal-inline-${calEmbed.namespace}`;

    function initCal() {
      const Cal = window.Cal;
      if (!Cal) return;

      Cal("init", calEmbed.namespace, { origin: "https://app.cal.com" });

      Cal.ns[calEmbed.namespace]("inline", {
        elementOrSelector: `#${elementId}`,
        config: {
          layout: "month_view",
          useSlotsViewOnSmallScreen: "true",
          theme: "light",
        },
        calLink: calEmbed.calLink,
      });

      Cal.ns[calEmbed.namespace]("ui", {
        theme: "light",
        cssVarsPerTheme: {
          light: { "cal-brand": calEmbed.brandColor },
        },
        hideEventTypeDetails: true,
        layout: "month_view",
      });
    }

    // If Cal.com embed.js already loaded (e.g. hot reload), init directly
    if (window.Cal) {
      initCal();
      return;
    }

    // Otherwise inject the loader shim + embed.js
    const shimScript = document.createElement("script");
    shimScript.type = "text/javascript";
    shimScript.textContent = `
      (function (C, A, L) {
        let p = function (a, ar) { a.q.push(ar); };
        let d = C.document;
        C.Cal = C.Cal || function () {
          let cal = C.Cal; let ar = arguments;
          if (!cal.loaded) {
            cal.ns = {}; cal.q = cal.q || [];
            d.head.appendChild(d.createElement("script")).src = A;
            cal.loaded = true;
          }
          if (ar[0] === L) {
            const api = function () { p(api, arguments); };
            const namespace = ar[1];
            api.q = api.q || [];
            if (typeof namespace === "string") {
              cal.ns[namespace] = cal.ns[namespace] || api;
              p(cal.ns[namespace], ar);
              p(cal, ["initNamespace", namespace]);
            } else p(cal, ar);
            return;
          }
          p(cal, ar);
        };
      })(window, "https://app.cal.com/embed/embed.js", "init");
    `;
    document.head.appendChild(shimScript);

    // Poll until Cal is ready (embed.js is async)
    let attempts = 0;
    const poll = setInterval(() => {
      attempts++;
      if (window.Cal) {
        clearInterval(poll);
        initCal();
      } else if (attempts > 40) {
        clearInterval(poll);
      }
    }, 250);

    return () => clearInterval(poll);
  }, [calEmbed]);

  return (
    <div className="w-full px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        className="text-center mb-6"
      >
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.4, type: "spring", stiffness: 200 }}
          className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
          style={{ backgroundColor: brand.primaryColorLight }}
        >
          <svg
            className="w-8 h-8"
            style={{ color: brand.primaryColor }}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.35 }}
        >
          <h2
            className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2"
            style={{ fontFamily: brand.fontHeading }}
          >
            Great news — your child qualifies!
          </h2>
          <p className="text-sm text-gray-500 max-w-sm mx-auto">
            We sent a confirmation to{" "}
            <span className="font-medium text-gray-700">{email}</span>.
            Pick a time below to speak with our team.
          </p>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm"
      >
        <div
          id={`my-cal-inline-${calEmbed.namespace}`}
          style={{ width: "100%", minHeight: "600px", overflow: "scroll" }}
        />
      </motion.div>
    </div>
  );
}
