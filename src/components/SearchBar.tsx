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
        type="text"
        placeholder="nhập tìm kiếm..."
        onKeyDown={async (e) => {
          if (e.key == 'Enter') {
            return await getSearch();
          }
        }}
      />
      <button type="button" onClick={(e) => getSearch()}>
        <i className="fas fa-search"></i>
      </button>
    </>
  );
}

export default SearchBar;
