// SBSKHP 교육 서비스 플랫폼 - 메인 JavaScript 파일

// 현재 활성 페이지 상태
let currentPage = 'home';

// DOM 로드 완료 후 초기화
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    handleInitialRoute();
});

// 앱 초기화
function initializeApp() {
    console.log('SBSKHP 교육 서비스 플랫폼 초기화');
    
    // 초기 페이지 로드
    loadPage('home');
    
    // 브라우저 뒤로/앞으로 버튼 처리
    window.addEventListener('popstate', handlePopState);
    
    // 외부 클릭시 모바일 메뉴 닫기
    document.addEventListener('click', handleOutsideClick);
}

// 이벤트 리스너 설정
function setupEventListeners() {
    // 데스크톱 내비게이션 메뉴
    const desktopNavItems = document.querySelectorAll('#desktop-nav .nav-item');
    desktopNavItems.forEach(item => {
        item.addEventListener('click', handleNavigation);
    });
    
    // 모바일 내비게이션 메뉴
    const mobileNavItems = document.querySelectorAll('#mobile-nav .mobile-nav-item');
    mobileNavItems.forEach(item => {
        item.addEventListener('click', handleNavigation);
    });
    
    // 모바일 메뉴 토글 버튼
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', toggleMobileMenu);
    }
    
    // 에러 모달 닫기 버튼
    const errorClose = document.getElementById('error-close');
    if (errorClose) {
        errorClose.addEventListener('click', closeErrorModal);
    }
}

// 초기 라우트 처리
function handleInitialRoute() {
    const hash = window.location.hash.slice(1) || 'home';
    if (isValidPage(hash)) {
        loadPage(hash);
    } else {
        loadPage('home');
        window.location.hash = 'home';
    }
}

// 팝스테이트 이벤트 처리
function handlePopState(event) {
    const hash = window.location.hash.slice(1) || 'home';
    if (isValidPage(hash)) {
        loadPage(hash);
    }
}

// 내비게이션 클릭 처리
function handleNavigation(event) {
    event.preventDefault();
    const page = event.currentTarget.getAttribute('data-page');
    
    if (page && isValidPage(page)) {
        // URL 해시 업데이트
        window.location.hash = page;
        
        // 페이지 로드
        loadPage(page);
        
        // 모바일 메뉴 닫기
        closeMobileMenu();
    }
}

// 유효한 페이지인지 확인
function isValidPage(page) {
    const validPages = ['home', 'schedule', 'education', 'apply', 'confirm', 'faq'];
    return validPages.includes(page);
}

// 페이지 로드 메인 함수
async function loadPage(page) {
    showLoadingSpinner();
    updateActiveNavigation(page);
    currentPage = page;
    
    try {
        let content = '';
        
        switch(page) {
            case 'home':
                content = renderHomePage();
                break;
            case 'schedule':
                content = renderSchedulePage();
                break;
            case 'education':
                content = await renderEducationPage();
                break;
            case 'apply':
                content = renderApplyPage();
                break;
            case 'confirm':
                content = renderConfirmPage();
                break;
            case 'faq':
                content = await renderFaqPage();
                break;
            default:
                content = renderHomePage();
        }
        
        const contentContainer = document.getElementById('content-container');
        if (contentContainer) {
            contentContainer.innerHTML = content;
            contentContainer.className = 'content-fade-in';
            
            // 페이지별 추가 초기화
            initializePageSpecificFeatures(page);
        }
        
    } catch (error) {
        console.error('페이지 로드 오류:', error);
        showErrorModal('페이지를 불러오는 중 오류가 발생했습니다.');
    } finally {
        hideLoadingSpinner();
    }
}

// 활성 내비게이션 업데이트
function updateActiveNavigation(page) {
    // 데스크톱 내비게이션
    const desktopNavItems = document.querySelectorAll('#desktop-nav .nav-item');
    desktopNavItems.forEach(item => {
        const itemPage = item.getAttribute('data-page');
        if (itemPage === page) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
    
    // 모바일 내비게이션
    const mobileNavItems = document.querySelectorAll('#mobile-nav .mobile-nav-item');
    mobileNavItems.forEach(item => {
        const itemPage = item.getAttribute('data-page');
        if (itemPage === page) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

// 홈 페이지 렌더링
function renderHomePage() {
    return `
        <div class="content-card">
            <div style="text-align: center; margin-bottom: 2rem;">
                <h1 style="font-size: 2.25rem; font-weight: bold; margin-bottom: 1rem;" class="gradient-text">SBSKHP 교육 서비스 플랫폼</h1>
                <p style="font-size: 1.25rem; color: #6b7280;">전문적인 교육 서비스를 통해 여러분의 성장을 지원합니다</p>
            </div>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem; margin-bottom: 2rem;">
                <div style="background: linear-gradient(135deg, #eef2ff 0%, #e0e7ff 100%); padding: 1.5rem; border-radius: 8px; text-align: center;" class="hover-lift">
                    <div style="width: 48px; height: 48px; margin: 0 auto 1rem; background-color: #4f46e5; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                        <svg style="width: 24px; height: 24px; color: white;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                        </svg>
                    </div>
                    <h3 style="font-size: 1.125rem; font-weight: 600; margin-bottom: 0.5rem;">실시간 교육 일정</h3>
                    <p style="color: #6b7280; font-size: 0.875rem;">최신 교육 일정을 확인하세요</p>
                </div>
                
                <div style="background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%); padding: 1.5rem; border-radius: 8px; text-align: center;" class="hover-lift">
                    <div style="width: 48px; height: 48px; margin: 0 auto 1rem; background-color: #059669; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                        <svg style="width: 24px; height: 24px; color: white;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                        </svg>
                    </div>
                    <h3 style="font-size: 1.125rem; font-weight: 600; margin-bottom: 0.5rem;">다양한 교육 과정</h3>
                    <p style="color: #6b7280; font-size: 0.875rem;">전문 강사진이 제공하는 체계적인 교육 프로그램</p>
                </div>
                
                <div style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); padding: 1.5rem; border-radius: 8px; text-align: center; grid-column: 1 / -1;" class="hover-lift">
                    <div style="width: 48px; height: 48px; margin: 0 auto 1rem; background-color: #d97706; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                        <svg style="width: 24px; height: 24px; color: white;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path    stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                        </svg>
                    </div>
                    <h3 style="font-size: 1.125rem; font-weight: 600; margin-bottom: 0.5rem;">간편한 신청 시스템</h3>
                    <p style="color: #6b7280; font-size: 0.875rem;">온라인으로 간편하게 교육 신청 및 확인 가능</p>
                </div>
            </div>
            
            <div style="background: linear-gradient(135deg, #4f46e5 0%, #3730a3 100%); color: white; padding: 2rem; border-radius: 8px; text-align: center;">
                <h2 style="font-size: 1.5rem; font-weight: bold; margin-bottom: 1rem;">지금 시작해보세요!</h2>
                <p style="margin-bottom: 1.5rem;">최신 교육 정보를 확인하고 원하는 과정에 신청하세요</p>
                <div style="display: flex; flex-direction: column; gap: 1rem; align-items: center;">
                    <button onclick="loadPage('education')" style="background-color: white; color: #4f46e5; font-weight: 600; padding: 12px 24px; border-radius: 6px; border: none; cursor: pointer; transition: all 0.2s;" onmouseover="this.style.backgroundColor='#f3f4f6'" onmouseout="this.style.backgroundColor='white'">
                        교육 정보 보기
                    </button>
                    <button onclick="loadPage('apply')" style="border: 2px solid white; background: transparent; color: white; font-weight: 600; padding: 12px 24px; border-radius: 6px; cursor: pointer; transition: all 0.2s;" onmouseover="this.style.backgroundColor='white'; this.style.color='#4f46e5'" onmouseout="this.style.backgroundColor='transparent'; this.style.color='white'">
                        교육 신청하기
                    </button>
                </div>
            </div>
        </div>
    `;
}

// 교육 일정 페이지 렌더링
function renderSchedulePage() {
    const scheduleData = [
        {
            date: { month: "1월", day: "15" },
            title: "AI 기초 및 머신러닝 입문 1회차 시작",
            period: "2025.01.15 ~ 2025.02.28",
            instructor: "김민수",
            status: "모집중"
        },
        {
            date: { month: "1월", day: "20" },
            title: "AI 윤리 & 책임감 있는 AI 6회차 시작",
            period: "2025.01.20 ~ 2025.02.20",
            instructor: "한승우",
            status: "모집마감"
        },
        {
            date: { month: "2월", day: "1" },
            title: "딥러닝 & 신경망 심화 과정 2회차 시작",
            period: "2025.02.01 ~ 2025.03.31",
            instructor: "이지영",
            status: "모집마감"
        },
        {
            date: { month: "2월", day: "15" },
            title: "컴퓨터 비전 AI 개발 4회차 시작",
            period: "2025.02.15 ~ 2025.03.30",
            instructor: "최영호",
            status: "모집마감"
        },
        {
            date: { month: "2월", day: "20" },
            title: "AI 데이터 전처리 마스터 8회차 시작",
            period: "2025.02.20 ~ 2025.04.05",
            instructor: "김태현",
            status: "모집마감"
        },
        {
            date: { month: "3월", day: "1" },
            title: "머신러닝 알고리즘 실습 7회차 시작",
            period: "2025.03.01 ~ 2025.04.15",
            instructor: "이수진",
            status: "모집중"
        },
        {
            date: { month: "3월", day: "15" },
            title: "ChatGPT & LLM 활용 과정 3회차 시작",
            period: "2025.03.15 ~ 2025.04.30",
            instructor: "박서연",
            status: "모집예정"
        },
        {
            date: { month: "3월", day: "20" },
            title: "AI 모델 배포 및 운영 10회차 시작",
            period: "2025.03.20 ~ 2025.05.05",
            instructor: "정상훈",
            status: "모집마감"
        },
        {
            date: { month: "4월", day: "1" },
            title: "자연어처리 AI 심화 5회차 시작",
            period: "2025.04.01 ~ 2025.05.15",
            instructor: "정민지",
            status: "모집예정"
        },
        {
            date: { month: "4월", day: "5" },
            title: "강화학습 기초와 응용 11회차 시작",
            period: "2025.04.05 ~ 2025.05.20",
            instructor: "김아영",
            status: "모집중"
        },
        {
            date: { month: "4월", day: "10" },
            title: "딥러닝 프레임워크 활용 9회차 시작",
            period: "2025.04.10 ~ 2025.05.25",
            instructor: "박지혜",
            status: "모집예정"
        },
        {
            date: { month: "4월", day: "15" },
            title: "생성형 AI 활용법 13회차 시작",
            period: "2025.04.15 ~ 2025.05.30",
            instructor: "조현우",
            status: "모집중"
        },
        {
            date: { month: "5월", day: "1" },
            title: "AI 프로젝트 실무 12회차 시작",
            period: "2025.05.01 ~ 2025.06.15",
            instructor: "이민석",
            status: "모집마감"
        },
        {
            date: { month: "5월", day: "10" },
            title: "AI 스타트업 창업 과정 14회차 시작",
            period: "2025.05.10 ~ 2025.06.25",
            instructor: "신혜정",
            status: "모집마감"
        }
    ];

    let content = `
        <div class="content-card">
            <h1 style="font-size: 1.875rem; font-weight: bold; color: #1f2937; margin-bottom: 1.5rem;">AI 교육 일정</h1>
            <p style="color: #6b7280; margin-bottom: 2rem;">2025년 AI 교육 과정별 시작 일정을 확인하세요.</p>
            
            <div class="schedule-grid">
    `;
    
    scheduleData.forEach(schedule => {
        const statusColor = getStatusColor(schedule.status);
        content += `
            <div class="schedule-item">
                <div class="schedule-date">
                    <div class="month">${schedule.date.month}</div>
                    <div class="day">${schedule.date.day}</div>
                </div>
                <div class="schedule-content">
                    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.5rem;">
                        <h3 class="schedule-title">${schedule.title}</h3>
                        <span style="display: inline-block; background-color: ${statusColor}; color: white; font-size: 0.75rem; font-weight: 600; padding: 0.25rem 0.75rem; border-radius: 20px;">
                            ${schedule.status}
                        </span>
                    </div>
                    <p class="schedule-instructor">강사: ${schedule.instructor}</p>
                    <p class="schedule-period">${schedule.period}</p>
                </div>
            </div>
        `;
    });
    
    content += `
            </div>
        </div>
        
        <style>
        .schedule-grid {
            display: grid;
            gap: 20px;
        }
        
        .schedule-item {
            display: flex;
            background: white;
            border: 1px solid #e5e7eb;
            border-radius: 12px;
            padding: 20px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
            transition: transform 0.2s, box-shadow 0.2s;
        }
        
        .schedule-item:hover {
            transform: translateY(-4px);
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
        }
        
        .schedule-date {
            flex-shrink: 0;
            width: 80px;
            text-align: center;
            margin-right: 20px;
            padding: 16px 12px;
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
            border-radius: 12px;
        }
        
        .month {
            font-size: 14px;
            font-weight: 500;
            opacity: 0.9;
        }
        
        .day {
            font-size: 24px;
            font-weight: bold;
            line-height: 1;
            margin-top: 4px;
        }
        
        .schedule-content {
            flex: 1;
        }
        
        .schedule-title {
            font-size: 16px;
            font-weight: 600;
            color: #1f2937;
            margin: 0;
            flex: 1;
        }
        
        .schedule-instructor {
            font-size: 14px;
            color: #6366f1;
            font-weight: 500;
            margin: 8px 0 6px 0;
        }
        
        .schedule-period {
            font-size: 14px;
            color: #6b7280;
            line-height: 1.5;
            margin: 0;
        }
        
        @media (max-width: 768px) {
            .schedule-item {
                flex-direction: column;
                align-items: center;
                text-align: center;
                padding: 16px;
            }
            
            .schedule-date {
                margin-right: 0;
                margin-bottom: 16px;
                width: 100px;
            }
            
            .schedule-content > div:first-child {
                flex-direction: column !important;
                gap: 0.5rem;
                align-items: center !important;
            }
            
            .schedule-title {
                font-size: 14px !important;
                text-align: center;
            }
        }
        </style>
    `;
    
    return content;
}

// 교육 정보 페이지 렌더링
function renderEducationPage() {
    const educationData = [
        {
            title: "AI 기초 및 머신러닝 입문 1회차",
            instructor: "김민수",
            status: "모집중",
            period: "2025.01.15 ~ 2025.02.28",
            image: "assets/noimage.png"
        },
        {
            title: "딥러닝 & 신경망 심화 과정 2회차",
            instructor: "이지영",
            status: "모집마감",
            period: "2025.02.01 ~ 2025.03.31",
            image: "assets/noimage.png"
        },
        {
            title: "ChatGPT & LLM 활용 과정 3회차",
            instructor: "박서연",
            status: "모집예정",
            period: "2025.03.15 ~ 2025.04.30",
            image: "assets/noimage.png"
        },
        {
            title: "컴퓨터 비전 AI 개발 4회차",
            instructor: "최영호",
            status: "모집마감",
            period: "2025.02.15 ~ 2025.03.30",
            image: "assets/noimage.png"
        },
        {
            title: "자연어처리 AI 심화 5회차",
            instructor: "정민지",
            status: "모집예정",
            period: "2025.04.01 ~ 2025.05.15",
            image: "assets/noimage.png"
        },
        {
            title: "AI 윤리 & 책임감 있는 AI 6회차",
            instructor: "한승우",
            status: "모집마감",
            period: "2025.01.20 ~ 2025.02.20",
            image: "assets/noimage.png"
        },
        {
            title: "머신러닝 알고리즘 실습 7회차",
            instructor: "이수진",
            status: "모집중",
            period: "2025.03.01 ~ 2025.04.15",
            image: "assets/noimage.png"
        },
        {
            title: "AI 데이터 전처리 마스터 8회차",
            instructor: "김태현",
            status: "모집마감",
            period: "2025.02.20 ~ 2025.04.05",
            image: "assets/noimage.png"
        },
        {
            title: "딥러닝 프레임워크 활용 9회차",
            instructor: "박지혜",
            status: "모집예정",
            period: "2025.04.10 ~ 2025.05.25",
            image: "assets/noimage.png"
        },
        {
            title: "AI 모델 배포 및 운영 10회차",
            instructor: "정상훈",
            status: "모집마감",
            period: "2025.03.20 ~ 2025.05.05",
            image: "assets/noimage.png"
        },
        {
            title: "강화학습 기초와 응용 11회차",
            instructor: "김아영",
            status: "모집중",
            period: "2025.04.05 ~ 2025.05.20",
            image: "assets/noimage.png"
        },
        {
            title: "AI 프로젝트 실무 12회차",
            instructor: "이민석",
            status: "모집마감",
            period: "2025.05.01 ~ 2025.06.15",
            image: "assets/noimage.png"
        },
        {
            title: "생성형 AI 활용법 13회차",
            instructor: "조현우",
            status: "모집중",
            period: "2025.04.15 ~ 2025.05.30",
            image: "assets/noimage.png"
        },
        {
            title: "AI 스타트업 창업 과정 14회차",
            instructor: "신혜정",
            status: "모집마감",
            period: "2025.05.10 ~ 2025.06.25",
            image: "assets/noimage.png"
        }
    ];

    let content = `
        <div class="content-card">
            <h1 style="font-size: 1.875rem; font-weight: bold; color: #1f2937; margin-bottom: 1.5rem;">AI 교육 정보</h1>
            <p style="color: #6b7280; margin-bottom: 2rem;">최신 AI 기술을 배울 수 있는 다양한 교육 과정을 제공합니다.</p>
            
            <!-- 필터 버튼 -->
            <div class="filter-buttons" style="display: flex; gap: 1rem; margin-bottom: 2rem; flex-wrap: wrap;">
                <button class="filter-btn active" data-filter="all" style="padding: 8px 16px; border-radius: 20px; border: 1px solid #e5e7eb; background: #3b82f6; color: white; cursor: pointer; font-size: 0.875rem; font-weight: 500; transition: all 0.2s;">전체</button>
                <button class="filter-btn" data-filter="모집중" style="padding: 8px 16px; border-radius: 20px; border: 1px solid #e5e7eb; background: white; color: #374151; cursor: pointer; font-size: 0.875rem; font-weight: 500; transition: all 0.2s;">모집중</button>
                <button class="filter-btn" data-filter="모집마감" style="padding: 8px 16px; border-radius: 20px; border: 1px solid #e5e7eb; background: white; color: #374151; cursor: pointer; font-size: 0.875rem; font-weight: 500; transition: all 0.2s;">모집마감</button>
                <button class="filter-btn" data-filter="모집예정" style="padding: 8px 16px; border-radius: 20px; border: 1px solid #e5e7eb; background: white; color: #374151; cursor: pointer; font-size: 0.875rem; font-weight: 500; transition: all 0.2s;">모집예정</button>
            </div>
            
            <div class="education-grid" style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.5rem;">
    `;
    
    educationData.forEach(edu => {
        content += `
            <div class="education-card" data-status="${edu.status}" style="background: white; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); transition: all 0.3s; cursor: pointer;">
                <div style="position: relative; width: 100%; height: 200px; overflow: hidden; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
                    <img src="${edu.image}" alt="${edu.title}" 
                         style="width: 100%; height: 100%; object-fit: cover; opacity: 0.3;"
                         onerror="this.style.display='none'">
                    <div style="position: absolute; top: 12px; right: 12px;">
                        <span class="status-badge" style="display: inline-block; background-color: ${getStatusColor(edu.status)}; color: white; font-size: 0.75rem; font-weight: 600; padding: 0.25rem 0.75rem; border-radius: 20px;">
                            ${edu.status}
                        </span>
                    </div>
                    <div style="position: absolute; bottom: 12px; left: 12px; color: white;">
                        <h3 style="font-size: 1.25rem; font-weight: 700; margin: 0; text-shadow: 0 2px 4px rgba(0,0,0,0.5);">${edu.title}</h3>
                        <p style="margin: 4px 0 0 0; font-size: 0.9rem; opacity: 0.9;">강사: ${edu.instructor}</p>
                    </div>
                </div>
                
                <div style="padding: 1.5rem;">
                    <div style="font-size: 0.85rem; color: #6b7280;">
                        <span><strong style="color: #374151;">기간:</strong> ${edu.period}</span>
                    </div>
                </div>
            </div>
        `;
    });
    
    content += `
            </div>
        </div>
    `;
    
    // 교육 카드 호버 효과 및 모바일 그리드를 위한 스타일 추가
    content += `
        <style>
        .education-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15) !important;
        }
        
        .filter-btn:hover {
            background: #f3f4f6 !important;
            border-color: #d1d5db !important;
        }
        
        .filter-btn.active {
            background: #3b82f6 !important;
            color: white !important;
            border-color: #3b82f6 !important;
        }
        
        .education-card.hidden {
            display: none !important;
        }
        
        /* 기본: 4열 */
        .education-grid {
            grid-template-columns: repeat(4, 1fr) !important;
        }
        
        /* 중간 크기: 3열 */
        @media (max-width: 1200px) {
            .education-grid {
                grid-template-columns: repeat(3, 1fr) !important;
            }
        }
        
        /* 태블릿: 2열 */
        @media (max-width: 900px) {
            .education-grid {
                grid-template-columns: repeat(2, 1fr) !important;
                gap: 1rem !important;
            }
        }
        
        /* 모바일: 2열 유지 */
        @media (max-width: 768px) {
            .education-grid {
                grid-template-columns: repeat(2, 1fr) !important;
                gap: 1rem !important;
            }
            
            .education-card {
                min-height: auto;
            }
            
            .education-card > div:first-child {
                height: 150px !important;
            }
            
            .education-card h3 {
                font-size: 1rem !important;
            }
            
            .education-card p {
                font-size: 0.8rem !important;
            }
            
            .education-card > div:last-child {
                padding: 1rem !important;
            }
            
            .filter-buttons {
                justify-content: center !important;
            }
        }
        
        /* 작은 모바일: 1열 */
        @media (max-width: 480px) {
            .education-grid {
                grid-template-columns: 1fr !important;
            }
        }
        </style>
        
        <script>
        // 필터 기능 초기화
        setTimeout(() => {
            const filterBtns = document.querySelectorAll('.filter-btn');
            const educationCards = document.querySelectorAll('.education-card');
            
            filterBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    const filter = btn.getAttribute('data-filter');
                    
                    // 활성 버튼 변경
                    filterBtns.forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    
                    // 카드 필터링
                    educationCards.forEach(card => {
                        const cardStatus = card.getAttribute('data-status');
                        if (filter === 'all' || cardStatus === filter) {
                            card.classList.remove('hidden');
                        } else {
                            card.classList.add('hidden');
                        }
                    });
                });
            });
        }, 100);
        </script>
    `;
    
    return content;
}

// 상태에 따른 색상 반환
function getStatusColor(status) {
    switch(status) {
        case '모집중': return '#059669';
        case '모집마감': return '#6b7280';
        case '모집예정': return '#3b82f6';
        default: return '#6b7280';
    }
}

// 교육 신청 페이지 렌더링
function renderApplyPage() {
    return `
        <div class="content-card">
            <h1 style="font-size: 1.875rem; font-weight: bold; color: #1f2937; margin-bottom: 1.5rem;">교육 신청</h1>
            <p style="color: #6b7280; margin-bottom: 1.5rem;">원하시는 교육 과정에 신청해주세요. 신청 완료 후 담당자가 연락드립니다.</p>
            
            <form id="apply-form" style="max-width: 600px;">
                <div style="margin-bottom: 1.5rem;">
                    <label class="form-label">이름 *</label>
                    <input type="text" id="apply-name" class="form-input" placeholder="홍길동" required>
                </div>
                
                <div style="margin-bottom: 1.5rem;">
                    <label class="form-label">이메일 *</label>
                    <input type="email" id="apply-email" class="form-input" placeholder="example@email.com" required>
                </div>
                
                <div style="margin-bottom: 1.5rem;">
                    <label class="form-label">연락처 *</label>
                    <input type="tel" id="apply-phone" class="form-input" placeholder="010-1234-5678" required>
                </div>
                
                <div style="margin-bottom: 1.5rem;">
                    <label class="form-label">희망 교육 과정 *</label>
                    <select id="apply-course" class="form-input" required style="cursor: pointer;">
                        <option value="">교육 과정을 선택해주세요</option>
                        <option value="웹 개발 기초 과정">웹 개발 기초 과정</option>
                        <option value="데이터 분석 심화 과정">데이터 분석 심화 과정</option>
                        <option value="UI/UX 디자인 과정">UI/UX 디자인 과정</option>
                    </select>
                </div>
                
                <div style="margin-bottom: 1.5rem;">
                    <label class="form-label">교육 경험</label>
                    <select id="apply-experience" class="form-input" style="cursor: pointer;">
                        <option value="초급">초급 (처음 시작)</option>
                        <option value="중급">중급 (기본 지식 보유)</option>
                        <option value="고급">고급 (실무 경험 보유)</option>
                    </select>
                </div>
                
                <div style="margin-bottom: 1.5rem;">
                    <label class="form-label">신청 동기</label>
                    <textarea id="apply-motivation" class="form-input" style="min-height: 120px; resize: vertical;" placeholder="교육 신청 동기나 목표를 간단히 작성해주세요."></textarea>
                </div>
                
                <div style="margin-bottom: 2rem;">
                    <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
                        <input type="checkbox" id="apply-agree" required style="width: 16px; height: 16px;">
                        <span style="font-size: 14px; color: #374151;">개인정보 수집 및 이용에 동의합니다. *</span>
                    </label>
                </div>
                
                <button type="submit" class="btn-primary" style="width: 100%;">
                    신청 완료
                </button>
            </form>
            
            <div id="apply-result" style="margin-top: 2rem;"></div>
        </div>
    `;
}

// 신청 확인 페이지 렌더링
function renderConfirmPage() {
    return `
        <div class="content-card">
            <h1 style="font-size: 1.875rem; font-weight: bold; color: #1f2937; margin-bottom: 1.5rem;">신청 확인</h1>
            <p style="color: #6b7280; margin-bottom: 1.5rem;">이름과 이메일을 입력하여 신청 내역을 확인하세요.</p>
            
            <form id="confirm-form" style="max-width: 448px;">
                <div style="margin-bottom: 1.5rem;">
                    <label class="form-label">이름</label>
                    <input type="text" id="confirm-name" class="form-input" placeholder="홍길동" required>
                </div>
                
                <div style="margin-bottom: 1.5rem;">
                    <label class="form-label">이메일</label>
                    <input type="email" id="confirm-email" class="form-input" placeholder="example@email.com" required>
                </div>
                
                <button type="submit" class="btn-primary" style="width: 100%;">
                    신청 내역 조회
                </button>
            </form>
            
            <div id="confirm-result" style="margin-top: 2rem;"></div>
        </div>
    `;
}

// FAQ 페이지 렌더링
function renderFaqPage() {
    const faqData = [
        {
            question: "교육 과정은 어떻게 신청할 수 있나요?",
            answer: "교육 과정 신청은 다음과 같은 방법으로 가능합니다:<br><br>• 온라인 신청: 홈페이지의 '교육 정보' 메뉴에서 원하는 과정을 선택 후 신청<br>• 전화 신청: 02-1234-5678로 전화하여 상담 후 신청<br>• 방문 신청: 교육원에 직접 방문하여 신청<br><br>신청 시 신분증과 관련 서류가 필요할 수 있습니다."
        },
        {
            question: "수강 신청 후 취소나 변경이 가능한가요?",
            answer: "수강 신청 후 취소나 변경은 다음 기준에 따라 가능합니다:<br><br>• 개강 7일 전: 100% 환불 및 무료 변경 가능<br>• 개강 3일 전: 90% 환불, 변경 시 수수료 발생<br>• 개강 이후: 수강일수에 따른 부분 환불만 가능<br><br>변경을 원하실 경우 담당자에게 미리 연락 주시기 바랍니다."
        },
        {
            question: "수강료 결제 방법은 어떻게 되나요?",
            answer: "다양한 결제 방법을 지원합니다:<br><br>• 신용카드: 모든 주요 신용카드 결제 가능 (분할납 지원)<br>• 계좌이체: 실시간 계좌이체 및 무통장입금<br>• 카카오페이, 네이버페이: 간편결제 서비스<br>• 가상계좌: 개인별 가상계좌 발급<br><br>교육비 지원 사업 대상자의 경우 별도 안내를 받으실 수 있습니다."
        },
        {
            question: "환불 정책은 어떻게 되나요?",
            answer: "환불 정책은 평생교육법에 따라 다음과 같습니다:<br><br>• 수업 시작 전: 수강료 전액 환불<br>• 총 수업시간 1/3 경과 전: 수강료의 2/3 해당액 환불<br>• 총 수업시간 1/2 경과 전: 수강료의 1/2 해당액 환불<br>• 총 수업시간 1/2 경과 후: 환불 불가<br><br>환불 처리는 신청일로부터 영업일 기준 3-5일 소요됩니다."
        },
        {
            question: "온라인 교육과 오프라인 교육의 차이점은 무엇인가요?",
            answer: "온라인과 오프라인 교육의 주요 차이점은 다음과 같습니다:<br><br><strong>온라인 교육:</strong><br>• 언제 어디서나 수강 가능<br>• 반복 학습 가능 (일정 기간 내)<br>• 개인 학습 속도에 맞춤<br>• 온라인 과제 및 토론 참여<br><br><strong>오프라인 교육:</strong><br>• 실시간 강사와 질의응답<br>• 실습 장비 직접 사용<br>• 동료 학습자와 네트워킹<br>• 즉석 피드백 및 토론"
        },
        {
            question: "수업을 놓쳤을 때 보강이나 보충 자료를 받을 수 있나요?",
            answer: "수업 결석 시 다음과 같은 보충 방법을 제공합니다:<br><br>• 녹화 강의: 대부분의 수업은 녹화되어 LMS에서 복습 가능<br>• 보강 수업: 필요시 별도 보강 수업 진행<br>• 학습 자료: 수업 자료 및 과제는 온라인에서 다운로드<br>• 동료 학습: 스터디 그룹을 통한 학습 지원<br><br>단, 실습 위주의 수업은 별도 보강이 필요할 수 있습니다."
        },
        {
            question: "수료증은 어떻게 발급받을 수 있나요?",
            answer: "수료증 발급 조건 및 방법:<br><br><strong>발급 조건:</strong><br>• 총 수업시간의 80% 이상 출석<br>• 과제 및 시험 60점 이상<br>• 프로젝트 완성 (해당 과정에 한함)<br><br><strong>발급 방법:</strong><br>• 수업 종료 후 자동으로 LMS에 업로드<br>• 원본 수료증은 우편 발송 또는 방문 수령<br>• PDF 파일은 즉시 다운로드 가능"
        },
        {
            question: "자격증 취득이 가능한 과정이 있나요?",
            answer: "네, 다음과 같은 자격증 취득 과정을 운영합니다:<br><br>• IT 분야: 정보처리기사, AWS 자격증, Google 클라우드 자격증<br>• 디자인 분야: Adobe 공인 자격증, 웹디자인기능사<br>• 데이터 분야: ADsP, SQLD, 빅데이터분석기사<br>• 기타: 컴활 1급, ITQ, 사무자동화산업기사<br><br>자격증 과정은 시험 일정에 맞춰 별도로 운영되며, 합격률 향상을 위한 특별 관리를 제공합니다."
        },
        {
            question: "온라인 수업 중 기술적 문제가 발생하면 어떻게 하나요?",
            answer: "기술적 문제 발생 시 다음과 같이 대응해드립니다:<br><br>• 실시간 채팅 상담: 수업 중 채팅창을 통한 즉시 지원<br>• 기술지원팀 연락: 02-1234-5679 (평일 9시-18시)<br>• 원격 지원: 필요시 원격 프로그램을 통한 직접 해결<br>• 대체 수업: 문제 해결 불가 시 별도 보강 수업 제공<br><br>대부분의 문제는 브라우저 새로고침이나 재접속으로 해결됩니다."
        },
        {
            question: "온라인 수업을 위한 최소 시스템 요구사항은 무엇인가요?",
            answer: "원활한 온라인 수업을 위한 권장 시스템 사양:<br><br><strong>컴퓨터:</strong><br>• Windows 10 이상 또는 macOS 10.14 이상<br>• RAM 4GB 이상 (8GB 권장)<br>• 인터넷 속도: 다운로드 10Mbps 이상<br><br><strong>브라우저:</strong><br>• Chrome 80 이상 (권장)<br>• Firefox 75 이상<br>• Safari 13 이상<br><br><strong>기타:</strong><br>• 웹캠 및 마이크 (실습 과정 필수)<br>• 헤드셋 또는 이어폰 권장"
        }
    ];

    let content = `
        <div class="content-card">
            <h1 style="font-size: 1.875rem; font-weight: bold; color: #1f2937; margin-bottom: 1.5rem;">자주 묻는 질문</h1>
            <p style="color: #6b7280; margin-bottom: 1.5rem;">궁금한 사항을 빠르게 확인해보세요.</p>
    `;
    
    faqData.forEach((faq, index) => {
        content += `
            <div class="faq-item" style="border: 1px solid #e5e7eb; border-radius: 8px; margin-bottom: 12px; overflow: hidden;">
                <button class="faq-question" data-faq="${index}" style="width: 100%; text-align: left; padding: 1.5rem; background-color: #f9fafb; border: none; font-weight: 600; color: #1f2937; display: flex; align-items: center; justify-content: space-between; cursor: pointer; transition: background-color 0.2s;">
                    ${faq.question}
                    <svg class="faq-icon" style="width: 20px; height: 20px; transform: rotate(0deg); transition: transform 0.2s;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                </button>
                <div class="faq-answer faq-hidden" id="faq-answer-${index}" style="padding: 1.5rem; background-color: white; color: #374151; border-top: 1px solid #e5e7eb; line-height: 1.6;">
                    ${faq.answer}
                </div>
            </div>
        `;
    });
    
    content += '</div>';
    
    // FAQ 상호작용을 위한 스타일 추가
    content += `
        <style>
        .faq-question:hover {
            background-color: #f3f4f6;
        }
        
        .faq-hidden {
            display: none;
        }
        </style>
    `;
    
    return content;
}

// 페이지별 특수 기능 초기화
function initializePageSpecificFeatures(page) {
    switch(page) {
        case 'apply':
            setupApplyForm();
            break;
        case 'confirm':
            setupConfirmForm();
            break;
        case 'faq':
            setupFaqAccordion();
            break;
    }
}

// 신청 폼 설정
function setupApplyForm() {
    const applyForm = document.getElementById('apply-form');
    if (applyForm) {
        applyForm.addEventListener('submit', handleApplySubmit);
    }
}

// 신청 폼 제출 처리
function handleApplySubmit(event) {
    event.preventDefault();
    
    const formData = {
        name: document.getElementById('apply-name').value.trim(),
        email: document.getElementById('apply-email').value.trim(),
        phone: document.getElementById('apply-phone').value.trim(),
        course: document.getElementById('apply-course').value,
        experience: document.getElementById('apply-experience').value,
        motivation: document.getElementById('apply-motivation').value.trim(),
        agree: document.getElementById('apply-agree').checked
    };
    
    // 필수 항목 검증
    if (!formData.name || !formData.email || !formData.phone || !formData.course || !formData.agree) {
        showErrorModal('모든 필수 항목을 입력해 주세요.');
        return;
    }
    
    const resultDiv = document.getElementById('apply-result');
    
    // 성공 시뮬레이션
    resultDiv.innerHTML = `
        <div style="background-color: #d1fae5; border: 1px solid #34d399; border-radius: 8px; padding: 1.5rem; color: #065f46;">
            <h3 style="font-weight: 600; margin-bottom: 0.5rem;">신청이 완료되었습니다!</h3>
            <p style="margin-bottom: 0.5rem;"><strong>과정:</strong> ${formData.course}</p>
            <p style="margin-bottom: 0.5rem;"><strong>신청자:</strong> ${formData.name}</p>
            <p>담당자가 24시간 내에 연락드릴 예정입니다.</p>
        </div>
    `;
    
    // 폼 초기화
    document.getElementById('apply-form').reset();
}

// 신청 확인 폼 설정
function setupConfirmForm() {
    const confirmForm = document.getElementById('confirm-form');
    if (confirmForm) {
        confirmForm.addEventListener('submit', handleConfirmSubmit);
    }
}

// 신청 확인 폼 제출 처리
function handleConfirmSubmit(event) {
    event.preventDefault();
    
    const name = document.getElementById('confirm-name').value.trim();
    const email = document.getElementById('confirm-email').value.trim();
    
    if (!name || !email) {
        showErrorModal('이름과 이메일을 모두 입력해 주세요.');
        return;
    }
    
    const resultDiv = document.getElementById('confirm-result');
    
    // 로딩 표시
    resultDiv.innerHTML = '<div style="text-align: center; padding: 1rem;"><div style="display: inline-block; width: 32px; height: 32px; border: 2px solid #e5e7eb; border-top: 2px solid #6366f1; border-radius: 50%; animation: spin 1s linear infinite;"></div></div>';
    
    // 시뮬레이션 (실제로는 서버에서 조회)
    setTimeout(() => {
        // 샘플 데이터로 응답 시뮬레이션
        if (name === '홍길동' && email === 'hong@example.com') {
            resultDiv.innerHTML = `
                <div style="background-color: #d1fae5; border: 1px solid #34d399; border-radius: 8px; padding: 1.5rem; color: #065f46;">
                    <h3 style="font-weight: 600; margin-bottom: 0.5rem;">신청 확인 완료</h3>
                    <p style="margin-bottom: 0.25rem;"><strong>과정명:</strong> 웹 개발 기초 과정</p>
                    <p style="margin-bottom: 0.25rem;"><strong>상태:</strong> 승인 완료</p>
                    <p><strong>신청일:</strong> 2025.01.10</p>
                </div>
            `;
        } else {
            resultDiv.innerHTML = `
                <div style="background-color: #fee2e2; border: 1px solid #fca5a5; border-radius: 8px; padding: 1.5rem; color: #991b1b;">
                    <h3 style="font-weight: 600; margin-bottom: 0.5rem;">신청 내역 없음</h3>
                    <p>입력하신 정보로 등록된 신청 내역이 없습니다.</p>
                </div>
            `;
        }
    }, 1000);
}

// FAQ 아코디언 설정
function setupFaqAccordion() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', toggleFaqAnswer);
    });
}

// FAQ 답변 토글
function toggleFaqAnswer(event) {
    const faqIndex = event.currentTarget.getAttribute('data-faq');
    const answer = document.getElementById(`faq-answer-${faqIndex}`);
    const icon = event.currentTarget.querySelector('.faq-icon');
    
    if (answer) {
        if (answer.classList.contains('faq-hidden')) {
            answer.classList.remove('faq-hidden');
            if (icon) icon.style.transform = 'rotate(180deg)';
        } else {
            answer.classList.add('faq-hidden');
            if (icon) icon.style.transform = 'rotate(0deg)';
        }
    }
}

// UI 헬퍼 함수들
function showLoadingSpinner() {
    const spinner = document.getElementById('loading-spinner');
    if (spinner) {
        spinner.classList.remove('loading-hidden');
        spinner.classList.add('loading-visible');
    }
}

function hideLoadingSpinner() {
    const spinner = document.getElementById('loading-spinner');
    if (spinner) {
        spinner.classList.remove('loading-visible');
        spinner.classList.add('loading-hidden');
    }
}

function showErrorModal(message) {
    const errorModal = document.getElementById('error-modal');
    const errorMessage = document.getElementById('error-message');
    
    if (errorModal && errorMessage) {
        errorMessage.textContent = message;
        errorModal.classList.remove('error-modal-hidden');
        errorModal.classList.add('error-modal-visible');
    }
}

function closeErrorModal() {
    const errorModal = document.getElementById('error-modal');
    if (errorModal) {
        errorModal.classList.remove('error-modal-visible');
        errorModal.classList.add('error-modal-hidden');
    }
}

// 모바일 메뉴 관련 함수들
function toggleMobileMenu() {
    const mobileNav = document.getElementById('mobile-nav');
    if (mobileNav) {
        if (mobileNav.classList.contains('mobile-nav-hidden')) {
            mobileNav.classList.remove('mobile-nav-hidden');
            mobileNav.classList.add('mobile-nav-visible');
        } else {
            mobileNav.classList.remove('mobile-nav-visible');
            mobileNav.classList.add('mobile-nav-hidden');
        }
    }
}

function closeMobileMenu() {
    const mobileNav = document.getElementById('mobile-nav');
    if (mobileNav) {
        mobileNav.classList.remove('mobile-nav-visible');
        mobileNav.classList.add('mobile-nav-hidden');
    }
}

function handleOutsideClick(event) {
    const mobileNav = document.getElementById('mobile-nav');
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    
    if (mobileNav && !mobileNav.contains(event.target) && !mobileMenuToggle.contains(event.target)) {
        closeMobileMenu();
    }
}