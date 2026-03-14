"use client"

import {useState} from "react"
import {API} from "../../lib/api"

export default function PlantTree(){

const [name,setName]=useState("")
const [species,setSpecies]=useState("")
const [location,setLocation]=useState("")

const submit = async(e)=>{

e.preventDefault()

const token = localStorage.getItem("token")

await fetch(`${API}/plant-tree/`,{

method:"POST",

headers:{
"Content-Type":"application/json",
Authorization:`Bearer ${token}`
},

body:JSON.stringify({
name,
species,
location
})

})

alert("Tree planted 🌳")

}

return(

<div className="flex flex-col items-center mt-20">

<h1 className="text-3xl mb-6">Plant Tree</h1>

<form onSubmit={submit} className="flex flex-col gap-3 w-80">

<input
placeholder="Tree Name"
className="border p-2"
onChange={(e)=>setName(e.target.value)}
/>

<input
placeholder="Species"
className="border p-2"
onChange={(e)=>setSpecies(e.target.value)}
/>

<input
placeholder="Location"
className="border p-2"
onChange={(e)=>setLocation(e.target.value)}
/>

<button className="bg-green-600 text-white p-2">
Plant
</button>

</form>

</div>

)
}