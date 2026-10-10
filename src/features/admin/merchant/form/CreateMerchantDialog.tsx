import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/shared/components/ui/dialog";
import { Button } from "@/shared/components/ui/button/button";
import { Loader2 } from "lucide-react";

import {
  MerchantFormErrors,
  MerchantFormState,
} from "../types/merchant-form.types";
import { CreateMerchantData, Merchant } from "../types/merchant.types";

import MerchantForm from "./MerchantForm";
import { validateMerchantForm } from "./validateMerchantForm";

interface Props {
  open: boolean;
  onClose: () => void;
  onCreate: (merchant: CreateMerchantData) => Promise<Merchant>;
}

const emptyForm: MerchantFormState = {
  code: "",
  name: "",
  email: "",
  domain: "",
  isActive: true,
};

const CreateMerchantDialog = ({ open, onClose, onCreate }: Props) => {
  const [form, setForm] = useState<MerchantFormState>(emptyForm);
  const [errors, setErrors] = useState<MerchantFormErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  const resetState = () => {
    setForm(emptyForm);
    setErrors({});
  };

  const handleCancel = () => {
    onClose();
    resetState();
  };

  const handleChange = (
    field: keyof MerchantFormState,
    value: string | boolean
  ) => {
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((e) => ({ ...e, [field]: undefined }));
  };

  const onSaveCreate = async () => {
    const validationErrors = validateMerchantForm(form, { validateCode: true });

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const email = form.email.trim();
    const domain = form.domain.trim();

    const newMerchant: CreateMerchantData = {
      code: form.code.trim(),
      name: form.name.trim(),
      isActive: form.isActive,
      ...(email && { email }),
      ...(domain && { domain }),
    };

    setIsLoading(true);

    try {
      await onCreate(newMerchant);
      onClose();
      resetState();
    } catch {
      // O hook já notifica o erro.
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && handleCancel()}>
      <DialogContent className="max-h-[calc(100vh-2rem)] overflow-y-auto border-border bg-card text-card-foreground sm:max-w-[520px]">
        <DialogHeader className="border-b border-border pb-4">
          <DialogTitle className="text-xl">Nova Loja</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Preencha os dados da loja.
          </DialogDescription>
        </DialogHeader>

        <MerchantForm form={form} errors={errors} onChange={handleChange} />

        <DialogFooter className="border-t border-border pt-4">
          <Button variant="outline" onClick={handleCancel} disabled={isLoading}>
            Cancelar
          </Button>

          <Button onClick={onSaveCreate} disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isLoading ? "Salvando..." : "Confirmar Cadastro"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateMerchantDialog;
