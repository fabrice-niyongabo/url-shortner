import PageHeader from "@/components/dashboard/PageHeader";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function Links() {
  return (
    <div>
      <PageHeader title="Links">
        <Link href="/dashboard/links/new">
          <Button className="bg-blue-500 text-white font-bold px-5 py-3 mt-5 rounded-md hover:bg-orange-500 hover:cursor-pointer">
            Create link
          </Button>
        </Link>
      </PageHeader>
    </div>
  );
}

export default Links;
