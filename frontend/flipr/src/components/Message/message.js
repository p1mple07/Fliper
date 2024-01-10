import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './message.css'

const Message = ({username, roomnoupdate}) => {
    const [data, setData] = useState(null);
    const [userindex, setUserIndex] = useState(null);
    const [roomnum, setRoomNum] = useState(0);
    // const [a, seta] = useState(0);
    // const [b, setb] = useState(0);
    

    
    // axios.get('http://localhost:5000/message')// Replace '/api/data' with your backend endpoint
    // .then(response => {
    //     console.log('Response:', response.data);
    // })

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get('http://localhost:5000/message');
            const sortedData = response.data.sort(); // Sort the response array of strings
            setData(sortedData);
            console.log('Response:', sortedData);
            for (let i = 0; i<sortedData.length; i++){
                if(username === sortedData[i]) setUserIndex(i);
            }
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();
      }, []);

    const onButtonClick = (user2index)=> {
        let a = 0;
        let b = 0;
        if(user2index<userindex) {
            a = user2index;
            b = userindex;
        }
        else{
            a = userindex;
            b = user2index;
        }
        let str = data[a] + data[b];
        console.log(str);
        roomnoupdate(str);
    }


    return ( 
        <div>
        {/* <div>{username}</div> */}
        <div className="message-container">
        {data !== null &&
            data.map((item, index) => {
            if (item !== username) {
                return (
                <div className="chatuser" type="button" key={index} onClick={() => onButtonClick(index)}>
                    {/* Render each string as a button */}
                    {item}
                </div>
                );
            } else {
                return null; // Do not render if item matches the username
            }
            })}
        </div>
    </div>
     );
}
 
export default Message;