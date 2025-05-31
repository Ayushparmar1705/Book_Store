import React from 'react'
import { useSearchParams } from 'react-router-dom'

export default function Searchbook() {
    const [searchName] = useSearchParams();
    const query = searchName.get("query");
    console.log(query);
  return (
    <div>
    </div>
  )
}
  