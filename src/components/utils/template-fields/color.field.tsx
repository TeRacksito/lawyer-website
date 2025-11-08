import React from "react";
import { Template } from "tinacms";

export const colorField: Template["fields"][number] = {
    type: "string",
    name: "bgColor",
    label: "Color de fondo",
    description: "Selecciona el color de fondo de la tarjeta",
    options: [
        { value: "bg-base-200", label: "Base 200" },
        { value: "bg-primary/10", label: "Primario" },
        { value: "bg-secondary/10", label: "Secundario" },
        { value: "bg-accent/10", label: "Acento" },
        { value: "bg-info/10", label: "Información" },
        { value: "bg-success/10", label: "Éxito" },
        { value: "bg-warning/10", label: "Advertencia" },
        { value: "bg-error/10", label: "Error" },
    ],
};
