import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

function SearchBar() {
  return (
    <div className="relative w-full md:w-1/2">
      <Input placeholder="Search....." className="w-full" />
      <div className="absolute top-0  bottom-0 right-0 flex pr-3 items-center justify-center">
        <Search className="text-gray-500" size={20} />
      </div>
    </div>
  );
}

export default SearchBar;
