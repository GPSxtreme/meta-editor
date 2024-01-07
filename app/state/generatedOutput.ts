import { create } from "zustand";

interface GeneratedOutput {
  output: string | null;
  setOutput: (newOutput: string) => void;
}

export const useGeneratedOutput = create<GeneratedOutput>((set) => ({
  output: null,
  setOutput: (newOutput: string) => {
    set({
      output: newOutput,
    });
  },
}));
