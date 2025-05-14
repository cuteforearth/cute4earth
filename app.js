// GitHub 저장소 설정
const config = {
    owner: 'cuteforearth', // GitHub 사용자명으로 변경
    repo: 'cute_for_earth',  // 저장소 이름으로 변경
    path: 'images',    // 이미지가 저장될 폴더
    branch: 'main'     // 브랜치 이름
};

// 다국어 지원 - 언어 데이터
const translations = {
    'ko': {
        'title': 'CUTE',
        'subtitle': '',
        'gallery_title': '',
        'refresh': '<i class="fas fa-sync-alt"></i> 새로고침',
        'loading': '<i class="fas fa-spinner fa-pulse"></i>',
        'no_images': '<i class="fas fa-exclamation-circle"></i> 이미지가 없습니다. GitHub 저장소에 이미지를 추가해주세요.',
        'error_prefix': '<i class="fas fa-exclamation-triangle"></i> 오류 발생: ',
        'footer': '',
        'repo_link': '',
        'lang_ko': '한국어',
        'lang_fr': '프랑스어'
    },
    'fr': {
        'title': 'CUTE',
        'subtitle': '',
        'gallery_title': '',
        'refresh': '<i class="fas fa-sync-alt"></i> Actualiser',
        'loading': '<i class="fas fa-spinner fa-pulse"></i>',
        'no_images': '<i class="fas fa-exclamation-circle"></i> Aucune image. Veuillez ajouter des images au dépôt GitHub.',
        'error_prefix': '<i class="fas fa-exclamation-triangle"></i> Erreur: ',
        'footer': '',
        'repo_link': '',
        'lang_ko': 'Coréen',
        'lang_fr': 'Français'
    }
};

// 현재 언어 설정 (기본값: 한국어)
let currentLang = localStorage.getItem('language') || 'ko';

// DOM 요소
const galleryEl = document.getElementById('gallery');
const refreshBtn = document.getElementById('refreshGallery');
const langButtons = document.querySelectorAll('.lang-btn');
const currentLangEl = document.getElementById('current-lang');

// 페이지 언어 변경 함수
function changeLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('language', lang);
    
    // 페이지 타이틀 변경
    document.title = translations[lang]['title'] || 'Gallery';
    
    // HTML 요소 텍스트 변경
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang][key]) {
            element.innerHTML = translations[lang][key];
        }
    });
    
    // 현재 언어 표시 업데이트
    currentLangEl.textContent = translations[lang][`lang_${lang}`];
    
    // 언어 버튼 활성화 상태 변경
    langButtons.forEach(button => {
        const buttonLang = button.getAttribute('data-lang');
        // 모든 체크 아이콘 숨기기
        button.querySelector('.fa-check').style.display = 'none';
        
        // 현재 언어에만 체크 아이콘 표시
        if (buttonLang === lang) {
            button.querySelector('.fa-check').style.display = 'inline-block';
        }
    });
    
    // 갤러리 다시 로드 (텍스트 변경을 위해)
    fetchImages();
}

// GitHub API를 사용하여 이미지 목록 가져오기
async function fetchImages() {
    try {
        // 로딩 표시
        galleryEl.innerHTML = `<div class="loading">${translations[currentLang]['loading']}</div>`;
        
        // GitHub API 엔드포인트
        const apiUrl = `https://api.github.com/repos/${config.owner}/${config.repo}/contents/${config.path}?ref=${config.branch}`;
        
        // API 요청
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
            throw new Error(`GitHub API 오류: ${response.status}`);
        }
        
        const data = await response.json();
        
        // 이미지만 필터링 (일반적인 이미지 확장자)
        const imageFiles = data.filter(file => {
            const extension = file.name.split('.').pop().toLowerCase();
            return ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(extension);
        });
        
        if (imageFiles.length === 0) {
            galleryEl.innerHTML = `<div class="loading">${translations[currentLang]['no_images']}</div>`;
            return;
        }
        
        // 갤러리 렌더링
        renderGallery(imageFiles);
    } catch (error) {
        console.error('이미지를 가져오는 중 오류 발생:', error);
        galleryEl.innerHTML = `<div class="loading">${translations[currentLang]['error_prefix']}${error.message}</div>`;
    }
}

// 갤러리 렌더링 함수
function renderGallery(images) {
    galleryEl.innerHTML = '';
    
    images.forEach(image => {
        // 이미지 요소 생성
        const imgItem = document.createElement('div');
        imgItem.className = 'gallery-item';
        
        // 이미지 이름 정리 (확장자 제거 및 밑줄을 공백으로 변경)
        const imageName = image.name.split('.')[0].replace(/_/g, ' ');
        
        imgItem.innerHTML = `
            <img src="${image.download_url}" alt="${imageName}" loading="lazy">
            <div class="caption">${imageName}</div>
        `;
        
        // 클릭 시 원본 이미지 열기
        imgItem.addEventListener('click', () => {
            window.open(image.download_url, '_blank');
        });
        
        galleryEl.appendChild(imgItem);
    });
}

// 페이지 로드 시 실행
document.addEventListener('DOMContentLoaded', () => {
    // 드롭다운 메뉴 토글 기능
    const dropdownBtn = document.querySelector('.dropdown-btn');
    const dropdownContent = document.querySelector('.dropdown-content');
    
    if (dropdownBtn) {
        dropdownBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            dropdownContent.classList.toggle('show');
        });
        
        // 다른 곳을 클릭하면 드롭다운 닫기
        document.addEventListener('click', () => {
            if (dropdownContent.classList.contains('show')) {
                dropdownContent.classList.remove('show');
            }
        });
        
        // 드롭다운 내부 클릭 시 이벤트 버블링 방지
        dropdownContent.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }
    
    // 언어 버튼 이벤트 리스너 설정
    langButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const lang = button.getAttribute('data-lang');
            changeLanguage(lang);
            // 언어 선택 후 드롭다운 닫기
            dropdownContent.classList.remove('show');
        });
    });
    
    // 현재 언어로 페이지 초기화
    changeLanguage(currentLang);
    
    // 새로고침 버튼 이벤트 리스너
    if (refreshBtn) {
        refreshBtn.addEventListener('click', (e) => {
            e.preventDefault();
            fetchImages();
        });
    }
}); 