import { BlockDefinition } from "@/components/blocks/types";
import { emergenciesTemplate } from "./emergencies.template";
import EmergenciesBlock from "./Emergencies";

export const emergenciesBlock: BlockDefinition = {
  template: emergenciesTemplate,
  component: EmergenciesBlock,
};
