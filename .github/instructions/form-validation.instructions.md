---
applyTo: "src/**/*.{jsx,tsx}"
---

# Form validation

- Display validation errors directly below the field or group of controls that has the error.
- Associate each validation error with its corresponding field; do not show field validation errors only in a toast or a general form-level alert.
- Clear a field's error when the user corrects that field, and ensure submit validation rejects missing or incomplete required values.
- Keep errors accessible, using an appropriate live region such as `role="alert"` and `aria-invalid` where applicable.
- Reserve form-level messages for errors that do not belong to a specific field, such as a failed server request.
