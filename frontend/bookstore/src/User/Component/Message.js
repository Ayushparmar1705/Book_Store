import React from 'react'

export default function Message(props) {
  return (
    <div>
       <div class="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
        <span class="font-medium">{props.message}</span>
      </div>
    </div>
  )
}
