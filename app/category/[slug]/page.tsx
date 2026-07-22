import { client } from "@/sanity/lib/client";

import ProductCard from "@/components/ProductCard";

import {
productsByCategoryQuery,
categoryBySlugQuery
} from "@/sanity/lib/queries";

import { notFound } from "next/navigation";



export default async function CategoryPage({

params

}:{

params: Promise<{
slug:string
}>

}){


const {slug}=await params;





const category = await client.fetch(

categoryBySlugQuery,

{
slug
}

);

if (!category) {
notFound();
}



const products = await client.fetch(

productsByCategoryQuery,

{
slug
}

);







return (

<main>





<section className="
bg-[#f7f5ef]
py-24
">


<div className="
max-w-7xl
mx-auto
px-6
">



<p className="
text-xs
tracking-[0.5em]
uppercase
text-gray-500
mb-6
">

Category

</p>




<h1 className="
text-6xl
md:text-8xl
font-serif
">

{category?.name || "Collection"}

</h1>





<p className="
mt-8
max-w-2xl
text-gray-600
text-lg
">

Explore our curated collection of authentic global products.

</p>



</div>


</section>







<section className="
max-w-7xl
mx-auto
px-6
py-24
">



<div className="
flex
justify-between
items-center
mb-12
">


<h2 className="
text-5xl
font-serif
">

Products

</h2>


<p className="
text-gray-500
">

{products?.length || 0} Items

</p>



</div>






<div className="
grid
grid-cols-2
md:grid-cols-4
gap-8
">


{

(!products || products.length === 0) ? (
<p className="col-span-full text-center text-gray-500 py-10">
No products in this category yet.
</p>
) : products.map((product:any)=>(


<ProductCard

key={product._id}

product={product}

/>


))


}



</div>



</section>





</main>


);

}
