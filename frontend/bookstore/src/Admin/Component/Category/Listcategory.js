import React, { useEffect, useState } from 'react'

export default function Listcategory() {
    const [categoryList, setCategoryList] = useState([]);
    useEffect(() => {
        async function Getcategory() {
            const URL = "http://localhost:8080/admin/listcategory";
            try {
                const data = await fetch(URL);
                const result = await data.json();

                console.log("List result = ", result);
                setCategoryList(result);

            }
            catch {
                console.log("Error");
            }
        }
        Getcategory();
    }, [])
    return (
        <div className='mt-[20px] text-center ]'>
        <h1 className='border-b-[2px]'>ALL CATEGORYES</h1>
            <div className='flex bg-white-300 p-[10px] flex-wrap'>
                {
                    categoryList.map((data) => (
                        <div className='hover:scale-[1.2] ml-[20px]  mt-[10px] w-[200px] h-[150px] rounded-[10px] flex flex-col justify-center p-[10px] bg-white shadow-sm text-center'>
                            <p className='text-center m-[auto] p-[10px] bg-white shadow-sm rounded-[100%] w-[50px]'>{data.category_name[0]}</p>
                            <p>{data.category_name}</p>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
