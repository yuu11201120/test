/* ============================================
   TelecomWatch - Telecom Carrier News App
   ============================================ */

// --- Carrier Definitions ---
const CARRIERS = {
  docomo: { name: 'NTTドコモ', color: '#c41e3a', bg: '#fef2f2' },
  au: { name: 'au / KDDI', color: '#ee7800', bg: '#fff7ed' },
  softbank: { name: 'ソフトバンク', color: '#001c58', bg: '#eff6ff' },
  rakuten: { name: '楽天モバイル', color: '#bf0000', bg: '#fef2f2' },
};

const CATEGORIES = {
  plan: '料金プラン',
  '5g': '5G / 通信',
  service: '新サービス',
  trouble: '障害情報',
  device: '端末',
  business: '経営・業績',
};

// --- Sample News Data ---
const NEWS_DATA = [
  {
    id: 1,
    carrier: 'docomo',
    category: 'plan',
    title: 'NTTドコモ、新料金プラン「irumo ライト」を発表 月額980円から利用可能に',
    summary: 'NTTドコモは、低価格帯の新料金プラン「irumo ライト」を発表した。月額980円（税込）で3GBのデータ容量を利用でき、ライトユーザー向けの選択肢として提供される。既存のirumoプランとの併用も可能。',
    content: 'NTTドコモは本日、低価格帯の新料金プラン「irumo ライト」を正式に発表しました。\n\n新プランは月額980円（税込）で3GBのデータ容量を提供し、データ超過後は最大128kbpsに速度制限されます。音声通話は22円/30秒の従量制ですが、5分かけ放題オプション（月額880円）やかけ放題オプション（月額1,980円）も用意されています。\n\nドコモの担当者は「スマートフォンの利用が少ないお客様や、サブ回線としてご利用いただきたいお客様に最適なプラン」と説明しています。\n\n提供開始は来月1日からで、ドコモショップおよびオンラインで申し込みが可能です。',
    source: 'ドコモ公式プレスリリース',
    date: '2026-02-12',
    important: true,
    tags: ['料金プラン', 'irumo', '新プラン'],
  },
  {
    id: 2,
    carrier: 'au',
    category: '5g',
    title: 'KDDI、5G SA対応エリアを全国主要都市に拡大 人口カバー率90%を達成',
    summary: 'KDDIは、5Gスタンドアロン（SA）方式の対応エリアを大幅に拡大し、全国主要都市での人口カバー率が90%に到達したと発表。低遅延・多接続の特性を活かしたサービス展開が加速する。',
    content: 'KDDIは、5G SA（スタンドアロン）方式の通信エリア拡大について、全国の主要都市における人口カバー率が90%に達したと発表しました。\n\n5G SA方式はコアネットワークも5G化することで、従来のNSA方式に比べて低遅延・多接続といった5G本来の性能を発揮できる通信方式です。KDDIは2025年後半から基地局の整備を加速させ、この度のカバー率達成に至りました。\n\n今後は5G SAの特性を活かし、遠隔医療やスマートファクトリーなど産業分野でのユースケース拡大を目指すとしています。\n\n一般消費者向けには、対応端末の拡充とともに、5G SAを活用した新たなエンターテインメントサービスも準備中とのことです。',
    source: 'KDDI ニュースリリース',
    date: '2026-02-11',
    important: false,
    tags: ['5G', 'SA', 'エリア拡大'],
  },
  {
    id: 3,
    carrier: 'softbank',
    category: 'service',
    title: 'ソフトバンク、AIチャットボット搭載の新カスタマーサポートを開始',
    summary: 'ソフトバンクは、生成AIを活用した新しいカスタマーサポートシステムを導入。24時間対応のAIチャットボットが料金相談や各種手続きをサポートし、顧客満足度の向上を目指す。',
    content: 'ソフトバンクは、生成AI技術を活用した新しいカスタマーサポートシステム「SoftBank AI アシスタント」の提供を開始しました。\n\n新システムでは、24時間365日対応のAIチャットボットが、料金プランの相談、各種手続き案内、トラブルシューティングなど幅広い問い合わせに対応します。自然言語処理の精度が大幅に向上しており、複雑な質問にも的確に回答できるとしています。\n\nAIで解決できない複雑な案件については、スムーズにオペレーターへ引き継ぐハイブリッド対応を採用。オペレーター対応時にもAIが補助することで、対応品質の均一化と処理速度の向上を実現しています。\n\nMy SoftBankアプリおよびウェブサイトから利用可能です。',
    source: 'ソフトバンク ニュースリリース',
    date: '2026-02-10',
    important: false,
    tags: ['AI', 'カスタマーサポート', '新サービス'],
  },
  {
    id: 4,
    carrier: 'rakuten',
    category: 'plan',
    title: '楽天モバイル、Rakuten最強プランの海外ローミングデータ容量を5GBに拡大',
    summary: '楽天モバイルは「Rakuten最強プラン」の海外ローミングにおける毎月のデータ容量を従来の2GBから5GBに増量すると発表。追加料金なしで利用可能。',
    content: '楽天モバイルは、「Rakuten最強プラン」の海外ローミングサービスにおける毎月のデータ容量を、従来の2GBから5GBに拡大すると発表しました。\n\n増量は全ユーザーを対象に自動適用され、追加料金は発生しません。対象地域は世界73の国と地域で、渡航先での通信を従来以上に快適に利用できるようになります。\n\n楽天モバイルの担当者は「海外渡航時の通信ニーズが高まっている中、お客様により満足いただけるサービスを提供するため増量を決定した」と説明しています。\n\n適用開始は来月からで、既存ユーザーは手続き不要で自動的に適用されます。',
    source: '楽天モバイル プレスリリース',
    date: '2026-02-10',
    important: false,
    tags: ['料金プラン', '海外ローミング', 'Rakuten最強プラン'],
  },
  {
    id: 5,
    carrier: 'docomo',
    category: 'trouble',
    title: 'NTTドコモ、関東地方の一部で通信障害が発生 復旧作業中',
    summary: '本日午前10時頃より、関東地方の一部エリアでNTTドコモの音声通話およびデータ通信が利用しにくい状況が発生。ドコモは原因調査と復旧作業を進めている。',
    content: '本日午前10時頃より、関東地方（東京都、神奈川県、埼玉県、千葉県）の一部エリアにおいて、NTTドコモの音声通話およびデータ通信サービスが利用しにくい状況が発生しました。\n\n影響を受けているのは4G LTEおよび5G通信で、一部のユーザーにおいて通話の発着信やデータ通信が断続的に不安定になる症状が報告されています。\n\nNTTドコモは「設備の故障が原因と見られ、現在復旧作業を進めている」と発表。完全復旧の見込みは本日中としており、状況の変化に応じて随時情報を更新するとしています。\n\n影響を受けているユーザーに対してはWi-Fi接続の利用を推奨しています。',
    source: 'NTTドコモ 障害情報',
    date: '2026-02-12',
    important: true,
    tags: ['通信障害', '関東', '復旧作業'],
  },
  {
    id: 6,
    carrier: 'au',
    category: 'device',
    title: 'au、最新フラッグシップスマートフォン「Galaxy S26 Ultra」の予約受付を開始',
    summary: 'KDDIは、サムスンの最新フラッグシップモデル「Galaxy S26 Ultra」のau独占カラーを含む予約受付を開始。AI機能が大幅に強化された注目端末。',
    content: 'KDDIは、サムスンの最新フラッグシップスマートフォン「Galaxy S26 Ultra」の予約受付を本日より開始しました。\n\n新モデルはSnapdragon 8 Elite 2を搭載し、前モデルから処理性能が約40%向上。Galaxy AI機能も大幅に強化され、リアルタイム翻訳の対応言語が20言語に拡大したほか、カメラのAI補正機能も進化しています。\n\nau独占カラー「チタニウムスカイブルー」を含む4色展開で、256GB/512GB/1TBの3つのストレージモデルを用意。価格は189,800円（税込）からで、スマホトクするプログラムを利用すると実質負担額を大幅に抑えることが可能です。\n\n発売日は2月28日を予定しています。',
    source: 'au ニュース',
    date: '2026-02-09',
    important: false,
    tags: ['Galaxy', 'スマートフォン', '新端末'],
  },
  {
    id: 7,
    carrier: 'softbank',
    category: 'business',
    title: 'ソフトバンク、2025年度第3四半期の連結業績を発表 増収増益を達成',
    summary: 'ソフトバンクグループは2025年度第3四半期の連結業績を発表。通信事業の堅調な成長とYahoo/LINEセグメントの収益改善により、前年同期比で増収増益を達成した。',
    content: 'ソフトバンクグループは2025年度第3四半期（2025年10月〜12月）の連結業績を発表しました。\n\n売上高は前年同期比6.2%増の1兆5,800億円、営業利益は同8.5%増の3,200億円と、増収増益を達成しました。\n\n通信事業では、5Gサービスの普及拡大と法人向けソリューションの成長が寄与。モバイル回線の純増数は四半期で38万件を記録し、解約率も業界最低水準を維持しています。\n\nYahoo/LINEセグメントでは、広告事業の回復とコマース事業の成長が収益改善に貢献。PayPayの月間アクティブユーザーも6,200万人に到達したとしています。\n\n通期業績予想に変更はなく、配当予想も据え置かれています。',
    source: 'ソフトバンク IR情報',
    date: '2026-02-08',
    important: false,
    tags: ['決算', '業績', '増収増益'],
  },
  {
    id: 8,
    carrier: 'rakuten',
    category: '5g',
    title: '楽天モバイル、独自開発のOpen RAN技術を海外通信事業者へ提供開始',
    summary: '楽天モバイルは、自社で開発・運用してきた完全仮想化クラウドネイティブネットワーク技術（Open RAN）の海外通信事業者への提供を本格化。楽天シンフォニーを通じて展開。',
    content: '楽天モバイルは、自社で培ってきた完全仮想化クラウドネイティブモバイルネットワーク技術を、子会社の楽天シンフォニーを通じて海外通信事業者への本格提供を開始しました。\n\n楽天モバイルは世界で初めて完全仮想化モバイルネットワークの商用運用を実現しており、そのノウハウと技術プラットフォームを海外に展開することで新たな収益源の確立を目指します。\n\n既にドイツの1&1やサウジアラビアのstcなどと提携しており、今回新たにアジア太平洋地域の複数の通信事業者との契約を締結したとしています。\n\n楽天グループの三木谷会長は「日本発のイノベーションで世界の通信インフラを変革する」と意気込みを語っています。',
    source: '楽天モバイル ニュースリリース',
    date: '2026-02-07',
    important: false,
    tags: ['Open RAN', '楽天シンフォニー', '海外展開'],
  },
  {
    id: 9,
    carrier: 'docomo',
    category: 'service',
    title: 'ドコモ、dポイント還元率を改定 d払い利用で最大3%還元に',
    summary: 'NTTドコモは、d払いの決済時におけるdポイント還元率を改定。条件を満たすことで最大3%のポイント還元が受けられるようになり、キャッシュレス決済の利用促進を図る。',
    content: 'NTTドコモは、d払いにおけるdポイントの還元プログラムを来月より改定すると発表しました。\n\n新プログラムでは、d払いの基本還元率を0.5%から1.0%に引き上げ。さらにdカード（クレジットカード）との紐づけで+1.0%、ドコモ回線の利用で+0.5%、d払いの月間利用額に応じた追加ボーナスで最大+0.5%が加算され、最大3.0%の還元率を実現します。\n\nまた、毎月10日と20日を「dポイントスーパーデー」として、対象店舗でのd払い利用時にさらに+2.0%のボーナスポイントを付与するキャンペーンも実施予定です。\n\nドコモは「決済サービスのお得さで他社との差別化を図りたい」としています。',
    source: 'NTTドコモ プレスリリース',
    date: '2026-02-06',
    important: false,
    tags: ['dポイント', 'd払い', 'ポイント還元'],
  },
  {
    id: 10,
    carrier: 'au',
    category: 'service',
    title: 'KDDI、新動画配信サービス「au ビデオパス Pro」を開始 4K HDR対応コンテンツを拡充',
    summary: 'KDDIは映像配信サービスを刷新し「au ビデオパス Pro」として提供開始。4K HDR対応コンテンツの大幅拡充とオリジナル作品の制作強化が特徴。',
    content: 'KDDIは、既存の映像配信サービスを全面リニューアルし、「au ビデオパス Pro」として新たに提供を開始しました。\n\n新サービスの最大の特徴は、4K HDR対応コンテンツの大幅な拡充です。国内外の映画・ドラマに加え、スポーツのライブ配信も4K HDR品質で提供。Dolby Atmos対応のサウンドも楽しめます。\n\n月額料金は1,078円（税込）で、auユーザーは初月無料。auスマートパスプレミアム（月額548円）会員は月額880円の優待価格で利用できます。\n\n同時視聴は最大4台まで対応し、ダウンロード視聴にも対応。オリジナル作品の制作にも力を入れ、年間50本以上の独占コンテンツを配信する計画です。',
    source: 'KDDI プレスリリース',
    date: '2026-02-05',
    important: false,
    tags: ['動画配信', '4K HDR', '新サービス'],
  },
  {
    id: 11,
    carrier: 'softbank',
    category: 'trouble',
    title: 'ソフトバンク光、メンテナンスに伴い一部地域で一時的なサービス停止を予告',
    summary: 'ソフトバンクは、ネットワーク設備のメンテナンスのため、来週木曜深夜から金曜早朝にかけて一部地域でソフトバンク光のサービスが一時的に利用できなくなると発表。',
    content: 'ソフトバンクは、ソフトバンク光のネットワーク設備定期メンテナンスについて事前告知を行いました。\n\nメンテナンス予定日時は来週木曜日の午前2時から午前5時までの約3時間。対象地域は近畿地方の一部エリアで、該当エリアのソフトバンク光ユーザーはインターネット接続が一時的に利用できなくなります。\n\nモバイル回線（SoftBank・Y!mobile）への影響はないとしています。\n\n対象エリアのユーザーには個別にメールおよびSMSで通知を行っており、メンテナンス中の代替手段としてモバイル回線のテザリング利用を推奨しています。\n\nメンテナンス後は通信品質の向上が期待されるとのことです。',
    source: 'ソフトバンク 障害・メンテナンス情報',
    date: '2026-02-05',
    important: false,
    tags: ['メンテナンス', 'ソフトバンク光', '固定回線'],
  },
  {
    id: 12,
    carrier: 'rakuten',
    category: 'device',
    title: '楽天モバイル、オリジナルスマートフォン「Rakuten Hand 6」を発表 1円端末キャンペーンも',
    summary: '楽天モバイルは、オリジナルスマートフォンの新モデル「Rakuten Hand 6」を発表。コンパクトボディにAI機能を搭載し、乗り換えキャンペーンで実質1円での提供も実施。',
    content: '楽天モバイルは、オリジナルスマートフォンの新モデル「Rakuten Hand 6」を発表しました。\n\n5.1インチの有機ELディスプレイを搭載したコンパクトボディに、Snapdragon 4 Gen 3プロセッサを内蔵。前モデルから処理性能が約35%向上しています。バッテリー容量は3,800mAhで、5G通信にも対応します。\n\n新たにAIを活用した翻訳機能やカメラの自動シーン認識機能を搭載。防水・防塵（IP67）、おサイフケータイにも対応しています。\n\n定価は29,800円（税込）ですが、他社からの乗り換え（MNP）と同時にRakuten最強プランに加入すると、ポイント還元により実質1円で購入できるキャンペーンも実施予定です。\n\n発売は3月上旬を予定しています。',
    source: '楽天モバイル プレスリリース',
    date: '2026-02-04',
    important: false,
    tags: ['Rakuten Hand', 'スマートフォン', 'キャンペーン'],
  },
  {
    id: 13,
    carrier: 'docomo',
    category: '5g',
    title: 'NTTドコモ、6G実証実験で下り300Gbps超の通信速度を達成',
    summary: 'NTTドコモは、次世代通信規格6Gの実証実験において、下り速度300Gbpsを超える通信に成功。2030年の商用化に向けた研究開発が着実に進んでいる。',
    content: 'NTTドコモは、次世代移動通信規格「6G」の実証実験において、下り通信速度300Gbpsを超える通信に世界で初めて成功したと発表しました。\n\n実験はサブテラヘルツ帯（100GHz超）の周波数帯を使用し、屋内環境で実施。複数のアンテナを組み合わせたMIMO技術と独自のビームフォーミング技術を活用することで、従来の実証実験を大幅に上回る通信速度を実現しました。\n\n6Gは5Gの次の世代となる通信規格で、2030年頃の商用化が見込まれています。5Gの約50倍の通信速度、100倍の接続密度を目標としており、空間コンピューティングや触覚通信など新たなユースケースの創出が期待されています。\n\nドコモは引き続き国内外のパートナーと連携し、6Gの標準化活動と技術開発を推進するとしています。',
    source: 'NTTドコモ R&Dセンター',
    date: '2026-02-03',
    important: false,
    tags: ['6G', '実証実験', '次世代通信'],
  },
  {
    id: 14,
    carrier: 'au',
    category: 'plan',
    title: 'au、25歳以下対象の「スマホスタート応援割」を拡充 割引期間を12ヶ月に延長',
    summary: 'KDDIは、25歳以下のユーザーを対象とした「スマホスタート応援割」を拡充。割引適用期間を従来の6ヶ月から12ヶ月に延長し、若年層の獲得を強化する。',
    content: 'KDDIは、25歳以下のユーザーを対象とした割引プログラム「スマホスタート応援割」の拡充を発表しました。\n\n主な変更点は、月額1,650円の割引適用期間を従来の6ヶ月間から12ヶ月間に延長すること。これにより、「スマホミニプラン 5G/4G」加入時に、月額最安1,078円（税込）で12ヶ月間利用可能になります。\n\nさらに新規加入特典として、au PAY残高5,000円分のプレゼントキャンペーンも同時に実施。学生だけでなく、25歳以下であれば社会人も対象となります。\n\n適用条件は新規契約または他社からの乗り換え（MNP）で、機種変更は対象外。来月1日から受付を開始します。',
    source: 'au ニュースリリース',
    date: '2026-02-02',
    important: false,
    tags: ['学割', '若年層', '料金割引'],
  },
  {
    id: 15,
    carrier: 'softbank',
    category: 'device',
    title: 'ソフトバンク、法人向け5G対応タブレット端末の新ラインナップを発表',
    summary: 'ソフトバンクは法人顧客向けに、5G対応の業務用タブレット端末3機種を新たにラインナップに追加。現場作業や営業活動でのDX推進を支援する。',
    content: 'ソフトバンクは、法人顧客向けに5G通信に対応した業務用タブレット端末3機種を新たにラインナップに追加すると発表しました。\n\n新ラインナップは、10.1インチの標準モデル、8インチのコンパクトモデル、12.4インチの大画面モデルの3機種。いずれもIP68の防水・防塵性能を備え、MIL-STD-810H準拠の耐衝撃性能も有しています。\n\n法人向けMDM（モバイルデバイス管理）との連携機能を標準搭載し、セキュリティポリシーの一元管理が可能。専用のキッティングサービスも提供します。\n\n建設現場、物流倉庫、営業現場などでの利用を想定しており、導入コンサルティングから保守サポートまでワンストップで提供するとしています。',
    source: 'ソフトバンク 法人向けニュース',
    date: '2026-02-01',
    important: false,
    tags: ['法人向け', 'タブレット', 'DX'],
  },
  {
    id: 16,
    carrier: 'rakuten',
    category: 'business',
    title: '楽天モバイル、単月営業黒字化を達成 契約回線数は800万を突破',
    summary: '楽天グループは、楽天モバイル事業が初の単月営業黒字を達成したと発表。MNO契約回線数も800万を突破し、事業の安定成長が鮮明になってきた。',
    content: '楽天グループは、モバイル通信事業を手掛ける楽天モバイルが初の単月営業黒字を達成したと発表しました。\n\nMNO契約回線数は800万を突破し、ARPU（1回線あたりの月間売上）も継続的に上昇。楽天エコシステムとの相乗効果により、顧客獲得コストの低減と解約率の改善が進んだことが黒字化の主要因としています。\n\nネットワーク面では、自社回線のカバー率向上により、au回線へのローミング費用が大幅に減少。設備投資のピークも過ぎたことで、キャッシュフローの改善が進んでいます。\n\n楽天グループの三木谷会長は「通期黒字化への道筋が明確になった。今後はサービス品質の向上と顧客基盤の拡大に注力する」とコメントしています。',
    source: '楽天グループ IR',
    date: '2026-01-30',
    important: true,
    tags: ['黒字化', '業績', '契約回線数'],
  },
];

// --- Data Store ---
const Store = {
  _bookmarks: new Set(),

  init() {
    const saved = localStorage.getItem('telecomWatch_bookmarks');
    if (saved) {
      try {
        this._bookmarks = new Set(JSON.parse(saved));
      } catch (e) {
        this._bookmarks = new Set();
      }
    }
  },

  save() {
    localStorage.setItem('telecomWatch_bookmarks', JSON.stringify([...this._bookmarks]));
  },

  get news() {
    return NEWS_DATA;
  },

  isBookmarked(id) {
    return this._bookmarks.has(id);
  },

  toggleBookmark(id) {
    if (this._bookmarks.has(id)) {
      this._bookmarks.delete(id);
    } else {
      this._bookmarks.add(id);
    }
    this.save();
    return this._bookmarks.has(id);
  },

  get bookmarkCount() {
    return this._bookmarks.size;
  },

  getBookmarkedNews() {
    return NEWS_DATA.filter(n => this._bookmarks.has(n.id));
  },
};

// --- UI Helpers ---
function $(sel) { return document.querySelector(sel); }
function $$(sel) { return document.querySelectorAll(sel); }

function showToast(message, type = 'info') {
  const container = $('#toastContainer');
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('toast-exit');
    setTimeout(() => toast.remove(), 300);
  }, 2500);
}

function formatDateDisplay(dateStr) {
  const date = new Date(dateStr + 'T00:00:00');
  const now = new Date();
  const diff = Math.floor((now - date) / (1000 * 60 * 60 * 24));

  if (diff === 0) return '今日';
  if (diff === 1) return '昨日';
  if (diff < 7) return `${diff}日前`;

  const m = date.getMonth() + 1;
  const d = date.getDate();
  return `${m}月${d}日`;
}

function getCarrierStyle(carrier) {
  const c = CARRIERS[carrier];
  return {
    name: c.name,
    color: c.color,
    bg: c.bg,
  };
}

function getCategoryLabel(category) {
  return CATEGORIES[category] || category;
}

// --- Modal ---
const Modal = {
  open(bodyHtml) {
    $('#modalBody').innerHTML = bodyHtml;
    $('#modalOverlay').classList.add('active');
  },
  close() {
    $('#modalOverlay').classList.remove('active');
  },
};

// --- News Feed ---
const NewsFeed = {
  currentFilter: 'all',
  currentCategory: 'all',
  searchQuery: '',

  getFilteredNews() {
    let articles = Store.news;

    // Carrier filter
    if (this.currentFilter === 'bookmarks') {
      articles = Store.getBookmarkedNews();
    } else if (this.currentFilter !== 'all') {
      articles = articles.filter(a => a.carrier === this.currentFilter);
    }

    // Category filter
    if (this.currentCategory !== 'all') {
      articles = articles.filter(a => a.category === this.currentCategory);
    }

    // Search filter
    if (this.searchQuery) {
      const q = this.searchQuery.toLowerCase();
      articles = articles.filter(a =>
        a.title.toLowerCase().includes(q) ||
        a.summary.toLowerCase().includes(q) ||
        a.tags.some(t => t.toLowerCase().includes(q)) ||
        CARRIERS[a.carrier].name.toLowerCase().includes(q)
      );
    }

    // Sort by date (newest first), then important first
    articles.sort((a, b) => {
      if (a.important && !b.important) return -1;
      if (!a.important && b.important) return 1;
      return new Date(b.date) - new Date(a.date);
    });

    return articles;
  },

  render() {
    const feed = $('#newsFeed');
    const emptyState = $('#emptyState');
    const articles = this.getFilteredNews();

    if (articles.length === 0) {
      feed.innerHTML = '';
      emptyState.style.display = 'block';
      return;
    }

    emptyState.style.display = 'none';
    feed.innerHTML = articles.map(article => this.createCardHTML(article)).join('');

    // Attach event listeners
    feed.querySelectorAll('.news-card').forEach(card => {
      const id = parseInt(card.dataset.id);

      card.querySelector('.news-card-inner').addEventListener('click', () => {
        this.openArticle(id);
      });

      const bookmarkBtn = card.querySelector('.bookmark-btn');
      bookmarkBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isBookmarked = Store.toggleBookmark(id);
        bookmarkBtn.classList.toggle('bookmarked', isBookmarked);
        bookmarkBtn.innerHTML = this.bookmarkIcon(isBookmarked);
        this.updateBookmarkCount();

        if (isBookmarked) {
          showToast('ブックマークに追加しました', 'success');
        } else {
          showToast('ブックマークを解除しました', 'info');
        }

        // Re-render if viewing bookmarks
        if (this.currentFilter === 'bookmarks') {
          this.render();
        }
      });
    });
  },

  createCardHTML(article) {
    const carrier = getCarrierStyle(article.carrier);
    const isBookmarked = Store.isBookmarked(article.id);

    return `
      <article class="news-card ${article.important ? 'important' : ''}" data-id="${article.id}">
        <div class="news-card-inner">
          <div class="news-card-carrier" style="background: ${carrier.color}"></div>
          <div class="news-card-body">
            <div class="news-card-meta">
              <span class="news-card-carrier-name" style="background: ${carrier.bg}; color: ${carrier.color};">${carrier.name}</span>
              <span class="news-card-category">${getCategoryLabel(article.category)}</span>
              ${article.important ? '<span class="importance-tag">重要</span>' : ''}
              <span class="news-card-date">${formatDateDisplay(article.date)}</span>
            </div>
            <h3 class="news-card-title">${article.title}</h3>
            <p class="news-card-summary">${article.summary}</p>
          </div>
        </div>
        <div class="news-card-footer">
          <span class="news-card-source">${article.source}</span>
          <div class="news-card-actions">
            <button class="action-btn bookmark-btn ${isBookmarked ? 'bookmarked' : ''}" title="ブックマーク">
              ${this.bookmarkIcon(isBookmarked)}
            </button>
          </div>
        </div>
      </article>
    `;
  },

  bookmarkIcon(filled) {
    if (filled) {
      return '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>';
    }
    return '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>';
  },

  openArticle(id) {
    const article = Store.news.find(a => a.id === id);
    if (!article) return;

    const carrier = getCarrierStyle(article.carrier);
    const date = new Date(article.date + 'T00:00:00');
    const dateDisplay = `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;

    const contentHtml = article.content.split('\n').filter(p => p.trim()).map(p => `<p>${p}</p>`).join('');

    const bodyHtml = `
      <span class="article-detail-carrier" style="background: ${carrier.bg}; color: ${carrier.color};">${carrier.name}</span>
      <h2 class="article-detail-title">${article.title}</h2>
      <div class="article-detail-meta">
        <span>${dateDisplay}</span>
        <span>${article.source}</span>
        <span>${getCategoryLabel(article.category)}</span>
      </div>
      <div class="article-detail-content">
        ${contentHtml}
      </div>
      <div class="article-detail-tags">
        ${article.tags.map(t => `<span class="article-tag">${t}</span>`).join('')}
      </div>
    `;

    Modal.open(bodyHtml);
  },

  updateBookmarkCount() {
    $('#bookmarkCount').textContent = Store.bookmarkCount;
  },
};

// --- Navigation ---
const Nav = {
  titles: {
    all: 'すべてのニュース',
    docomo: 'NTTドコモ',
    au: 'au / KDDI',
    softbank: 'ソフトバンク',
    rakuten: '楽天モバイル',
    bookmarks: 'ブックマーク',
  },

  init() {
    const navItems = $$('.nav-item');

    navItems.forEach(item => {
      item.addEventListener('click', () => {
        const filter = item.dataset.filter;

        navItems.forEach(n => n.classList.remove('active'));
        item.classList.add('active');

        NewsFeed.currentFilter = filter;
        $('#pageTitle').textContent = this.titles[filter] || '';

        NewsFeed.render();

        // Close mobile sidebar
        $('#sidebar').classList.remove('open');
      });
    });
  },
};

// --- Category Filter ---
const CategoryFilter = {
  init() {
    const chips = $$('.category-chip');

    chips.forEach(chip => {
      chip.addEventListener('click', () => {
        chips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');

        NewsFeed.currentCategory = chip.dataset.category;
        NewsFeed.render();
      });
    });
  },
};

// --- Search ---
const Search = {
  _debounceTimer: null,

  init() {
    const input = $('#searchInput');

    input.addEventListener('input', () => {
      clearTimeout(this._debounceTimer);
      this._debounceTimer = setTimeout(() => {
        NewsFeed.searchQuery = input.value.trim();
        NewsFeed.render();
      }, 250);
    });
  },
};

// --- Init ---
document.addEventListener('DOMContentLoaded', () => {
  Store.init();

  // Navigation
  Nav.init();

  // Category filter
  CategoryFilter.init();

  // Search
  Search.init();

  // Last updated display
  const now = new Date();
  const days = ['日', '月', '火', '水', '木', '金', '土'];
  $('#lastUpdated').textContent = `最終更新: ${now.getMonth() + 1}/${now.getDate()}(${days[now.getDay()]}) ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

  // Modal close
  $('#modalClose').addEventListener('click', () => Modal.close());
  $('#modalOverlay').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) Modal.close();
  });

  // Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') Modal.close();
  });

  // Mobile menu toggle
  $('#menuToggle').addEventListener('click', () => {
    $('#sidebar').classList.toggle('open');
  });

  // Bookmark count
  NewsFeed.updateBookmarkCount();

  // Initial render
  NewsFeed.render();
});
