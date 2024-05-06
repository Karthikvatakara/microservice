
export const validateProductRequest = (data:any):{isValid:boolean; errors?: string[]} => {
    const errors:string[]=[];

    if(!data.name || !data.description || !data.price) {
        errors.push("name description and price must be required");
    }
if(typeof data.name !== "string") {
    errors.push("name must be a string");
}
if(typeof data.description !== "string") {
    errors.push("description must be a string");
}
if(typeof data.price !=="number") {
    errors.push("prices must be a number")
}
if(typeof data.stock !== "number" || data.stock < 0){
    errors.push("stock must be a non negative number")
}
return {isValid: errors.length===0 , errors};
}