# 짧은 주소 연결 (선택)

Cloudflare Pages 프로젝트(예: `niovill.pages.dev`)로 들어온 손님을 실제 사이트(Worker)로 그대로 연결합니다.
주소창에는 짧은 주소가 계속 보입니다.

Pages 설정
- Root directory: `extras/pages-proxy`
- Build output directory: `public`
- Build command: 비움
- (선택) 환경변수 `TARGET_URL` = 실제 사이트 주소 (예: `https://niovill.계정.workers.dev`)
