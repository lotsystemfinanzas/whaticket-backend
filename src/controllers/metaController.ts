import { Request, Response } from "express";
import Integration from "../models/Integration";
import { getAccessTokenFromCode, exchangeLongLivedToken, getUserPages, getPageInfo, subscribeAppToPage } from "../services/metaGraph";

function buildAuthUrl(scope: string[], state: string, redirectUri: string) {
  const appId = process.env.META_APP_ID as string;
  const apiVersion = process.env.META_API_VERSION || "v23.0";
  const params = new URLSearchParams({
    client_id: String(appId),
    redirect_uri: redirectUri,
    state,
    scope: scope.join(","),
    response_type: "code"
  });
  return `https://www.facebook.com/${apiVersion}/dialog/oauth?${params.toString()}`;
}

export async function instagramConnect(req: Request, res: Response) {
  const { redirectUri } = req.body || {};
  if (!redirectUri) return res.status(400).json({ error: "redirectUri required" });
  const scope = [
    "pages_show_list",
    "pages_manage_metadata",
    "pages_messaging",
    "instagram_basic",
    "instagram_manage_messages",
    "instagram_manage_insights"
  ];
  const authUrl = buildAuthUrl(scope, "instagram", redirectUri);
  return res.json({ authUrl });
}

export async function messengerConnect(req: Request, res: Response) {
  const { redirectUri } = req.body || {};
  if (!redirectUri) return res.status(400).json({ error: "redirectUri required" });
  const scope = ["pages_show_list","pages_manage_metadata","pages_messaging"];
  const authUrl = buildAuthUrl(scope, "messenger", redirectUri);
  return res.json({ authUrl });
}

export async function metaCallback(req: Request, res: Response) {
  try {
    const code = String(req.query.code || "");
    const state = String(req.query.state || "messenger"); // which channel we intended
    const redirectUri = `${req.protocol}://${req.get("host")}/meta/callback`;

    if (!code) return res.status(400).send("Missing code");

    // 1) exchange code for user token
    const shortTok = await getAccessTokenFromCode(code, redirectUri);
    const longTok = await exchangeLongLivedToken(shortTok.access_token);
    const userToken = longTok.access_token || shortTok.access_token;

    // 2) get pages for user
    const pages = await getUserPages(userToken);
    if (!pages?.data?.length) {
      return res.status(200).send("<h3>No encontramos páginas asociadas a este usuario.</h3>");
    }

    // 3) choose first page (demo)
    const page = pages.data[0];
    const pageInfo = await getPageInfo(page.id, userToken);
    const pageAccessToken = (pageInfo.access_token || page.access_token) as string;

    try { await subscribeAppToPage(page.id, pageAccessToken); } catch(e) { console.log("subscribe error (ignored):", (e as any)?.response?.data || (e as any)?.message); }

    const payload:any = {
      type: state === "instagram" ? "instagram" : "messenger",
      pageId: String(page.id),
      igUserId: pageInfo?.instagram_business_account?.id || null,
      name: String(pageInfo?.name || page?.name || ""),
      accessToken: pageAccessToken,
      expiresAt: null,
      data: pageInfo,
      isActive: true
    };

    const [row, created] = await Integration.findOrCreate({
      where: { type: payload.type, pageId: payload.pageId },
      defaults: payload
    });
    if (!created) await row.update(payload);

    return res.send("<h2>Cuenta autorizada y guardada. Ya puedes volver a la aplicación.</h2>");
  } catch (e:any) {
    console.error("meta/callback error:", e.response?.data || e.message);
    return res.status(500).send("Error al autorizar con Meta");
  }
}
