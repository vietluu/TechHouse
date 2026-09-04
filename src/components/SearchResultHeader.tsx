'use client';
import { useTranslation } from '@/context/I18nContext';

export default function SearchResultHeader({
  keyword,
  hasResults,
}: {
  keyword?: string;
  hasResults: boolean;
}) {
  const { t } = useTranslation();

  if (!hasResults) {
    return (
      <div className="fluid_container">
        <h3 className="text-xl sm:text-base py-12 sm:py-8 text-center text-slate-700 font-medium">
          {t('product.searchResultFor')} &quot;<span className="text-sky-600 font-semibold">{keyword}</span>&quot;: {t('product.noData')}
        </h3>
      </div>
    );
  }

  return (
    <div className="fluid_container">
      <h3 className="text-xl sm:text-lg px-3 pt-6 sm:pt-3 pb-2 text-left text-slate-800 font-bold">
        {t('product.searchResultFor')} &quot;<span className="text-sky-600">{keyword}</span>&quot;
      </h3>
    </div>
  );
}
