import { isUserAuthorized } from "@tinacms/auth";
import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const draft = await draftMode();

  const slug = url.searchParams.get("slug");

  if (draft.isEnabled) {
    redirect(slug || "/");
  }

  if (process.env.NODE_ENV === "development") {
    draft.enable();
    return redirect(slug || "/");
  }

  const token = url.searchParams.get("token");
  const clientID = process.env.NEXT_PUBLIC_TINA_CLIENT_ID;

  if (!token || !clientID) {
    return new Response("Missing required parameters", { status: 400 });
  }

  const isAuthorizedRes = await isUserAuthorized({
    token: `Bearer ${token}`,
    clientID: clientID,
  });

  if (isAuthorizedRes) {
    draft.enable();
    return redirect(slug || "/");
  }

  return new Response("Invalid token", { status: 401 });
}
