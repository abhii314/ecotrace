"use client"

import {useEffect,useState} from "react"
import {API} from "../../lib/api"

export default function MyTrees(){

const [trees,setTrees]=useState([])

useEffect(()=>{

const load = async()=>{

const token = localStorage.getItem("token")

const res = await fetch(`${API}/my-trees/`,{

headers:{
Authorization:`Bearer ${token}`
}

})

const data = await res.json()

setTrees(data)

}

load()

},[])

return(

<div className="p-10">

<h1 className="text-3xl mb-6">My Trees</h1>

{trees.map((tree)=>(
<div key={tree.id} className="border p-3 mb-3">

<h2>{tree.name}</h2>
<p>{tree.species}</p>
<p>{tree.location}</p>

</div>
))}

</div>

)
}