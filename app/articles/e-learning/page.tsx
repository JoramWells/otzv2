import { Button } from '@/components/ui/button'
import { PlusCircle } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const EPage = () => {
  return (
    <div>
      <Button className="bg-teal-600 font-bold shadow-none hover:bg-teal-700">
        <PlusCircle className="mr-2" size={18} />
        <Link href={'/articles/add-e-learning'}>
          Add Articles Category
        </Link>
      </Button>
    </div>
  )
}

export default EPage
