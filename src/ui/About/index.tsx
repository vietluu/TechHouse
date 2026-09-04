'use client';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useTranslation } from '@/context/I18nContext';

function Index() {
  const { t } = useTranslation();
  return (
    <div className="fluid_container py-8 sm:py-4">
      <div className="flex flex-row lg:flex-col gap-8 sm:gap-4">
        <div className="flex-1 min-w-0 w-full">
          <div className="p-8 sm:p-4 bg-white rounded-3xl sm:rounded-2xl border border-slate-150 shadow-soft">
            <h1 className="text-2xl sm:text-xl text-slate-800 font-bold tracking-tight pb-4 sm:pb-3 border-b border-slate-100">
              {t('about.title')}
            </h1>
            <p className="py-4 text-slate-600 leading-relaxed text-base sm:text-sm">
              {t('about.introDesc1')} {t('about.introDesc2')}
            </p>
            <h3 className="text-lg font-bold text-slate-800 pt-2 pb-3">{t('about.valuesTitle')}:</h3>
            <ul className="space-y-2.5 text-slate-600 text-sm">
              <li className="flex items-center gap-2">
                <i className="fas fa-check-circle text-sky-600"></i>
                <span><strong>{t('about.val1Title')}</strong>{t('about.val1Desc')}</span>
              </li>
              <li className="flex items-center gap-2">
                <i className="fas fa-check-circle text-sky-600"></i>
                <span><strong>{t('about.val2Title')}</strong>{t('about.val2Desc')}</span>
              </li>
              <li className="flex items-center gap-2">
                <i className="fas fa-check-circle text-sky-600"></i>
                <span><strong>{t('about.val3Title')}</strong>{t('about.val3Desc')}</span>
              </li>
              <li className="flex items-center gap-2">
                <i className="fas fa-check-circle text-sky-600"></i>
                <span><strong>{t('about.val4Title')}</strong>{t('about.val4Desc')}</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="w-[340px] lg:w-full shrink-0">
          <div className="p-6 sm:p-4 bg-white rounded-3xl sm:rounded-2xl border border-slate-150 shadow-soft">
            <h2 className="text-lg text-slate-800 font-bold pb-3 border-b border-slate-100">
              {t('about.pageCategoryTitle')}
            </h2>
            <div>
              <ul className="py-3 space-y-2">
                <li>
                  <Link href={'/about'} className="font-semibold text-sky-600 block py-1">
                    {t('common.about')}
                  </Link>
                </li>
                <li>
                  <Link href={'#'} className="text-slate-600 hover:text-sky-600 block py-1 transition-colors">
                    {t('about.termsOfService')}
                  </Link>
                </li>
                <li>
                  <Link href={'#'} className="text-slate-600 hover:text-sky-600 block py-1 transition-colors">
                    {t('about.privacyPolicy')}
                  </Link>
                </li>
                <li>
                  <Link href={'#'} className="text-slate-600 hover:text-sky-600 block py-1 transition-colors">
                    {t('about.returnPolicy')}
                  </Link>
                </li>
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
