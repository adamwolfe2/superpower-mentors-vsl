"use client";

import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CLIENT_CONFIG } from "@/config/client";
import { getCalendarUrl } from "@/lib/scoring";
import { ProgressBar } from "@/components/ProgressBar";
import { WelcomeStep } from "@/components/WelcomeStep";
import { QuestionStep } from "@/components/QuestionStep";
import { EmailStep } from "@/components/EmailStep";
import { SuccessStep } from "@/components/SuccessStep";

// Steps: 0=Welcome, 1=Q1, 2=Q2, 3=Q3, 4=Email, 5=Success

export default function ApplyPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [email, setEmail] = useState("");
  const [calendarUrl, setCalendarUrl] = useState("");
  const advancing = useRef(false);

  useEffect(() => {
    if (step === 5 && email) {
      const url = getCalendarUrl(answers);
      setCalendarUrl(url);

      fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, answers }),
      }).catch(() => {
        // Fail silently — webhook is best-effort
      });
    }
  }, [step, email, answers]);

  function selectAnswer(questionKey: string, optionId: string) {
    if (advancing.current) return;
    setAnswers((prev) => ({ ...prev, [questionKey]: optionId }));
    advancing.current = true;
    setTimeout(() => {
      setStep((s) => s + 1);
      advancing.current = false;
    }, 380);
  }

  function handleEmailSubmit(submittedEmail: string) {
    setEmail(submittedEmail);
    setStep(5);
  }

  function renderStep() {
    if (step === 0) {
      return <WelcomeStep onStart={() => setStep(1)} />;
    }

    if (step >= 1 && step <= 3) {
      const q = CLIENT_CONFIG.quiz.questions[step - 1];
      return (
        <QuestionStep
          question={q}
          questionNumber={step}
          selectedOptionId={answers[q.key]}
          onSelect={selectAnswer}
        />
      );
    }

    if (step === 4) {
      return <EmailStep onSubmit={handleEmailSubmit} />;
    }

    if (step === 5) {
      return <SuccessStep calendarUrl={calendarUrl} email={email} />;
    }

    return null;
  }

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-start pt-12 pb-16 px-4">
      <div className="w-full max-w-[520px]">
        <ProgressBar step={step} />

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 48 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -48 }}
            transition={{ duration: 0.28, ease: [0.25, 0.1, 0.25, 1] }}
            className="w-full"
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>

        {step > 0 && step < 5 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-6 text-center"
          >
            <button
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
            >
              ← Go back
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
