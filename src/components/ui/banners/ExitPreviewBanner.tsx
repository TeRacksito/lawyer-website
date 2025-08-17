import { draftMode } from "next/headers";
import ClientExitDraftBanner from "./ClientExitDraftBanner";
import ClientEnterDraftBanner from "./ClientEnterDraftBanner";

export default async function ExitDraftBanner() {
  const { isEnabled: draftIsEnabled } = await draftMode();

  if (draftIsEnabled) {
    return <ClientExitDraftBanner />;
  }

  return <ClientEnterDraftBanner />;
}
