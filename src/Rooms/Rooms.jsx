import { useEffect } from "react";
import { useState } from "react"
import Cards from "./Cards";
import Container from "../Shared/Container";
import { useSearchParams } from "react-router-dom";
import Heading from "../Shared/Heading";

const Rooms = () => {
    const [params, setParams] = useSearchParams();
    const category = params.get('category');
    const [rooms,setRooms] = useState([]);
    useEffect(()=> {
        fetch('../../public/rooms.json')
        .then(res=> res.json())
        .then(data=> {
            if(category){
                const filterd = data.filter(room => room.category === category)
                setRooms(filterd)
            }
            else{
                setRooms(data)
            }
        }
            )

    }, [category])
  return (
    <Container>
    {
        rooms && rooms.length>0 ? <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
        {
            rooms.map(room => (
                <Cards key={room._id} room={room}/>
            ))
        }
    </div>: 
    <div className="flex itc justify-center mt-8">
        <Heading center={true} title='No room Available in This category' 
        subtitle='Please Select Another Category'></Heading>
    </div>
    }
    </Container>
  )
}

export default Rooms