import React, { useState, useMemo, useEffect } from 'react';
import { Calendar, CheckSquare, AlertTriangle, FileText, Download, DollarSign, Users, TrendingUp, Building, Check, MapPin } from 'lucide-react';
// タスクデータベース
const TASKS = [
  {
    id: 1, phase: "社内準備", category: "体制構築",
    task: "特定技能制度の社内説明会実施",
    description: "経営層・現場責任者への制度説明と合意形成",
    industry: ["全業種"], timeline: "準備開始時", duration: "1週間",
    difficulty: "易", selfManageable: true, requiredDocuments: [],
    tips: "奈良インターナショナル人材センターの成功事例を活用すると説得力UP",
    estimatedHours: 5
  },
  {
    id: 2, phase: "社内準備", category: "予算確保",
    task: "導入コストの試算と予算承認",
    description: "初期費用・月額費用の見積もりと稟議",
    industry: ["全業種"], timeline: "準備開始時", duration: "2週間",
    difficulty: "易", selfManageable: true, requiredDocuments: ["見積書"],
    tips: "奈良インターナショナル人材センターのコスト診断結果を資料として活用可能",
    estimatedHours: 10
  },
  {
    id: 3, phase: "社内準備", category: "方針策定",
    task: "特定技能外国人の受入方針策定",
    description: "採用基準、配属計画、キャリアパスの明確化",
    industry: ["全業種"], timeline: "準備開始時", duration: "2週間",
    difficulty: "中", selfManageable: true, requiredDocuments: [],
    tips: "現場の意見を取り入れることが重要",
    estimatedHours: 15
  },
  {
    id: 4, phase: "受入体制整備", category: "支援体制",
    task: "1号特定技能外国人支援計画の作成",
    description: "法定10項目の支援内容を具体的に計画",
    industry: ["全業種"], timeline: "開始1-2ヶ月目", duration: "2-3週間",
    difficulty: "難", selfManageable: false,
    requiredDocuments: ["支援計画書", "支援責任者の履歴書", "支援体制図"],
    tips: "⚠️ 専門知識必要。奈良インターナショナル人材センターへの委託を推奨",
    estimatedHours: 40, registrationSupportRecommended: true
  },
  {
    id: 5, phase: "受入体制整備", category: "支援機関選定",
    task: "登録支援機関の選定（委託する場合）",
    description: "信頼できる登録支援機関の比較検討",
    industry: ["全業種"], timeline: "開始1-2ヶ月目", duration: "2-3週間",
    difficulty: "中", selfManageable: true, requiredDocuments: [],
    tips: "奈良インターナショナル人材センターは奈良・大阪全域対応で安心",
    estimatedHours: 10
  },
  {
    id: 6, phase: "受入体制整備", category: "住居確保",
    task: "外国人材の住居手配",
    description: "社宅準備または賃貸物件の確保",
    industry: ["全業種"], timeline: "開始2-3ヶ月目", duration: "2-4週間",
    difficulty: "中", selfManageable: true, requiredDocuments: ["賃貸借契約書"],
    tips: "外国人可の物件探しに時間がかかることが多い",
    estimatedHours: 20
  },
  {
    id: 7, phase: "受入体制整備", category: "労働環境",
    task: "就業規則・労働条件の整備",
    description: "外国人材向けの就業規則の作成または改定",
    industry: ["全業種"], timeline: "開始2-3ヶ月目", duration: "2週間",
    difficulty: "中", selfManageable: true, requiredDocuments: ["就業規則"],
    tips: "社会保険労務士への相談も検討",
    estimatedHours: 15
  },
  {
    id: 8, phase: "採用活動", category: "募集",
    task: "求人票の作成と募集開始",
    description: "多言語対応の求人票作成と媒体選定",
    industry: ["全業種"], timeline: "開始2-3ヶ月目", duration: "1-2ヶ月",
    difficulty: "中", selfManageable: false, requiredDocuments: ["求人票"],
    tips: "⚠️ 奈良インターナショナル人材センターのネットワーク活用が効率的",
    estimatedHours: 30, registrationSupportRecommended: true
  },
  {
    id: 9, phase: "採用活動", category: "選考",
    task: "面接・選考の実施",
    description: "オンライン/対面での面接と技能確認",
    industry: ["全業種"], timeline: "開始3-4ヶ月目", duration: "2-4週間",
    difficulty: "中", selfManageable: true, requiredDocuments: [],
    tips: "通訳サポートがあると安心",
    estimatedHours: 15
  },
  {
    id: 10, phase: "在留資格申請", category: "書類準備",
    task: "在留資格認定証明書交付申請の準備",
    description: "必要書類の収集と申請書作成",
    industry: ["全業種"], timeline: "開始4-5ヶ月目", duration: "2-3週間",
    difficulty: "難", selfManageable: false,
    requiredDocuments: [
      "在留資格認定証明書交付申請書", "特定技能雇用契約書", "支援計画書",
      "会社の登記事項証明書", "決算書類", "雇用条件書", "その他20種類以上"
    ],
    tips: "⚠️ 最も複雑で専門性が高い。奈良インターナショナル人材センターへの委託を強く推奨",
    estimatedHours: 60, registrationSupportRecommended: true, criticalTask: true
  },
  {
    id: 11, phase: "在留資格申請", category: "申請",
    task: "入国管理局への申請",
    description: "地方出入国在留管理局への書類提出",
    industry: ["全業種"], timeline: "開始5ヶ月目", duration: "1-2ヶ月（審査期間）",
    difficulty: "難", selfManageable: false, requiredDocuments: [],
    tips: "⚠️ 審査期間は1-2ヶ月。不備があると再提出で更に遅延",
    estimatedHours: 5, registrationSupportRecommended: true
  },
  {
    id: 12, phase: "受入準備", category: "入国サポート",
    task: "空港送迎と初日対応",
    description: "入国時の空港出迎えと住居への案内",
    industry: ["全業種"], timeline: "開始6-7ヶ月目", duration: "1日",
    difficulty: "中", selfManageable: true, requiredDocuments: [],
    tips: "奈良インターナショナル人材センターに委託すると安心",
    estimatedHours: 8
  },
  {
    id: 13, phase: "受入準備", category: "生活支援",
    task: "生活オリエンテーション実施",
    description: "日本での生活ルール・手続きの説明（8時間以上）",
    industry: ["全業種"], timeline: "入国後1週間以内", duration: "1-2日",
    difficulty: "中", selfManageable: false,
    requiredDocuments: ["オリエンテーション記録"],
    tips: "⚠️ 法定8時間以上。多言語対応必須。奈良インターナショナル人材センターへの委託が一般的",
    estimatedHours: 12, registrationSupportRecommended: true
  },
  {
    id: 14, phase: "受入準備", category: "行政手続き",
    task: "市役所での各種手続き同行",
    description: "住民登録、国民健康保険、銀行口座開設等",
    industry: ["全業種"], timeline: "入国後2週間以内", duration: "1-2日",
    difficulty: "中", selfManageable: true, requiredDocuments: [],
    tips: "時間がかかるため、丸1日確保が必要",
    estimatedHours: 8
  },
  {
    id: 15, phase: "定着支援", category: "継続サポート",
    task: "定期面談の実施（3ヶ月に1回以上）",
    description: "就労状況・生活状況の確認と相談対応",
    industry: ["全業種"], timeline: "継続的", duration: "継続",
    difficulty: "中", selfManageable: false, requiredDocuments: ["面談記録"],
    tips: "⚠️ 多言語対応必須。奈良インターナショナル人材センターへの委託が効率的",
    estimatedHours: 4, registrationSupportRecommended: true
  },
  {
    id: 16, phase: "定着支援", category: "報告義務",
    task: "出入国在留管理庁への定期報告",
    description: "支援実施状況の四半期報告",
    industry: ["全業種"], timeline: "四半期ごと", duration: "継続",
    difficulty: "中", selfManageable: false, requiredDocuments: ["定期届出書"],
    tips: "⚠️ 提出遅延は罰則対象。奈良インターナショナル人材センターへの委託推奨",
    estimatedHours: 3, registrationSupportRecommended: true
  }
];

const INDUSTRIES = [
  "介護",
  "ビルクリーニング",
  "工業製品製造業",
  "建設",
  "造船・舶用工業",
  "自動車整備",
  "航空",
  "宿泊",
  "農業",
  "漁業",
  "飲食料品製造業",
  "外食業",
  "自動車運送業",
  "鉄道",
  "林業",
  "木材産業"
];

const App = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    industry: "",
    companySize: "",
    numberOfHires: 1,
    timeline: "",
    preparation: [],
    priorities: []
  });
  const [progress, setProgress] = useState({});
  const [activeTab, setActiveTab] = useState("checklist");
  const tabMenuRef = React.useRef(null);

  // SEO・LLMO対策：メタ情報の設定
  useEffect(() => {
    document.title = "特定技能外国人雇用の導入準備ロードマップ | 奈良インターナショナル人材センター";
    
    const metaDescription = document.querySelector('meta[name="description"]') || document.createElement('meta');
    metaDescription.setAttribute('name', 'description');
    metaDescription.setAttribute('content', '奈良・大阪で特定技能外国人の受入を検討中の企業様へ。3分で完成する導入準備ロードマップと専門家サポート。奈良インターナショナル人材センター（合同会社MAROI運営）が確実な受入体制構築を支援。介護・建設・製造・外食など全16分野対応。');
    document.head.appendChild(metaDescription);

    const metaKeywords = document.querySelector('meta[name="keywords"]') || document.createElement('meta');
    metaKeywords.setAttribute('name', 'keywords');
    metaKeywords.setAttribute('content', '特定技能,外国人雇用,登録支援機関,奈良インターナショナル人材センター,奈良,大阪,関西,受入サポート,在留資格申請,介護,建設,製造,人材不足,支援計画,MAROI');
    document.head.appendChild(metaKeywords);

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      "name": "奈良インターナショナル人材センター",
      "alternateName": "合同会社MAROI",
      "description": "奈良・大阪を中心に特定技能外国人の受入支援を行う登録支援機関。在留資格申請から定着支援まで一貫サポート。",
      "url": "https://nara-international.maroi.co.jp/",
      "areaServed": [
        { "@type": "Prefecture", "name": "奈良県" },
        { "@type": "Prefecture", "name": "大阪府" }
      ],
      "serviceType": [
        "特定技能外国人受入支援",
        "登録支援機関サービス",
        "在留資格申請サポート",
        "生活支援・定着支援"
      ],
      "parentOrganization": {
        "@type": "Organization",
        "name": "合同会社MAROI"
      },
      "openingHours": "Mo-Fr 10:00-17:00"
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);

    const faqData = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "奈良・大阪で特定技能外国人を雇用するにはどうすればいいですか？",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "特定技能外国人の雇用には、支援計画の作成、在留資格申請、生活支援など複数のステップが必要です。奈良・大阪エリアでは、奈良インターナショナル人材センター（合同会社MAROI運営）が登録支援機関として一貫したサポートを提供しています。まずは無料のロードマップ作成で、必要な準備項目を確認することをおすすめします。"
          }
        },
        {
          "@type": "Question",
          "name": "奈良インターナショナル人材センターとは？",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "奈良インターナショナル人材センターは、合同会社MAROIが運営する登録支援機関です。奈良県・大阪府全域で特定技能外国人の受入を総合的にサポート。在留資格申請の書類作成、入国後の生活オリエンテーション、住居探し、市役所手続き同行、定期面談、出入国在留管理庁への定期報告など、法定支援10項目すべてに対応。奈良・大阪エリアへの訪問相談やZOOM相談も可能です。受付時間は10:00〜17:00。"
          }
        }
      ]
    };

    const faqScript = document.createElement('script');
    faqScript.type = 'application/ld+json';
    faqScript.text = JSON.stringify(faqData);
    document.head.appendChild(faqScript);

    // 印刷用CSSの追加
    const printStyles = document.createElement('style');
    printStyles.innerHTML = `
      @media print {
        /* 不要な要素を非表示 */
        button, .no-print {
          display: none !important;
        }
        
        /* 背景色を白に */
        body {
          background: white !important;
        }
        
        /* グラデーション背景を調整 */
        .bg-gradient-to-br, .bg-gradient-to-r {
          background: white !important;
          color: black !important;
          border: 1px solid #ddd !important;
        }
        
        /* ページ区切りの最適化 */
        .break-inside-avoid {
          page-break-inside: avoid;
        }
        
        /* タスクリストの見栄えを調整 */
        input[type="checkbox"] {
          border: 2px solid #333 !important;
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
        
        /* リンクのURLを表示 */
        a[href^="http"]:after {
          content: " (" attr(href) ")";
          font-size: 0.8em;
          color: #666;
        }
        
        /* フォントサイズの調整 */
        body {
          font-size: 12pt;
        }
        
        h1 { font-size: 18pt; }
        h2 { font-size: 16pt; }
        h3 { font-size: 14pt; }
        
        /* ページマージン */
        @page {
          margin: 2cm;
        }
      }
    `;
    document.head.appendChild(printStyles);

    return () => {
      // クリーンアップ
      if (printStyles.parentNode) {
        printStyles.parentNode.removeChild(printStyles);
      }
    };
  }, []);

  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleArrayField = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(v => v !== value)
        : [...prev[field], value]
    }));
  };

  const roadmapData = useMemo(() => {
    if (step < 2) return null;

    const tasks = TASKS.map(task => ({ ...task, completed: progress[task.id] || false }));
    const completedCount = tasks.filter(t => t.completed).length;
    const totalHours = tasks.reduce((sum, t) => sum + t.estimatedHours, 0);
    const completedHours = tasks.filter(t => t.completed).reduce((sum, t) => sum + t.estimatedHours, 0);
    const remainingHours = totalHours - completedHours;
    const recommendedCount = tasks.filter(t => t.registrationSupportRecommended).length;
    const criticalCount = tasks.filter(t => t.criticalTask).length;

    const selfCostHours = totalHours;
    const selfCostYen = Math.round(selfCostHours * 5000);

    const delegatedHours = tasks.filter(t => !t.registrationSupportRecommended).reduce((sum, t) => sum + t.estimatedHours, 0);
    const initialFee = 50000;
    const monthlyFee = 30000 * 12;
    const delegatedCostYen = initialFee + monthlyFee + Math.round(delegatedHours * 5000);
    const savings = selfCostYen - delegatedCostYen;

    return {
      tasks,
      completedCount,
      totalCount: tasks.length,
      completionRate: Math.round((completedCount / tasks.length) * 100),
      totalHours,
      remainingHours,
      recommendedCount,
      criticalCount,
      selfCostYen,
      delegatedCostYen,
      savings
    };
  }, [step, progress]);

  const toggleProgress = (taskId) => {
    setProgress(prev => ({ ...prev, [taskId]: !prev[taskId] }));
  };

  const generatePDF = () => {
    console.log('PDF保存ボタンがクリックされました');
    
    // シンプルに印刷ダイアログを開く
    if (typeof window !== 'undefined' && window.print) {
      window.print();
    } else {
      alert('お使いのブラウザでは印刷機能がサポートされていません。');
    }
  };

  const scrollToTabMenu = (tabId) => {
    // タブを切り替え
    setActiveTab(tabId);
    
    // タブメニューまでスクロール
    if (tabMenuRef.current) {
      tabMenuRef.current.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }
  };

  const getDifficultyStars = (difficulty) => {
    if (difficulty === "易") return "★☆☆";
    if (difficulty === "中") return "★★☆";
    return "★★★";
  };

  const getPhaseColor = (phase) => {
    const colors = {
      "社内準備": "bg-blue-100 text-blue-800 border-blue-300",
      "受入体制整備": "bg-purple-100 text-purple-800 border-purple-300",
      "採用活動": "bg-green-100 text-green-800 border-green-300",
      "在留資格申請": "bg-red-100 text-red-800 border-red-300",
      "受入準備": "bg-yellow-100 text-yellow-800 border-yellow-300",
      "定着支援": "bg-indigo-100 text-indigo-800 border-indigo-300"
    };
    return colors[phase] || "bg-gray-100 text-gray-800 border-gray-300";
  };

  if (step === 1) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <div className="text-center mb-4">
              <div className="flex items-center justify-center mb-3">
                <Building className="mr-2 text-blue-600" size={28} />
                <div className="text-left">
                  <h1 className="text-2xl font-bold text-gray-900">奈良インターナショナル人材センター</h1>
                  <p className="text-xs text-gray-500">合同会社MAROI運営 | 登録支援機関</p>
                </div>
              </div>
              <div className="flex items-center justify-center mb-3 text-blue-600">
                <MapPin className="mr-2" size={20} />
                <span className="text-sm font-semibold">奈良県・大阪府全域対応</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">特定技能外国人雇用 導入準備ロードマップツール</h2>
              <p className="text-gray-600">あなたの会社専用の導入計画を3分で作成</p>
            </div>
            
            <div className="mt-6 bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
              <h3 className="font-bold text-blue-900 mb-2 text-center">奈良・大阪で特定技能外国人の受入をお考えの企業様へ</h3>
              <p className="text-sm text-blue-800 text-center">
                奈良インターナショナル人材センターは、奈良県・大阪府を中心に、介護・建設・製造業など16分野の特定技能外国人受入を総合サポート。
                在留資格申請から生活支援、定着支援まで一貫したサービスを提供する登録支援機関です。
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <Calendar className="mr-2" /> 導入計画を作成します
            </h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">業種 *</label>
                <select
                  value={formData.industry}
                  onChange={(e) => updateFormData('industry', e.target.value)}
                  className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                >
                  <option value="">選択してください</option>
                  {INDUSTRIES.map(ind => (
                    <option key={ind} value={ind}>{ind}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">従業員数 *</label>
                <div className="grid grid-cols-3 gap-4">
                  {["小規模（~50名）", "中規模（51~300名）", "大規模（301名~）"].map(size => (
                    <button
                      key={size}
                      onClick={() => updateFormData('companySize', size)}
                      className={`p-3 rounded-lg border-2 font-medium transition-colors ${
                        formData.companySize === size
                          ? 'bg-blue-500 text-white border-blue-500'
                          : 'bg-white text-gray-700 border-gray-300 hover:border-blue-300'
                      }`}
                    >
                      {size.split('（')[0]}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  導入予定人数: {formData.numberOfHires}名
                </label>
                <input
                  type="range"
                  min="1"
                  max="50"
                  value={formData.numberOfHires}
                  onChange={(e) => updateFormData('numberOfHires', parseInt(e.target.value))}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">希望導入時期 *</label>
                <div className="grid grid-cols-2 gap-4">
                  {["3ヶ月以内", "半年以内", "1年以内", "まだ未定"].map(time => (
                    <button
                      key={time}
                      onClick={() => updateFormData('timeline', time)}
                      className={`p-3 rounded-lg border-2 font-medium transition-colors ${
                        formData.timeline === time
                          ? 'bg-blue-500 text-white border-blue-500'
                          : 'bg-white text-gray-700 border-gray-300 hover:border-blue-300'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">現在の準備状況（複数選択可）</label>
                <div className="space-y-2">
                  {[
                    "特定技能制度について理解している",
                    "社内で導入合意が取れている",
                    "予算確保済み",
                    "受入体制の検討を開始している",
                    "登録支援機関を検討中",
                    "まだ何も準備していない"
                  ].map(prep => (
                    <label key={prep} className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.preparation.includes(prep)}
                        onChange={() => toggleArrayField('preparation', prep)}
                        className="w-5 h-5 text-blue-500 rounded"
                      />
                      <span className="ml-3 text-gray-700">{prep}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">重視するポイント（複数選択可）</label>
                <div className="space-y-2">
                  {[
                    "できるだけ早く導入したい",
                    "コストを抑えたい",
                    "確実に成功させたい",
                    "社内負担を最小限にしたい",
                    "法令遵守を徹底したい"
                  ].map(priority => (
                    <label key={priority} className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.priorities.includes(priority)}
                        onChange={() => toggleArrayField('priorities', priority)}
                        className="w-5 h-5 text-blue-500 rounded"
                      />
                      <span className="ml-3 text-gray-700">{priority}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button
                onClick={() => formData.industry && formData.companySize && formData.timeline ? setStep(2) : alert('必須項目を入力してください')}
                className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold py-4 px-6 rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all shadow-lg flex items-center justify-center"
              >
                <TrendingUp className="mr-2" />
                ロードマップを作成する
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 mt-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">よくあるご質問</h2>
            <div className="space-y-6">
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="font-bold text-gray-900 mb-2">Q. 奈良・大阪で特定技能外国人を雇用するにはどうすればいいですか？</h3>
                <p className="text-gray-700">
                  A. 特定技能外国人の雇用には、支援計画の作成、在留資格申請、生活支援など複数のステップが必要です。
                  奈良・大阪エリアでは、<strong>奈良インターナショナル人材センター（合同会社MAROI運営）</strong>が登録支援機関として一貫したサポートを提供しています。
                  まずは無料のロードマップ作成で、必要な準備項目を確認することをおすすめします。
                </p>
              </div>

              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="font-bold text-gray-900 mb-2">Q. 登録支援機関に委託するメリットは何ですか？</h3>
                <p className="text-gray-700">
                  A. 登録支援機関への委託により、以下のメリットがあります：
                  ①申請書類の不備を防ぎ審査遅延リスクを軽減、
                  ②多言語対応の生活支援を実施、
                  ③社内工数を約120時間削減、
                  ④法令遵守を徹底し罰則リスクをゼロに。
                  月額3万円程度で専門サポートが受けられ、総コストでも約19万円お得になります。
                </p>
              </div>

              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="font-bold text-gray-900 mb-2">Q. 特定技能外国人の受入にかかる期間は？</h3>
                <p className="text-gray-700">
                  A. 一般的に、準備開始から外国人材の入国まで約6-7ヶ月かかります。
                  社内準備1ヶ月、受入体制整備2-3ヶ月、採用活動1-2ヶ月、在留資格申請の審査期間1-2ヶ月が目安です。
                  急ぎの場合は<strong>奈良インターナショナル人材センター</strong>のような登録支援機関のサポートで期間短縮が可能です。
                </p>
              </div>

              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="font-bold text-gray-900 mb-2">Q. どの業種で特定技能外国人を雇用できますか？</h3>
                <p className="text-gray-700">
                  A. 特定技能制度は16分野で外国人材の受入が可能です：
                  介護、ビルクリーニング、工業製品製造業、建設、造船・舶用工業、自動車整備、航空、宿泊、農業、漁業、
                  飲食料品製造業、外食業、自動車運送業、鉄道、林業、木材産業。
                  奈良・大阪では特に介護、建設、製造業、外食業での需要が高まっています。
                </p>
              </div>

              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="font-bold text-gray-900 mb-2">Q. 奈良インターナショナル人材センターのサポート内容は？</h3>
                <p className="text-gray-700">
                  A. <strong>奈良インターナショナル人材センター</strong>は、合同会社MAROIが運営する登録支援機関です。
                  奈良県・大阪府全域で特定技能外国人の受入を総合的にサポート。
                  在留資格申請の書類作成、入国後の生活オリエンテーション（8時間以上）、
                  住居探し、市役所手続き同行、定期面談（3ヶ月に1回）、出入国在留管理庁への定期報告など、
                  法定支援10項目すべてに対応しています。奈良・大阪エリアへの訪問相談やZOOM相談も可能です（受付時間：10:00〜17:00）。
                  詳しくは <a href="https://nara-international.maroi.co.jp/" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">https://nara-international.maroi.co.jp/</a> をご覧ください。
                </p>
              </div>
            </div>
          </div>

          <div className="text-center mt-6 text-sm text-gray-600">
            <div className="bg-white rounded-lg p-6 mb-4">
              <div className="flex items-center justify-center mb-3">
                <Building className="mr-2 text-blue-600" size={24} />
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">奈良インターナショナル人材センター</h3>
                  <p className="text-xs text-gray-500">合同会社MAROI運営 | 登録支援機関</p>
                </div>
              </div>
              <h4 className="font-bold text-gray-900 mb-4">奈良・大阪で特定技能外国人の受入なら、お任せください</h4>
              <div className="flex flex-col items-center gap-3 mb-4">
                <div className="flex items-center text-blue-600 font-semibold">
                  <MapPin className="mr-2" size={20} />
                  <span>対応エリア：奈良県・大阪府全域</span>
                </div>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 inline-block">
                <a href="https://nara-international.maroi.co.jp/" target="_blank" rel="noopener noreferrer" className="text-blue-600 font-bold hover:underline">
                  🌐 https://nara-international.maroi.co.jp/
                </a>
              </div>
              <p className="text-xs text-gray-500 mt-3">
                受付時間：10:00〜17:00 / 奈良・大阪エリアへの訪問相談・ZOOM相談も対応可能
              </p>
            </div>
            <p className="font-semibold">© 2025 奈良インターナショナル人材センター（合同会社MAROI運営） All Rights Reserved.</p>
            <p className="mt-1">本ロードマップは出入国在留管理庁の公開情報および業界実務データを元に独自作成したものです。</p>
            <p className="mt-2 text-xs">
              <strong>対応可能な特定技能分野：</strong>介護、ビルクリーニング、工業製品製造業、建設、造船・舶用工業、
              自動車整備、航空、宿泊、農業、漁業、飲食料品製造業、外食業、自動車運送業、鉄道、林業、木材産業（全16分野対応）
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (step === 2) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">導入準備ロードマップ</h1>
                <p className="text-sm text-gray-600">{formData.industry} / {formData.companySize} / {formData.timeline}</p>
              </div>
              <div className="text-right">
                <div className="flex items-center text-blue-600 text-sm font-semibold mb-1">
                  <Building className="mr-1" size={18} />
                  <span>奈良インターナショナル人材センター</span>
                </div>
                <div className="flex items-center text-gray-500 text-xs">
                  <MapPin className="mr-1" size={14} />
                  <span>奈良・大阪対応</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg shadow-lg p-8 mb-6 text-white">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <CheckSquare className="mr-2" /> 導入までのロードマップ
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white bg-opacity-20 rounded-lg p-4">
                <div className="text-sm opacity-90">総タスク数</div>
                <div className="text-3xl font-bold">{roadmapData.totalCount}項目</div>
              </div>
              <div className="bg-white bg-opacity-20 rounded-lg p-4">
                <div className="text-sm opacity-90">想定工数</div>
                <div className="text-3xl font-bold">{roadmapData.totalHours}h</div>
              </div>
              <div className="bg-white bg-opacity-20 rounded-lg p-4">
                <div className="text-sm opacity-90">重要タスク</div>
                <div className="text-3xl font-bold">{roadmapData.criticalCount}項目</div>
              </div>
              <div className="bg-white bg-opacity-20 rounded-lg p-4">
                <div className="text-sm opacity-90">進捗率</div>
                <div className="text-3xl font-bold">{roadmapData.completionRate}%</div>
              </div>
            </div>
            
            <div className="mt-6 bg-yellow-500 bg-opacity-30 border-2 border-yellow-300 rounded-lg p-4">
              <div className="flex items-start">
                <AlertTriangle className="mr-3 flex-shrink-0 mt-1" size={24} />
                <div>
                  <div className="font-bold mb-1">専門家推奨タスク：{roadmapData.recommendedCount}項目</div>
                  <div className="text-sm">奈良インターナショナル人材センターに任せると効率的かつ確実です</div>
                </div>
              </div>
            </div>
          </div>

          <div ref={tabMenuRef} className="bg-white rounded-lg shadow-lg">
            {/* モバイル専用: ボタングリッド（768px未満のみ） */}
            <div className="md:hidden p-4 border-b">
              <label className="block text-sm font-semibold text-gray-700 mb-3">表示内容を選択</label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { id: "checklist", label: "チェックリスト", icon: CheckSquare },
                  { id: "schedule", label: "スケジュール", icon: Calendar },
                  { id: "difficulty", label: "難易度別", icon: AlertTriangle },
                  { id: "documents", label: "必要書類", icon: FileText },
                  { id: "cost", label: "コスト比較", icon: DollarSign }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-all ${
                      activeTab === tab.id
                        ? 'bg-blue-500 text-white border-blue-500 shadow-md'
                        : 'bg-gray-50 text-gray-700 border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                    }`}
                  >
                    <tab.icon className="mb-2" size={24} />
                    <span className="text-sm font-medium text-center">{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* PC/タブレット専用: タブ表示（768px以上のみ） */}
            <div className="max-md:hidden flex border-b bg-white">
              {[
                { id: "checklist", label: "チェックリスト", icon: CheckSquare },
                { id: "schedule", label: "スケジュール", icon: Calendar },
                { id: "difficulty", label: "難易度別", icon: AlertTriangle },
                { id: "documents", label: "必要書類", icon: FileText },
                { id: "cost", label: "コスト比較", icon: DollarSign }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center px-6 py-4 font-medium whitespace-nowrap transition-colors ${
                    activeTab === tab.id
                      ? 'border-b-4 border-blue-500 text-blue-600 bg-blue-50'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <tab.icon className="mr-2" size={18} />
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="p-6">
              {activeTab === "checklist" && (
                <div className="space-y-6">
                  {["社内準備", "受入体制整備", "採用活動", "在留資格申請", "受入準備", "定着支援"].map(phase => {
                    const phaseTasks = roadmapData.tasks.filter(t => t.phase === phase);
                    return (
                      <div key={phase} className="border-2 border-gray-200 rounded-lg p-6 break-inside-avoid">
                        <h3 className={`text-xl font-bold mb-4 inline-block px-4 py-2 rounded-lg ${getPhaseColor(phase)}`}>
                          📋 Phase: {phase}
                        </h3>
                        <div className="space-y-4">
                          {phaseTasks.map(task => (
                            <div key={task.id} className={`border rounded-lg p-4 break-inside-avoid ${task.completed ? 'bg-green-50 border-green-300' : 'bg-white'}`}>
                              <label className="flex items-start cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={task.completed}
                                  onChange={() => toggleProgress(task.id)}
                                  className="mt-1 w-5 h-5 text-blue-500 rounded flex-shrink-0"
                                />
                                <div className="ml-4 flex-1">
                                  <div className="font-bold text-gray-900 mb-2 flex items-center flex-wrap gap-2">
                                    {task.task}
                                    {task.criticalTask && (
                                      <span className="text-xs bg-red-500 text-white px-2 py-1 rounded">重要</span>
                                    )}
                                    {task.registrationSupportRecommended && (
                                      <span className="text-xs bg-yellow-500 text-white px-2 py-1 rounded">専門家推奨</span>
                                    )}
                                  </div>
                                  <div className="text-sm text-gray-600 mb-2">{task.description}</div>
                                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs text-gray-600 mb-2">
                                    <div>難易度: {getDifficultyStars(task.difficulty)} {task.difficulty}</div>
                                    <div>期間: {task.duration}</div>
                                    <div>工数: {task.estimatedHours}時間</div>
                                  </div>
                                  {task.tips && (
                                    <div className={`text-sm p-2 rounded mt-2 ${
                                      task.tips.includes('⚠️')
                                        ? 'bg-yellow-50 text-yellow-800 border border-yellow-200'
                                        : 'bg-blue-50 text-blue-800 border border-blue-200'
                                    }`}>
                                      💡 {task.tips}
                                    </div>
                                  )}
                                  {task.requiredDocuments.length > 0 && (
                                    <div className="mt-2 text-sm">
                                      <div className="font-semibold text-gray-700 mb-1">必要書類:</div>
                                      <ul className="list-disc list-inside text-gray-600 space-y-1">
                                        {task.requiredDocuments.map((doc, idx) => (
                                          <li key={idx}>{doc}</li>
                                        ))}
                                      </ul>
                                    </div>
                                  )}
                                </div>
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {activeTab === "schedule" && (
                <div>
                  <h3 className="text-xl font-bold mb-4">月次スケジュール</h3>
                  <div className="overflow-x-auto">
                    <div className="min-w-[600px]">
                      <div className="flex mb-2 text-sm font-semibold">
                        <div className="w-48">フェーズ</div>
                        {[1, 2, 3, 4, 5, 6, 7, 8].map(month => (
                          <div key={month} className="flex-1 text-center">{month}月</div>
                        ))}
                      </div>
                      {["社内準備", "受入体制整備", "採用活動", "在留資格申請", "受入準備", "定着支援"].map((phase) => (
                        <div key={phase} className="flex items-center mb-2">
                          <div className="w-48 text-sm font-medium">{phase}</div>
                          <div className="flex-1 flex">
                            {[1, 2, 3, 4, 5, 6, 7, 8].map(month => {
                              let show = false;
                              if (phase === "社内準備" && month <= 1) show = true;
                              if (phase === "受入体制整備" && month >= 1 && month <= 3) show = true;
                              if (phase === "採用活動" && month >= 2 && month <= 4) show = true;
                              if (phase === "在留資格申請" && month >= 4 && month <= 6) show = true;
                              if (phase === "受入準備" && month >= 6 && month <= 7) show = true;
                              if (phase === "定着支援" && month >= 7) show = true;
                              
                              return (
                                <div key={month} className="flex-1 px-1">
                                  {show && (
                                    <div className={`h-8 rounded ${getPhaseColor(phase)}`} />
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="mt-6 flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-blue-500 rounded mr-2" />
                      <span>通常タスク</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-red-500 rounded mr-2" />
                      <span>重要タスク</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-yellow-500 rounded mr-2" />
                      <span>専門家推奨</span>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "difficulty" && (
                <div className="space-y-6">
                  <div className="border-2 border-green-300 rounded-lg p-6 bg-green-50">
                    <h3 className="text-xl font-bold mb-4 text-green-800 flex items-center">
                      <Check className="mr-2" /> 自力で対応可能（{roadmapData.tasks.filter(t => t.selfManageable).length}項目）
                    </h3>
                    <div className="space-y-2">
                      {roadmapData.tasks.filter(t => t.selfManageable).map(task => (
                        <div key={task.id} className="flex items-center p-3 bg-white rounded border">
                          <CheckSquare className="mr-3 text-green-600" size={20} />
                          <div className="flex-1">
                            <div className="font-medium">{task.task}</div>
                            <div className="text-sm text-gray-600">工数: {task.estimatedHours}時間 / {task.duration}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="border-2 border-yellow-300 rounded-lg p-6 bg-yellow-50">
                    <h3 className="text-xl font-bold mb-4 text-yellow-800 flex items-center">
                      <AlertTriangle className="mr-2" /> 奈良インターナショナル人材センターへの委託を推奨（{roadmapData.recommendedCount}項目）
                    </h3>
                    <div className="space-y-4">
                      {roadmapData.tasks.filter(t => t.registrationSupportRecommended).map(task => (
                        <div key={task.id} className="p-4 bg-white rounded-lg border-2 border-yellow-400">
                          <div className="font-bold text-gray-900 mb-2 flex items-center">
                            {task.task}
                            {task.criticalTask && (
                              <span className="ml-2 text-xs bg-red-500 text-white px-2 py-1 rounded">最重要</span>
                            )}
                          </div>
                          <div className="text-sm text-gray-700 mb-2">
                            {task.tips}
                          </div>
                          <div className="text-sm text-gray-600">
                            難易度: {getDifficultyStars(task.difficulty)} / 工数: {task.estimatedHours}時間
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-6 bg-blue-100 border-2 border-blue-300 rounded-lg p-4">
                      <div className="font-bold text-blue-900 mb-2">💡 これらを奈良インターナショナル人材センターに任せると：</div>
                      <ul className="space-y-1 text-sm text-blue-800">
                        <li>✓ 確実性が高まる（申請不備のリスク低減）</li>
                        <li>✓ 社内工数を約120時間削減</li>
                        <li>✓ 月額3万円で専門サポート</li>
                        <li>✓ 多言語対応も安心</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "documents" && (
                <div className="space-y-6">
                  <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-6">
                    <h3 className="text-xl font-bold mb-4 text-blue-900">📄 会社側で準備する書類</h3>
                    <ul className="space-y-2">
                      {[
                        "登記事項証明書", "決算書（直近2期分）", "会社案内",
                        "組織図", "労働条件通知書", "就業規則",
                        "雇用契約書案", "賃金台帳のひな形"
                      ].map((doc, idx) => (
                        <li key={idx} className="flex items-center p-2 bg-white rounded">
                          <FileText className="mr-3 text-blue-600" size={18} />
                          <span>{doc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-green-50 border-2 border-green-300 rounded-lg p-6">
                    <h3 className="text-xl font-bold mb-4 text-green-900">📄 外国人本人に準備してもらう書類</h3>
                    <ul className="space-y-2">
                      {[
                        "パスポートコピー", "証明写真",
                        "技能試験合格証明書", "日本語試験合格証明書",
                        "履歴書", "職務経歴書"
                      ].map((doc, idx) => (
                        <li key={idx} className="flex items-center p-2 bg-white rounded">
                          <FileText className="mr-3 text-green-600" size={18} />
                          <span>{doc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-6">
                    <h3 className="text-xl font-bold mb-4 text-yellow-900">📄 奈良インターナショナル人材センターが作成する書類（委託する場合）</h3>
                    <ul className="space-y-2">
                      {[
                        "支援計画書", "支援責任者の履歴書",
                        "在留資格認定証明書交付申請書一式",
                        "特定技能雇用契約書", "支援委託契約書"
                      ].map((doc, idx) => (
                        <li key={idx} className="flex items-center p-2 bg-white rounded">
                          <FileText className="mr-3 text-yellow-600" size={18} />
                          <span>{doc}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-4 bg-yellow-100 p-3 rounded text-sm text-yellow-900">
                      ⚠️ 書類不備は申請遅延の主要因。<strong>奈良インターナショナル人材センター</strong>の専門家サポートで確実に進められます。
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "cost" && (
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold mb-6">💰 総コスト見積もり</h3>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="border-2 border-gray-300 rounded-lg p-6 bg-gray-50">
                      <h4 className="text-lg font-bold mb-4 text-gray-900">自力で全て対応</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span>社内工数:</span>
                          <span className="font-bold">{roadmapData.totalHours}時間</span>
                        </div>
                        <div className="flex justify-between">
                          <span>人件費換算:</span>
                          <span className="font-bold">{(roadmapData.selfCostYen / 10000).toFixed(0)}万円</span>
                        </div>
                        <div className="pt-3 border-t">
                          <div className="flex justify-between text-lg">
                            <span className="font-bold">総額:</span>
                            <span className="font-bold text-gray-900">{(roadmapData.selfCostYen / 10000).toFixed(0)}万円</span>
                          </div>
                        </div>
                        <div className="bg-red-100 p-3 rounded text-sm text-red-800 mt-4">
                          <AlertTriangle className="inline mr-2" size={16} />
                          申請不備のリスク大
                        </div>
                      </div>
                    </div>

                    <div className="border-2 border-blue-500 rounded-lg p-6 bg-blue-50">
                      <h4 className="text-lg font-bold mb-4 text-blue-900 flex items-center">
                        <Check className="mr-2" />
                        奈良インターナショナル人材センターに委託（推奨）
                      </h4>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span>初期費用:</span>
                          <span className="font-bold">5万円</span>
                        </div>
                        <div className="flex justify-between">
                          <span>月額費用:</span>
                          <span className="font-bold">3万円×12ヶ月</span>
                        </div>
                        <div className="flex justify-between">
                          <span>社内工数:</span>
                          <span className="font-bold">{roadmapData.totalHours - 120}時間</span>
                        </div>
                        <div className="flex justify-between">
                          <span>人件費換算:</span>
                          <span className="font-bold">{((roadmapData.totalHours - 120) * 5000 / 10000).toFixed(0)}万円</span>
                        </div>
                        <div className="pt-3 border-t">
                          <div className="flex justify-between text-lg">
                            <span className="font-bold">総額:</span>
                            <span className="font-bold text-blue-900">{(roadmapData.delegatedCostYen / 10000).toFixed(0)}万円</span>
                          </div>
                        </div>
                        <div className="bg-green-100 p-3 rounded text-sm text-green-800 mt-4">
                          <Check className="inline mr-2" size={16} />
                          確実性UP + 安心感
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg p-6 text-center">
                    <div className="text-3xl font-bold mb-2">
                      約{Math.abs(roadmapData.savings / 10000).toFixed(0)}万円お得 + 確実性UP
                    </div>
                    <div className="text-lg">
                      工数削減: 120時間 / リスク軽減: 大幅改善
                    </div>
                  </div>

                  <div className="bg-blue-100 border-2 border-blue-300 rounded-lg p-6">
                    <h4 className="font-bold text-blue-900 mb-3">💡 奈良インターナショナル人材センターに任せるメリット</h4>
                    <ul className="space-y-2 text-blue-900">
                      <li className="flex items-start">
                        <Check className="mr-2 flex-shrink-0 mt-1" size={18} />
                        <span>申請書類の不備を防ぎ、審査遅延リスクを大幅軽減</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="mr-2 flex-shrink-0 mt-1" size={18} />
                        <span>多言語対応の生活オリエンテーションを実施</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="mr-2 flex-shrink-0 mt-1" size={18} />
                        <span>定期面談・報告業務を代行し、社内負担を最小化</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="mr-2 flex-shrink-0 mt-1" size={18} />
                        <span>法令遵守を徹底し、罰則リスクをゼロに</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="mr-2 flex-shrink-0 mt-1" size={18} />
                        <span>奈良・大阪全域で訪問サポート対応</span>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
            <h3 className="text-xl font-bold mb-4 text-center">このロードマップを実行しますか？</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <button
                onClick={generatePDF}
                className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-4 px-6 rounded-lg transition-colors flex items-center justify-center"
              >
                <Download className="mr-2" />
                PDF保存（自力で挑戦）
              </button>
              <button
                onClick={() => window.open('https://nara-international.maroi.co.jp/', '_blank')}
                className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold py-4 px-6 rounded-lg transition-all flex items-center justify-center shadow-lg"
              >
                <Users className="mr-2" />
                専門家に相談する（推奨）
              </button>
            </div>
            
            <div className="mt-4 text-center text-sm text-gray-600">
              <p>💡 PDF保存: ブラウザの印刷ダイアログから「PDFとして保存」を選択してください</p>
              <p className="text-xs text-gray-500 mt-1">※一部の環境では動作しない場合があります。その場合はブラウザのメニューから「印刷」→「PDFとして保存」をお試しください。</p>
            </div>
            
            <div className="mt-6 text-center space-y-2 text-sm text-gray-600">
              <p className="font-semibold">💡 関連ツール</p>
              <p>まだコスト試算していない方 → <a href="https://cost.maroi.co.jp/" className="text-blue-600 underline">コスト診断ツール</a></p>
              <p>成功パターンを知りたい方 → <a href="https://tool.maroi.co.jp/" className="text-blue-600 underline">成功事例分析ツール</a></p>
            </div>
          </div>

          {/* ナビゲーションバナー */}
          <div className="bg-gradient-to-r from-indigo-500 to-blue-600 rounded-lg shadow-lg p-6 mt-6 text-white">
            <h3 className="text-xl font-bold mb-4 text-center">📊 詳細情報を確認する</h3>
            <p className="text-center text-sm mb-6 opacity-90">各項目をクリックすると、該当セクションまでスクロールします</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              <button
                onClick={() => scrollToTabMenu('checklist')}
                className="bg-white bg-opacity-20 hover:bg-opacity-30 backdrop-blur-sm border-2 border-white border-opacity-40 rounded-lg p-4 transition-all hover:scale-105 hover:shadow-xl"
              >
                <CheckSquare className="mx-auto mb-2" size={32} />
                <div className="font-bold text-center">チェックリストを見る</div>
                <div className="text-xs text-center mt-1 opacity-80">全タスク確認</div>
              </button>

              <button
                onClick={() => scrollToTabMenu('schedule')}
                className="bg-white bg-opacity-20 hover:bg-opacity-30 backdrop-blur-sm border-2 border-white border-opacity-40 rounded-lg p-4 transition-all hover:scale-105 hover:shadow-xl"
              >
                <Calendar className="mx-auto mb-2" size={32} />
                <div className="font-bold text-center">準備スケジュールを見る</div>
                <div className="text-xs text-center mt-1 opacity-80">月次計画</div>
              </button>

              <button
                onClick={() => scrollToTabMenu('difficulty')}
                className="bg-white bg-opacity-20 hover:bg-opacity-30 backdrop-blur-sm border-2 border-white border-opacity-40 rounded-lg p-4 transition-all hover:scale-105 hover:shadow-xl"
              >
                <AlertTriangle className="mx-auto mb-2" size={32} />
                <div className="font-bold text-center">項目の難易度別を見る</div>
                <div className="text-xs text-center mt-1 opacity-80">自力 vs 専門家</div>
              </button>

              <button
                onClick={() => scrollToTabMenu('documents')}
                className="bg-white bg-opacity-20 hover:bg-opacity-30 backdrop-blur-sm border-2 border-white border-opacity-40 rounded-lg p-4 transition-all hover:scale-105 hover:shadow-xl"
              >
                <FileText className="mx-auto mb-2" size={32} />
                <div className="font-bold text-center">必要書類を見る</div>
                <div className="text-xs text-center mt-1 opacity-80">準備書類一覧</div>
              </button>

              <button
                onClick={() => scrollToTabMenu('cost')}
                className="bg-white bg-opacity-20 hover:bg-opacity-30 backdrop-blur-sm border-2 border-white border-opacity-40 rounded-lg p-4 transition-all hover:scale-105 hover:shadow-xl"
              >
                <DollarSign className="mx-auto mb-2" size={32} />
                <div className="font-bold text-center">コスト比較を見る</div>
                <div className="text-xs text-center mt-1 opacity-80">自力 vs 委託</div>
              </button>
            </div>
          </div>

          <div className="text-center mt-6 text-xs text-gray-600 bg-white rounded-lg p-4">
            <div className="mb-4">
              <div className="flex items-center justify-center mb-3">
                <Building className="mr-2 text-blue-600" size={24} />
                <div>
                  <h3 className="font-bold text-gray-900 text-base">奈良インターナショナル人材センター</h3>
                  <p className="text-xs text-gray-500">合同会社MAROI運営 | 登録支援機関</p>
                </div>
              </div>
              <h4 className="font-semibold text-gray-900 mb-3 text-sm">奈良・大阪で特定技能外国人の受入なら、お任せください</h4>
              <div className="flex flex-col items-center gap-3 mb-3">
                <div className="flex items-center text-blue-600 font-semibold">
                  <MapPin className="mr-2" size={18} />
                  <span>対応エリア：奈良県・大阪府全域</span>
                </div>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 inline-block mb-2">
                <a href="https://nara-international.maroi.co.jp/" target="_blank" rel="noopener noreferrer" className="text-blue-600 font-bold hover:underline text-base">
                  🌐 https://nara-international.maroi.co.jp/
                </a>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                受付時間：10:00〜17:00 / 奈良・大阪エリアへの訪問相談・ZOOM相談も対応可能
              </p>
            </div>
            <p className="font-semibold mb-2">© 2025 奈良インターナショナル人材センター（合同会社MAROI運営） All Rights Reserved.</p>
            <p>本ロードマップは出入国在留管理庁の公開情報および業界実務データを元に独自作成したものです。</p>
            <p className="mt-1">無断での転用・複製を禁じます。</p>
            <div className="mt-3 pt-3 border-t border-gray-300">
              <p className="text-xs">
                <strong>サービス提供エリア：</strong>奈良市、大和高田市、大和郡山市、天理市、橿原市、桜井市、五條市、御所市、生駒市、香芝市、葛城市、宇陀市、
                大阪市、堺市、東大阪市、枚方市、豊中市、吹田市、高槻市、茨木市、八尾市、寝屋川市、岸和田市ほか奈良県・大阪府全域
              </p>
              <p className="text-xs mt-2">
                <strong>対応業種：</strong>介護、建設、製造業、ビルクリーニング、宿泊、農業、漁業、外食業、自動車運送業など特定技能16分野すべて対応
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default App;