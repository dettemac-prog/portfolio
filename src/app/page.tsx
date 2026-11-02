'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import {
  Mail,
  Linkedin,
  Github,
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
