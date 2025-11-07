import React from 'react'
import { useParams } from 'react-router';

type Props = {}

export default function DocumentsVersionsPage({}: Props) {
   let params = useParams();

  return (
    <div>Document Versions Page  : {params.docId}</div>
  )
}