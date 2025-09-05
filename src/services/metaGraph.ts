import axios from "axios";

const API_VERSION = process.env.META_API_VERSION || "v23.0";
const GRAPH = `https://graph.facebook.com/${API_VERSION}`;

export async function getAccessTokenFromCode(code: string, redirectUri: string) {
  const appId = process.env.META_APP_ID as string;
  const appSecret = process.env.META_APP_SECRET as string;
  const url = `${GRAPH}/oauth/access_token`;
  const { data } = await axios.get(url, { params: { client_id: appId, client_secret: appSecret, redirect_uri: redirectUri, code } });
  return data; // { access_token, token_type, expires_in }
}

export async function exchangeLongLivedToken(userAccessToken: string) {
  const appId = process.env.META_APP_ID as string;
  const appSecret = process.env.META_APP_SECRET as string;
  const url = `${GRAPH}/oauth/access_token`;
  const { data } = await axios.get(url, { params: { grant_type: "fb_exchange_token", client_id: appId, client_secret: appSecret, fb_exchange_token: userAccessToken } });
  return data; // { access_token, token_type, expires_in }
}

export async function getUserPages(userToken: string) {
  const { data } = await axios.get(`${GRAPH}/me/accounts`, { params: { access_token: userToken } });
  return data; // { data: [{id, name, access_token}, ...] }
}

export async function getPageInfo(pageId: string, accessToken: string) {
  const fields = "name,access_token,instagram_business_account";
  const { data } = await axios.get(`${GRAPH}/${pageId}`, { params: { fields, access_token: accessToken } });
  return data;
}

export async function subscribeAppToPage(pageId: string, pageAccessToken: string) {
  const fields = "messages,messaging_postbacks";
  const { data } = await axios.post(`${GRAPH}/${pageId}/subscribed_apps`, null, { params: { subscribed_fields: fields, access_token: pageAccessToken } });
  return data;
}
