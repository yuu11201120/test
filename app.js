/* ============================================
   KDDI Corporate Homepage - JavaScript
   ============================================ */

// --- News Data ---
const NEWS_DATA = [
  {
    id: 1,
    date: '2026.02.12',
    category: 'service',
    categoryLabel: 'サービス',
    title: 'KDDI、5G SA対応エリアを全国主要都市に拡大 人口カバー率90%を達成',
    tab: 'service',
  },
  {
    id: 2,
    date: '2026.02.10',
    category: 'service',
    categoryLabel: 'サービス',
    title: 'au、最新フラッグシップスマートフォン「Galaxy S26 Ultra」の予約受付を開始',
    tab: 'service',
  },
  {
    id: 3,
    date: '2026.02.08',
    category: 'corporate',
    categoryLabel: '企業情報',
    title: 'KDDI、2025年度第3四半期決算を発表 通期業績予想を上方修正',
    tab: 'corporate',
  },
  {
    id: 4,
    date: '2026.02.06',
    category: 'tech',
    categoryLabel: '技術・研究',
    title: 'KDDI総合研究所、6G向けテラヘルツ帯無線通信の実証実験に成功',
    tab: 'tech',
  },
  {
    id: 5,
    date: '2026.02.05',
    category: 'service',
    categoryLabel: 'サービス',
    title: '新動画配信サービス「au ビデオパス Pro」を開始 4K HDR対応コンテンツを拡充',
    tab: 'service',
  },
  {
    id: 6,
    date: '2026.02.04',
    category: 'corporate',
    categoryLabel: '企業情報',
    title: 'KDDI、東南アジアにおけるデータセンター事業の拡大について',
    tab: 'corporate',
  },
  {
    id: 7,
    date: '2026.02.03',
    category: 'tech',
    categoryLabel: '技術・研究',
    title: 'KDDI、AIを活用したネットワーク自動運用システムの商用導入を開始',
    tab: 'tech',
  },
  {
    id: 8,
    date: '2026.02.02',
    category: 'service',
    categoryLabel: 'サービス',
    title: 'au、25歳以下対象の「スマホスタート応援割」を拡充 割引期間を12ヶ月に延長',
    tab: 'service',
  },
  {
    id: 9,
    date: '2026.02.01',
    category: 'corporate',
    categoryLabel: '企業情報',
    title: 'KDDI、サステナビリティボンド（第2回）の発行について',
    tab: 'corporate',
  },
  {
    id: 10,
    date: '2026.01.30',
    category: 'tech',
    categoryLabel: '技術・研究',
    title: 'KDDI、自治体向けスマートシティプラットフォームの提供を開始',
    tab: 'tech',
  },
];

// --- Utility ---
function $(sel) {
  return document.querySelector(sel);
}

function $$(sel) {
  return document.querySelectorAll(sel);
}

// --- Hero Slider ---
const HeroSlider = {
  currentSlide: 0,
  totalSlides: 0,
  autoplayTimer: null,
  autoplayInterval: 6000,

  init() {
    const slides = $$('.hero-slide');
    this.totalSlides = slides.length;
    if (this.totalSlides === 0) return;

    // Dot navigation
    $$('.hero-dot').forEach((dot) => {
      dot.addEventListener('click', () => {
        this.goTo(parseInt(dot.dataset.slide));
      });
    });

    // Arrow navigation
    const prev = $('#heroPrev');
    const next = $('#heroNext');
    if (prev) prev.addEventListener('click', () => this.prev());
    if (next) next.addEventListener('click', () => this.next());

    this.startAutoplay();
  },

  goTo(index) {
    if (index === this.currentSlide) return;

    const slides = $$('.hero-slide');
    const dots = $$('.hero-dot');

    slides[this.currentSlide].classList.remove('active');
    dots[this.currentSlide].classList.remove('active');

    this.currentSlide = (index + this.totalSlides) % this.totalSlides;

    slides[this.currentSlide].classList.add('active');
    dots[this.currentSlide].classList.add('active');

    this.resetAutoplay();
  },

  next() {
    this.goTo(this.currentSlide + 1);
  },

  prev() {
    this.goTo(this.currentSlide - 1);
  },

  startAutoplay() {
    this.autoplayTimer = setInterval(() => {
      this.next();
    }, this.autoplayInterval);
  },

  resetAutoplay() {
    clearInterval(this.autoplayTimer);
    this.startAutoplay();
  },
};

// --- Header ---
const Header = {
  init() {
    const header = $('header.header');

    // Scroll effect
    window.addEventListener('scroll', () => {
      if (window.scrollY > 10) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });

    // Mobile menu toggle
    const menuToggle = $('#menuToggle');
    const headerNav = $('#headerNav');

    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      headerNav.classList.toggle('active');
    });

    // Close menu on link click
    $$('.header-nav .nav-link').forEach((link) => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        headerNav.classList.remove('active');
      });
    });
  },
};

// --- Search ---
const Search = {
  init() {
    const toggle = $('#searchToggle');
    const overlay = $('#searchOverlay');
    const close = $('#searchClose');
    const input = $('#searchInput');

    toggle.addEventListener('click', () => {
      overlay.classList.add('active');
      setTimeout(() => input.focus(), 200);
    });

    close.addEventListener('click', () => {
      overlay.classList.remove('active');
      input.value = '';
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        overlay.classList.remove('active');
      }
    });
  },
};

// --- News ---
const News = {
  currentTab: 'all',

  init() {
    this.render();

    $$('.news-tab').forEach((tab) => {
      tab.addEventListener('click', () => {
        $$('.news-tab').forEach((t) => t.classList.remove('active'));
        tab.classList.add('active');
        this.currentTab = tab.dataset.tab;
        this.render();
      });
    });
  },

  getFilteredNews() {
    if (this.currentTab === 'all') return NEWS_DATA;
    return NEWS_DATA.filter((n) => n.tab === this.currentTab);
  },

  render() {
    const list = $('#newsList');
    const articles = this.getFilteredNews();

    list.innerHTML = articles
      .map(
        (article) => `
      <a href="#" class="news-item">
        <span class="news-date">${article.date}</span>
        <span class="news-category news-category-${article.category}">${article.categoryLabel}</span>
        <span class="news-title">${article.title}</span>
      </a>
    `
      )
      .join('');
  },
};

// --- Scroll Animations ---
const ScrollAnimations = {
  init() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe section elements
    $$('.service-card, .corporate-card, .sustainability-card, .ir-highlight').forEach(
      (el, index) => {
        el.style.animationDelay = `${index * 0.1}s`;
        observer.observe(el);
      }
    );
  },
};

// --- Smooth Scroll ---
const SmoothScroll = {
  init() {
    $$('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', (e) => {
        const targetId = anchor.getAttribute('href');
        if (targetId === '#') return;

        const target = $(targetId);
        if (target) {
          e.preventDefault();
          const headerHeight = parseInt(
            getComputedStyle(document.documentElement).getPropertyValue('--header-height')
          );
          const top = target.getBoundingClientRect().top + window.scrollY - headerHeight;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      });
    });
  },
};

// --- Init ---
document.addEventListener('DOMContentLoaded', () => {
  Header.init();
  Search.init();
  HeroSlider.init();
  News.init();
  ScrollAnimations.init();
  SmoothScroll.init();
});
