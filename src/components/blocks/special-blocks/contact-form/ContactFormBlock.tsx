"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { tinaField } from "tinacms/dist/react";

interface ContactFormData {
  contact_form_submitButtonText?: string;
  contact_form_successMessage?: string;
  contact_form_errorMessage?: string;
  contact_form_categories?: string[];
  contact_form_tags?: string[];
  contact_form_showPhoneField?: boolean;
  contact_form_showCategories?: boolean;
  contact_form_showTags?: boolean;
  [key: string]: unknown;
}

interface ContactFormBlockProps {
  data: ContactFormData;
  dataTinaField?: string;
  motionDelay?: number;
}

interface FormData {
  name: string;
  surname: string;
  email: string;
  phone: string;
  phoneCountryCode: string;
  subject: string;
  body: string;
  category: string;
  tags: string[];
}

interface FormErrors {
  name?: string;
  surname?: string;
  email?: string;
  phone?: string;
  subject?: string;
  body?: string;
}

type SubmitStatus = "idle" | "submitting" | "success" | "error";

const STORAGE_KEY = "contact_form_data";
const DEFAULT_PHONE_COUNTRY_CODE = "+34";

const PHONE_COUNTRY_CODES = [
  { code: "+34", label: "España", flag: "🇪🇸" },
  { code: "+351", label: "Portugal", flag: "🇵🇹" },
  { code: "+33", label: "Francia", flag: "🇫🇷" },
  { code: "+39", label: "Italia", flag: "🇮🇹" },
  { code: "+44", label: "Reino Unido", flag: "🇬🇧" },
  { code: "+49", label: "Alemania", flag: "🇩🇪" },
  { code: "+1", label: "Estados Unidos", flag: "🇺🇸" },
] as const;

const emailRegex =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const phoneRegex = /^\d{6,15}$/;

function createInitialFormData(): FormData {
  return {
    name: "",
    surname: "",
    email: "",
    phone: "",
    phoneCountryCode: DEFAULT_PHONE_COUNTRY_CODE,
    subject: "",
    body: "",
    category: "",
    tags: [],
  };
}

function normalizePhoneNumber(value: string) {
  return value.replace(/[\s()-]/g, "").trim();
}

function formatPhoneForSubmission(countryCode: string, phone: string) {
  const normalizedPhone = normalizePhoneNumber(phone);

  if (!normalizedPhone) {
    return "";
  }

  if (normalizedPhone.startsWith("+")) {
    return normalizedPhone;
  }

  return `${countryCode}${normalizedPhone}`;
}

function parseSavedFormData(saved: unknown): FormData {
  const fallback = createInitialFormData();

  if (!saved || typeof saved !== "object") {
    return fallback;
  }

  const candidate = saved as Partial<FormData>;
  const candidatePhone = typeof candidate.phone === "string" ? candidate.phone : "";
  const normalizedPhone = normalizePhoneNumber(candidatePhone);
  const savedCountryCode =
    typeof candidate.phoneCountryCode === "string" &&
    PHONE_COUNTRY_CODES.some(({ code }) => code === candidate.phoneCountryCode)
      ? candidate.phoneCountryCode
      : fallback.phoneCountryCode;

  if (normalizedPhone.startsWith("+")) {
    const matchedPrefix = PHONE_COUNTRY_CODES
      .map(({ code }) => code)
      .sort((left, right) => right.length - left.length)
      .find((code) => normalizedPhone.startsWith(code));

    return {
      ...fallback,
      ...candidate,
      phone: matchedPrefix ? normalizedPhone.slice(matchedPrefix.length) : normalizedPhone,
      phoneCountryCode: matchedPrefix || savedCountryCode,
      tags: Array.isArray(candidate.tags) ? candidate.tags : [],
    };
  }

  return {
    ...fallback,
    ...candidate,
    phone: normalizedPhone,
    phoneCountryCode: savedCountryCode,
    tags: Array.isArray(candidate.tags) ? candidate.tags : [],
  };
}

export default function ContactFormBlock({
  data,
  dataTinaField,
  motionDelay = 0,
}: ContactFormBlockProps) {
  const [formData, setFormData] = useState<FormData>(createInitialFormData());

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Set<keyof FormData>>(new Set());
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setFormData(parseSavedFormData(parsed));
      } catch (e) {
        console.error("Failed to parse saved form data:", e);
      }
    }
  }, []);

  useEffect(() => {
    const hasContent = Object.values(formData).some((value) => {
      if (Array.isArray(value)) return value.length > 0;
      return value !== "";
    });

    if (hasContent) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
    }
  }, [formData]);

  const validateField = useCallback(
    (field: keyof FormData, value: string | string[]): string | undefined => {
      switch (field) {
        case "name":
          if (!value || (typeof value === "string" && value.trim() === ""))
            return "El nombre es obligatorio";
          if (typeof value === "string" && value.length < 2)
            return "El nombre debe tener al menos 2 caracteres";
          break;
        case "surname":
          if (!value || (typeof value === "string" && value.trim() === ""))
            return "El apellido es obligatorio";
          if (typeof value === "string" && value.length < 2)
            return "El apellido debe tener al menos 2 caracteres";
          break;
        case "email":
          if (!value || (typeof value === "string" && value.trim() === ""))
            return "El correo electrónico es obligatorio";
          if (typeof value === "string" && !emailRegex.test(value))
            return "Por favor ingresa una dirección de correo válida";
          break;
        case "phone":
          if (data.contact_form_showPhoneField) {
            if (value && typeof value === "string") {
              const normalizedValue = normalizePhoneNumber(value);

              if (!phoneRegex.test(normalizedValue)) {
                return "Por favor ingresa un número de teléfono válido";
              }
            }
          }
          break;
      }
      return undefined;
    },
    [data.contact_form_showPhoneField],
  );

  const validateForm = useCallback((): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    (["name", "surname", "email", "phone", "subject", "body"] as const).forEach(
      (field) => {
        const error = validateField(field, formData[field] || "");
        if (error) {
          newErrors[field] = error;
          isValid = false;
        }
      },
    );

    setErrors(newErrors);
    return isValid;
  }, [formData, validateField]);

  const handleChange = (field: keyof FormData, value: string | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    if (touched.has(field)) {
      const error = validateField(field, value);
      setErrors((prev) => ({
        ...prev,
        [field]: error,
      }));
    }
  };

  const handleBlur = (field: keyof FormData) => {
    setTouched((prev) => new Set(prev).add(field));
    const error = validateField(field, formData[field] || "");
    setErrors((prev) => ({
      ...prev,
      [field]: error,
    }));
  };

  const handleTagToggle = (tag: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter((t) => t !== tag)
        : [...prev.tags, tag],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const allTouched = new Set<keyof FormData>([
      "name",
      "surname",
      "email",
      "phone",
      "subject",
      "body",
    ]);
    setTouched(allTouched);

    if (!validateForm()) {
      setSubmitStatus("error");
      setStatusMessage("Por favor corrige los errores antes de enviar");
      return;
    }

    setSubmitStatus("submitting");
    setStatusMessage("");

    try {
      const responsePhone = formatPhoneForSubmission(
        formData.phoneCountryCode,
        formData.phone,
      );

      const response = await fetch("/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          surname: formData.surname,
          email: formData.email,
          phone: responsePhone || undefined,
          subject: formData.subject,
          body: formData.body,
          category: formData.category,
          tags: formData.tags,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      setSubmitStatus("success");
      setStatusMessage(
        data.contact_form_successMessage ||
          "Gracias por tu mensaje. Nos pondremos en contacto contigo pronto.",
      );

      localStorage.removeItem(STORAGE_KEY);

      setTimeout(() => {
        setFormData(createInitialFormData());
        setTouched(new Set());
        setErrors({});
        setSubmitStatus("idle");
        setStatusMessage("");
      }, 5000);
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus("error");
      setStatusMessage(
        data.contact_form_errorMessage ||
          "Ha ocurrido un error al enviar tu mensaje. Intenta de nuevo.",
      );
    }
  };

  const handleClearForm = () => {
    if (
      confirm(
        "¿Estás seguro de que quieres limpiar el formulario? Se perderán todos tus datos.",
      )
    ) {
      setFormData(createInitialFormData());
      setTouched(new Set());
      setErrors({});
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: motionDelay }}
      data-tina-field={dataTinaField}
      className="w-full"
    >
      <div className="mx-auto max-w-3xl px-4">
        <form
          onSubmit={handleSubmit}
          className="space-y-3"
          noValidate
          aria-label="Formulario de contacto"
        >
          <fieldset className="grid gap-6 md:grid-cols-2">
            <legend className="sr-only">Información personal</legend>
            <div>
              <label
                htmlFor="name"
                className="mb-1 block text-sm font-semibold"
              >
                Nombre{" "}
                <span className="text-error" aria-label="obligatorio">
                  *
                </span>
              </label>
              <input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                onBlur={() => handleBlur("name")}
                className={`input input-md w-full ${
                  errors.name && touched.has("name")
                    ? "input-error"
                    : touched.has("name") && !errors.name
                      ? "input-success"
                      : ""
                }`}
                placeholder="Ingresa tu nombre"
                disabled={submitStatus === "submitting"}
                aria-required="true"
                aria-invalid={
                  errors.name && touched.has("name") ? "true" : "false"
                }
                aria-describedby={
                  errors.name && touched.has("name")
                    ? "name-error name-hint"
                    : "name-hint"
                }
                autoComplete="given-name"
              />
              <span id="name-hint" className="sr-only">
                Campo obligatorio. Mínimo 2 caracteres.
              </span>
              <AnimatePresence mode="wait">
                {errors.name && touched.has("name") && (
                  <motion.p
                    id="name-error"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-2 text-sm text-error"
                    role="alert"
                  >
                    {errors.name}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            <div>
              <label
                htmlFor="surname"
                className="mb-1 block text-sm font-semibold"
              >
                Apellido{" "}
                <span className="text-error" aria-label="obligatorio">
                  *
                </span>
              </label>
              <input
                id="surname"
                type="text"
                value={formData.surname}
                onChange={(e) => handleChange("surname", e.target.value)}
                onBlur={() => handleBlur("surname")}
                className={`input input-md w-full ${
                  errors.surname && touched.has("surname")
                    ? "input-error"
                    : touched.has("surname") && !errors.surname
                      ? "input-success"
                      : ""
                }`}
                placeholder="Ingresa tu apellido"
                disabled={submitStatus === "submitting"}
                aria-required="true"
                aria-invalid={
                  errors.surname && touched.has("surname") ? "true" : "false"
                }
                aria-describedby={
                  errors.surname && touched.has("surname")
                    ? "surname-error surname-hint"
                    : "surname-hint"
                }
                autoComplete="family-name"
              />
              <span id="surname-hint" className="sr-only">
                Campo obligatorio. Mínimo 2 caracteres.
              </span>
              <AnimatePresence mode="wait">
                {errors.surname && touched.has("surname") && (
                  <motion.p
                    id="surname-error"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-2 text-sm text-error"
                    role="alert"
                  >
                    {errors.surname}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </fieldset>

          <fieldset className={`grid gap-6 ${data.contact_form_showPhoneField ? "md:grid-cols-2" : ""}`}>
            <legend className="sr-only">Información de contacto</legend>
            <div>
              <label
                htmlFor="email"
                className="mb-1 block text-sm font-semibold"
              >
                Correo Electrónico{" "}
                <span className="text-error" aria-label="obligatorio">
                  *
                </span>
              </label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                onBlur={() => handleBlur("email")}
                className={`input input-md w-full ${
                  errors.email && touched.has("email")
                    ? "input-error"
                    : touched.has("email") && !errors.email
                      ? "input-success"
                      : ""
                }`}
                placeholder="tu.correo@email.com"
                disabled={submitStatus === "submitting"}
                aria-required="true"
                aria-invalid={
                  errors.email && touched.has("email") ? "true" : "false"
                }
                aria-describedby={
                  errors.email && touched.has("email")
                    ? "email-error email-hint"
                    : "email-hint"
                }
                autoComplete="email"
              />
              <span id="email-hint" className="sr-only">
                Campo obligatorio. Ingresa una dirección de correo electrónico
                válida.
              </span>
              <AnimatePresence mode="wait">
                {errors.email && touched.has("email") && (
                  <motion.p
                    id="email-error"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-2 text-sm text-error"
                    role="alert"
                  >
                    {errors.email}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {data.contact_form_showPhoneField ? (
              <div>
                <label
                  htmlFor="phone"
                  className="mb-1 block text-sm font-semibold"
                >
                  Teléfono
                </label>
                <div className="join w-full">
                  <select
                    id="phoneCountryCode"
                    value={formData.phoneCountryCode}
                    onChange={(e) =>
                      handleChange("phoneCountryCode", e.target.value)
                    }
                    className="select select-md join-item w-36 shrink-0"
                    disabled={submitStatus === "submitting"}
                    aria-label="Prefijo telefónico"
                  >
                    {PHONE_COUNTRY_CODES.map(({ code, label, flag }) => (
                      <option key={code} value={code}>
                        {flag} {code} {label}
                      </option>
                    ))}
                  </select>
                  <input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    onBlur={() => handleBlur("phone")}
                    className={`input input-md join-item w-full min-w-0 flex-1 ${
                      errors.phone && touched.has("phone")
                        ? "input-error"
                        : touched.has("phone") && !errors.phone
                          ? "input-success"
                          : ""
                    }`}
                    placeholder="612 345 678"
                    disabled={submitStatus === "submitting"}
                    inputMode="tel"
                    autoComplete="tel-national"
                    aria-invalid={
                      errors.phone && touched.has("phone") ? "true" : "false"
                    }
                    aria-describedby={
                      errors.phone && touched.has("phone")
                        ? "phone-error phone-hint"
                        : "phone-hint"
                    }
                  />
                </div>
                <span id="phone-hint" className="sr-only">
                  Campo opcional. Selecciona el prefijo e introduce el número sin
                  el prefijo internacional.
                </span>
                <AnimatePresence mode="wait">
                  {errors.phone && touched.has("phone") && (
                    <motion.p
                      id="phone-error"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-2 text-sm text-error"
                      role="alert"
                    >
                      {errors.phone}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            ) : null}
          </fieldset>

          {data.contact_form_showCategories &&
            data.contact_form_categories &&
            data.contact_form_categories.length > 0 && (
              <div>
                <label
                  htmlFor="category"
                  className="mb-1 block text-sm font-semibold"
                >
                  Categoría
                </label>
                <select
                  id="category"
                  value={formData.category}
                  onChange={(e) => handleChange("category", e.target.value)}
                  className="select select-md w-full pl-3"
                  disabled={submitStatus === "submitting"}
                  aria-describedby="category-hint"
                >
                  <option value="">Selecciona una opción</option>
                  {data.contact_form_categories.map((category, index) => (
                    <option key={index} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                <span id="category-hint" className="sr-only">
                  Elige la categoría que mejor describa tu consulta.
                </span>
              </div>
            )}

          <div>
            <label
              htmlFor="subject"
              className="mb-1 block text-sm font-semibold"
            >
              Asunto{" "}
              <span className="text-error" aria-label="obligatorio">
                *
              </span>
            </label>
            <input
              id="subject"
              type="text"
              value={formData.subject}
              onChange={(e) => handleChange("subject", e.target.value)}
              onBlur={() => handleBlur("subject")}
              className={`input input-md w-full ${
                errors.subject && touched.has("subject")
                  ? "input-error"
                  : touched.has("subject") && !errors.subject
                    ? "input-success"
                    : ""
              }`}
              placeholder="Consulta sobre servicios legales"
              disabled={submitStatus === "submitting"}
              aria-required="true"
              aria-invalid={
                errors.subject && touched.has("subject") ? "true" : "false"
              }
              aria-describedby={
                errors.subject && touched.has("subject")
                  ? "subject-error subject-hint"
                  : "subject-hint"
              }
            />
            <span id="subject-hint" className="sr-only">
              Campo obligatorio. Mínimo 5 caracteres. Describe brevemente el
              tema de tu mensaje.
            </span>
            <AnimatePresence mode="wait">
              {errors.subject && touched.has("subject") && (
                <motion.p
                  id="subject-error"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-2 text-sm text-error"
                  role="alert"
                >
                  {errors.subject}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {data.contact_form_showTags &&
            data.contact_form_tags &&
            data.contact_form_tags.length > 0 && (
              <fieldset>
                <legend className="mb-1 block text-sm font-semibold">
                  Etiquetas
                </legend>
                <p id="tags-hint" className="mb-1 text-sm opacity-70">
                  Selecciona las etiquetas que mejor describan tu consulta
                  (opcional)
                </p>
                <div
                  className="flex flex-wrap gap-3"
                  role="group"
                  aria-describedby="tags-hint"
                >
                  {data.contact_form_tags.map((tag, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => handleTagToggle(tag)}
                      className={`badge badge-lg transition-all ${
                        formData.tags.includes(tag)
                          ? "badge-primary"
                          : "badge-outline"
                      }`}
                      disabled={submitStatus === "submitting"}
                      aria-pressed={formData.tags.includes(tag)}
                      aria-label={`${tag}${
                        formData.tags.includes(tag) ? ", seleccionado" : ""
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </fieldset>
            )}

          <div>
            <label htmlFor="body" className="mb-1 block text-sm font-semibold">
              Mensaje{" "}
              <span className="text-error" aria-label="obligatorio">
                *
              </span>
            </label>
            <textarea
              id="body"
              value={formData.body}
              onChange={(e) => handleChange("body", e.target.value)}
              onBlur={() => handleBlur("body")}
              rows={6}
              className={`textarea textarea-md w-full resize-y ${
                errors.body && touched.has("body")
                  ? "textarea-error"
                  : touched.has("body") && !errors.body
                    ? "textarea-success"
                    : ""
              }`}
              placeholder="Describe tu consulta con el mayor detalle posible. Incluye cualquier información relevante que nos ayude a comprender mejor tu situación."
              disabled={submitStatus === "submitting"}
              aria-required="true"
              aria-invalid={
                errors.body && touched.has("body") ? "true" : "false"
              }
              aria-describedby={
                errors.body && touched.has("body")
                  ? "body-error body-hint"
                  : "body-hint"
              }
            />
            <span id="body-hint" className="sr-only">
              Campo obligatorio. Mínimo 10 caracteres. Proporciona todos los
              detalles relevantes sobre tu consulta.
            </span>
            <AnimatePresence mode="wait">
              {errors.body && touched.has("body") && (
                <motion.p
                  id="body-error"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-2 text-sm text-error"
                  role="alert"
                >
                  {errors.body}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          <AnimatePresence mode="wait">
            {statusMessage && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className={`alert ${
                  submitStatus === "success"
                    ? "alert-success"
                    : submitStatus === "error"
                      ? "alert-error"
                      : "alert-info"
                }`}
                role="alert"
                aria-live="polite"
                aria-atomic="true"
              >
                <span>{statusMessage}</span>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex justify-end flex-wrap gap-4">
            <button
              type="button"
              onClick={handleClearForm}
              disabled={submitStatus === "submitting"}
              className="btn btn-ghost btn-lg"
              aria-label="Limpiar todos los campos del formulario"
            >
              Limpiar Formulario
            </button>
            <button
              type="submit"
              disabled={submitStatus === "submitting"}
              className="btn btn-primary btn-lg flex-1 md:flex-none md:min-w-48"
              aria-label={
                submitStatus === "submitting"
                  ? "Enviando mensaje"
                  : data.contact_form_submitButtonText || "Enviar Mensaje"
              }
            >
              {submitStatus === "submitting" ? (
                <>
                  <span
                    className="loading loading-spinner loading-sm"
                    aria-hidden="true"
                  ></span>
                  <span>Enviando...</span>
                </>
              ) : (
                data.contact_form_submitButtonText || "Enviar Mensaje"
              )}
            </button>
          </div>

          <p className="text-sm opacity-60">
            <span className="text-error" aria-hidden="true">
              *
            </span>{" "}
            Indica campos obligatorios
          </p>
        </form>
      </div>
    </motion.div>
  );
}
