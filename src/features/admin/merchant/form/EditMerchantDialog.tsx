import { useEffect, useState } from "react";
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
  MerchantAttributeFormItem,
  MerchantFormErrors,
  MerchantFormState,
} from "../types/merchant-form.types";
import { Merchant, UpdateMerchantData } from "../types/merchant.types";

import MerchantForm from "./MerchantForm";
import { validateMerchantForm } from "./validateMerchantForm";

interface Props {
  merchant: Merchant | null;
  onClose: () => void;
  onSave: (id: string, merchant: UpdateMerchantData) => Promise<Merchant>;
}

const toFormState = (m: Merchant | null): MerchantFormState => ({
  code: m?.code ?? "",
  name: m?.name ?? "",
  email: m?.email ?? "",
  domain: m?.domain ?? "",
  isActive: m?.isActive ?? true,
  attributes: (m?.attributes ?? []).map((a) => ({
    uid: a.id,
    key: a.key,
    type: a.type,
    productCount: a._count?.products ?? 0,
  })),
});

const EditMerchantDialog = ({ merchant, onClose, onSave }: Props) => {
  const [form, setForm] = useState<MerchantFormState>(() => toFormState(merchant));
  const [errors, setErrors] = useState<MerchantFormErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setForm(toFormState(merchant));
    setErrors({});
  }, [merchant]);

  const handleChange = (
    field: Exclude<keyof MerchantFormState, "attributes">,
    value: string | boolean
  ) => {
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((e) => ({ ...e, [field]: undefined }));
  };

  const handleAttributesChange = (attributes: MerchantAttributeFormItem[]) => {
    setForm((f) => ({ ...f, attributes }));
    setErrors((e) => ({ ...e, attributes: undefined }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void onSaveEdit();
  };

  const onSaveEdit = async () => {
    if (!merchant) return;

    const validationErrors = validateMerchantForm(form, { validateCode: false });

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const email = form.email.trim();
    const domain = form.domain.trim();

    // A API não aceita string vazia; campos limpos não são enviados.
    const updatedMerchant: UpdateMerchantData = {
      name: form.name.trim(),
      isActive: form.isActive,
      attributes: form.attributes.map((a) => ({
        key: a.key.trim(),
        type: a.type,
      })),
      ...(email && { email }),
      ...(domain && { domain }),
    };

    setIsLoading(true);

    try {
      await onSave(merchant.id, updatedMerchant);
      onClose();
    } catch {
      // O hook já notifica o erro.
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={!!merchant} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-h-[calc(100vh-2rem)] overflow-y-auto border-border bg-card text-card-foreground sm:max-w-[520px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader className="border-b border-border pb-4">
            <DialogTitle className="text-xl">Editar Loja</DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Altere os dados da loja. O código não pode ser alterado.
            </DialogDescription>
          </DialogHeader>

          <MerchantForm
            form={form}
            errors={errors}
            onChange={handleChange}
            onAttributesChange={handleAttributesChange}
            codeDisabled
          />

          <DialogFooter className="border-t border-border pt-4">
            <Button type="button" variant="outline" onClick={onClose} disabled={isLoading}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isLoading ? "Salvando..." : "Salvar Alterações"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditMerchantDialog;
