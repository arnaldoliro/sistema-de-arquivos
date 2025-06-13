import AllFiles from "@/components/FilesAll";
import PinnedFiles from "@/components/FilesPinned";
import SearchBar from "@/components/SearchSection";

export default function Home() {
  return (
      <div>
        <SearchBar />
        <PinnedFiles />
        <AllFiles />
      </div>
  )
}
