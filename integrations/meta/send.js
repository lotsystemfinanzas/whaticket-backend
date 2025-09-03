
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

async function sendMessengerText(pageAccessToken, psid, text) {
  const url = `https://graph.facebook.com/v17.0/me/messages?access_token=${encodeURIComponent(pageAccessToken)}`;
  const payload = { recipient: { id: psid }, message: { text } };
  const r = await fetch(url, { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify(payload) });
  if (!r.ok) throw new Error(await r.text());
  return r.json();
}

async function sendInstagramText(igUserId, accessToken, igsid, text) {
  const url = `https://graph.facebook.com/v17.0/${igUserId}/messages?access_token=${encodeURIComponent(accessToken)}`;
  const payload = { recipient: { id: igsid }, message: { text } };
  const r = await fetch(url, { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify(payload) });
  if (!r.ok) throw new Error(await r.text());
  return r.json();
}

module.exports = { sendMessengerText, sendInstagramText };
