/* 짧은 주소(○○.pages.dev)로 들어온 요청을 실제 사이트(Worker)로 그대로 전달합니다.
   - 손님 주소창에는 짧은 주소가 그대로 보입니다.
   - 대상 주소는 Pages 환경변수 TARGET_URL 로 바꿀 수 있습니다. */
const DEFAULT_TARGET = 'https://niovill.newonn42.workers.dev';

export async function onRequest({ request, env }) {
  const target = (env.TARGET_URL || DEFAULT_TARGET).replace(/\/+$/, '');
  const inUrl = new URL(request.url);
  const outUrl = target + inUrl.pathname + inUrl.search;

  const headers = new Headers(request.headers);
  headers.delete('host');
  headers.set('X-Forwarded-Host', inUrl.host);
  // 실제 사이트에서는 압축 없이 받고, 손님에게 보낼 때의 압축은 Cloudflare가 자동으로 맞춥니다
  headers.set('Accept-Encoding', 'identity');

  const hasBody = request.method !== 'GET' && request.method !== 'HEAD';
  let res;
  try {
    res = await fetch(outUrl, {
      method: request.method,
      headers,
      body: hasBody ? request.body : undefined,
      redirect: 'manual'
    });
  } catch (e) {
    return new Response('잠시 후 다시 시도해 주세요.', {
      status: 502,
      headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-store' }
    });
  }

  const outHeaders = new Headers(res.headers);
  const loc = outHeaders.get('location');
  if (loc && loc.startsWith(target)) {
    outHeaders.set('location', inUrl.origin + loc.slice(target.length));
  }
  return new Response(res.body, { status: res.status, statusText: res.statusText, headers: outHeaders });
}
