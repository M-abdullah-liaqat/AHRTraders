"use client"

import useSWR from "swr"

const fetcher = (...args) => fetch(...args).then(res => res.json())

 function page() {
 const { data, error, isLoading } = useSWR(`http://localhost:3000/api/add`, fetcher)
   console.log(data)

    if (error) return <div>failed to load</div>
  if (isLoading) return <div>loading...</div>
  return (
    <div>
      
    </div>
  )
}

export default page
