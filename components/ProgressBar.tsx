"use client";

import { motion } from "framer-motion";
import { CLIENT_CONFIG } from "@/config/client";

interface ProgressBarProps {
  step: number;
}

const QUESTION_STEPS = 3;

export function ProgressBar({ step }: ProgressBarProps) {
  const questionProgress = step >= 1 && step <= 3 ? step : step > 3 ? 3 : 0;
  const visible = step >= 1 && step <= 4;

  if (!visible) return null;

  return (
    <div className="w-full mb-8">
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs text-gray-400 font-medium">
          {step <= 3 ? `Question ${step} of ${QUESTION_STEPS}` : "Almost done"}
        </span>
        <span className="text-xs text-gray-400 font-medium">
          {Math.round((questionProgress / QUESTION_STEPS) * 100)}%
        </span>
      </div>
      <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
        <motion.div
          className="h-1.5 rounded-full"
          style={{ backgroundColor: CLIENT_CONFIG.brand.primaryColor }}
          animate={{ width: `${(questionProgress / QUESTION_STEPS) * 100}%` }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}
