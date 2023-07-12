export type product =  {
    id:number,
    title:string,
    price:string,
    category:{[key:string]:string},
    description:string,
    images:[string]
}