// 네비게이션 스크롤 효과
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// 모바일 메뉴 토글
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');

    // 햄버거 아이콘 애니메이션
    const spans = hamburger.querySelectorAll('span');
    spans[0].style.transform = navMenu.classList.contains('active')
        ? 'rotate(45deg) translate(5px, 5px)'
        : 'none';
    spans[1].style.opacity = navMenu.classList.contains('active') ? '0' : '1';
    spans[2].style.transform = navMenu.classList.contains('active')
        ? 'rotate(-45deg) translate(7px, -7px)'
        : 'none';
});

// 네비게이션 링크 클릭 시 메뉴 닫기
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// 스무스 스크롤
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// 숫자 카운터 애니메이션
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target.toLocaleString();
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start).toLocaleString();
        }
    }, 16);
}

// Intersection Observer로 숫자 애니메이션 트리거
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = document.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-target'));
                animateCounter(stat, target);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    statsObserver.observe(heroStats);
}

// 카드 애니메이션 (스크롤 시 나타나기)
const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '0';
            entry.target.style.transform = 'translateY(30px)';

            setTimeout(() => {
                entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, 100);

            fadeInObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px'
});

// 모든 feature 카드에 fade-in 효과 적용
const featureCards = document.querySelectorAll('.feature-card');
featureCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
    fadeInObserver.observe(card);
});

// testimonial 카드 애니메이션
const testimonialCards = document.querySelectorAll('.testimonial-card');
testimonialCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
    fadeInObserver.observe(card);
});

// timeline 아이템 애니메이션
const timelineItems = document.querySelectorAll('.timeline-item');
timelineItems.forEach((item, index) => {
    item.style.transitionDelay = `${index * 0.1}s`;
    fadeInObserver.observe(item);
});

// about 섹션 애니메이션
const aboutText = document.querySelector('.about-text');
if (aboutText) {
    fadeInObserver.observe(aboutText);
}

// 페이지 로드 시 애니메이션
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// 마우스 따라다니는 그라디언트 효과
document.addEventListener('mousemove', (e) => {
    const hero = document.querySelector('.hero');
    if (hero) {
        const x = (e.clientX / window.innerWidth) * 100;
        const y = (e.clientY / window.innerHeight) * 100;

        hero.style.setProperty('--mouse-x', `${x}%`);
        hero.style.setProperty('--mouse-y', `${y}%`);
    }
});

// 패럴랙스 효과 (hero 섹션)
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    const codeAnimation = document.querySelector('.code-animation');

    if (heroContent && scrolled < 800) {
        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
        heroContent.style.opacity = 1 - (scrolled / 700);
    }

    if (codeAnimation) {
        codeAnimation.style.transform = `translate(-50%, -50%) translateY(${scrolled * 0.3}px)`;
    }
});

// 키보드 접근성 개선
document.addEventListener('keydown', (e) => {
    // ESC 키로 모바일 메뉴 닫기
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// 활성 네비게이션 링크 하이라이트
function highlightActiveSection() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) {
                navLink.classList.add('active');
            }
        }
    });
}

window.addEventListener('scroll', highlightActiveSection);

// 수강신청 버튼 클릭 트래킹 (분석용)
const registerButtons = document.querySelectorAll('a[href*="forms.gle"]');
registerButtons.forEach(button => {
    button.addEventListener('click', () => {
        console.log('수강신청 버튼 클릭됨');
        // 여기에 분석 코드 추가 가능 (Google Analytics 등)
    });
});

// 더 알아보기 버튼 클릭 시 about 섹션으로 스크롤
const learnMoreBtn = document.querySelector('.btn-secondary');
if (learnMoreBtn) {
    learnMoreBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const aboutSection = document.getElementById('about');
        if (aboutSection) {
            const offsetTop = aboutSection.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
}

// 커리큘럼 타임라인 애니메이션 강화
const curriculumObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const timelineContent = entry.target.querySelector('.timeline-content');
            if (timelineContent) {
                setTimeout(() => {
                    timelineContent.style.transition = 'all 0.6s ease';
                    timelineContent.style.opacity = '1';
                    timelineContent.style.transform = 'translateX(0)';
                }, 200);
            }
            curriculumObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.3,
    rootMargin: '0px'
});

timelineItems.forEach(item => {
    const timelineContent = item.querySelector('.timeline-content');
    if (timelineContent) {
        timelineContent.style.opacity = '0';
        timelineContent.style.transform = 'translateX(-30px)';
    }
    curriculumObserver.observe(item);
});

// 수강생 후기 카드 호버 효과 강화
testimonialCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transition = 'all 0.3s ease';
    });
});

// 스크롤 진행률 계산 (선택사항)
function calculateScrollProgress() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollProgress = (scrollTop / scrollHeight) * 100;
    return scrollProgress;
}

// 특정 섹션에 도달했을 때 애니메이션 트리거
const registerSection = document.querySelector('.register');
if (registerSection) {
    const registerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const registerContent = entry.target.querySelector('.register-content');
                if (registerContent) {
                    registerContent.style.animation = 'scaleIn 0.6s ease forwards';
                }
                registerObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.3
    });

    registerObserver.observe(registerSection);
}

// 스케일 인 애니메이션 추가
const style = document.createElement('style');
style.textContent = `
    @keyframes scaleIn {
        from {
            opacity: 0;
            transform: scale(0.95);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }
`;
document.head.appendChild(style);

// 초기 로드 시 실행
highlightActiveSection();

// 콘솔 메시지
console.log('%c바이브 코딩 웹사이트에 오신 것을 환영합니다!', 'color: #6366f1; font-size: 20px; font-weight: bold;');
console.log('%c코딩의 즐거움을 느껴보세요 🚀', 'color: #ec4899; font-size: 14px;');

// 성능 최적화: 디바운스 함수
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 스크롤 이벤트 최적화
const optimizedScrollHandler = debounce(() => {
    highlightActiveSection();
}, 100);

window.addEventListener('scroll', optimizedScrollHandler);

// 리사이즈 이벤트 핸들러
const handleResize = debounce(() => {
    // 모바일에서 데스크톱으로 전환 시 메뉴 상태 리셋
    if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
}, 250);

window.addEventListener('resize', handleResize);
