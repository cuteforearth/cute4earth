# GitHub 사진 갤러리

GitHub Pages와 GitHub API를 활용한 간단한 사진 갤러리 웹사이트입니다. 별도의 서버나 데이터베이스 없이 GitHub 저장소만으로 이미지를 업로드하고 표시할 수 있습니다.

## 기능

- GitHub 저장소의 이미지 폴더에서 이미지를 자동으로 불러옵니다
- 반응형 디자인으로 다양한 디바이스에서 사용 가능합니다
- 이미지를 클릭하면 원본 크기로 볼 수 있습니다
- 새로고침 버튼을 통해 최신 이미지를 불러올 수 있습니다

## 설정 방법

1. 이 저장소를 포크하거나 클론합니다.
2. `app.js` 파일에서 다음 설정을 수정합니다:
   ```javascript
   const config = {
       owner: 'username', // 본인의 GitHub 사용자명으로 변경
       repo: 'repo-name',  // 저장소 이름으로 변경
       path: 'images',    // 이미지가 저장될 폴더 (기본값: images)
       branch: 'main'     // 브랜치 이름 (기본값: main)
   };
   ```
3. 저장소에 `images` 폴더를 생성하고 이 폴더에 이미지 파일을 업로드합니다.
4. GitHub Pages 설정을 활성화합니다:
   - 저장소 설정 > Pages > Source에서 브랜치를 선택하고 저장합니다.
   - 일반적으로 `main` 또는 `master` 브랜치를 선택합니다.

## 이미지 업로드 방법

1. 저장소를 로컬 컴퓨터에 클론합니다:
   ```bash
   git clone https://github.com/username/repo-name.git
   ```
2. `images` 폴더에 이미지 파일을 추가합니다.
3. 변경사항을 커밋하고 푸시합니다:
   ```bash
   git add images/
   git commit -m "이미지 추가: 이미지 설명"
   git push origin main
   ```
4. 잠시 후 웹사이트에 이미지가 표시됩니다.

## GitHub Pages와 API 사용 제한

- GitHub Pages는 정적 웹사이트 호스팅 서비스이므로 파일 업로드를 위한 UI를 제공할 수 없습니다.
- GitHub API에는 인증되지 않은 요청에 대한 시간당 요청 제한(60회)이 있습니다.
- 대용량 이미지 파일은 GitHub의 저장소 크기 제한(일반적으로 1GB)에 영향을 줄 수 있습니다.

## 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요. 