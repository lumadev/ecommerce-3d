import { useEffect, useState } from "react";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { merchantRepository } from "../repositories/merchantRepository";
import {
  CreateMerchantData,
  Merchant,
  UpdateMerchantData,
} from "../types/merchant.types";

export const useMerchants = () => {
  const { toast } = useToast();
  const [merchantList, setMerchantList] = useState<Merchant[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    const loadMerchants = async () => {
      setIsLoading(true);

      try {
        const merchants = await merchantRepository.findAll(controller.signal);
        setMerchantList(merchants);
      } catch (error) {
        if (axios.isCancel(error)) {
          return;
        }

        toast({ description: "Não foi possível carregar as lojas." });
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    loadMerchants();

    return () => {
      controller.abort();
    };
  }, []);

  const createMerchant = async (data: CreateMerchantData) => {
    try {
      const created = await merchantRepository.create(data);
      setMerchantList((prev) => [created, ...prev]);

      toast({ description: "Loja criada com sucesso." });
      return created;
    } catch (error) {
      toast({ description: "Não foi possível criar a loja." });
      throw error;
    }
  };

  const updateMerchant = async (id: string, data: UpdateMerchantData) => {
    try {
      const updated = await merchantRepository.update(id, data);
      setMerchantList((prev) => prev.map((m) => (m.id === id ? updated : m)));

      toast({ description: "Loja atualizada com sucesso." });
      return updated;
    } catch (error) {
      toast({ description: "Não foi possível atualizar a loja." });
      throw error;
    }
  };

  return {
    merchantList,
    isLoading,
    createMerchant,
    updateMerchant,
  };
};
