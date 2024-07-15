'use client';
import { useEffect,useState } from "react";

interface Place {
    id: number;
    避難施設名称: string;
}


export const FetchData = () => {
    const [place,setPlace] = useState<Place[] | null>(null);

    useEffect(() => {
        const handleCatch = async () => {
            try {
                const response = await fetch('/api/fetchData');
                const json = await response.json();
                const data = json.result.records;
                console.log(data);
                setPlace(data);
            } catch (error:any) {
                console.error(error.message);
            }

        }
        handleCatch();
    }, [])

    if(!place) return <p>loading...</p>;

    return (
        <div>
            {place && place.map((item) => (
                <div key={item.id}> 
                    {item.避難施設名称}
                </div>
            ))}
        </div>
    );
}
