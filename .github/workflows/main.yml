name: CI/CD Pipeline
on:
  pull_request:
    types: [opened, synchronize, reopened]
    branches: [main, dev]  # dev 브랜치로의 PR도 명시적으로 감지
  push:
    branches: [main, dev]
jobs:
  test-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v3
      
      - name: Debug Info
        run: |
          echo "Event name: ${{ github.event_name }}"
          echo "Ref: ${{ github.ref }}"
          echo "Base ref: ${{ github.base_ref }}"
          echo "Head ref: ${{ github.head_ref }}"
      
      - name: Set up Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
        
      - name: Skip tests
        run: echo "No tests specified, skipping tests" 
        
      - name: Run linting
        run: npm run lint
      
      # 빌드 환경 설정: main 브랜치면 production, 그 외에는 development
      - name: Build project for production
        if: github.event_name == 'push' && github.ref == 'refs/heads/main'
        run: npm run build:prod
        
      - name: Build project for development
        if: (github.event_name == 'pull_request') || (github.event_name == 'push' && github.ref == 'refs/heads/dev')
        run: npm run build:dev
      
      # Vercel 배포 (Production - main 브랜치인 경우)
      - name: Deploy to Vercel (Production)
        if: github.event_name == 'push' && github.ref == 'refs/heads/main'
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          github-token: ${{ secrets.GITHUB_TOKEN }}
          vercel-args: '--prod'
      
      # Vercel 배포 (Preview - PR이나 dev 브랜치 푸시인 경우)
      - name: Deploy to Vercel (Preview)
        if: (github.event_name == 'pull_request') || (github.event_name == 'push' && github.ref == 'refs/heads/dev')
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          github-token: ${{ secrets.GITHUB_TOKEN }}
          # 여기에 환경 변수를 추가할 수 있습니다
