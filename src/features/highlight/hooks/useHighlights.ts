import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { highlightRepository } from "../repositories/highlightRepository";
import type { Highlight } from "../types/highlight.types";

export const useHighlights = () => {
  const { toast } = useToast();
  const [highlightList, setHighlightList] = useState<Highlight[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadHighlights = useCallback(async (signal?: AbortSignal) => {
    try {
      const highlights = await highlightRepository.findAll(signal);
      setHighlightList(highlights);
    } catch (error) {
      if (axios.isCancel(error)) {
        return;
      }

      toast({ description: "Não foi possível carregar os destaques." });
    }
  }, [toast]);

  useEffect(() => {
    const controller = new AbortController();

    const initialLoad = async () => {
      setIsLoading(true);
      await loadHighlights(controller.signal);
      if (!controller.signal.aborted) {
        setIsLoading(false);
      }
    };

    void initialLoad();

    return () => {
      controller.abort();
    };
  }, [loadHighlights]);

  return { highlightList, isLoading };
};
