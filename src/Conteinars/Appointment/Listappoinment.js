import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Card, CardBody, CardSubtitle, CardText, CardTitle } from 'reactstrap';

function Listappoinment(props) {

    const [data, setdata] = useState([]);

    const history = useHistory();

    const getdata = () => {
        let localdata = JSON.parse(localStorage.getItem("apt"));

        setdata(localdata);
    }

    useEffect(() => {
        getdata();
    }, [])

    const handledelete = (id) => {
        let localdata = JSON.parse(localStorage.getItem("apt"));

        let data = localdata.filter((l) => l.id !== id);

        console.log(localdata , id);

        localStorage.setItem("apt", JSON.stringify(data));

        history.push("/Appointment");
    }
    return (
        <div className='row'>
            {
                data.map((d, i) => (
                    <div key={i} className='col-md-4'>
                        <Card
                            style={{
                                width: '18rem'
                            }}
                        >
                            <CardBody>
                                <CardTitle tag="h5">
                                    {d.name}
                                </CardTitle>
                                <CardSubtitle
                                    className="mb-2 text-muted"
                                    tag="h6"
                                >
                                    {d.phone}<br/>
                                    {d.date}<br/>
                                    {d.department}<br/>
                                    {d.message}<br/>
                                    {d.gender}<br/>
                                    {d.checkbox}<br/>
                                    <button>Edit</button>
                                    <button onClick={() => handledelete(d.id)}>Delete</button>
                                </CardSubtitle>
                            </CardBody>
                        </Card>
                    </div>
                ))
            }
        </div>
    );
}

export default Listappoinment;