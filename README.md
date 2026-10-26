# 니오빌 원룸텔 홈페이지 (niovill)

- 호스팅: Cloudflare Pages (무료) — `niovill.pages.dev`
- 배포 폴더: `public`
- 빌드 명령: 없음

## 진행 단계
| 단계 | 내용 | 상태 |
|---|---|---|
| 1 | 손님 화면 (고정 데이터) | ✅ |
| 2 | 공실 데이터베이스(D1) 연결 | ✅ |
| 3 | 관리자 로그인 + 공실 관리 | |
| 4 | 신청서 저장 + 신청함 | |
| 5 | 텔레그램 알림 | |
| 6 | 내용 수정 + 사진 + 호실 추가 | |
| 7 | 개인정보처리방침 · 자동 삭제 · 내보내기 · 검색 설정 | |
| 8 | 실제 내용 입력 → 오픈 (검색 차단 해제) | |

오픈 전까지 `robots.txt`와 `_headers`로 검색 수집을 막아 둡니다.

## 구조
- `public/` 화면 파일 · `functions/index.js` 홈 화면에 실제 공실을 채움 · `db/schema.sql` 방 테이블 + 처음 데이터
- 데이터베이스: D1 `niovill-db`, Pages 연결 이름 `DB`
- 데이터를 못 읽으면 "공실은 문의해 주세요" 안전 화면이 나옴

## 방 상태 값
| 값 | 뜻 |
|---|---|
| occupied | 입실중 |
| empty | 공실 (지금 입실 가능) |
| soon | 입실예정 (퇴실 예정 방) · `avail_date`에 날짜(YYYY-MM-DD), 없으면 "곧 입실 가능" |
| hidden | 화면에 안 보임 (사무실) |

3단계 관리자 화면 전까지는 D1 Console에서 바꿉니다. 예:
`UPDATE rooms SET status='empty', avail_date=NULL WHERE no='604';`
