"use client"

import { useEffect, useState } from "react"
import SectionFiles from "@/components/FilesSection"
import SearchBar from "@/components/SearchSection"
import Filters from "@/types/filters"

export default function Home() {
  const [filters, setFilters] = useState<Filters>({})

  return (
    <div>
      <SearchBar onSearch={setFilters} />
      <SectionFiles filters={filters} />
    </div>
  )
}
