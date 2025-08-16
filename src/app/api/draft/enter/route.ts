import { isUserAuthorized } from "@tinacms/auth";
import { NextApiRequest, NextApiResponse } from "next";
import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

const setCookies = async (res: NextApiResponse) => {
  const draft = await draftMode();
  draft.enable();
  res.setHeader("Set-Cookie", [`__tina-preview_ui=true; Path=/; SameSite=Lax`]);
};

export async function GET(req: Request) {
  const url = new URL(req.url);
  const draft = await draftMode();

  const slug = url.searchParams.get("slug");

  if (draft.isEnabled) {
    redirect(slug || "/");
  }

  if (process.env.NODE_ENV === "development") {
    // Enter preview-mode in local development
    // await setCookies(res);
    draft.enable();
    // const slug = Array.isArray(req.query.slug)
    //   ? req.query.slug[0]
    //   : req.query.slug;
    return redirect(slug || "/");
  }

  // Check TinaCloud token
  const token = url.searchParams.get("token");
  const clientID = process.env.NEXT_PUBLIC_TINA_CLIENT_ID;

  if (!token || !clientID) {
    // return res.status(400).json({ message: "Missing required parameters" });
    return new Response("Missing required parameters", { status: 400 });
  }

  const isAuthorizedRes = await isUserAuthorized({
    token: `Bearer ${token}`,
    clientID: clientID,
  });

  if (isAuthorizedRes) {
    // await setCookies(res);
    draft.enable();
    // const slug = Array.isArray(req.query.slug)
    //   ? req.query.slug[0]
    //   : req.query.slug;
    return redirect(slug || "/");
  }

  // return res.status(401).json({ message: "Invalid token" });
  return new Response("Invalid token", { status: 401 });
}
