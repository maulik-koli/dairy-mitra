"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ExampleChips } from "@/components/workspace/ExampleChips";
import { InstructionForm } from "@/components/workspace/InstructionForm";
import { RejectBanner } from "@/components/workspace/RejectBanner";
import { ResultCard } from "@/components/workspace/ResultCard";
import { WhatsAppDraft } from "@/components/workspace/WhatsAppDraft";
import { ExtractFailure, ExtractResponse, ExtractSuccess } from "@/lib/types";

export function WorkspaceClient() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ExtractSuccess | null>(null);
  const [error, setError] = useState<ExtractFailure | null>(null);

  const handleSubmit = async () => {
    if (!text.trim()) {
      setError({
        ok: false,
        code: "INVALID_INPUT",
        message: "Please enter or speak an instruction first."
      });
      setResult(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/extract", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ text })
      });

      const data = (await response.json()) as ExtractResponse;

      if (data.ok) {
        setResult(data);
        setError(null);
      } else {
        setResult(null);
        setError(data);
      }
    } catch {
      setError({
        ok: false,
        code: "MODEL_ERROR",
        message: "Request failed. Check local dev server or remote Gemma API."
      });
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
      <div className="space-y-6">
        <InstructionForm value={text} onChange={setText} onSubmit={handleSubmit} loading={loading} />
        <div className="card-surface p-5 md:p-6">
          <ExampleChips onSelect={setText} />
        </div>
        {error ? <RejectBanner message={error.message} /> : null}
      </div>

      <div className="space-y-6">
        {result ? (
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 120, damping: 16 }}
            className="space-y-6"
          >
            <ResultCard result={result} onChange={setResult} />
            <WhatsAppDraft
              value={result.whatsappMessageGu}
              onChange={(value) => setResult({ ...result, whatsappMessageGu: value })}
            />
          </motion.div>
        ) : (
          <div className="card-surface flex min-h-[420px] items-center justify-center p-8 text-center">
            <div className="max-w-md">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--sage)]">
                Live Preview
              </p>
              <h3 className="section-title mt-3 text-3xl">The structured card appears here.</h3>
              <p className="mt-4 text-base leading-7 text-[var(--muted)]">
                Try one of the four demo phrases or speak your own Gujarati instruction to see the mock extractor fill the order and WhatsApp draft.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
