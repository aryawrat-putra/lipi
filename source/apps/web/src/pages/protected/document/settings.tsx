import React from 'react'
import { useParams } from 'react-router'
type Props = {}

export default function DocumentSettingsPage({ }: Props) {
  let params = useParams();
  
  return (
    <div>Document Settings Page : {params.docId}</div>
  )
}