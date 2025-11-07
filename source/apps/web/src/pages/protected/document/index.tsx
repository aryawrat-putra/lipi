import React from 'react'
import { useParams } from 'react-router'

type Props = {}

export default function DocumentPage({}: Props) {
   let params = useParams();

  return (
    <div>Document Page : '{params.docId}' </div>
  )
}