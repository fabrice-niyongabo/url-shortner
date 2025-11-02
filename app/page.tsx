import Container from "@/components/container";
import { BsArrowRight } from "react-icons/bs";

export default function Home() {
  return (
    <div className="bg-[#031F39] py-10">
      <Container>
        <h2 className="text-5xl text-white text-center font-medium">
          Build stronger digital connections
        </h2>
        <p className="text-center text-white text-xl mt-5">
          Use our URL shortener to engage your audience and connect them to the
          right information. Build, edit, and track everything inside one
          Platform.
        </p>
        <div className="w-[60%] mx-auto bg-white rounded-4xl p-10 mt-10">
          <h3 className="font-bold text-[#031F39] text-3xl">
            Shorten a long link
          </h3>
          <p className="text-[#031F39] mt-3">No credit card required.</p>

          <form className="mt-5">
            <p className="text-[#031F39] font-bold">
              Paste your long link here
            </p>
            <input
              type="text"
              placeholder="https://www.example.com/large-url"
              className="block w-full rounded-md border-2 border-gray-200 p-3 text-sm text-gray-700"
            />
            <button
              className="flex items-center justify-center bg-blue-500 text-white font-bold px-5 py-3 mt-5 gap-2 rounded-2xl hover:bg-orange-500 hover:cursor-pointer"
              type="button"
            >
              <span>Get your link for free </span>
              <BsArrowRight size={30} />
            </button>
          </form>
        </div>
      </Container>
    </div>
  );
}
