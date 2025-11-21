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
    const validPages = ['home', 'schedule', 'education', 'apply', 'confirm', 'faq', 'contact'];
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
            case 'contact':
                content = renderContactPage();
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
        <div class="content-card content-card-1" style="position: relative; overflow: hidden; background-color: transparent; box-shadow: none; border: none;">
            <video autoplay muted loop playsinline style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover; z-index: 0;">
                <source src="./assets/image/home-bg.mp4" type="video/mp4">
            </video>
            <div class="content-card-1-1" style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1.5rem; margin-bottom: 3rem; position: relative; z-index: 1;">
                <div style="padding: 1.5rem .5rem; border-radius: 8px; text-align: center; cursor: pointer;" class="hover-lift" onclick="window.location.hash='schedule'; loadPage('schedule');">
                    <div style="width: 48px; height: 48px; margin: 0 auto 1rem; background-color: #4f46e5; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                        <svg style="width: 24px; height: 24px; color: white;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                        </svg>
                    </div>
                    <h3 style="font-weight: 600; margin-bottom: 0.5rem;">교육일정</h3>
                    <p class="service-description" style="color: #6b7280; font-size: 0.875rem;">최신 교육 일정을 확인하세요</p>
                </div>
                
                <div style="padding: 1.5rem .5rem; border-radius: 8px; text-align: center; cursor: pointer;" class="hover-lift" onclick="window.location.hash='education'; loadPage('education');">
                    <div style="width: 48px; height: 48px; margin: 0 auto 1rem; background-color: #059669; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                        <svg style="width: 24px; height: 24px; color: white;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                        </svg>
                    </div>
                    <h3 style=" font-weight: 600; margin-bottom: 0.5rem;">교육정보</h3>
                    <p class="service-description" style="color: #6b7280; font-size: 0.875rem;">전문 강사진이 제공하는 체계적인 교육 프로그램</p>
                </div>
                
                <div style="padding: 1.5rem .5rem; border-radius: 8px; text-align: center; cursor: pointer;" class="hover-lift" onclick="window.location.hash='apply'; loadPage('apply');">
                    <div style="width: 48px; height: 48px; margin: 0 auto 1rem; background-color: #d97706; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                        <svg style="width: 24px; height: 24px; color: white;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path    stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                        </svg>
                    </div>
                    <h3 style=" font-weight: 600; margin-bottom: 0.5rem;">교육신청</h3>
                    <p class="service-description" style="color: #6b7280; font-size: 0.875rem;">온라인으로 간편하게 교육 신청 및 확인 가능</p>
                </div>
            </div>
            <!-- 히어로 섹션 -->
            <div class="hero-section" style="position: relative; border-radius: 24px; padding: 8rem 3rem; margin-bottom: 4rem; overflow: hidden;">
                <div style="position: relative; z-index: 2; max-width: 800px; margin: 0 auto; text-align: center;">
                    <div style="color: #9CA3AF; font-size: 1rem; font-weight: 500; margin-bottom: 1rem; letter-spacing: 0.05em;">미래 콘텐츠 산업을 이끌</div>
                    <h1 style="font-size: 3rem; font-weight: 800; line-height: 1.2; margin-bottom: 1.5rem; color: #F59E0B;text-shadow: rgba(245, 158, 11, 0.3) 0px 4px 15px;">
                        인재와 기술이 만나는 곳
                    </h1>
                    
                    <div style="font-size: 1.1rem; line-height: 1.7; margin-bottom: 2rem; font-weight: 400; color: #6B7280;">
                        <p style="margin-bottom: 1rem;">SBS A&T의 Hightech Platform은 콘텐츠 산업의 미래를 이끌 창의적 인재 양성과 
                        첨단 미디어 기술의 융합을 목표로 탄생한 실무 중심의 교육·실습 플랫폼입니다</p>
                        
                        <p style="margin: 0;">차세대 미디어 기술을 현업 전문가와 함께 직접 체험하고<br>
                        제작하는 현장 맞춤형 커리큘럼을 제공합니다</p>
                    </div>
                    
                    <div style="display: flex; gap: 0.5rem; justify-content: center; flex-wrap: wrap; margin-top: 2rem;">
                        <button onclick="window.location.hash='apply'; loadPage('apply');" style="background: #F59E0B; border: none; color: white; font-weight: 600; padding: 1rem 2rem; border-radius: 50px; cursor: pointer; transition: all 0.3s; font-size: 1rem; box-shadow: 0 4px 15px rgba(245, 158, 11, 0.3);" onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 20px rgba(245, 158, 11, 0.4)'" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 15px rgba(245, 158, 11, 0.3)'">
                            지금 시작하기
                        </button>
                    </div>
                </div>
            </div>

            <!-- 교육생 후기 섹션 -->
            <div style="margin-bottom: 7.5rem;">                
                <div class="testimonials-container" style="display: flex; flex-direction: column; gap: 1rem; max-width: 800px; margin: 0 auto;">
                    <div class="testimonial-chip" style="background: linear-gradient(135deg, rgba(255, 255, 255, 0.42) 0%, rgba(255, 255, 255, 0.65) 100%); border: 1px solid rgba(226, 232, 240, 0.6); border-radius: 50px; padding: 1rem 1.5rem; display: flex; align-items: center; gap: 1rem; opacity: 1; backdrop-filter: blur(4px); -webkit-backdrop-filter: blur(4px);">
                        <div style="width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                            <svg style="width: 24px; height: 24px; color: #10b981;" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M7.493 18.75c-.425 0-.82-.236-.975-.632A7.48 7.48 0 016 15.375c0-1.75.599-3.358 1.602-4.634.151-.192.373-.309.6-.397.473-.183.89-.514 1.212-.924a9.042 9.042 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75 2.25 2.25 0 012.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558-.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H14.23c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23h-.777zM2.331 10.977a11.969 11.969 0 00-.831 4.398 12 12 0 00.52 3.507c.26.85 1.084 1.368 1.973 1.368H4.9c.445 0 .72-.498.523-.898a8.963 8.963 0 01-.924-3.977c0-1.708.476-3.305 1.302-4.666.245-.403-.028-.959-.5-.959H4.25c-.832 0-1.612.453-1.918 1.227z"/>
                            </svg>
                        </div>
                        <div style="flex: 1;">
                            <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.25rem;">
                                <span style="font-weight: 600; color: #1f2937; font-size: 0.9rem;">김민지</span>
                                <span style="color: #6b7280; font-size: 0.8rem;">·</span>
                                <span style="color: #6b7280; font-size: 0.8rem;">AI 기초 및 머신러닝 입문</span>
                            </div>
                            <p style="color: #374151; margin: 0; font-size: 0.85rem; line-height: 1.4;">"처음 AI를 접했는데 강사님이 너무 친절하게 알려주셔서 쉽게 이해할 수 있었어요. 실습 위주로 진행되어 실무에 바로 적용할 수 있을 것 같습니다!"</p>
                        </div>
                    </div>
                    
                    <div class="testimonial-chip" style="background: linear-gradient(135deg, rgba(255, 255, 255, 0.42) 0%, rgba(255, 255, 255, 0.65) 100%); border: 1px solid rgba(219, 234, 254, 0.2); border-radius: 50px; padding: 1rem 1.5rem; display: flex; align-items: center; gap: 1rem; opacity: 1; backdrop-filter: blur(4px); -webkit-backdrop-filter: blur(4px);">
                        <div style="width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                            <svg style="width: 24px; height: 24px; color: #fbbf24;" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"/>
                            </svg>
                        </div>
                        <div style="flex: 1;">
                            <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.25rem;">
                                <span style="font-weight: 600; color: #1f2937; font-size: 0.9rem;">박준혁</span>
                                <span style="color: #6b7280; font-size: 0.8rem;">·</span>
                                <span style="color: #6b7280; font-size: 0.8rem;">딥러닝 & 신경망 심화 과정</span>
                            </div>
                            <p style="color: #374151; margin: 0; font-size: 0.85rem; line-height: 1.4;">"복잡할 것 같았던 딥러닝이 체계적인 커리큘럼 덕분에 단계적으로 이해할 수 있었습니다. 프로젝트 실습이 특히 도움이 되었어요."</p>
                        </div>
                    </div>
                    
                    <div class="testimonial-chip" style="background: linear-gradient(135deg, rgba(255, 255, 255, 0.42) 0%, rgba(255, 255, 255, 0.65) 100%); border: 1px solid rgba(209, 250, 229, 0.2); border-radius: 50px; padding: 1rem 1.5rem; display: flex; align-items: center; gap: 1rem; opacity: 1; backdrop-filter: blur(4px); -webkit-backdrop-filter: blur(4px);">
                        <div style="width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                            <svg style="width: 24px; height: 24px; color: #ec4899;" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z"/>
                            </svg>
                        </div>
                        <div style="flex: 1;">
                            <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.25rem;">
                                <span style="font-weight: 600; color: #1f2937; font-size: 0.9rem;">이소영</span>
                                <span style="color: #6b7280; font-size: 0.8rem;">·</span>
                                <span style="color: #6b7280; font-size: 0.8rem;">ChatGPT & LLM 활용 과정</span>
                            </div>
                            <p style="color: #374151; margin: 0; font-size: 0.85rem; line-height: 1.4;">"최신 트렌드인 ChatGPT를 실무에 어떻게 활용할지 고민이었는데, 구체적인 활용 방법을 배울 수 있어서 정말 유익했습니다!"</p>
                        </div>
                    </div>
                    
                    <div class="testimonial-chip" style="background: linear-gradient(135deg, rgba(255, 255, 255, 0.42) 0%, rgba(255, 255, 255, 0.65) 100%); border: 1px solid rgba(254, 243, 199, 0.2); border-radius: 50px; padding: 1rem 1.5rem; display: flex; align-items: center; gap: 1rem; opacity: 1; backdrop-filter: blur(4px); -webkit-backdrop-filter: blur(4px);">
                        <div style="width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                            <svg style="width: 24px; height: 24px; color: #10b981;" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="3">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
                            </svg>
                        </div>
                        <div style="flex: 1;">
                            <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.25rem;">
                                <span style="font-weight: 600; color: #1f2937; font-size: 0.9rem;">최동현</span>
                                <span style="color: #6b7280; font-size: 0.8rem;">·</span>
                                <span style="color: #6b7280; font-size: 0.8rem;">컴퓨터 비전 AI 개발</span>
                            </div>
                            <p style="color: #374151; margin: 0; font-size: 0.85rem; line-height: 1.4;">"이론만 배우는 것이 아니라 실제 프로젝트를 통해 포트폴리오까지 만들 수 있어서 취업에 큰 도움이 되었습니다. 추천합니다!"</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <div style="background: linear-gradient(135deg, #4f46e5 0%, #3730a3 100%); color: white; padding: 2rem; border-radius:8px; text-align: center; margin:-24px; position: relative; z-index: 1;">
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
        
        <style>
        .content-card-1-1 .hover-lift:hover {
            box-shadow: none !important;
            position: relative !important;
        }

        .hero-section {
            position: relative !important;
            border-radius: 24px !important;
            overflow: hidden !important;
        }
        
        .testimonial-chip:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1) !important;
            transition: all 0.2s ease;
        }
        
        @media (max-width: 1024px) {
            .hero-section {
                padding: 3rem 2rem !important;
            }
            
            .hero-section h1 {
                font-size: 2.5rem !important;
            }
            
            .hero-section div:nth-child(1) > div:nth-child(3) {
                font-size: 1rem !important;
            }
        }
        
        @media (max-width: 768px) {
            .hero-section {
                padding: 2.5rem 1.5rem !important;
                margin-bottom: 2.5rem !important;
            }
            
            .hero-section div:first-child {
                font-size: 0.9rem !important;
            }
            
            .hero-section h1 {
                font-size: 2rem !important;
                line-height: 1.3 !important;
            }
            
            .hero-section div:nth-child(1) > div:nth-child(3) {
                font-size: 0.95rem !important;
            }
            
            .hero-section div:nth-child(1) > div:nth-child(3) p {
                margin-bottom: 1.5rem !important;
            }
            
            .hero-section div:last-child {
                gap: 0.75rem !important;
            }
            
            .hero-section button {
                padding: 0.875rem 1.5rem !important;
                font-size: 0.9rem !important;
            }
            
            .testimonials-container {
                max-width: 100% !important;
                padding: 0 1rem;
            }
            
            .testimonial-chip {
                flex-direction: column !important;
                text-align: center !important;
                gap: 0.75rem !important;
                padding: 1rem !important;
            }
            
            .testimonial-chip > div:last-child {
                text-align: left !important;
            }
            
            .service-description {
                display: none !important;
            }
        }
        @media (max-width: 480px) {
            .content-card-1 h3 {
                font-size: .9rem !important;
            }
        }
        </style>
        

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
            <div class="education-card" data-status="${edu.status}" onclick="openEducationModal(1)" style="background: white; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); transition: all 0.3s; cursor: pointer;">
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

// 연락처 페이지 렌더링
function renderContactPage() {
    return `
        <div class="content-card">
            
            <!-- 지도 섹션 -->
            <div style="margin-bottom: 3rem;">
                <h2 style="font-size: 1.5rem; font-weight: 600; color: #1f2937; margin-bottom: 1rem;">오시는 길</h2>
                <div style="border-radius: 12px; overflow: hidden; height: 400px; border: 1px solid #e2e8f0;">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3164.9023843214486!2d126.74436379999999!3d37.5102204!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357b7d316991b561%3A0x7577edf74b7a0694!2z7Ju57Yiw7Jy17ZWp7IS87YSwIOuwjyDrtoDsspzsmIHsg4Eg7LKt64WE7JiY7Iig7J24IOyjvO2DnQ!5e0!3m2!1sko!2skr!4v1763616057176!5m2!1sko!2skr" 
                            style="width: 100%; height: 100%; border: 0;" 
                            allowfullscreen="" 
                            loading="lazy" 
                            referrerpolicy="no-referrer-when-downgrade">
                    </iframe>
                </div>
            </div>
            
            <!-- 연락처 정보 그리드 -->
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; margin-bottom: 3rem;">
                <!-- 주소 정보 -->
                <div style="background: white; border: 1px solid #e5e7eb; border-radius: 12px; padding: 2rem; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);">
                    <div style="display: flex; align-items: center; margin-bottom: 1rem;">
                        <div style="width: 48px; height: 48px; background: linear-gradient(135deg, #667eea, #764ba2); border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-right: 1rem;">
                            <svg style="width: 24px; height: 24px; color: white;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                            </svg>
                        </div>
                        <h3 style="font-weight: 600; color: #1f2937; margin: 0;">주소</h3>
                    </div>
                    <p style="color: #374151; line-height: 1.6; margin: 0;">(14505)경기도 부천시 원미구 길주로 17(상동 529-28), 웹툰융합센터</p>
                </div>
                
                
                <!-- 이메일 -->
                <div style="background: white; border: 1px solid #e5e7eb; border-radius: 12px; padding: 2rem; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);">
                    <div style="display: flex; align-items: center; margin-bottom: 1rem;">
                        <div style="width: 48px; height: 48px; background: linear-gradient(135deg, #3b82f6, #1d4ed8); border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-right: 1rem;">
                            <svg style="width: 24px; height: 24px; color: white;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                            </svg>
                        </div>
                        <h3 style="font-weight: 600; color: #1f2937; margin: 0;">이메일</h3>
                    </div>
                    <p style="color: #374151; line-height: 1.6; margin: 0 0 0.5rem;">
                        <strong>교육문의:</strong> haba98@sbs.co.kr<br>
                    </p>
                </div>
            </div>
        </div>
        
        <style>
        .content-card h3 {
            font-size: 1.25rem;
        }
        
        @media (max-width: 768px) {
            .content-card h3 {
                font-size: 0.95rem !important;
            }
            
            .content-card > div:nth-child(4) {
                grid-template-columns: 1fr !important;
                gap: 1rem !important;
            }
            
            .content-card > div:nth-child(4) > div {
                padding: 1.5rem !important;
            }
            
            .content-card > div:nth-child(3) > div {
                height: 300px !important;
            }
            
            .content-card > div:last-child > div:last-child {
                grid-template-columns: 1fr !important;
            }
        }
        </style>
    `;
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
                    <label class="form-label">재직여부</label>
                    <select id="apply-employment" class="form-input" style="cursor: pointer;" required>
                        <option value="">선택해주세요</option>
                        <option value="재직중">재직중</option>
                        <option value="구직중">구직중</option>
                        <option value="학생">학생</option>
                        <option value="프리랜서">프리랜서</option>
                        <option value="기타">기타</option>
                    </select>
                </div>
                
                <div style="margin-bottom: 1.5rem;">
                    <label class="form-label">회사명 (재직중인 경우)</label>
                    <input type="text" id="apply-company" class="form-input" placeholder="회사명을 입력해주세요">
                </div>
                
                <div style="margin-bottom: 1.5rem;">
                    <label class="form-label">직군/직급</label>
                    <input type="text" id="apply-position" class="form-input" placeholder="예: 개발자/주임, 마케터/팀장, 학생 등" required>
                </div>
                
                <div style="margin-bottom: 2rem;">
                    <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
                        <input type="checkbox" id="apply-agree" required style="width: 16px; height: 16px;">
                        <span style="font-size: 14px; color: #374151;">개인정보 수집 및 이용에 동의합니다. *</span>
                    </label>
                </div>
                
                <div style="margin-bottom: 2rem; padding: 1rem; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px;">
                    <p style="margin: 0; font-size: 14px; color: #6b7280; line-height: 1.5;">
                        <strong style="color: #374151;">안내사항:</strong> 일부 교육은 고용노동부 협약 사업으로 고용보험 가입여부 확인을 위해 주민등록번호를 요청할 수 있습니다.
                    </p>
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
        case 'education':
            // URL 파라미터에서 detail 확인하여 모달 열기
            setTimeout(() => {
                const urlParams = getURLParams();
                if (urlParams.detail && educationDetails[urlParams.detail]) {
                    openEducationModal(parseInt(urlParams.detail));
                }
            }, 200); // 페이지 렌더링 완료 후 실행
            break;
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

// 교육 상세 정보 더미 데이터
const educationDetails = {
    1: {
        id: 1,
        title: "AI 기초 및 머신러닝 입문",
        category: "AI/머신러닝",
        duration: "8주 (32시간)",
        schedule: "주 2회 (화, 목) 19:00-21:00",
        level: "초급",
        instructor: "김AI 박사",
        price: "무료 (고용노동부 지원)",
        description: "인공지능의 기본 개념부터 머신러닝 실습까지 체계적으로 학습하는 과정입니다. 프로그래밍 경험이 없어도 참여 가능합니다.",
        curriculum: [
            "1-2주차: AI 개념 및 동향 이해",
            "3-4주차: Python 기초 및 데이터 처리",
            "5-6주차: 머신러닝 알고리즘 기초",
            "7-8주차: 실습 프로젝트 및 포트폴리오 작성"
        ],
        requirements: [
            "컴퓨터 기초 사용법",
            "학습에 대한 열정",
            "개인 노트북 지참 (권장)"
        ],
        benefits: [
            "수료증 발급",
            "실습용 데이터셋 제공",
            "1:1 멘토링 3회",
            "취업 연계 프로그램"
        ]
    }
};

// URL 파라미터 파싱 함수
function getURLParams() {
    const urlParams = new URLSearchParams(window.location.search);
    return {
        page: urlParams.get('page') || window.location.hash.slice(1) || 'home',
        detail: urlParams.get('detail')
    };
}

// URL 업데이트 함수
function updateURL(page, detail = null) {
    const url = new URL(window.location);
    url.searchParams.set('page', page);
    
    if (detail) {
        url.searchParams.set('detail', detail);
    } else {
        url.searchParams.delete('detail');
    }
    
    // 해시도 동시에 업데이트
    url.hash = page;
    
    window.history.pushState({ page, detail }, '', url);
}

// 교육 상세 모달 열기
function openEducationModal(educationId) {
    const education = educationDetails[educationId];
    if (!education) return;
    
    // URL 업데이트
    updateURL('education', educationId);

    const modalHTML = `
        <div id="education-modal" class="education-modal">
            <div class="education-modal-backdrop" onclick="closeEducationModal()"></div>
            <div class="education-modal-content">
                <div class="education-modal-header">
                    <div style="flex: 1;">
                        <h2 style="margin: 0 0 0.5rem 0; font-size: 1.5rem; font-weight: bold; color: #1f2937;">${education.title}</h2>
                        <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
                            <span style="background: #dbeafe; color: #1e40af; padding: 0.25rem 0.75rem; border-radius: 12px; font-size: 0.75rem;">${education.category}</span>
                            <span style="background: #dcfce7; color: #166534; padding: 0.25rem 0.75rem; border-radius: 12px; font-size: 0.75rem;">${education.level}</span>
                        </div>
                    </div>
                    <button onclick="closeEducationModal()" style="background: none; border: none; font-size: 1.5rem; color: #6b7280; cursor: pointer; padding: 0.5rem;">×</button>
                </div>
                
                <div class="education-modal-body">
                    <div style="margin-bottom: 2rem;">
                        <h3 style="font-size: 1.125rem; font-weight: 600; color: #1f2937; margin-bottom: 0.5rem;">교육 개요</h3>
                        <p style="color: #374151; line-height: 1.6; margin-bottom: 1rem;">${education.description}</p>
                        
                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-top: 1rem;">
                            <div>
                                <span style="font-weight: 600; color: #6b7280; font-size: 0.875rem;">기간:</span>
                                <span style="color: #1f2937; margin-left: 0.5rem;">${education.duration}</span>
                            </div>
                            <div>
                                <span style="font-weight: 600; color: #6b7280; font-size: 0.875rem;">일정:</span>
                                <span style="color: #1f2937; margin-left: 0.5rem;">${education.schedule}</span>
                            </div>
                            <div>
                                <span style="font-weight: 600; color: #6b7280; font-size: 0.875rem;">강사:</span>
                                <span style="color: #1f2937; margin-left: 0.5rem;">${education.instructor}</span>
                            </div>
                            <div>
                                <span style="font-weight: 600; color: #6b7280; font-size: 0.875rem;">수강료:</span>
                                <span style="color: #ef4444; font-weight: 600; margin-left: 0.5rem;">${education.price}</span>
                            </div>
                        </div>
                    </div>
                    
                    <div style="margin-bottom: 2rem;">
                        <h3 style="font-size: 1.125rem; font-weight: 600; color: #1f2937; margin-bottom: 0.75rem;">커리큘럼</h3>
                        <ul style="list-style: none; padding: 0; margin: 0;">
                            ${education.curriculum.map(item => `
                                <li style="padding: 0.75rem; margin-bottom: 0.5rem; background: #f8fafc; border-radius: 8px; border-left: 4px solid #3b82f6;">
                                    ${item}
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                    
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem; margin-bottom: 2rem;">
                        <div>
                            <h3 style="font-size: 1.125rem; font-weight: 600; color: #1f2937; margin-bottom: 0.75rem;">수강 요건</h3>
                            <ul style="list-style: none; padding: 0; margin: 0;">
                                ${education.requirements.map(req => `
                                    <li style="display: flex; align-items: center; margin-bottom: 0.5rem; color: #374151;">
                                        <svg style="width: 16px; height: 16px; color: #10b981; margin-right: 0.5rem;" fill="currentColor" viewBox="0 0 20 20">
                                            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                                        </svg>
                                        ${req}
                                    </li>
                                `).join('')}
                            </ul>
                        </div>
                        
                        <div>
                            <h3 style="font-size: 1.125rem; font-weight: 600; color: #1f2937; margin-bottom: 0.75rem;">제공 혜택</h3>
                            <ul style="list-style: none; padding: 0; margin: 0;">
                                ${education.benefits.map(benefit => `
                                    <li style="display: flex; align-items: center; margin-bottom: 0.5rem; color: #374151;">
                                        <svg style="width: 16px; height: 16px; color: #3b82f6; margin-right: 0.5rem;" fill="currentColor" viewBox="0 0 20 20">
                                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                                        </svg>
                                        ${benefit}
                                    </li>
                                `).join('')}
                            </ul>
                        </div>
                    </div>
                </div>
                
                <div class="education-modal-footer">
                    <button onclick="closeEducationModal()" style="background: #f3f4f6; color: #374151; border: none; padding: 0.75rem 1.5rem; border-radius: 8px; font-weight: 500; cursor: pointer; margin-right: 1rem;">
                        닫기
                    </button>
                    <button onclick="applyEducation(${education.id})" style="background: #3b82f6; color: white; border: none; padding: 0.75rem 2rem; border-radius: 8px; font-weight: 500; cursor: pointer;">
                        신청하기
                    </button>
                </div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // 애니메이션을 위해 약간 지연 후 active 클래스 추가
    setTimeout(() => {
        const modal = document.getElementById('education-modal');
        if (modal) {
            modal.classList.add('active');
        }
    }, 10);
}

// 교육 상세 모달 닫기
function closeEducationModal() {
    const modal = document.getElementById('education-modal');
    if (modal) {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.remove();
        }, 300);
        
        // URL에서 detail 파라미터 제거
        updateURL('education');
    }
}

// 브라우저 뒤로가기 이벤트 처리
window.addEventListener('popstate', function(event) {
    const urlParams = getURLParams();
    
    if (urlParams.detail && document.getElementById('education-modal')) {
        // 모달이 열려있는데 detail 파라미터가 없으면 모달 닫기
        const modal = document.getElementById('education-modal');
        if (modal) {
            modal.classList.remove('active');
            setTimeout(() => {
                modal.remove();
            }, 300);
        }
    } else if (urlParams.detail && educationDetails[urlParams.detail] && urlParams.page === 'education') {
        // detail 파라미터가 있고 education 페이지면 모달 열기
        openEducationModal(parseInt(urlParams.detail));
    }
    
    // 일반적인 페이지 네비게이션
    if (urlParams.page !== getCurrentPage()) {
        loadPage(urlParams.page);
    }
});

// 현재 페이지 가져오기
function getCurrentPage() {
    const activeNav = document.querySelector('.nav-item.active, .mobile-nav-item.active');
    return activeNav ? activeNav.getAttribute('data-page') : 'home';
}