import { useState } from "react";
import axios from "axios";
import "./App.css";
import Table from "./Components/Table";
function App() {

    const [data, setData] = useState([]);
    const [form,setForm] = useState({
        title: "",
        body: "",
        userId: "",
        id: ""
    })

    const fetchDate = (type) => {
        // axios.get(`https://swapi.dev/api/${type}/`).then((res) => {
        //     if (type === "people") {
        //         setData(
        //             res.data.results.map((item) => {
        //                 return {
        //                     name: item.name,
        //                     gender: item.gender,
        //                     mass: item.mass,
        //                 };
        //             })
        //         );
        //     } else if (type === "vehicles") {
        //            setData(
        //                res.data.results.map((item) => {
        //                    return {
        //                        name: item.name,
        //                        passengers: item.passengers,
        //                        model: item.model,
        //                        cost_in_credits: item.cost_in_credits,
        //                    };
        //                })
        //            );
        //     }
        // });
        axios.get(`https://jsonplaceholder.typicode.com/posts/`).then((res) => {
          console.log(res.data)
            setData(res.data);
      })
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(form)
        axios.put("https://jsonplaceholder.typicode.com/posts/"+form.id, form,{
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            },
          }
        ).then((res) => {
            console.log(res.data)
            setData((prevData) => {
                let data =  prevData.map((item) => {

                    if (item.id === Number(form.id)) {
                        return res.data;
                    }else{
                      return item;
                    }
                  })
                    return data;
                }
                
              )
            
            // setData((prevData) => {
            //   return [...prevData, res.data]
            // });
            // setData()
          })
    }

    const handleChange = (e) => {
      console.log(e.target.value)
      if(["userId","id"].includes(e.target.name) && !e.target.value.match(/^[0-9]+$/)){
          alert("enter only number")
          return false;
      }
      if(["title","body"].includes(e.target.name)){
        alert("enter valid string");
      }
      setForm({
        ...form,
        [e.target.name]: e.target.value
      })
    }



    return (
        <>
            <button onClick={() => fetchDate("people")}>Get people</button>
            <button onClick={() => fetchDate("vehicles")}>Get Vechile</button>
            <Table data={data} />
            <br />
            <form onSubmit={(event) => handleSubmit(event)}>
                <label>
                    ID
                    <input type="number" value={form.id} onChange={(e) => handleChange(e)} name="id" />
                    <div className="error"></div>
                </label>
                <label>
                    User ID
                    <input type="number" value={form.userId} onChange={(e) => handleChange(e)} name="userId" />
                    <div className="error"></div>
                </label>
                <br />
                <label>
                    Title
                    <input type="text" value={form.title} onChange={(e) => handleChange(e)} name="title" />
                    <div className="error"></div>
                </label>
                <br />
                <label>
                    Body
                    <input type="text" value={form.body} onChange={(e) => handleChange(e)} name="body" />
                    <div className="error"></div>
                </label>
                <br />
                <button>Submit</button>
            </form>
        </>
    );
}

export default App;
