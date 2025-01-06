```
📦src
 ┣ 📦networks (apis를 모아둔 폴더로, data-access에 대해서 다루는 로직을 포함한 폴더)
 ┃ ┣ 📂apis           # API 경로만 정의
 ┃ ┃ ┣ 📜index.ts     # 공통 라우터 또는 경로 통합
 ┃ ┃ ┗ 📜user.ts      # 사용자 관련 API 경로
 ┃ ┣ 📂clients        # 클라이언트 설정 (axios, fetch 등)
 ┃ ┃ ┣ 📜index.ts     # 클라이언트 초기화 및 설정 통합
 ┃ ┃ ┣ 📜private.ts   # 인증된 요청 클라이언트
 ┃ ┃ ┗ 📜public.ts    # 비인증 요청 클라이언트
 ┃ ┣ 📂apis           # API 호출 함수
 ┃ ┃ ┣ 📜index.ts     # API 호출 함수 통합
 ┃ ┃ ┗ 📜user.api.ts  # 사용자 관련 API 호출 함수
 ┃ ┣ 📂types          # API 요청/응답 타입
 ┃ ┃ ┣ 📜index.ts     # 타입 통합
 ┃ ┃ ┗ 📜api.type.ts  # API 타입 정의
 ┃ ┗ 📜index.ts       # 서비스 통합

```
