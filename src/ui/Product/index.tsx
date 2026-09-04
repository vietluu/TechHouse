'use client';
import React, { useEffect, useMemo, useState } from 'react';
import { product } from '@/types/productType';
import { Pagination, Empty } from 'antd';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useTranslation } from '@/context/I18nContext';
import ProductCard from '@/components/ProductCard';
import ProductToolbar from '@/components/product/ProductToolbar';
import ActiveFilters from '@/components/product/ActiveFilters';
import FilterDrawer from '@/components/product/FilterDrawer';

export default function Index({
  data,
}: {
  data: { products: product[]; total: number; skip: number; limit: number };
}) {
  const { t } = useTranslation();
  const [show, setShow] = useState(false);

  const path = usePathname();
  const router = useRouter();
  const searchParams: any = useSearchParams();
  const page = searchParams.get('page');

  // Filter local states
  const [rating, setRating] = useState<number | null>(() => {
    const r = searchParams.get('rating');
    return r ? Number(r) : null;
  });

  const [range, setRange] = useState<[number, number]>(() => {
    const r = searchParams.get('range');
    if (r) {
      const parts = r.split('-').map(Number);
      if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
        return [parts[0], parts[1]];
      }
    }
    return [0, 2000];
  });

  const [brand, setBrand] = useState<string | null>(() => {
    return searchParams.get('brand') || null;
  });

  const [orderBy, setOrderBy] = useState<string | null>(() => {
    return searchParams.get('oderBy') || null;
  });

  // Sync state when URL searchParams changes
  useEffect(() => {
    const r = searchParams.get('range');
    if (r) {
      const parts = r.split('-').map(Number);
      if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
        setRange([parts[0], parts[1]]);
      } else {
        setRange([0, 2000]);
      }
    } else {
      setRange([0, 2000]);
    }

    const rate = searchParams.get('rating');
    setRating(rate ? Number(rate) : null);

    setBrand(searchParams.get('brand') || null);
    setOrderBy(searchParams.get('oderBy') || null);
  }, [searchParams]);

  // Extract available brands from products
  const brandList = useMemo(() => {
    if (!data?.products) return [];
    const brands = data.products
      .map((p: product) => p.brand)
      .filter((b: string) => Boolean(b && b.trim()));
    return Array.from(new Set(brands)).slice(0, 10);
  }, [data?.products]);

  // Extract available categories from products
  const categoryList = useMemo(() => {
    if (!data?.products) return [];
    const cats = data.products
      .map((p: product) => p.category)
      .filter((c: string) => Boolean(c && c.trim()));
    return Array.from(new Set(cats)).slice(0, 8);
  }, [data?.products]);

  // Count active filters
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (searchParams.get('rating')) count++;
    if (searchParams.get('range')) count++;
    if (searchParams.get('brand')) count++;
    if (searchParams.get('oderBy')) count++;
    return count;
  }, [searchParams]);

  const changePage = async (value: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', value.toString());
    await router.push(path + '?' + params.toString());
  };

  const applyFilters = () => {
    const params = new URLSearchParams(searchParams);

    if (rating !== null) {
      params.set('rating', rating.toString());
    } else {
      params.delete('rating');
    }

    if (range && (range[0] !== 0 || range[1] !== 2000)) {
      params.set('range', `${range[0]}-${range[1]}`);
    } else {
      params.delete('range');
    }

    if (brand) {
      params.set('brand', brand);
    } else {
      params.delete('brand');
    }

    if (orderBy) {
      params.set('oderBy', orderBy);
    } else {
      params.delete('oderBy');
    }

    params.delete('page');
    const queryString = params.toString();
    router.push(path + (queryString ? `?${queryString}` : ''));
    setShow(false);
  };

  const resetFilter = () => {
    setRange([0, 2000]);
    setRating(null);
    setBrand(null);
    setOrderBy(null);

    const params = new URLSearchParams(searchParams);
    params.delete('rating');
    params.delete('range');
    params.delete('brand');
    params.delete('oderBy');
    params.delete('page');

    const queryString = params.toString();
    router.push(path + (queryString ? `?${queryString}` : ''));
    setShow(false);
  };

  const removeSingleFilter = (key: string) => {
    const params = new URLSearchParams(searchParams);
    params.delete(key);
    params.delete('page');
    const queryString = params.toString();
    router.push(path + (queryString ? `?${queryString}` : ''));
  };

  const handleSelectOrderBy = (val: string | null) => {
    const params = new URLSearchParams(searchParams);
    if (val) {
      params.set('oderBy', val);
    } else {
      params.delete('oderBy');
    }
    params.delete('page');
    router.push(path + (params.toString() ? `?${params.toString()}` : ''));
  };

  return (
    <div className="fluid_container py-6 sm:py-3">
      {/* Toolbar: Title, Product Count, Filter button, Sort */}
      <ProductToolbar
        total={data?.total ?? data?.products?.length ?? 0}
        activeFiltersCount={activeFiltersCount}
        orderBy={searchParams.get('oderBy')}
        onOpenFilter={() => setShow(true)}
        onSelectOrderBy={handleSelectOrderBy}
      />

      {/* Active Filter Chips */}
      <ActiveFilters
        range={searchParams.get('range')}
        rating={searchParams.get('rating')}
        brand={searchParams.get('brand')}
        orderBy={searchParams.get('oderBy')}
        onRemoveRange={() => removeSingleFilter('range')}
        onRemoveRating={() => removeSingleFilter('rating')}
        onRemoveBrand={() => removeSingleFilter('brand')}
        onRemoveOrderBy={() => removeSingleFilter('oderBy')}
        onClearAll={resetFilter}
      />

      {/* Product Grid using modular ProductCard */}
      <div className="product pt-1">
        {data?.products?.length ? (
          <div className="grid gap-4 sm:gap-2.5 grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2">
            {data.products.map((value: product) => (
              <ProductCard key={value.id} product={value} />
            ))}
          </div>
        ) : (
          <Empty className="py-12" description={t('product.noData')} />
        )}

        <div className="flex justify-center items-center py-8">
          <Pagination
            total={data.total}
            pageSize={30}
            current={Number(page) || 1}
            onChange={changePage}
            showSizeChanger={false}
          />
        </div>
      </div>

      {/* Modular Filter Drawer */}
      <FilterDrawer
        open={show}
        onClose={() => setShow(false)}
        range={range}
        setRange={setRange}
        rating={rating}
        setRating={setRating}
        brand={brand}
        setBrand={setBrand}
        orderBy={orderBy}
        setOrderBy={setOrderBy}
        brandList={brandList}
        categoryList={categoryList}
        onApply={applyFilters}
        onReset={resetFilter}
      />
    </div>
  );
}
