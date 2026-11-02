'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import {
  Mail,
  Linkedin,
  Download,
  TrendingUp,
  Target,
  LineChart,
  BarChart3,
  Database,
  Brain,
  Lightbulb,
  CheckCircle2,
  ExternalLink,
  ArrowRight,
  Calendar,
  Building2,
  GraduationCap,
  FileText,
  Sparkles,
  Briefcase,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

// ===========================================================================
// DATA — sourced from resume (Bernadette-Borromeo-Macatangayv1.pdf)
// ===========================================================================

const PERSONAL = {
  name: 'Bernadette Borromeo-Macatangay',
  title: 'Marketing Operations · Business Analytics Graduate Student',
  tagline:
    'Over a decade of marketing operations and social-listening experience across BPO and shared-services environments — now extending that foundation into advanced analytics, forecasting, and BI through a Master\u2019s program at Map\u00faa University.',
  email: 'gnehb7@gmail.com',
  linkedin: 'https://linkedin.com/in/bernadette-b-63347680',
  location: 'Manila, Philippines',
  master: "Master's in Business Analytics (in progress)",
  masterSchool: 'Map\u00faa University',
  bachelor: "Bachelor's in Electronics and Communications Engineering",
  bachelorSchool: 'University of the East',
}

const TARGET_ROLES = ['Data Analyst', 'Business Intelligence Analyst', 'Analytics Consultant']

const STATS = [
  { value: '10+ yrs', label: 'Marketing operations & social listening', sub: 'Across 5 firms in BPO and shared services' },
  { value: '3M+', label: 'Rows of retail data modeled', sub: 'Corporación Favorita panel' },
  { value: '4.84%', label: 'WAPE on global LightGBM forecast', sub: '50% reduction vs seasonal-naive' },
  { value: '42–57%', label: 'MAE reduction across 3 airlines', sub: 'ETS vs baseline, rolling-origin' },
]

const EXPERIENCE = [
  {
    company: 'MRM',
    role: 'Social Reports and Listening Coordinator',
    period: 'Jun 2023 – Sep 2024',
    points: [
      'Built and refined social-listening queries in Sprinklr to monitor online conversations, identify trends, and gauge sentiment across markets and products.',
      'Maintained platform health by continuously updating keywords, filters, and exclusions to reduce noise and improve the relevance, coverage, and quality of listening results.',
      'Developed recurring performance reports assessing campaign effectiveness, with data-driven recommendations for content strategy and marketing activities.',
      'Validated data quality by cross-referencing Sprinklr outputs with native platform data to ensure report accuracy before delivery.',
      'Led social-listening and measurement projects, sharing best practices across teams to support knowledge sharing and reporting consistency.',
      'Collaborated with cross-functional stakeholders to deliver timely social analytics reports within agreed service-level timelines.',
    ],
    tools: ['Sprinklr'],
    featured: true,
  },
  {
    company: 'Foundever',
    role: 'Social Media Analyst',
    period: 'May 2016 – Jun 2023',
    points: [
      'Implemented SEO strategies by integrating targeted keywords into content topic profiles to enhance search engine visibility.',
      'Gathered and analyzed customer feedback and sentiment data on Sony TV, Digital Imaging, and multimedia products, comparing brand mentions against competitor benchmarks.',
      'Categorized customer feedback to identify key trends, complaints, and product insights across Sony product lines.',
      'Generated data visualizations (tables and diagrams) to illustrate data quantities and relationships for stakeholder presentations.',
      'Delivered daily, weekly, and monthly metrics presentations to clients on overall performance and trends.',
    ],
    tools: ['Social Studio', 'Radian6', 'Mediatoolkit'],
    featured: true,
  },
  {
    company: 'ABS-CBN Corporation',
    role: 'Senior Associate Social Media Analyst',
    period: 'Feb 2014 – May 2015',
    points: [
      'Reviewed and created social media team deliverables, ensuring quality and accuracy of outputs before delivery.',
      'Trained and provided quality coaching for new team members to maintain reporting standards.',
      'Analyzed and surfaced insights across the company\u2019s social media platforms for ABS-CBN lines of business.',
      'Produced reports on trending analysis, competitor comparison, share of voice, demographics, social media influencers, and sentiment analysis for ABS-CBN News and ABS-CBN Mobile.',
    ],
    tools: [],
    featured: false,
  },
  {
    company: 'Concentrix',
    role: 'Cisco Community Moderator and Social Media Specialist',
    period: 'Feb 2006 – Nov 2013',
    points: [
      'Monitored Linksys-Cisco Community Forums, enforcing community standards and supporting customers with technical inquiries to ensure a positive community experience.',
      'Collected and analyzed trends and potential product issues from community interactions to inform product teams.',
      'Engaged customers via Facebook and Twitter to strengthen the company\u2019s social media presence and rolled out new programs and promotions.',
      'Gathered and analyzed product and service reviews and feedback to surface solutions and improve the customer service experience.',
    ],
    tools: [],
    featured: false,
  },
  {
    company: 'Link2Support Inc.',
    role: 'Senior Product Support Specialist',
    period: 'Feb 2003 – Feb 2006',
    points: [
      'Handled customer support escalations for LAN and WLAN networking devices, VoIP, L2/L3 switches, network gateways, VLANs, network drives, and media interface appliances.',
      'Served as research engineer for the Product Known Issue (PKI) Team, testing hardware and software patches and firmware to identify potential issues before release.',
    ],
    tools: [],
    featured: false,
  },
]

const SKILLS = [
  {
    category: 'Marketing Analytics & Social Listening',
    icon: <BarChart3 className="h-5 w-5" />,
    items: [
      { name: 'Sprinklr (query design & platform health)', level: 'Advanced' },
      { name: 'Social Studio, Radian6, Mediatoolkit', level: 'Advanced' },
      { name: 'Sentiment & customer feedback analysis', level: 'Advanced' },
      { name: 'SEO strategy & keyword research', level: 'Proficient' },
      { name: 'Salesforce', level: 'Working' },
    ],
  },
  {
    category: 'Programming & Machine Learning',
    icon: <Brain className="h-5 w-5" />,
    items: [
      { name: 'Python (pandas, NumPy, scikit-learn)', level: 'Proficient' },
      { name: 'LightGBM, XGBoost, CatBoost', level: 'Proficient' },
      { name: 'PyTorch (tabular MLP / ResNet)', level: 'Working' },
      { name: 'SHAP feature attribution', level: 'Proficient' },
      { name: 'Git / version control', level: 'Working' },
    ],
  },
  {
    category: 'Forecasting & Statistical Methods',
    icon: <Database className="h-5 w-5" />,
    items: [
      { name: 'ETS / Exponential Smoothing (statsmodels)', level: 'Proficient' },
      { name: 'Rolling-origin / walk-forward validation', level: 'Proficient' },
      { name: 'Regression & classification modeling', level: 'Proficient' },
      { name: 'Leakage-safe feature engineering', level: 'Proficient' },
      { name: 'A/B test interpretation', level: 'Working' },
    ],
  },
  {
    category: 'BI, Reporting & Communication',
    icon: <Lightbulb className="h-5 w-5" />,
    items: [
      { name: 'Recurring performance report development', level: 'Advanced' },
      { name: 'KPI tracking & dashboard delivery', level: 'Advanced' },
      { name: 'Data visualization for stakeholder presentations', level: 'Advanced' },
      { name: 'Stakeholder coordination & client presentations', level: 'Advanced' },
      { name: 'Team training & quality coaching', level: 'Advanced' },
      { name: 'Tableau / Power BI (in progress)', level: 'Working' },
    ],
  },
]

const PROJECT_1 = {
  id: 'grocery',
  number: '01',
  title: 'Forecasting Grocery Sales Through Promotions, Holidays, and Demand Spikes',
  subtitle:
    'Leakage-safe rolling-origin evidence on forecast error, underforecasting, and SHAP stability',
  course: 'Descriptive & Predictive Analytics',
  role:
    'Co-author (Author 5) — led the global LightGBM forecasting experiment: rolling-origin evaluation, regime-aware error analysis (promotions, holidays, high-sales anomalies), SHAP attribution stability, and asymmetric cost sensitivity',
  period: 'Mapúa University, 2024 – 2026 academic project',
  problem:
    'Grocery retailers like Corporación Favorita must set inventory and replenishment plans weeks ahead, but aggregate forecast accuracy hides the conditions where errors actually bite — promotions, holidays, and demand spikes that cause stockouts when underforecast. The team was asked: how do modern ML forecasts behave under those stress regimes, and which features drive the predictions?',
  approach: [
    'Integrated 5 source files (sales, stores, transactions, oil, holidays) into a 3,000,888-row panel with explicit leakage-safe joins.',
    'Engineered calendar, lagged-sales (7/14/21/28/56/364-day), and rolling-mean features, all shifted to enforce point-in-time integrity.',
    'Benchmarked 25 regression configurations (linear, SVR, KNN, tree ensembles, GBDT, deep MLP/ResNet) on three 15-day chronological validation windows.',
    'Trained three classifiers (Logistic Regression, Random Forest, LightGBM) to flag high-demand records, evaluated with PR-AUC and ROC-AUC.',
    'Built a global LightGBM forecaster (400 trees, 64 leaves) with a 3-fold rolling-origin evaluation on the final 46 days, including an ablation removing promotional features.',
    'Extracted SHAP values on 3,000-row samples to measure feature attribution stability across folds and regimes (Spearman ρ).',
  ],
  results: [
    { metric: '4.84%', label: 'Mean WAPE across 3 rolling-origin folds', highlight: true },
    { metric: '50%', label: 'Relative error reduction vs seasonal-naive baseline' },
    { metric: '13.20%', label: 'Lowest WAPE (HuberRegressor) among 25 regression models' },
    { metric: '0.9090', label: 'ROC-AUC for LightGBM high-demand classifier' },
    { metric: '0.931', label: 'Spearman ρ of SHAP rankings across promo/non-promo regimes' },
    { metric: '22.60%', label: 'WAPE on high-sales anomaly days (vs 11.29% on normal days)' },
  ],
  insights: [
    'Overall accuracy is misleading. The model hits 4.84% WAPE overall, but errors more than double (22.60%) on high-sales anomaly days — exactly when underforecasting matters most for inventory planning.',
    'Underforecasting is structural, not an artifact of log-transformation. After applying a parametric smearing correction, the underforecast share on high-sales days remained 84.4% vs 32.4% on normal days.',
    'Promotional features carry real signal. Ablation showed removing promotion features raised promotion-day WAPE from 12.83% to 13.21% while only marginally improving non-promotion days (14.87% → 14.44%).',
    'SHAP attributions are stable across regimes. Spearman ρ = 0.931 between promotion and non-promotion rankings, and 0.997–0.999 across rolling-origin folds — meaning the model is interpretable, not just accurate.',
  ],
  techStack: [
    'Python', 'pandas', 'NumPy', 'scikit-learn', 'LightGBM', 'XGBoost',
    'CatBoost', 'PyTorch', 'SHAP', 'matplotlib', 'statsmodels',
  ],
  takeaways: [
    'Learned to design leakage-safe feature pipelines by treating every feature as if it had to be computable at deployment time, not just at training time.',
    'Practiced communicating model risk to non-technical stakeholders — framing underforecasting as an operational inventory risk, not a percentage on a dashboard.',
    'Discovered that "model explainability" is only useful if the explanations are stable across the conditions stakeholders actually care about.',
  ],
}

const PROJECT_2 = {
  id: 'flight',
  number: '02',
  title: 'Forecasting Monthly Flight-Delay Rates for Proactive Resource Allocation',
  subtitle:
    'ETS exponential smoothing vs seasonal-naive baseline, rolling-origin validation across 3 U.S. carriers',
  course: 'Enterprise Data Analytics (MBAN625)',
  role:
    'Lead author — data acquisition (Kaggle + BTS TranStats integration), EDA, ETS modeling methodology, COVID sensitivity analysis, and report writing',
  period: 'Mapúa University, 2026 academic project',
  problem:
    'A VP of Network Operations at a U.S. airline must decide every month how much schedule buffer and staffing to set aside for delays. Today that decision is reactive — staffing gets adjusted after a rough month, not before. The team was asked: can an airline\u2019s own historical delay pattern be forecast accurately enough, one month ahead, to actually inform staffing decisions?',
  approach: [
    'Combined Kaggle-hosted U.S. DOT On-Time Performance data (Jan 2018 – Jul 2022) with a direct programmatic pull from BTS TranStats (Aug 2022 – Jun 2026), yielding 306 airline-months across 3 carriers.',
    'Documented the Marketing-vs-Reporting carrier definitional shift between sources as a methodological note rather than hiding it.',
    'Audited missingness (ArrDel15 only missing for cancelled flights → coded as not-delayed), duplicates, and the unexpected Spirit Air Lines 101-of-102-month gap, which web search confirmed was Spirit\u2019s actual May 2, 2026 cessation of operations.',
    'Fit an ETS (Error-Trend-Seasonal) exponential smoothing model with additive error, additive damped trend, and additive 12-month seasonality using statsmodels 0.14.6.',
    'Evaluated against a seasonal-naive baseline (this month = same month last year) using 12-month rolling-origin walk-forward validation, training only on data strictly before each forecast point.',
    'Ran a sensitivity check comparing full-history (2018+, COVID included) vs post-COVID-only (2021+) training windows to test whether trimming the structural break helps.',
  ],
  results: [
    { metric: '42%', label: 'MAE reduction — Southwest Airlines (0.0406 → 0.0235)', highlight: true },
    { metric: '52%', label: 'MAE reduction — JetBlue Airways (0.0583 → 0.0278)', highlight: true },
    { metric: '57%', label: 'MAE reduction — Spirit Air Lines (0.0843 → 0.0360)', highlight: true },
    { metric: '102 mo', label: 'Continuous coverage per airline (Jan 2018 – Jun 2026)' },
    { metric: '12 mo', label: 'Rolling-origin walk-forward validation window' },
    { metric: '20–30%', label: 'Additional MAE improvement from full-history training' },
  ],
  insights: [
    'Counterintuitive finding: training on full history (including COVID) beat post-COVID-only training by 20–30% across airlines. ETS estimates level/trend/seasonal parameters more reliably with more data, even when that data contains a structural break.',
    'Forecastability is not uniform across carriers. Spirit Air Lines had both the weakest baseline and the biggest gain from ETS, suggesting its delay pattern carried the most learnable seasonal structure — even though Spirit\u2019s May 2026 shutdown makes this a methodological finding, not an operational one.',
    'The 1–3 month horizon is genuinely actionable; the 4–6 month range is directional only. The damped trend keeps the 95% prediction interval from compounding outward, so seasonal turning points come through with reasonable confidence early on.',
    'A univariate model can\u2019t see cross-airline contagion (a hub disruption hitting several carriers at once) or external drivers like weather and ATC staffing. The forecast supports a planner\u2019s judgment; it does not replace it.',
  ],
  techStack: [
    'Python', 'pandas', 'NumPy', 'statsmodels (ETSModel)', 'matplotlib',
    'BTS TranStats
     API', 'kagglehub', 'Jupyter',
  ],
  takeaways: [
    'Practiced framing an analytics question in enterprise terms — staffing, schedule buffers, decision horizons — instead of just "predict the number."',
    'Learned to disclose a real-world shock (Spirit\u2019s shutdown) honestly in the analysis rather than quietly dropping the carrier.',
    'Gained intuition for when simpler models (ETS) beat more complex ones (LSTM) on small structured time series.',
  ],
}

const PROJECT_3 = {
  id: 'social',
  number: '03',
  title: 'Social Media Campaign Performance Analysis',
  subtitle:
    'Multi-platform reach, engagement, and audience segmentation analysis with back-calculated KPIs and per-post creative diagnostics',
  course: 'Independent analyst assignment \u2014 social media analytics',
  role:
    'Sole analyst \u2014 interpreted incomplete campaign data, back-calculated missing KPIs using industry-standard frequency formulas, segmented audience by age cohort and professional attributes, and delivered the recommendations deck',
  period: 'Independent assignment (job-application sample)',
  problem:
    'A marketing team needed an end-to-end read on a multi-platform social campaign that had run across Facebook, Instagram, and X (Twitter) with incomplete data: Twitter exposes impressions but not reach, Instagram reports reach but not always impressions, and per-post creative performance was scattered across four sample posts. The assignment was to back-calculate the missing numbers using industry-standard frequency formulas, compare platforms on a like-for-like basis, segment the audience by age cohort and professional attributes, and translate everything into platform-specific creative and targeting recommendations.',
  approach: [
    'Compiled raw platform exports into a comparison matrix covering reach, impressions, engagements, post count, and observed frequency for Facebook, Instagram, and X.',
    'Back-calculated missing values: estimated Instagram impressions using an assumed frequency of 1.25 (2\u20133 exposures/user/week across Feed/Stories/Reels), and estimated X reach using an assumed frequency of 1.15 (fast content velocity, since Twitter analytics expose impressions but not reach).',
    'Derived per-post KPIs (impressions/post, engagements/post, reach/post) by dividing totals by post count \u2014 normalizing for the fact that each platform published a different number of posts.',
    'Diagnosed four sample posts (Posts 1, 2, 3, 5) by impressions, engagements, and time of posting to identify which creative formats and posting windows drove performance.',
    'Segmented traffic audience by age cohort (18\u201334 vs 35\u201345) and by professional attribute (Skills, Industry, Job Titles) using CTR, ER, and frequency to compare engagement quality, not just volume.',
    'Translated every finding into a platform-specific recommendation: keep Facebook as the volume/remarketing-pool channel, protect Instagram\u2019s best-performing carousel/video formats, prioritize timely X content, add outcome-focused CTAs for the 35\u201345 cohort, and retarget Job-Titles engagers with follow-up action ads.',
  ],
  results: [
    { metric: '34.7K', label: 'Facebook impressions per post \u2014 primary reach driver', highlight: true },
    { metric: '2.31%', label: 'Instagram engagement rate \u2014 highest per-platform efficiency' },
    { metric: '29.78%', label: 'ER for 35\u201345 age cohort vs 7.71% for 18\u201334', highlight: true },
    { metric: '4.24%', label: 'ER for Job-Titles targeting \u2014 highest attribute-level engagement' },
    { metric: '3 platforms', label: 'Facebook, Instagram, X analyzed on a like-for-like basis' },
    { metric: '0.91\u20132.31%', label: 'ER range across platforms \u2014 2.5\u00d7 spread explained by content fit' },
  ],
  insights: [
    'Facebook serves as the primary reach driver with the highest impressions per post (~34.7K) and minimal repeat exposure (frequency ~1.01). Its modest ER (~0.91%) is the trade-off for volume \u2014 it should remain the top-of-funnel channel and feed remarketing pools.',
    'Instagram demonstrates the strongest engagement efficiency (~2.31% ER, ~103 engagements per post) despite lower reach \u2014 indicating strong content resonance. Best-performing carousel/video formats should stay in rotation with ~103 engagements/post as the creative-optimization baseline KPI.',
    'X operates as a low-scale, high-intent channel: ~914 impressions per post but ER (~2.30%) comparable to Instagram. It is most effective for targeted, timely content tied to real-time audience intent.',
    'Audience segmentation revealed a quality-vs-quantity split: the 35\u201345 cohort engaged deeply (ER 29.78%, frequency 4.30) while 18\u201334 clicked more often (CTR 0.75%) but engaged far less (ER 7.71%, frequency 5.02) \u2014 a classic sign of creative fatigue or weak post-click value among younger users. Job-Titles targeting produced the highest attribute-level ER (4.24%), making it the strongest candidate for retargeting-pool building.',
  ],
  techStack: [
    'Meta Business Suite', 'Instagram analytics', 'X (Twitter) analytics',
    'Excel / spreadsheets', 'Frequency-formula KPI derivation', 'Audience segmentation',
  ],
  takeaways: [
    'Practiced working with incomplete data the way it actually arrives in industry \u2014 using documented industry benchmarks (Meta frequency guidance, Hootsuite reach-vs-impressions framing) to back-calculate missing values rather than waiting for a perfect dataset.',
    'Reinforced the discipline of normalizing metrics before comparing platforms (per-post KPIs) so that a platform with 54 posts isn\u2019t unfairly penalized against one with 34.',
    'Connected creative diagnostics to media-buying decisions \u2014 each platform recommendation mapped to a specific creative or targeting action a campaign manager could execute the next day.',
  ],
}

// ===========================================================================
// COMPONENTS
// ===========================================================================

function StickyNav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`no-print sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-sm border-b border-brand-rule shadow-sm'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a href="#top" className="flex items-center gap-2">
          <span className="bg-brand-navy flex h-8 w-8 items-center justify-center rounded-sm text-white text-sm font-bold">
            BM
          </span>
          <span className="brand-navy heading-serif text-base font-semibold md:text-lg">
            Bernadette B. Macatangay
          </span>
        </a>
        <nav className="hidden items-center gap-6 lg:flex">
          <a href="#about" className="text-sm font-medium text-slate-600 hover:text-[var(--brand-navy)] transition-colors">
            About
          </a>
          <a href="#experience" className="text-sm font-medium text-slate-600 hover:text-[var(--brand-navy)] transition-colors">
            Experience
          </a>
          <a href="#skills" className="text-sm font-medium text-slate-600 hover:text-[var(--brand-navy)] transition-colors">
            Skills
          </a>
          <a href="#grocery" className="text-sm font-medium text-slate-600 hover:text-[var(--brand-navy)] transition-colors">
            Project 01
          </a>
          <a href="#flight" className="text-sm font-medium text-slate-600 hover:text-[var(--brand-navy)] transition-colors">
            Project 02
          </a>
          <a href="#social" className="text-sm font-medium text-slate-600 hover:text-[var(--brand-navy)] transition-colors">
            Project 03
          </a>
          <a href="#contact" className="text-sm font-medium text-slate-600 hover:text-[var(--brand-navy)] transition-colors">
            Contact
          </a>
        </nav>
        <a href="#contact" className="bg-brand-navy hover:bg-[var(--brand-teal)] inline-flex h-9 items-center rounded-sm px-4 text-xs font-semibold uppercase tracking-wider text-white transition-colors">
          Get in touch
        </a>
      </div>
    </header>
  )
}

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-white">
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, #0a2540 1px, transparent 0)',
          backgroundSize: '32px 32px',
        }}
      />
      <div className="relative mx-auto max-w-6xl px-6 py-20 md:py-28">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr] md:items-end">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <span className="label-mono brand-teal">Portfolio · 2026</span>
              <span className="h-px w-12 bg-[var(--brand-rule)]" />
              <span className="label-mono text-slate-500">Marketing Ops + Business Analytics</span>
            </div>
            <h1 className="heading-serif text-4xl font-bold leading-[1.05] md:text-6xl">
              Bernadette<br/>Borromeo-Macatangay
            </h1>
            <p className="heading-serif mt-4 text-xl font-medium text-slate-700 md:text-2xl">
              {PERSONAL.title}
            </p>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-600 md:text-lg">
              {PERSONAL.tagline}
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              {TARGET_ROLES.map((role) => (
                <span
                  key={role}
                  className="inline-flex items-center gap-1.5 rounded-sm border border-[var(--brand-rule)] bg-white px-3 py-1.5 text-xs font-medium text-slate-700"
                >
                  <Target className="h-3 w-3 brand-teal" />
                  {role}
                </span>
              ))}
            </div>
            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href="#grocery"
                className="bg-brand-navy hover:bg-[var(--brand-teal)] inline-flex items-center gap-2 rounded-sm px-5 py-3 text-sm font-semibold text-white transition-colors"
              >
                View featured work <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-sm border border-[var(--brand-navy)] px-5 py-3 text-sm font-semibold text-[var(--brand-navy)] transition-colors hover:bg-slate-50"
              >
                <Mail className="h-4 w-4" /> Contact me
              </a>
              <a
                href="/Bernadette_Macatangay_Resume.pdf"
                download
                className="inline-flex items-center gap-2 rounded-sm border border-[var(--brand-teal)] bg-[var(--brand-teal)]/8 px-5 py-3 text-sm font-semibold text-[var(--brand-teal)] transition-colors hover:bg-[var(--brand-teal)]/15"
              >
                <Download className="h-4 w-4" /> Resume (PDF)
              </a>
            </div>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-sm border border-[var(--brand-rule)] bg-[var(--brand-rule)]">
            {STATS.map((s) => (
              <div key={s.label} className="bg-white p-5">
                <div className="heading-serif text-2xl font-bold brand-navy md:text-3xl">{s.value}</div>
                <div className="mt-1 text-xs font-medium text-slate-700">{s.label}</div>
                <div className="mt-0.5 text-[11px] text-slate-500">{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function AboutSection() {
  return (
    <section id="about" className="border-t border-[var(--brand-rule)] bg-white py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-12 md:grid-cols-[1fr_2fr]">
          <div>
            <div className="label-mono brand-teal">Section 01</div>
            <h2 className="heading-serif mt-2 text-3xl font-bold md:text-4xl">About me</h2>
            <div className="mt-6 space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <GraduationCap className="mt-0.5 h-4 w-4 brand-teal shrink-0" />
                <div>
                  <div className="font-semibold text-slate-800">{PERSONAL.master}</div>
                  <div className="text-slate-600">{PERSONAL.masterSchool}</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <GraduationCap className="mt-0.5 h-4 w-4 brand-teal shrink-0" />
                <div>
                  <div className="font-semibold text-slate-800">{PERSONAL.bachelor}</div>
                  <div className="text-slate-600">{PERSONAL.bachelorSchool}</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Building2 className="mt-0.5 h-4 w-4 brand-teal shrink-0" />
                <div>
                  <div className="font-semibold text-slate-800">Targeting</div>
                  <div className="text-slate-600">{TARGET_ROLES.join(' · ')}</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Calendar className="mt-0.5 h-4 w-4 brand-teal shrink-0" />
                <div>
                  <div className="font-semibold text-slate-800">Based in</div>
                  <div className="text-slate-600">{PERSONAL.location}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-5 text-base leading-relaxed text-slate-700">
            <p>
              I am a marketing operations professional with over a decade of experience in
              social listening, digital analytics, and customer engagement across BPO and
              shared-services environments. My hands-on work has centered on building and
              refining listening queries in enterprise platforms (Sprinklr, Social Studio,
              Radian6, Mediatoolkit), creating dashboards, validating data quality, and
              presenting insights to regional and global clients.
            </p>
            <p>
              I am currently pursuing a <span className="font-semibold text-slate-900">Master&rsquo;s
              in Business Analytics at Mapúa University</span> to extend that foundation into
              advanced analytics, forecasting, and machine learning. The two projects in this
              portfolio come directly from that coursework. The first forecasts grocery demand
              across 3 million rows of Corporación Favorita sales data and explicitly evaluates
              model behavior during promotions, holidays, and demand spikes — the conditions
              where a stockout actually hurts. The second forecasts monthly flight-delay rates
              for a U.S. carrier&rsquo;s network operations team and includes a sensitivity
              check on the COVID structural break that produced a counterintuitive but
              defensible recommendation.
            </p>
            <p>
              I bring to analytics roles what a fresh graduate cannot: a decade of practice
              translating complex data into clear, actionable business recommendations for
              real stakeholders, plus the technical depth to now do it with modern ML and
              forecasting 
              methods. I am targeting <span className="font-semibold text-slate-900">Data
              Analyst</span>, <span className="font-semibold text-slate-900">Business Intelligence
              Analyst</span>, and <span className="font-semibold text-slate-900">Analytics
              Consultant</span> roles where I can combine both halves of that background.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

function ExperienceSection() {
  return (
    <section id="experience" className="bg-brand-cream border-t border-[var(--brand-rule)] py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12">
          <div className="label-mono brand-teal">Section 02</div>
          <h2 className="heading-serif mt-2 text-3xl font-bold md:text-4xl">Professional experience</h2>
          <p className="mt-3 max-w-2xl text-slate-600">
            Ten-plus years across marketing operations, social listening, and customer analytics
            in BPO and shared-services environments — roles held at MRM, Foundever, ABS-CBN,
            Concentrix, and Link2Support.
          </p>
        </div>

        <div className="space-y-6">
          {EXPERIENCE.map((job, idx) => (
            <Card
              key={job.company}
              className={`border-[var(--brand-rule)] shadow-none ${
                job.featured ? 'border-l-4 border-l-[var(--brand-teal)]' : ''
              }`}
            >
              <CardHeader className="border-b border-[var(--brand-rule)] pb-4">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <div>
                    <CardTitle className="heading-serif text-xl">{job.company}</CardTitle>
                    <p className="mt-1 text-sm font-medium text-slate-700">{job.role}</p>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <Calendar className="h-3 w-3" />
                    <span className="label-mono">{job.period}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <ul className={`space-y-2 ${job.featured ? '' : 'md:columns-2 md:gap-6'}`}>
                  {job.points.map((point, i) => (
                    <li
                      key={i}
                      className={`flex gap-2 text-sm leading-relaxed text-slate-700 ${
                        job.featured ? '' : 'md:break-inside-avoid'
                      }`}
                    >
                      <span className="brand-teal mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-current" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
                {job.tools.length > 0 && (
                  <div className="mt-4 flex flex-wrap items-center gap-2">
                    <span className="label-mono text-slate-500">Tools:</span>
                    {job.tools.map((t) => (
                      <span
                        key={t}
                        className="inline-flex items-center rounded-sm border border-[var(--brand-rule)] bg-white px-2 py-0.5 text-xs font-medium text-slate-700"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

function SkillsSection() {
  return (
    <section id="skills" className="border-t border-[var(--brand-rule)] bg-white py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 flex items-end justify-between">
          <div>
            <div className="label-mono brand-teal">Section 03</div>
            <h2 className="heading-serif mt-2 text-3xl font-bold md:text-4xl">Skills &amp; tools</h2>
            <p className="mt-3 max-w-2xl text-slate-600">
              Combines professional marketing-analytics platforms (Sprinklr, Social Studio, Radian6,
              Mediatoolkit) with the Python / ML / forecasting stack from my Mapúa coursework.
              &ldquo;Advanced&rdquo; = used regularly in a production role · &ldquo;Proficient&rdquo;
              = shipped in a graded project · &ldquo;Working&rdquo; = actively learning.
            </p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {SKILLS.map((group) => (
            <Card key={group.category} className="border-[var(--brand-rule)] shadow-none">
              <CardHeader className="border-b border-[var(--brand-rule)] pb-4">
                <CardTitle className="flex items-center gap-3 text-lg">
                  <span className="bg-brand-navy flex h-9 w-9 items-center justify-center rounded-sm text-white">
                    {group.icon}
                  </span>
                  <span className="heading-serif">{group.category}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <ul className="space-y-3">
                  {group.items.map((item) => (
                    <li
                      key={item.name}
                      className="flex items-center justify-between gap-4 border-b border-dashed border-[var(--brand-rule)] pb-3 last:border-0 last:pb-0"
                    >
                      <span className="text-sm text-slate-800">{item.name}</span>
                      <span
                        className={`label-mono px-2 py-1 rounded-sm ${
                          item.level === 'Advanced'
                            ? 'bg-[var(--brand-teal)]/10 brand-teal'
                            : item.level === 'Proficient'
                            ? 'bg-[var(--brand-navy)]/8 brand-navy'
                            : 'bg-slate-200 text-slate-600'
                        }`}
                      >
                        {item.level}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

function ProjectSection({ project }: { project: typeof PROJECT_1 }) {
  const isGrocery = project.id === 'grocery'
  const isFlight = project.id === 'flight'
  const isSocial = project.id === 'social'
  return (
    <section
      id={project.id}
      className={`border-t border-[var(--brand-rule)] py-20 ${
        isGrocery ? 'bg-brand-cream' : isSocial ? 'bg-brand-cream' : 'bg-white'
      }`}
    >
      <div className="mx-auto max-w-6xl px-6">
        {/* Header */}
        <div className="mb-10 grid gap-6 md:grid-cols-[80px_1fr]">
          <div className="heading-serif text-6xl font-bold text-slate-300">{project.number}</div>
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="label-mono brand-teal">Project {project.number}</span>
              <span className="text-slate-400">·</span>
              <span className="label-mono text-slate-500">{project.course}</span>
            </div>
            <h2 className="heading-serif mt-3 text-2xl font-bold leading-tight md:text-4xl">
              {project.title}
            </h2>
            <p className="mt-3 text-base italic text-slate-600">{project.subtitle}</p>
            <div className="mt-4 space-y-1 text-sm text-slate-600">
              <div><span className="font-semibold text-slate-800">Role:</span> {project.role}</div>
              <div><span className="font-semibold text-slate-800">Period:</span> {project.period}</div>
            </div>
          </div>
        </div>

        {/* Problem */}
        <div className="mb-12 grid gap-8 md:grid-cols-[1fr_2fr] md:gap-12">
          <div className="border-l-2 border-[var(--brand-teal)] pl-5">
            <div className="label-mono brand-teal mb-2">The problem</div>
            <h3 className="heading-serif text-xl font-semibold text-slate-800">
              What decision was this analysis built to support?
            </h3>
          </div>
          <p className="text-base leading-relaxed text-slate-700">{project.problem}</p>
        </div>

        {/* Metrics row */}
        <div className="mb-12 grid grid-cols-2 gap-px overflow-hidden rounded-sm border border-[var(--brand-rule)] bg-[var(--brand-rule)] md:grid-cols-3 lg:grid-cols-6">
          {project.results.map((r) => (
            <div
              key={r.label}
              className={`p-5 ${r.highlight ? 'bg-brand-navy text-white' : 'bg-white'}`}
            >
              <div
                className={`heading-serif text-2xl font-bold ${
                  r.highlight ? 'text-white' : 'brand-navy'
                }`}
              >
                {r.metric}
              </div>
              <div
                className={`mt-1 text-xs leading-snug ${
                  r.highlight ? 'text-slate-200' : 'text-slate-600'
                }`}
              >
                {r.label}
              </div>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="mb-12 space-y-6">
          {isGrocery ? (
            <>
              <figure className="overflow-hidden rounded-sm border border-[var(--brand-rule)] bg-white">
                <Image
                  src="/images/grocery_forecast_vs_actual.png"
                  alt="LightGBM forecast vs actual daily sales, 46-day evaluation window"
                  width={1800}
                  height={810}
                  className="h-auto w-full"
                  priority
                />
                <figcaption className="border-t border-[var(--brand-rule)] bg-slate-50 px-5 py-3 text-xs text-slate-600">
                  Figure 1 · Global LightGBM forecast vs actual aggregated daily sales,
                  July 1 – August 15, 2017. Overall WAPE = 4.0% (50% relative reduction
                  vs the seasonal-naive baseline). Shaded region marks a high-sales anomaly
                  day where the model underforecasts.
                </figcaption>
              </figure>
              <div className="grid gap-6 md:grid-cols-2">
                <figure className="overflow-hidden rounded-sm border border-[var(--brand-rule)] bg-white">
                  <Image
                    src="/images/grocery_wape_by_regime.png"
                    alt="WAPE by demand regime"
                    width={1800}
                    height={900}
                    className="h-auto w-full"
                  />
                  <figcaption className="border-t border-[var(--brand-rule)] bg-slate-50 px-4 py-2 text-[11px] text-slate-600">
                    Figure 2 · WAPE by demand regime. High-sales days more than double the
                    error rate of normal days — the operational risk concentrates exactly
                    where underforecasting hurts most.
                  </figcaption>
                </figure>
                <figure className="overflow-hidden rounded-sm border border-[var(--brand-rule)] bg-white">
                  <Image
                    src="/images/grocery_top_families.png"
                    alt="Top 10 product families by mean daily sales"
                    width={1800}
                    height={960}
                    className="h-auto w-full"
                  />
                  <figcaption className="border-t border-[var(--brand-rule)] bg-slate-50 px-4 py-2 text-[11px] text-slate-600">
                    Figure 3 · Top 10 product families by mean daily sales. GROCERY I alone
                    accounts for 343M units over 4.5 years — the demand distribution is
                    heavily right-skewed.
                  </figcaption>
                </figure>
              </div>
            </>
          ) : isFlight ? (
            <>
              <figure className="overflow-hidden rounded-sm border border-[var(--brand-rule)] bg-white">
                <Image
                  src="/images/flight_delay_trend.png"
                  alt="Monthly delay rate by airline, January 2018 – June 2026"
                  width={1800}
                  height={810}
                  className="h-auto w-full"
                  priority
                />
                <figcaption className="border-t border-[var(--brand-rule)] bg-slate-50 px-5 py-3 text-xs text-slate-600">
                  Figure 4 · Monthly delay rate by airline, January 2018 – June 2026.
                  Shaded region marks the COVID-19 onset (Mar – Jun 2020). Spirit Air Lines
                  data ends May 2026 following the carrier&rsquo;s cessation of operations.
                </figcaption>
              </figure>
              <div className="grid gap-6 md:grid-cols-2">
                <figure className="overflow-hidden rounded-sm border border-[var(--brand-rule)] bg-white">
                  <Image
                    src="/images/flight_ets_vs_baseline.png"
                    alt="ETS vs seasonal-naive baseline MAE by airline"
                    width={1800}
                    height={960}
                    className="h-auto w-full"
                  />
                  <figcaption className="border-t border-[var(--brand-rule)] bg-slate-50 px-4 py-2 text-[11px] text-slate-600">
                    Figure 5 · ETS vs seasonal-naive baseline on 12-month rolling-origin
                    validation. MAE reduced 42 – 57% across all three carriers.
                  </figcaption>
                </figure>
                <figure className="overflow-hidden rounded-sm border border-[var(--brand-rule)] bg-white">
                  <Image
                    src="/images/flight_training_sensitivity.png"
                    alt="Training window sensitivity — full history vs post-COVID only"
                    width={1800}
                    height={900}
                    className="h-auto w-full"
                  />
                  <figcaption className="border-t border-[var(--brand-rule)] bg-slate-50 px-4 py-2 text-[11px] text-slate-600">
                    Figure 6 · Sensitivity check. Full-history training (including COVID)
                    outperformed post-COVID-only training by 5 – 30% — more data beat a
                    cleaner window.
                  </figcaption>
                </figure>
              </div>
            </>
          ) : isSocial ? (
            <>
              <figure className="overflow-hidden rounded-sm border border-[var(--brand-rule)] bg-white">
                <Image
                  src="/images/social_platform_comparison.png"
                  alt="Platform comparison — impressions per post vs engagement rate across Facebook, Instagram, X"
                  width={1800}
                  height={900}
                  className="h-auto w-full"
                  priority
                />
                <figcaption className="border-t border-[var(--brand-rule)] bg-slate-50 px-5 py-3 text-xs text-slate-600">
                  Figure 7 · Platform comparison — impressions per post (navy, log scale)
                  vs engagement rate (teal). Facebook dominates reach volume; Instagram and X
                  deliver higher per-impression engagement despite lower scale.
                </figcaption>
              </figure>
              <div className="grid gap-6 md:grid-cols-2">
                <figure className="overflow-hidden rounded-sm border border-[var(--brand-rule)] bg-white">
                  <Image
                    src="/images/social_age_cohort.png"
                    alt="Audience age cohort analysis — CTR, frequency, and engagement rate for 35-45 vs 18-34"
                    width={1800}
                    height={900}
                    className="h-auto w-full"
                  />
                  <figcaption className="border-t border-[var(--brand-rule)] bg-slate-50 px-4 py-2 text
                  -[11px] text-slate-600">
                    Figure 8 · Audience age cohort analysis. The 35–45 cohort engaged deeply
                    (ER 29.78%, frequency 4.30); 18–34 clicked more often (CTR 0.75%) but
                    engaged far less (ER 7.71%).
                  </figcaption>
                </figure>
                <figure className="overflow-hidden rounded-sm border border-[var(--brand-rule)] bg-white">
                  <Image
                    src="/images/social_attribute_performance.png"
                    alt="Audience attribute performance — Skills, Industry, Job Titles by impressions and engagement rate"
                    width={1800}
                    height={900}
                    className="h-auto w-full"
                  />
                  <figcaption className="border-t border-[var(--brand-rule)] bg-slate-50 px-4 py-2 text-[11px] text-slate-600">
                    Figure 9 · Audience attribute targeting. Job Titles produced the highest
                    engagement rate (4.24%); Skills drove the largest impression volume
                    (31,602) — a volume-vs-depth trade-off.
                  </figcaption>
                </figure>
              </div>
            </>
          ) : null}
        </div>

        {/* Approach + Insights */}
        <div className="mb-12 grid gap-10 md:grid-cols-2">
          <div>
            <div className="label-mono brand-teal mb-4">Approach &amp; method</div>
            <ol className="space-y-3">
              {project.approach.map((step, i) => (
                <li key={i} className="flex gap-3">
                  <span className="heading-serif mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-sm bg-slate-100 text-xs font-bold text-slate-600">
                    {i + 1}
                  </span>
                  <span className="text-sm leading-relaxed text-slate-700">{step}</span>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <div className="label-mono brand-teal mb-4">Key insights &amp; impact</div>
            <ul className="space-y-4">
              {project.insights.map((insight, i) => (
                <li key={i} className="flex gap-3">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 brand-teal" />
                  <span className="text-sm leading-relaxed text-slate-700">{insight}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Tech stack + takeaways */}
        <div className="grid gap-8 md:grid-cols-[1fr_1fr]">
          <div className="rounded-sm border border-[var(--brand-rule)] bg-slate-50 p-6">
            <div className="label-mono brand-teal mb-3">Tech stack</div>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center rounded-sm border border-[var(--brand-rule)] bg-white px-2.5 py-1 text-xs font-medium text-slate-700"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
          <div className="rounded-sm border border-[var(--brand-rule)] bg-slate-50 p-6">
            <div className="label-mono brand-teal mb-3">What I took away</div>
            <ul className="space-y-2 text-sm text-slate-700">
              {project.takeaways.map((t, i) => (
                <li key={i} className="flex gap-2">
                  <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0 brand-gold" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

function ContactSection() {
  return (
    <section
      id="contact"
      className="bg-brand-navy relative overflow-hidden py-24 text-white"
    >
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)',
          backgroundSize: '32px 32px',
        }}
      />
      <div className="relative mx-auto max-w-5xl px-6 text-center">
        <div className="label-mono text-[var(--brand-teal)]">Section 06</div>
        <h2 className="heading-serif mt-3 text-4xl font-bold md:text-5xl">
          Let&rsquo;s talk
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-300 md:text-lg">
          I am actively interviewing for Data Analyst, Business Intelligence Analyst, and
          Analytics Consultant roles. If your team needs someone who can run a regression
          pipeline <em>and</em> write the executive summary on top of it — backed by a decade
          of marketing-operations experience — I would love to hear from you.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-[1.6fr_1fr] md:items-stretch">
          {/* Left: contact cards grid */}
          <div className="grid gap-3 sm:grid-cols-2">
            <a
              href={`mailto:${PERSONAL.email}`}
              className="group flex items-center gap-4 rounded-sm border border-white/15 bg-white/5 px-5 py-4 text-left transition-colors hover:bg-white/10"
            >
              <Mail className="h-5 w-5 text-[var(--brand-teal)]" />
              <div className="min-w-0">
                <div className="label-mono text-slate-400">Email</div>
                <div className="truncate text-sm font-medium text-white">{PERSONAL.email}</div>
              </div>
              <ExternalLink className="ml-auto h-4 w-4 shrink-0 text-slate-500 transition-colors group-hover:text-white" />
            </a>
            <a
              href={PERSONAL.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 rounded-sm border border-white/15 bg-white/5 px-5 py-4 text-left transition-colors hover:bg-white/10"
            >
              <Linkedin className="h-5 w-5 text-[var(--brand-teal)]" />
              <div className="min-w-0">
                <div className="label-mono text-slate-400">LinkedIn</div>
                <div className="truncate text-sm font-medium text-white">bernadette-b-63347680</div>
              </div>
              <ExternalLink className="ml-auto h-4 w-4 shrink-0 text-slate-500 transition-colors group-hover:text-white" />
            </a>
            <a
              href="/Bernadette_Macatangay_Resume.pdf"
              download
              className="group flex items-center gap-4 rounded-sm border border-[var(--brand-teal)]/40 bg-[var(--brand-teal)]/15 px-5 py-4 text-left transition-colors hover:bg-[var(--brand-teal)]/25"
            >
              <Download className="h-5 w-5 text-[var(--brand-teal)]" />
              <div>
                <div className="label-mono text-slate-300">Resume (PDF)</div>
                <div className="text-sm font-semibold text-white">Download now</div>
              </div>
              <ArrowRight className="ml-auto h-4 w-4 shrink-0 text-[var(--brand-teal)] transition-transform group-hover:translate-x-1" />
            </a>
            <div className="flex items-center gap-4 rounded-sm border border-white/15 bg-white/5 px-5 py-4 text-left">
              <Calendar className="h-5 w-5 text-[var(--brand-teal)]" />
              <div>
                <div className="label-mono text-slate-400">Based in</div>
                <div className="text-sm font-medium text-white">{PERSONAL.location}</div>
              </div>
            </div>
          </div>

          {/* Right: QR code card */}
          <div className="flex flex-col items-center justify-center rounded-sm border border-white/15 bg-white/5 p-5 text-center">
            <div className="label-mono text-slate-400 mb-3">Scan to view</div>
            <div className="rounded-sm bg-white p-2.5">
              <img
                src="/qr-portfolio.png"
                alt="QR code linking to this portfolio website"
                className="h-32 w-32"
                width={128}
                height={128}
              />
            </div>
            <p className="mt-3 text-xs leading-relaxed text-slate-400">
              Scan with your phone camera to open this portfolio on mobile.<br/>
              <span className="text-[var(--brand-teal)] font-mono">bit.ly/BernadetteMacatangayPortfolio</span>
            </p>
          </div>
        </div>

        <p className="mt-10 text-xs text-slate-400">
          Open to remote work, relocation, and hybrid arrangements in Metro Manila
        </p>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="bg-brand-navy border-t border-white/10 py-8 text-white">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 text-xs text-slate-400 md:flex-row">
        <div>
          © {new Date().getFullYear()} Bernadette Borromeo-Macatangay. Portfolio built with Next.js &amp; Tailwind CSS.
        </div>
        <div className="flex items-center gap-4">
          <a href="#top" className="hover:text-white transition-colors">Back to top ↑</a>
        </div>
      </div>
    </footer>
  )
}

// ===========================================================================
// PAGE
// ===========================================================================

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <StickyNav />
      <main className="flex-1">
        <Hero />
        <AboutSection />
        <ExperienceSection />
        <SkillsSection />
        <ProjectSection project={PROJECT_1} />
        <ProjectSection project={PROJECT_2} />
        <ProjectSection project={PROJECT_3} />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}

              
