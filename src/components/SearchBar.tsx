import { useRouter } from 'next/navigation';
import React, { useRef } from 'react';

function SearchBar() {
  const router = useRouter();
  const refInput = useRef(null);

  const getSearch = async () => {
    //@ts-ignore
    return await router.push(`/Search?keyword=${refInput.current?.value}`);
  };
  return (
    <>
      <input
        ref={refInput}
        id="search-input"
        type="text"
        placeholder="nhập tìm kiếm..."
      />
      <button type="button" onClick={(e) => getSearch()}>
        <i className="fas fa-search"></i>
      </button>
    </>
  );
}

export default SearchBar;
