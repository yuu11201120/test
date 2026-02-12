/* ============================================
   StayEase - Hotel Booking App JavaScript
   ============================================ */

// --- Hotel Data ---
const HOTELS = [
  {
    id: 1,
    name: 'ザ・リッツ東京',
    location: '東京都港区',
    description: '東京タワーを望む最高級ホテル。洗練されたサービスと上質な空間で、特別なひとときをお過ごしください。ミシュラン星付きレストランも併設。',
    rating: 4.8,
    reviewCount: 1245,
    priceRange: 'luxury',
    image: 'linear-gradient(135deg, #1a1a2e, #16213e, #0f3460)',
    imageLabel: 'RITZ',
    badge: '人気',
    amenities: ['Wi-Fi', '温泉', 'レストラン', 'バー', 'ジム', 'スパ', 'プール', 'ルームサービス'],
    rooms: [
      { id: 'r1', name: 'デラックスルーム', desc: '広々とした42平米の客室。東京タワービュー。', price: 58000, capacity: 2, size: '42㎡', bed: 'キングベッド' },
      { id: 'r2', name: 'プレミアスイート', desc: 'リビング付き78平米のスイートルーム。パノラマビュー。', price: 120000, capacity: 3, size: '78㎡', bed: 'キングベッド' },
      { id: 'r3', name: 'ロイヤルスイート', desc: '最上階の150平米。専用バトラーサービス付き。', price: 250000, capacity: 4, size: '150㎡', bed: 'キングベッド×2' },
    ],
  },
  {
    id: 2,
    name: '京都グランヴィア',
    location: '京都府京都市',
    description: '京都駅直結の好立地。日本庭園を望む客室で、古都の風情を感じながらゆったりとお寛ぎいただけます。',
    rating: 4.6,
    reviewCount: 890,
    priceRange: 'high',
    image: 'linear-gradient(135deg, #2d6a4f, #1b4332, #081c15)',
    imageLabel: 'KYOTO',
    badge: 'おすすめ',
    amenities: ['Wi-Fi', '日本庭園', 'レストラン', '茶室', 'ジム', 'コンシェルジュ'],
    rooms: [
      { id: 'r1', name: 'スタンダードツイン', desc: '28平米のモダンな客室。京都の街並みを一望。', price: 28000, capacity: 2, size: '28㎡', bed: 'ツインベッド' },
      { id: 'r2', name: '和洋室デラックス', desc: '畳スペース付き45平米。日本庭園ビュー。', price: 45000, capacity: 3, size: '45㎡', bed: '和洋室' },
      { id: 'r3', name: 'ジュニアスイート', desc: '広々60平米。専用露天風呂付き。', price: 68000, capacity: 2, size: '60㎡', bed: 'キングベッド' },
    ],
  },
  {
    id: 3,
    name: 'シーサイドリゾート沖縄',
    location: '沖縄県恩納村',
    description: 'エメラルドグリーンの海を目の前に、南国リゾートを満喫。プライベートビーチとインフィニティプールが自慢です。',
    rating: 4.7,
    reviewCount: 678,
    priceRange: 'high',
    image: 'linear-gradient(135deg, #0077b6, #00b4d8, #90e0ef)',
    imageLabel: 'OCEAN',
    badge: '人気',
    amenities: ['Wi-Fi', 'ビーチ', 'プール', 'レストラン', 'バー', 'スパ', 'マリンスポーツ'],
    rooms: [
      { id: 'r1', name: 'オーシャンビュールーム', desc: '全室オーシャンビュー。35平米の開放的な客室。', price: 32000, capacity: 2, size: '35㎡', bed: 'ダブルベッド' },
      { id: 'r2', name: 'プレミアムスイート', desc: 'テラス付き65平米。プライベートジャグジー完備。', price: 55000, capacity: 3, size: '65㎡', bed: 'キングベッド' },
      { id: 'r3', name: 'ヴィラ', desc: '独立型100平米のプライベートヴィラ。専用プール付き。', price: 95000, capacity: 4, size: '100㎡', bed: 'キングベッド' },
    ],
  },
  {
    id: 4,
    name: 'ビジネスイン新宿',
    location: '東京都新宿区',
    description: '新宿駅西口徒歩3分。ビジネスに最適な機能的客室と、充実した朝食ビュッフェが好評です。',
    rating: 4.2,
    reviewCount: 2340,
    priceRange: 'budget',
    image: 'linear-gradient(135deg, #495057, #343a40, #212529)',
    imageLabel: 'BIZ',
    amenities: ['Wi-Fi', '朝食', 'ランドリー', 'ビジネスセンター', '自販機'],
    rooms: [
      { id: 'r1', name: 'シングルルーム', desc: 'コンパクト14平米。デスクワークに最適。', price: 7500, capacity: 1, size: '14㎡', bed: 'シングルベッド' },
      { id: 'r2', name: 'ダブルルーム', desc: '18平米。ゆったりダブルベッドでリラックス。', price: 9800, capacity: 2, size: '18㎡', bed: 'ダブルベッド' },
      { id: 'r3', name: 'ツインルーム', desc: '22平米。友人や同僚との出張に最適。', price: 12000, capacity: 2, size: '22㎡', bed: 'ツインベッド' },
    ],
  },
  {
    id: 5,
    name: '温泉旅館 花月庵',
    location: '神奈川県箱根町',
    description: '箱根の自然に囲まれた老舗温泉旅館。源泉かけ流しの露天風呂と、旬の食材を使った懐石料理が自慢です。',
    rating: 4.9,
    reviewCount: 456,
    priceRange: 'high',
    image: 'linear-gradient(135deg, #774936, #6b4226, #3e2723)',
    imageLabel: '花月',
    badge: '高評価',
    amenities: ['Wi-Fi', '温泉', '露天風呂', '懐石料理', '庭園', '送迎'],
    rooms: [
      { id: 'r1', name: '和室 松', desc: '10畳の純和室。庭園ビュー。夕朝食付き。', price: 35000, capacity: 2, size: '10畳', bed: '布団' },
      { id: 'r2', name: '特別室 竹', desc: '12畳+次の間。客室露天風呂付き。', price: 55000, capacity: 3, size: '12畳+次の間', bed: '布団' },
      { id: 'r3', name: '離れ 梅', desc: '独立した離れの特別室。専用庭園と露天風呂。', price: 85000, capacity: 2, size: '15畳+リビング', bed: '布団' },
    ],
  },
  {
    id: 6,
    name: 'ホテルモダン大阪',
    location: '大阪府大阪市',
    description: '心斎橋エリアに位置するデザインホテル。スタイリッシュな内装と、大阪グルメへのアクセスが魅力です。',
    rating: 4.4,
    reviewCount: 1567,
    priceRange: 'mid',
    image: 'linear-gradient(135deg, #e63946, #a8201a, #6a040f)',
    imageLabel: 'MODERN',
    amenities: ['Wi-Fi', 'レストラン', 'バー', 'ジム', 'ランドリー'],
    rooms: [
      { id: 'r1', name: 'モダンシングル', desc: '16平米のデザイナーズルーム。', price: 11000, capacity: 1, size: '16㎡', bed: 'シングルベッド' },
      { id: 'r2', name: 'モダンダブル', desc: '22平米。カップルにおすすめ。', price: 16000, capacity: 2, size: '22㎡', bed: 'ダブルベッド' },
      { id: 'r3', name: 'モダンスイート', desc: '40平米。リビング付きのゆとり空間。', price: 32000, capacity: 3, size: '40㎡', bed: 'キングベッド' },
    ],
  },
  {
    id: 7,
    name: 'スカイビューホテル横浜',
    location: '神奈川県横浜市',
    description: 'みなとみらいの夜景を一望できる高層ホテル。30階以上の客室から横浜港の絶景をお楽しみください。',
    rating: 4.5,
    reviewCount: 980,
    priceRange: 'mid',
    image: 'linear-gradient(135deg, #3a0ca3, #4361ee, #4cc9f0)',
    imageLabel: 'SKY',
    amenities: ['Wi-Fi', 'レストラン', 'バー', 'プール', 'ジム', 'コンシェルジュ'],
    rooms: [
      { id: 'r1', name: 'スカイダブル', desc: '25平米。港夜景を望む高層階客室。', price: 18000, capacity: 2, size: '25㎡', bed: 'ダブルベッド' },
      { id: 'r2', name: 'スカイデラックス', desc: '35平米。コーナールームで270度のパノラマ。', price: 28000, capacity: 2, size: '35㎡', bed: 'キングベッド' },
      { id: 'r3', name: 'スカイスイート', desc: '55平米。最上階の特別フロア。', price: 48000, capacity: 3, size: '55㎡', bed: 'キングベッド' },
    ],
  },
  {
    id: 8,
    name: 'コンフォートステイ札幌',
    location: '北海道札幌市',
    description: '大通公園すぐそばの快適ホテル。北海道の味覚を堪能できる朝食ビュッフェと、天然温泉大浴場が人気。',
    rating: 4.3,
    reviewCount: 1123,
    priceRange: 'budget',
    image: 'linear-gradient(135deg, #2b2d42, #8d99ae, #edf2f4)',
    imageLabel: 'COMFORT',
    amenities: ['Wi-Fi', '朝食', '温泉', 'ランドリー', '駐車場'],
    rooms: [
      { id: 'r1', name: 'エコノミーシングル', desc: '13平米。必要十分な設備を完備。', price: 6500, capacity: 1, size: '13㎡', bed: 'シングルベッド' },
      { id: 'r2', name: 'スタンダードツイン', desc: '20平米。友人や家族との旅行に。', price: 9500, capacity: 2, size: '20㎡', bed: 'ツインベッド' },
      { id: 'r3', name: 'デラックスダブル', desc: '26平米。ゆったりとした滞在を。', price: 13500, capacity: 2, size: '26㎡', bed: 'ダブルベッド' },
    ],
  },
  {
    id: 9,
    name: '瀬戸内リトリート',
    location: '広島県尾道市',
    description: '瀬戸内海の島々を望む隠れ家リゾート。アート作品が点在する敷地内で、非日常の時間を過ごせます。',
    rating: 4.7,
    reviewCount: 312,
    priceRange: 'high',
    image: 'linear-gradient(135deg, #606c38, #283618, #dda15e)',
    imageLabel: 'RETREAT',
    badge: 'おすすめ',
    amenities: ['Wi-Fi', 'レストラン', 'スパ', 'アート', 'サイクリング', '瞑想室'],
    rooms: [
      { id: 'r1', name: 'ガーデンルーム', desc: '30平米。庭園に面した静かな客室。', price: 28000, capacity: 2, size: '30㎡', bed: 'ダブルベッド' },
      { id: 'r2', name: 'シービュースイート', desc: '50平米。瀬戸内海の絶景テラス付き。', price: 45000, capacity: 2, size: '50㎡', bed: 'キングベッド' },
      { id: 'r3', name: 'アーティストヴィラ', desc: '80平米。アート作品に囲まれた特別空間。', price: 72000, capacity: 3, size: '80㎡', bed: 'キングベッド' },
    ],
  },
];

// --- Utility ---
function $(sel) {
  return document.querySelector(sel);
}

function $$(sel) {
  return document.querySelectorAll(sel);
}

function formatPrice(price) {
  return price.toLocaleString('ja-JP');
}

function generateStars(rating) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  return '\u2605'.repeat(full) + (half ? '\u2606' : '') + '\u2606'.repeat(empty > 0 ? empty : 0);
}

function generateBookingId() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let id = 'SE-';
  for (let i = 0; i < 8; i++) {
    id += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return id;
}

function formatDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.getFullYear() + '年' + (d.getMonth() + 1) + '月' + d.getDate() + '日';
}

function calcNights(checkin, checkout) {
  if (!checkin || !checkout) return 1;
  const d1 = new Date(checkin);
  const d2 = new Date(checkout);
  const diff = Math.ceil((d2 - d1) / (1000 * 60 * 60 * 24));
  return diff > 0 ? diff : 1;
}

// --- State ---
const AppState = {
  currentPage: 'home',
  searchParams: {
    destination: '',
    checkin: '',
    checkout: '',
    guests: 2,
  },
  selectedHotel: null,
  selectedRoom: null,
  bookings: JSON.parse(localStorage.getItem('stayease_bookings') || '[]'),

  saveBookings() {
    localStorage.setItem('stayease_bookings', JSON.stringify(this.bookings));
  },
};

// --- Router ---
const Router = {
  navigate(page) {
    AppState.currentPage = page;
    $$('.page').forEach((p) => p.classList.remove('active'));
    $$('.nav-link').forEach((l) => l.classList.remove('active'));

    const pageEl = $(`#page${page.charAt(0).toUpperCase() + page.slice(1)}`);
    if (pageEl) pageEl.classList.add('active');

    const navLink = $(`.nav-link[data-page="${page}"]`);
    if (navLink) navLink.classList.add('active');

    window.scrollTo({ top: 0, behavior: 'smooth' });
  },
};

// --- Hotel Card Rendering ---
function renderHotelCard(hotel) {
  const starStr = generateStars(hotel.rating);
  const minPrice = Math.min(...hotel.rooms.map((r) => r.price));
  const amenitiesHtml = hotel.amenities
    .slice(0, 4)
    .map((a) => `<span class="amenity-tag">${a}</span>`)
    .join('');

  return `
    <div class="hotel-card" data-hotel-id="${hotel.id}">
      <div class="hotel-card-image">
        <div class="hotel-card-image-bg" style="background: ${hotel.image}">${hotel.imageLabel}</div>
        ${hotel.badge ? `<span class="hotel-card-badge">${hotel.badge}</span>` : ''}
      </div>
      <div class="hotel-card-body">
        <div class="hotel-card-location">${hotel.location}</div>
        <div class="hotel-card-name">${hotel.name}</div>
        <div class="hotel-card-rating">
          <span class="rating-stars">${starStr}</span>
          <span class="rating-score">${hotel.rating}</span>
          <span class="rating-count">(${hotel.reviewCount}件)</span>
        </div>
        <div class="hotel-card-amenities">${amenitiesHtml}</div>
        <div class="hotel-card-footer">
          <div class="hotel-card-price">
            <span class="price-label">1泊あたり</span>
            <span class="price-value">&yen;${formatPrice(minPrice)}<span class="price-unit"> ~/泊</span></span>
          </div>
          <button class="btn-detail" data-hotel-id="${hotel.id}">詳細を見る</button>
        </div>
      </div>
    </div>
  `;
}

function renderHotelListCard(hotel) {
  const starStr = generateStars(hotel.rating);
  const minPrice = Math.min(...hotel.rooms.map((r) => r.price));
  const amenitiesHtml = hotel.amenities
    .slice(0, 5)
    .map((a) => `<span class="amenity-tag">${a}</span>`)
    .join('');

  return `
    <div class="hotel-list-card" data-hotel-id="${hotel.id}">
      <div class="hotel-list-image">
        <div class="hotel-list-image-bg" style="background: ${hotel.image}">${hotel.imageLabel}</div>
      </div>
      <div class="hotel-list-body">
        <div class="hotel-list-header">
          <div>
            <div class="hotel-list-name">${hotel.name}</div>
            <div class="hotel-list-location">${hotel.location}</div>
          </div>
          <div class="hotel-card-rating">
            <span class="rating-stars">${starStr}</span>
            <span class="rating-score">${hotel.rating}</span>
          </div>
        </div>
        <div class="hotel-list-desc">${hotel.description}</div>
        <div class="hotel-card-amenities">${amenitiesHtml}</div>
        <div class="hotel-list-footer">
          <div class="hotel-card-price">
            <span class="price-label">1泊あたり</span>
            <span class="price-value">&yen;${formatPrice(minPrice)}<span class="price-unit"> ~/泊</span></span>
          </div>
          <button class="btn-detail" data-hotel-id="${hotel.id}">詳細を見る</button>
        </div>
      </div>
    </div>
  `;
}

// --- Pages ---
const HomePage = {
  init() {
    this.renderFeatured();
    this.setupEvents();
    this.setDefaultDates();
  },

  setDefaultDates() {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dayAfter = new Date(today);
    dayAfter.setDate(dayAfter.getDate() + 2);

    const fmt = (d) => d.toISOString().split('T')[0];
    $('#homeCheckin').value = fmt(tomorrow);
    $('#homeCheckout').value = fmt(dayAfter);
    $('#homeCheckin').min = fmt(today);
    $('#homeCheckout').min = fmt(tomorrow);
  },

  renderFeatured() {
    const featured = HOTELS.filter((h) => h.badge).slice(0, 6);
    const container = $('#featuredHotels');
    container.innerHTML = featured.map((h) => renderHotelCard(h)).join('');

    container.querySelectorAll('.hotel-card, .btn-detail').forEach((el) => {
      el.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = parseInt(el.dataset.hotelId || el.closest('.hotel-card').dataset.hotelId);
        DetailPage.show(id);
      });
    });
  },

  setupEvents() {
    $('#homeSearchBtn').addEventListener('click', () => {
      AppState.searchParams = {
        destination: $('#homeDestination').value,
        checkin: $('#homeCheckin').value,
        checkout: $('#homeCheckout').value,
        guests: parseInt($('#homeGuests').value),
      };
      SearchPage.search();
      Router.navigate('search');
    });
  },
};

const SearchPage = {
  init() {
    this.setupEvents();
    this.setDefaultDates();
  },

  setDefaultDates() {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dayAfter = new Date(today);
    dayAfter.setDate(dayAfter.getDate() + 2);

    const fmt = (d) => d.toISOString().split('T')[0];
    $('#searchCheckin').value = fmt(tomorrow);
    $('#searchCheckout').value = fmt(dayAfter);
    $('#searchCheckin').min = fmt(today);
    $('#searchCheckout').min = fmt(tomorrow);
  },

  setupEvents() {
    $('#searchPageBtn').addEventListener('click', () => {
      AppState.searchParams = {
        destination: $('#searchDestination').value,
        checkin: $('#searchCheckin').value,
        checkout: $('#searchCheckout').value,
        guests: parseInt($('#searchGuests').value),
      };
      this.search();
    });

    ['filterPrice', 'filterRating', 'filterSort'].forEach((id) => {
      $(`#${id}`).addEventListener('change', () => this.search());
    });
  },

  search() {
    let results = [...HOTELS];
    const { destination, guests } = AppState.searchParams;

    // Filter by destination
    if (destination) {
      const q = destination.toLowerCase();
      results = results.filter(
        (h) =>
          h.name.toLowerCase().includes(q) ||
          h.location.toLowerCase().includes(q) ||
          h.location.includes(destination)
      );
    }

    // Filter by guest capacity
    if (guests) {
      results = results.filter((h) => h.rooms.some((r) => r.capacity >= guests));
    }

    // Filter by price
    const priceFilter = $('#filterPrice').value;
    if (priceFilter !== 'all') {
      results = results.filter((h) => {
        const min = Math.min(...h.rooms.map((r) => r.price));
        switch (priceFilter) {
          case 'budget': return min <= 10000;
          case 'mid': return min >= 10000 && min <= 25000;
          case 'high': return min >= 25000 && min <= 50000;
          case 'luxury': return min >= 50000;
          default: return true;
        }
      });
    }

    // Filter by rating
    const ratingFilter = $('#filterRating').value;
    if (ratingFilter !== 'all') {
      results = results.filter((h) => h.rating >= parseFloat(ratingFilter));
    }

    // Sort
    const sortBy = $('#filterSort').value;
    switch (sortBy) {
      case 'price-low':
        results.sort((a, b) => Math.min(...a.rooms.map((r) => r.price)) - Math.min(...b.rooms.map((r) => r.price)));
        break;
      case 'price-high':
        results.sort((a, b) => Math.min(...b.rooms.map((r) => r.price)) - Math.min(...a.rooms.map((r) => r.price)));
        break;
      case 'rating':
        results.sort((a, b) => b.rating - a.rating);
        break;
    }

    this.renderResults(results);
  },

  renderResults(hotels) {
    const list = $('#hotelList');
    $('#resultsCount').textContent = `${hotels.length}件`;

    if (hotels.length === 0) {
      list.innerHTML = `
        <div class="bookings-empty">
          <div class="bookings-empty-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          </div>
          <p class="bookings-empty-text">条件に一致するホテルが見つかりませんでした</p>
          <p style="font-size:0.85rem">検索条件を変更してお試しください</p>
        </div>
      `;
      return;
    }

    list.innerHTML = hotels.map((h) => renderHotelListCard(h)).join('');

    list.querySelectorAll('.hotel-list-card, .btn-detail').forEach((el) => {
      el.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = parseInt(el.dataset.hotelId || el.closest('.hotel-list-card').dataset.hotelId);
        DetailPage.show(id);
      });
    });
  },
};

const DetailPage = {
  show(hotelId) {
    const hotel = HOTELS.find((h) => h.id === hotelId);
    if (!hotel) return;

    AppState.selectedHotel = hotel;
    const container = $('#hotelDetail');
    const starStr = generateStars(hotel.rating);

    const amenitiesHtml = hotel.amenities
      .map(
        (a) => `
      <span class="detail-amenity">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
        ${a}
      </span>
    `
      )
      .join('');

    const roomsHtml = hotel.rooms
      .map(
        (room) => `
      <div class="room-card">
        <div class="room-info">
          <div class="room-name">${room.name}</div>
          <div class="room-desc">${room.desc}</div>
          <div class="room-features">
            <span class="room-feature">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
              ${room.size}
            </span>
            <span class="room-feature">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 4v16M22 4v16M6 20h12M6 4h12a2 2 0 0 1 2 2v4H4V6a2 2 0 0 1 2-2z"/></svg>
              ${room.bed}
            </span>
            <span class="room-feature">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
              最大${room.capacity}名
            </span>
          </div>
        </div>
        <div class="room-pricing">
          <div class="room-price">&yen;${formatPrice(room.price)}<span class="room-price-unit">/泊</span></div>
          <button class="btn-book" data-room-id="${room.id}">予約する</button>
        </div>
      </div>
    `
      )
      .join('');

    container.innerHTML = `
      <div class="detail-header">
        <div class="detail-gallery">
          <div class="detail-main-image">
            <div class="detail-main-image-bg" style="background: ${hotel.image}">${hotel.imageLabel}</div>
          </div>
        </div>
        <div class="detail-info">
          <div class="detail-location">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            ${hotel.location}
          </div>
          <h1 class="detail-name">${hotel.name}</h1>
          <div class="detail-rating">
            <span class="rating-score">${hotel.rating}</span>
            <span class="rating-stars">${starStr}</span>
            <span class="rating-count">${hotel.reviewCount}件のレビュー</span>
          </div>
          <p class="detail-desc">${hotel.description}</p>
          <div class="detail-amenities">${amenitiesHtml}</div>
        </div>
      </div>
      <div class="rooms-section">
        <h2 class="rooms-title">客室タイプ</h2>
        ${roomsHtml}
      </div>
    `;

    // Bind book buttons
    container.querySelectorAll('.btn-book').forEach((btn) => {
      btn.addEventListener('click', () => {
        const roomId = btn.dataset.roomId;
        const room = hotel.rooms.find((r) => r.id === roomId);
        AppState.selectedRoom = room;
        BookingPage.show();
      });
    });

    Router.navigate('detail');
  },
};

const BookingPage = {
  show() {
    this.renderSummary();
    this.setupEvents();
    Router.navigate('booking');
  },

  renderSummary() {
    const hotel = AppState.selectedHotel;
    const room = AppState.selectedRoom;
    const { checkin, checkout, guests } = AppState.searchParams;
    const nights = calcNights(checkin, checkout);
    const subtotal = room.price * nights;
    const tax = Math.floor(subtotal * 0.1);
    const total = subtotal + tax;

    const container = $('#bookingSummary');
    container.innerHTML = `
      <h3 class="summary-hotel-name">${hotel.name}</h3>
      <p class="summary-room-name">${room.name}</p>
      <hr class="summary-divider">
      <div class="summary-row">
        <span class="summary-row-label">チェックイン</span>
        <span>${formatDate(checkin) || '未選択'}</span>
      </div>
      <div class="summary-row">
        <span class="summary-row-label">チェックアウト</span>
        <span>${formatDate(checkout) || '未選択'}</span>
      </div>
      <div class="summary-row">
        <span class="summary-row-label">宿泊数</span>
        <span>${nights}泊</span>
      </div>
      <div class="summary-row">
        <span class="summary-row-label">人数</span>
        <span>${guests}名</span>
      </div>
      <hr class="summary-divider">
      <div class="summary-row">
        <span class="summary-row-label">室料 (&yen;${formatPrice(room.price)} x ${nights}泊)</span>
        <span>&yen;${formatPrice(subtotal)}</span>
      </div>
      <div class="summary-row">
        <span class="summary-row-label">税・サービス料</span>
        <span>&yen;${formatPrice(tax)}</span>
      </div>
      <div class="summary-total">
        <span class="summary-total-label">合計</span>
        <span class="summary-total-value">&yen;${formatPrice(total)}</span>
      </div>
    `;
  },

  setupEvents() {
    const form = $('#bookingForm');

    // Card number formatting
    const cardInput = $('#cardNumber');
    cardInput.addEventListener('input', (e) => {
      let value = e.target.value.replace(/\D/g, '');
      value = value.replace(/(.{4})/g, '$1 ').trim();
      e.target.value = value;
    });

    // Expiry formatting
    const expiryInput = $('#cardExpiry');
    expiryInput.addEventListener('input', (e) => {
      let value = e.target.value.replace(/\D/g, '');
      if (value.length >= 2) {
        value = value.slice(0, 2) + '/' + value.slice(2);
      }
      e.target.value = value;
    });

    // CVC - numbers only
    const cvcInput = $('#cardCvc');
    cvcInput.addEventListener('input', (e) => {
      e.target.value = e.target.value.replace(/\D/g, '');
    });

    // Remove old listener by cloning
    const newForm = form.cloneNode(true);
    form.parentNode.replaceChild(newForm, form);

    // Re-bind formatting events on cloned inputs
    const newCardInput = $('#cardNumber');
    newCardInput.addEventListener('input', (e) => {
      let value = e.target.value.replace(/\D/g, '');
      value = value.replace(/(.{4})/g, '$1 ').trim();
      e.target.value = value;
    });

    const newExpiryInput = $('#cardExpiry');
    newExpiryInput.addEventListener('input', (e) => {
      let value = e.target.value.replace(/\D/g, '');
      if (value.length >= 2) {
        value = value.slice(0, 2) + '/' + value.slice(2);
      }
      e.target.value = value;
    });

    const newCvcInput = $('#cardCvc');
    newCvcInput.addEventListener('input', (e) => {
      e.target.value = e.target.value.replace(/\D/g, '');
    });

    newForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (this.validate()) {
        this.confirmBooking();
      }
    });
  },

  validate() {
    let isValid = true;

    // Clear errors
    $$('.form-error').forEach((el) => (el.textContent = ''));
    $$('.form-input').forEach((el) => el.classList.remove('error'));

    const lastName = $('#guestLastName').value.trim();
    const firstName = $('#guestFirstName').value.trim();
    const email = $('#guestEmail').value.trim();
    const phone = $('#guestPhone').value.trim();
    const card = $('#cardNumber').value.replace(/\s/g, '');
    const expiry = $('#cardExpiry').value.trim();
    const cvc = $('#cardCvc').value.trim();

    if (!lastName) {
      $('#errorLastName').textContent = '姓を入力してください';
      $('#guestLastName').classList.add('error');
      isValid = false;
    }

    if (!firstName) {
      $('#errorFirstName').textContent = '名を入力してください';
      $('#guestFirstName').classList.add('error');
      isValid = false;
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      $('#errorEmail').textContent = '有効なメールアドレスを入力してください';
      $('#guestEmail').classList.add('error');
      isValid = false;
    }

    if (!phone || phone.replace(/[-\s]/g, '').length < 10) {
      $('#errorPhone').textContent = '有効な電話番号を入力してください';
      $('#guestPhone').classList.add('error');
      isValid = false;
    }

    if (!card || card.length < 13) {
      $('#errorCard').textContent = '有効なカード番号を入力してください';
      $('#cardNumber').classList.add('error');
      isValid = false;
    }

    if (!expiry || !/^\d{2}\/\d{2}$/.test(expiry)) {
      $('#errorExpiry').textContent = 'MM/YY形式で入力してください';
      $('#cardExpiry').classList.add('error');
      isValid = false;
    }

    if (!cvc || cvc.length < 3) {
      $('#errorCvc').textContent = 'セキュリティコードを入力してください';
      $('#cardCvc').classList.add('error');
      isValid = false;
    }

    return isValid;
  },

  confirmBooking() {
    const hotel = AppState.selectedHotel;
    const room = AppState.selectedRoom;
    const { checkin, checkout, guests } = AppState.searchParams;
    const nights = calcNights(checkin, checkout);
    const subtotal = room.price * nights;
    const tax = Math.floor(subtotal * 0.1);
    const total = subtotal + tax;

    const booking = {
      id: generateBookingId(),
      hotelId: hotel.id,
      hotelName: hotel.name,
      roomName: room.name,
      location: hotel.location,
      checkin,
      checkout,
      nights,
      guests,
      guestName: `${$('#guestLastName').value} ${$('#guestFirstName').value}`,
      email: $('#guestEmail').value,
      total,
      status: 'confirmed',
      createdAt: new Date().toISOString(),
    };

    AppState.bookings.push(booking);
    AppState.saveBookings();

    ConfirmationPage.show(booking);
  },
};

const ConfirmationPage = {
  show(booking) {
    const container = $('#confirmationContent');
    container.innerHTML = `
      <div class="confirmation-icon">
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
      </div>
      <h2 class="confirmation-title">予約が完了しました</h2>
      <p class="confirmation-subtitle">確認メールを ${booking.email} にお送りしました。</p>
      <div class="booking-id">予約番号: ${booking.id}</div>
      <div class="confirmation-details">
        <div class="confirmation-detail-row">
          <span class="confirmation-detail-label">ホテル</span>
          <span class="confirmation-detail-value">${booking.hotelName}</span>
        </div>
        <div class="confirmation-detail-row">
          <span class="confirmation-detail-label">客室タイプ</span>
          <span class="confirmation-detail-value">${booking.roomName}</span>
        </div>
        <div class="confirmation-detail-row">
          <span class="confirmation-detail-label">チェックイン</span>
          <span class="confirmation-detail-value">${formatDate(booking.checkin)}</span>
        </div>
        <div class="confirmation-detail-row">
          <span class="confirmation-detail-label">チェックアウト</span>
          <span class="confirmation-detail-value">${formatDate(booking.checkout)}</span>
        </div>
        <div class="confirmation-detail-row">
          <span class="confirmation-detail-label">宿泊数</span>
          <span class="confirmation-detail-value">${booking.nights}泊</span>
        </div>
        <div class="confirmation-detail-row">
          <span class="confirmation-detail-label">宿泊者名</span>
          <span class="confirmation-detail-value">${booking.guestName}</span>
        </div>
        <div class="confirmation-detail-row">
          <span class="confirmation-detail-label">合計金額</span>
          <span class="confirmation-detail-value">&yen;${formatPrice(booking.total)}</span>
        </div>
      </div>
      <a href="#" class="btn-home" id="btnGoHome">ホームに戻る</a>
    `;

    Router.navigate('confirmation');

    $('#btnGoHome').addEventListener('click', (e) => {
      e.preventDefault();
      Router.navigate('home');
    });
  },
};

const BookingsPage = {
  init() {
    // Render on navigate
  },

  render() {
    const container = $('#bookingsList');
    const bookings = AppState.bookings;

    if (bookings.length === 0) {
      container.innerHTML = `
        <div class="bookings-empty">
          <div class="bookings-empty-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
          </div>
          <p class="bookings-empty-text">予約はまだありません</p>
          <p style="font-size:0.85rem;color:var(--gray-400)">ホテルを検索して予約してみましょう</p>
        </div>
      `;
      return;
    }

    container.innerHTML = bookings
      .slice()
      .reverse()
      .map(
        (b) => `
      <div class="booking-list-card">
        <div class="booking-list-info">
          <div class="booking-list-hotel">${b.hotelName}</div>
          <div class="booking-list-room">${b.roomName}</div>
          <div class="booking-list-dates">
            <span>${formatDate(b.checkin)} ~ ${formatDate(b.checkout)}</span>
            <span>${b.nights}泊 / ${b.guests}名</span>
          </div>
        </div>
        <div class="booking-list-right">
          <div class="booking-list-price">&yen;${formatPrice(b.total)}</div>
          <div class="booking-list-id">${b.id}</div>
          <span class="booking-status booking-status-${b.status}">
            ${b.status === 'confirmed' ? '予約確定' : 'キャンセル済み'}
          </span>
          ${
            b.status === 'confirmed'
              ? `<br><button class="btn-cancel-booking" data-booking-id="${b.id}">キャンセル</button>`
              : ''
          }
        </div>
      </div>
    `
      )
      .join('');

    container.querySelectorAll('.btn-cancel-booking').forEach((btn) => {
      btn.addEventListener('click', () => {
        if (confirm('この予約をキャンセルしますか？')) {
          const id = btn.dataset.bookingId;
          const booking = AppState.bookings.find((b) => b.id === id);
          if (booking) {
            booking.status = 'cancelled';
            AppState.saveBookings();
            this.render();
          }
        }
      });
    });
  },
};

// --- Header ---
const Header = {
  init() {
    // Scroll effect
    window.addEventListener('scroll', () => {
      const header = $('#header');
      if (window.scrollY > 10) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });

    // Mobile menu
    const menuToggle = $('#menuToggle');
    const headerNav = $('#headerNav');

    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      headerNav.classList.toggle('active');
    });

    // Navigation
    $$('.nav-link').forEach((link) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const page = link.dataset.page;
        if (page) {
          Router.navigate(page);
          if (page === 'bookings') {
            BookingsPage.render();
          }
          if (page === 'search') {
            SearchPage.search();
          }
          // Close mobile menu
          menuToggle.classList.remove('active');
          headerNav.classList.remove('active');
        }
      });
    });

    // Logo click -> home
    $('#logoLink').addEventListener('click', (e) => {
      e.preventDefault();
      Router.navigate('home');
    });

    // Back button
    $('#btnBack').addEventListener('click', () => {
      Router.navigate('search');
    });
  },
};

// --- Init ---
document.addEventListener('DOMContentLoaded', () => {
  Header.init();
  HomePage.init();
  SearchPage.init();
});
