'use client';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useTranslation } from '@/context/I18nContext';

const ABOUT_VALUES = [
  { titleKey: 'about.val1Title' as const, descKey: 'about.val1Desc' as const },
  { titleKey: 'about.val2Title' as const, descKey: 'about.val2Desc' as const },
  { titleKey: 'about.val3Title' as const, descKey: 'about.val3Desc' as const },
  { titleKey: 'about.val4Title' as const, descKey: 'about.val4Desc' as const },
];

const PAGE_LINKS = [
  { href: '/about', labelKey: 'common.about' as const, active: true },
  { href: '#', labelKey: 'about.termsOfService' as const, active: false },
  { href: '#', labelKey: 'about.privacyPolicy' as const, active: false },
  { href: '#', labelKey: 'about.returnPolicy' as const, active: false },
];

function Index() {
  const { t } = useTranslation();

  return (
    <div className="fluid_container py-8 sm:py-4">
      <div className="flex flex-row lg:flex-col gap-8 sm:gap-4">
        {/* Main Content */}
        <div className="flex-1 min-w-0 w-full">
          <div className="p-8 sm:p-4 bg-white rounded-3xl sm:rounded-2xl border border-slate-150 shadow-soft">
            <h1 className="text-2xl sm:text-xl text-slate-800 font-bold tracking-tight pb-4 sm:pb-3 border-b border-slate-100">
              {t('about.title')}
            </h1>
            <p className="py-4 text-slate-600 leading-relaxed text-base sm:text-sm">
              {t('about.introDesc1')} {t('about.introDesc2')}
            </p>
            <h3 className="text-lg font-bold text-slate-800 pt-2 pb-3">
              {t('about.valuesTitle')}:
            </h3>
            <ul className="space-y-2.5 text-slate-600 text-sm">
              {ABOUT_VALUES.map((val, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <i className="fas fa-check-circle text-sky-600"></i>
                  <span>
                    <strong>{t(val.titleKey)}</strong>
                    {t(val.descKey)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-[340px] lg:w-full shrink-0">
          <div className="p-6 sm:p-4 bg-white rounded-3xl sm:rounded-2xl border border-slate-150 shadow-soft">
            <h2 className="text-lg text-slate-800 font-bold pb-3 border-b border-slate-100">
              {t('about.pageCategoryTitle')}
            </h2>
            <div>
              <ul className="py-3 space-y-2">
                {PAGE_LINKS.map((item, idx) => (
                  <li key={idx}>
                    <Link
                      href={item.href}
                      className={`block py-1 transition-colors ${
                        item.active
                          ? 'font-semibold text-sky-600'
                          : 'text-slate-600 hover:text-sky-600'
                      }`}
                    >
                      {t(item.labelKey)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-6 rounded-2xl overflow-hidden shadow-soft">
            <Image
              className="hover:scale-105 transition-transform duration-500 ease-out w-full h-auto object-cover"
              src="/assets/Image/about_banner.webp"
              width={500}
              height={300}
              alt="TechHouse banner"
              quality={100}
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Index;
