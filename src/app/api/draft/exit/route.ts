import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const draft = await draftMode();
  draft.disable();

  const slug = url.searchParams.get("slug");

  redirect(slug || "/");
}
