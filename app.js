/* ============================================
   KDDI ニュース デイリーポスト - app.js
   ============================================ */

'use strict';

// ============================================
// モックニュースデータ（RSSフォールバック用）
// ============================================
const MOCK_NEWS = [
  {
    id: 1,
    title: 'KDDIと沖縄セルラー、「5G SA」商用サービスを全国主要都市で開始',
    summary: 'KDDIおよび沖縄セルラーは、5G Standalone（SA）方式による商用サービスを東京・大阪・名古屋をはじめとする全国主要都市で開始した。低遅延・大容量通信により、法人向けサービスの拡充を推進する。',
    date: '2026-02-21',
    category: '5g',
    source: 'KDDIプレスリリース',
    url: 'https://news.kddi.com/kddi/corporate/newsrelease/'
  },
  {
    id: 2,
    title: 'au、AIを活用した「スマートサポートPlus」を提供開始',
    summary: 'auは2026年3月より、生成AIを活用した新しい顧客サポートサービス「スマートサポートPlus」の提供を開始する。24時間365日、AIが複雑な手続きをサポートする。',
    date: '2026-02-20',
    category: 'service',
    source: 'KDDIプレスリリース',
    url: 'https://news.kddi.com/kddi/corporate/newsrelease/'
  },
  {
    id: 3,
    title: 'KDDI、2025年度第3四半期決算を発表 — 売上高・営業利益ともに過去最高',
    summary: 'KDDIは2025年度第3四半期の連結決算を発表した。売上高は前年同期比4.2%増の3兆8,429億円、営業利益は同7.1%増の8,926億円となり、いずれも第3四半期として過去最高を更新した。',
    date: '2026-02-19',
    category: 'ir',
    source: 'IR情報',
    url: 'https://news.kddi.com/kddi/corporate/newsrelease/'
  },
  {
    id: 4,
    title: 'KDDI、低軌道衛星通信「Starlink」のau回線への直接接続を開始',
    summary: 'KDDIはSpaceXと協力し、Starlinkの衛星から直接スマートフォンへの通信サービス「Direct to Cell」のβ提供を開始した。山間部・離島など従来の基地局カバー範囲外でも利用可能になる。',
    date: '2026-02-18',
    category: '5g',
    source: 'KDDIプレスリリース',
    url: 'https://news.kddi.com/kddi/corporate/newsrelease/'
  },
  {
    id: 5,
    title: 'auじぶん銀行、証券口座との連携サービス「マネーコネクト Pro」を提供開始',
    summary: 'auじぶん銀行とau証券は、資産管理機能を強化した「マネーコネクト Pro」を2026年3月より提供する。銀行・証券・保険を一元管理できるフィンテックサービス。',
    date: '2026-02-17',
    category: 'service',
    source: 'auじぶん銀行',
    url: 'https://news.kddi.com/kddi/corporate/newsrelease/'
  },
  {
    id: 6,
    title: 'KDDI、カーボンニュートラル達成に向けた「2030年環境アクションプラン」更新',
    summary: 'KDDIは2030年までのカーボンニュートラル達成に向けて、再生可能エネルギー調達比率の目標を従来の80%から100%に引き上げるとともに、省電力基地局の導入加速を発表した。',
    date: '2026-02-16',
    category: 'csr',
    source: 'CSR・環境',
    url: 'https://news.kddi.com/kddi/corporate/newsrelease/'
  },
  {
    id: 7,
    title: 'KDDI、法人向けローカル5Gパッケージの新プランを発表',
    summary: 'KDDIは製造業・物流・医療分野向けに、構築から運用まで一括サポートする新しいローカル5Gパッケージを発表した。中小企業でも導入しやすいスモールスタートプランも用意する。',
    date: '2026-02-15',
    category: '5g',
    source: 'KDDI法人',
    url: 'https://news.kddi.com/kddi/corporate/newsrelease/'
  },
  {
    id: 8,
    title: 'au、MVNOへの回線提供条件を改定 — 競争促進に向けた新料金体系を導入',
    summary: 'KDDIはMVNO（仮想移動体通信事業者）への卸料金を見直し、競争促進を目的とした新しい料金体系を2026年4月より適用すると発表した。新規MVNO事業者の参入障壁低減を目指す。',
    date: '2026-02-14',
    category: 'ir',
    source: 'KDDIプレスリリース',
    url: 'https://news.kddi.com/kddi/corporate/newsrelease/'
  },
  {
    id: 9,
    title: 'KDDI、教育DX推進でEdTechスタートアップ3社に出資',
    summary: 'KDDIは教育分野のデジタルトランスフォーメーション推進を目的として、AI個別指導・VR体験学習・校務DXを手がける国内スタートアップ3社への出資を発表した。',
    date: '2026-02-13',
    category: 'csr',
    source: 'KDDI∞Labo',
    url: 'https://news.kddi.com/kddi/corporate/newsrelease/'
  },
  {
    id: 10,
    title: 'auスマートパス、月額プランを改定 — 動画・音楽・ゲームが使い放題の新プランを提供',
    summary: 'KDDIはauスマートパスを大幅改定し、動画ストリーミング・音楽サービス・クラウドゲームを統合した新プランを発表した。既存ユーザーは2026年4月より自動移行となる。',
    date: '2026-02-12',
    category: 'service',
    source: 'auサービス',
    url: 'https://news.kddi.com/kddi/corporate/newsrelease/'
  },
  {
    id: 11,
    title: 'KDDI、大阪・関西万博向け「未来の通信体験」展示パビリオンの詳細を公開',
    summary: 'KDDIは2025年に開催された大阪・関西万博のKDDIパビリオンで展示した5G・XR通信体験の技術を、2026年より商用化する計画を発表した。',
    date: '2026-02-11',
    category: 'service',
    source: 'KDDIプレスリリース',
    url: 'https://news.kddi.com/kddi/corporate/newsrelease/'
  },
  {
    id: 12,
    title: 'KDDI、自社データセンター新設 — 国内AI需要拡大に対応する大規模投資計画',
    summary: 'KDDIは急増するAI・クラウド需要に対応するため、2027年までに国内主要3拠点で大規模データセンターを新設する計画を発表した。総投資額は約3,000億円規模となる見込み。',
    date: '2026-02-10',
    category: 'ir',
    source: 'IR情報',
    url: 'https://news.kddi.com/kddi/corporate/newsrelease/'
  }
];

// ============================================
// ストア（状態管理）
// ============================================
const Store = {
  _data: {
    news: [],
    selectedIds: [],
    filter: 'all',
    searchQuery: '',
    settings: {
      emailTo: '',
      emailCc: '',
      subjectTemplate: '【KDDI ニュース】{date} 朝7時の最新情報まとめ',
      maxNews: 10,
      postTime: '07:00',
      autoPost: true,
      sources: { officialRelease: true, ir: true, service: true }
    },
    lastFetched: null,
    lastPosted: null
  },

  init() {
    const saved = localStorage.getItem('kddiNewsApp');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        this._data.settings = { ...this._data.settings, ...(parsed.settings || {}) };
        this._data.lastPosted = parsed.lastPosted || null;
      } catch (_) {}
    }
  },

  save() {
    localStorage.setItem('kddiNewsApp', JSON.stringify({
      settings: this._data.settings,
      lastPosted: this._data.lastPosted
    }));
  },

  get news() { return this._data.news; },
  set news(val) { this._data.news = val; },

  get selectedIds() { return this._data.selectedIds; },

  get filter() { return this._data.filter; },
  set filter(val) { this._data.filter = val; },

  get searchQuery() { return this._data.searchQuery; },
  set searchQuery(val) { this._data.searchQuery = val; },

  get settings() { return this._data.settings; },

  get lastPosted() { return this._data.lastPosted; },
  set lastPosted(val) { this._data.lastPosted = val; this.save(); },

  toggleSelect(id) {
    const idx = this._data.selectedIds.indexOf(id);
    if (idx === -1) this._data.selectedIds.push(id);
    else this._data.selectedIds.splice(idx, 1);
  },

  clearSelection() { this._data.selectedIds = []; },

  selectAll() {
    const visible = this.filteredNews.map(n => n.id);
    this._data.selectedIds = [...new Set([...this._data.selectedIds, ...visible])];
  },

  get filteredNews() {
    let list = [...this._data.news];
    if (this._data.filter !== 'all') {
      list = list.filter(n => n.category === this._data.filter);
    }
    if (this._data.searchQuery) {
      const q = this._data.searchQuery.toLowerCase();
      list = list.filter(n =>
        n.title.toLowerCase().includes(q) ||
        n.summary.toLowerCase().includes(q)
      );
    }
    return list.slice(0, this._data.settings.maxNews);
  },

  updateSettings(patch) {
    this._data.settings = { ...this._data.settings, ...patch };
    this.save();
  }
};

// ============================================
// ニュース取得
// ============================================
const NewsService = {
  // KDDIニュースRSSをCORSプロキシ経由で取得を試みる
  async fetchFromRSS() {
    const RSS_URL = 'https://news.kddi.com/rss/kddi/news/top';
    const PROXY = 'https://corsproxy.io/?url=';
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 6000);

    try {
      const res = await fetch(PROXY + encodeURIComponent(RSS_URL), {
        signal: controller.signal
      });
      clearTimeout(timeout);
      if (!res.ok) throw new Error('RSS fetch failed');
      const text = await res.text();
      return this.parseRSS(text);
    } catch {
      clearTimeout(timeout);
      return null;
    }
  },

  parseRSS(xml) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(xml, 'application/xml');
    const items = Array.from(doc.querySelectorAll('item'));

    return items.map((item, idx) => {
      const title = item.querySelector('title')?.textContent || '';
      const description = item.querySelector('description')?.textContent || '';
      const pubDate = item.querySelector('pubDate')?.textContent || '';
      const link = item.querySelector('link')?.textContent || '';

      const dateStr = pubDate ? new Date(pubDate).toISOString().split('T')[0] : '';
      const category = this.categorize(title + ' ' + description);

      return {
        id: idx + 1,
        title: title.trim(),
        summary: this.stripHtml(description).trim().slice(0, 150),
        date: dateStr,
        category,
        source: 'KDDIニュース',
        url: link.trim()
      };
    }).filter(n => n.title);
  },

  stripHtml(html) {
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.textContent || div.innerText || '';
  },

  categorize(text) {
    const t = text.toLowerCase();
    if (/5g|sa|スタンドアロン|ローカル5g|衛星/.test(t)) return '5g';
    if (/決算|ir|株主|業績|売上|配当/.test(t)) return 'ir';
    if (/csr|環境|カーボン|サステナ|社会|支援|教育/.test(t)) return 'csr';
    return 'service';
  },

  async fetchNews() {
    setFetchStatus('loading', 'ニュースを取得中...');

    // RSSから取得を試みる
    const rssNews = await this.fetchFromRSS();
    if (rssNews && rssNews.length > 0) {
      Store.news = rssNews;
      Store._data.lastFetched = new Date().toISOString();
      setFetchStatus('success', `${rssNews.length}件のニュースを取得しました (KDDI公式RSS)`);
      return rssNews;
    }

    // フォールバック：モックデータ
    await new Promise(r => setTimeout(r, 800)); // ローディング演出
    Store.news = MOCK_NEWS;
    Store._data.lastFetched = new Date().toISOString();
    setFetchStatus('success', `${MOCK_NEWS.length}件のニュースを表示中（サンプルデータ）`);
    return MOCK_NEWS;
  }
};

// ============================================
// メール生成
// ============================================
const MailGenerator = {
  generate(newsList) {
    const today = formatDate(new Date());
    const settings = Store.settings;

    let body = `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📡 KDDI ニュース日報  ${today}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

本日（${today}）のKDDI最新ニュースをお届けします。

`;

    newsList.forEach((news, idx) => {
      const tag = getCategoryLabel(news.category);
      body += `【${idx + 1}】[${tag}] ${news.title}\n`;
      body += `　日付：${news.date}\n`;
      body += `　${news.summary}\n`;
      if (news.url) body += `　詳細：${news.url}\n`;
      body += '\n';
    });

    body += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
配信元：KDDI ニュース デイリーポスト
次回配信：翌朝7時
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`;

    return body;
  },

  generateSubject() {
    const today = formatDate(new Date());
    return Store.settings.subjectTemplate.replace('{date}', today);
  },

  openMailto() {
    const news = getEmailTargetNews();
    const body = this.generate(news);
    const subject = this.generateSubject();
    const to = Store.settings.emailTo;
    const cc = Store.settings.emailCc;

    const mailto = `mailto:${encodeURIComponent(to)}` +
      `?subject=${encodeURIComponent(subject)}` +
      (cc ? `&cc=${encodeURIComponent(cc)}` : '') +
      `&body=${encodeURIComponent(body)}`;

    window.open(mailto, '_blank');
  }
};

// ============================================
// スケジューラ（毎日7時チェック）
// ============================================
const Scheduler = {
  _intervalId: null,
  _countdownId: null,

  start() {
    this.updateCountdown();
    this._countdownId = setInterval(() => this.tick(), 1000);
  },

  tick() {
    this.updateCountdown();

    if (!Store.settings.autoPost) return;

    const now = new Date();
    const [h, m] = Store.settings.postTime.split(':').map(Number);

    if (now.getHours() === h && now.getMinutes() === m && now.getSeconds() === 0) {
      const todayKey = now.toISOString().split('T')[0];
      if (Store.lastPosted !== todayKey) {
        this.triggerPost(todayKey, true);
      }
    }
  },

  updateCountdown() {
    const now = new Date();
    const [h, m] = Store.settings.postTime.split(':').map(Number);
    const next = new Date(now);
    next.setHours(h, m, 0, 0);
    if (next <= now) next.setDate(next.getDate() + 1);

    const diff = next - now;
    const hh = String(Math.floor(diff / 3600000)).padStart(2, '0');
    const mm = String(Math.floor((diff % 3600000) / 60000)).padStart(2, '0');
    const ss = String(Math.floor((diff % 60000) / 1000)).padStart(2, '0');

    const el = document.getElementById('countdown');
    if (el) el.textContent = `${hh}:${mm}:${ss}`;

    const nextEl = document.getElementById('nextPostTime');
    if (nextEl) {
      const d = next.toLocaleDateString('ja-JP', { month: 'short', day: 'numeric' });
      const t = next.toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' });
      nextEl.textContent = `${d} ${t}`;
    }
  },

  triggerPost(todayKey, isAuto = false) {
    if (!Store.settings.emailTo) {
      showToast('送信先メールアドレスを設定してください', 'error');
      document.getElementById('settingsModal').style.display = 'flex';
      return;
    }

    MailGenerator.openMailto();
    Store.lastPosted = todayKey;

    const msg = isAuto
      ? `⏰ 朝7時の自動投稿を実行しました`
      : `📧 手動投稿を実行しました`;
    showToast(msg, 'success');
    renderEmailPreview();
  }
};

// ============================================
// UI ヘルパー
// ============================================
function formatDate(d) {
  return d.toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'short' });
}

function formatDateShort(str) {
  if (!str) return '';
  const d = new Date(str);
  return d.toLocaleDateString('ja-JP', { month: 'numeric', day: 'numeric' });
}

function getCategoryLabel(cat) {
  return { '5g': '5G', service: 'サービス', ir: 'IR', csr: 'CSR' }[cat] || '一般';
}

function setFetchStatus(type, text) {
  const dot = document.getElementById('fetchStatusDot');
  const txt = document.getElementById('fetchStatusText');
  if (dot) dot.className = `status-dot ${type === 'loading' ? 'loading' : type === 'success' ? 'success' : 'error'}`;
  if (txt) txt.textContent = text;
}

function getEmailTargetNews() {
  const selected = Store.selectedIds;
  if (selected.length > 0) {
    return Store.filteredNews.filter(n => selected.includes(n.id));
  }
  return Store.filteredNews;
}

function showToast(message, type = 'info') {
  const container = document.getElementById('toastContainer');
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  const icon = { success: '✓', error: '✕', info: 'ℹ' }[type] || 'ℹ';
  toast.innerHTML = `<span style="font-size:15px">${icon}</span><span>${message}</span>`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.classList.add('toast-fade');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// ============================================
// レンダリング
// ============================================
function renderNewsList() {
  const list = document.getElementById('newsList');
  const countEl = document.getElementById('newsCount');
  const filtered = Store.filteredNews;

  if (countEl) countEl.textContent = `${filtered.length}件`;

  if (filtered.length === 0) {
    list.innerHTML = `
      <div class="empty-state">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
        <p>ニュースが見つかりません</p>
      </div>`;
    return;
  }

  list.innerHTML = filtered.map(news => {
    const checked = Store.selectedIds.includes(news.id) ? 'checked' : '';
    const selected = Store.selectedIds.includes(news.id) ? 'selected' : '';
    return `
      <div class="news-card ${selected}" data-id="${news.id}">
        <div class="news-card-check">
          <input type="checkbox" ${checked} aria-label="${news.title}を選択" data-check-id="${news.id}">
        </div>
        <div class="news-card-content">
          <div class="news-card-header">
            <span class="news-tag tag-${news.category}">${getCategoryLabel(news.category)}</span>
            <span class="news-date">${formatDateShort(news.date)}</span>
          </div>
          <div class="news-card-title">${escapeHtml(news.title)}</div>
          <div class="news-card-summary">${escapeHtml(news.summary)}</div>
          <div class="news-card-footer">
            <span class="news-source">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
              </svg>
              ${escapeHtml(news.source)}
            </span>
            ${news.url ? `<a class="news-link" href="${escapeHtml(news.url)}" target="_blank" rel="noopener">
              詳細
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
              </svg>
            </a>` : ''}
          </div>
        </div>
      </div>`;
  }).join('');
}

function renderEmailPreview() {
  const news = getEmailTargetNews();
  const subjectEl = document.getElementById('emailSubject');
  const bodyEl = document.getElementById('emailBody');
  const toEl = document.getElementById('emailTo');

  if (subjectEl) subjectEl.value = MailGenerator.generateSubject();
  if (toEl && !toEl.value && Store.settings.emailTo) {
    toEl.value = Store.settings.emailTo;
  }

  if (news.length === 0) {
    bodyEl.innerHTML = '<p class="placeholder-text">表示するニュースがありません</p>';
    return;
  }

  const body = MailGenerator.generate(news);
  bodyEl.textContent = body;
}

function renderSelectionBar() {
  const bar = document.getElementById('selectionBar');
  const count = document.getElementById('selectionCount');
  if (Store.selectedIds.length > 0) {
    bar.style.display = 'flex';
    count.textContent = `${Store.selectedIds.length}件選択中`;
  } else {
    bar.style.display = 'none';
  }
}

function renderTodayDate() {
  const el = document.getElementById('todayDate');
  if (el) el.textContent = formatDate(new Date());
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function render() {
  renderNewsList();
  renderEmailPreview();
  renderSelectionBar();
}

// ============================================
// 設定モーダル
// ============================================
function openSettings() {
  const s = Store.settings;
  document.getElementById('settingEmailTo').value = s.emailTo;
  document.getElementById('settingEmailCc').value = s.emailCc || '';
  document.getElementById('settingSubjectTemplate').value = s.subjectTemplate;
  document.getElementById('settingMaxNews').value = s.maxNews;
  document.getElementById('settingPostTime').value = s.postTime;
  document.getElementById('srcOfficialRelease').checked = s.sources.officialRelease;
  document.getElementById('srcIr').checked = s.sources.ir;
  document.getElementById('srcService').checked = s.sources.service;
  document.getElementById('settingsModal').style.display = 'flex';
}

function closeSettings() {
  document.getElementById('settingsModal').style.display = 'none';
}

function saveSettings() {
  Store.updateSettings({
    emailTo: document.getElementById('settingEmailTo').value.trim(),
    emailCc: document.getElementById('settingEmailCc').value.trim(),
    subjectTemplate: document.getElementById('settingSubjectTemplate').value.trim() ||
      '【KDDI ニュース】{date} 朝7時の最新情報まとめ',
    maxNews: parseInt(document.getElementById('settingMaxNews').value, 10),
    postTime: document.getElementById('settingPostTime').value,
    sources: {
      officialRelease: document.getElementById('srcOfficialRelease').checked,
      ir: document.getElementById('srcIr').checked,
      service: document.getElementById('srcService').checked
    }
  });

  // emailTo をパネルにも反映
  const toEl = document.getElementById('emailTo');
  if (toEl) toEl.value = Store.settings.emailTo;

  closeSettings();
  render();
  showToast('設定を保存しました', 'success');
}

// ============================================
// イベントリスナー
// ============================================
function bindEvents() {
  // 検索
  const searchInput = document.getElementById('searchInput');
  const searchClear = document.getElementById('searchClear');

  searchInput.addEventListener('input', e => {
    Store.searchQuery = e.target.value;
    searchClear.style.display = e.target.value ? 'flex' : 'none';
    render();
  });

  searchClear.addEventListener('click', () => {
    searchInput.value = '';
    Store.searchQuery = '';
    searchClear.style.display = 'none';
    render();
  });

  // フィルタータブ
  document.getElementById('filterTabs').addEventListener('click', e => {
    const tab = e.target.closest('.filter-tab');
    if (!tab) return;
    document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    Store.filter = tab.dataset.filter;
    render();
  });

  // ニュースカードチェック
  document.getElementById('newsList').addEventListener('change', e => {
    const cb = e.target.closest('input[type="checkbox"][data-check-id]');
    if (!cb) return;
    Store.toggleSelect(parseInt(cb.dataset.checkId, 10));
    render();
  });

  // カードクリック（チェック以外）
  document.getElementById('newsList').addEventListener('click', e => {
    if (e.target.closest('a') || e.target.closest('input[type="checkbox"]')) return;
    const card = e.target.closest('.news-card');
    if (!card) return;
    Store.toggleSelect(parseInt(card.dataset.id, 10));
    render();
  });

  // 更新ボタン
  document.getElementById('btnRefresh').addEventListener('click', async () => {
    const btn = document.getElementById('btnRefresh');
    btn.classList.add('spinning');
    await NewsService.fetchNews();
    btn.classList.remove('spinning');
    render();
    showToast('ニュースを更新しました', 'success');
  });

  // 再生成ボタン
  document.getElementById('btnRegenerate').addEventListener('click', () => {
    renderEmailPreview();
    showToast('メール本文を再生成しました', 'info');
  });

  // コピーボタン
  document.getElementById('btnCopy').addEventListener('click', async () => {
    const news = getEmailTargetNews();
    const body = MailGenerator.generate(news);
    try {
      await navigator.clipboard.writeText(body);
      showToast('メール本文をコピーしました', 'success');
    } catch {
      // フォールバック
      const ta = document.createElement('textarea');
      ta.value = body;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      ta.remove();
      showToast('メール本文をコピーしました', 'success');
    }
  });

  // 送信ボタン
  document.getElementById('btnSend').addEventListener('click', () => {
    const toEl = document.getElementById('emailTo');
    const to = toEl.value.trim();
    if (!to) {
      showToast('宛先メールアドレスを入力してください', 'error');
      toEl.focus();
      return;
    }
    Store.updateSettings({ emailTo: to });
    const todayKey = new Date().toISOString().split('T')[0];
    Scheduler.triggerPost(todayKey, false);
  });

  // 手動投稿ボタン
  document.getElementById('btnManualPost').addEventListener('click', () => {
    if (!Store.settings.emailTo && !document.getElementById('emailTo').value.trim()) {
      showToast('宛先メールアドレスを先に設定してください', 'error');
      openSettings();
      return;
    }
    const to = document.getElementById('emailTo').value.trim();
    if (to) Store.updateSettings({ emailTo: to });
    const todayKey = new Date().toISOString().split('T')[0];
    Scheduler.triggerPost(todayKey, false);
  });

  // 自動投稿トグル
  document.getElementById('autoPostToggle').addEventListener('change', e => {
    Store.updateSettings({ autoPost: e.target.checked });
    showToast(e.target.checked ? '自動投稿をONにしました' : '自動投稿をOFFにしました', 'info');
  });

  // 設定ボタン
  document.getElementById('btnSettings').addEventListener('click', openSettings);
  document.getElementById('btnCloseSettings').addEventListener('click', closeSettings);
  document.getElementById('btnCancelSettings').addEventListener('click', closeSettings);
  document.getElementById('btnSaveSettings').addEventListener('click', saveSettings);

  // 選択バーのボタン
  document.getElementById('btnSelectAll').addEventListener('click', () => {
    Store.selectAll();
    render();
  });

  document.getElementById('btnClearSelection').addEventListener('click', () => {
    Store.clearSelection();
    render();
  });

  document.getElementById('btnAddToEmail').addEventListener('click', () => {
    renderEmailPreview();
    showToast(`${Store.selectedIds.length}件のニュースをメールに追加しました`, 'success');
  });

  // emailTo 入力時にストアを更新
  document.getElementById('emailTo').addEventListener('change', e => {
    Store.updateSettings({ emailTo: e.target.value.trim() });
  });

  // モーダル外クリックで閉じる
  document.getElementById('settingsModal').addEventListener('click', e => {
    if (e.target === document.getElementById('settingsModal')) closeSettings();
  });
}

// ============================================
// 初期化
// ============================================
async function init() {
  Store.init();
  renderTodayDate();

  // 自動投稿トグルの初期値をセット
  document.getElementById('autoPostToggle').checked = Store.settings.autoPost;

  bindEvents();
  Scheduler.start();

  // ニュース取得
  await NewsService.fetchNews();
  render();
}

document.addEventListener('DOMContentLoaded', init);
