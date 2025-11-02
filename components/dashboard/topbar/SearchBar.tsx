"use client";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { Loader2Icon, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { ChangeEvent, use, useEffect, useRef, useState } from "react";

interface ISearchResult {
  id: number;
  title: string;
  shortCode: string;
}

function SearchBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [searchResults, setSearchResults] = useState<ISearchResult[]>([]);

  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const handleSearch = async () => {
    try {
      setIsLoading(true);
      const res = await axios.post("/api/search", {
        searchTerm: keyword,
      });
      setSearchResults(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (keyword.trim()) {
      handleSearch();
    }
  }, [keyword]);

  useEffect(() => {
    handleSearch();
  }, []);
  return (
    <div ref={containerRef} className="relative w-full md:w-1/2">
      <Input
        placeholder="Search....."
        className="w-full"
        onFocus={() => setIsOpen(true)}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <div className="absolute top-0  bottom-0 right-0 flex pr-3 items-center justify-center">
        {isLoading ? (
          <Loader2Icon className="animate-spin" size={20} />
        ) : (
          <Search className="text-gray-500" size={20} />
        )}
      </div>

      {/* search results */}
      {isOpen && (
        <div className="absolute top-0 left-0 right-0 p-3 mt-[38px] z-30 bg-white shadow-md max-h-[150px] overflow-y-auto">
          {searchResults.length === 0 && !isLoading ? (
            <p>No results found</p>
          ) : (
            searchResults.map((item) => (
              <p
                className="line-clamp-1 hover:underline hover:text-blue-600 cursor-pointer text-xs mb-2 font-semibold"
                key={item.id}
                onClick={() => {
                  setIsOpen(false);
                  router.push(`/dashboard/links/${item.shortCode}`);
                }}
              >
                {item.title}
              </p>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
