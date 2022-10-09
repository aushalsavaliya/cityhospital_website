import React, { useEffect, useState } from 'react';
import { Button, Card, CardBody, CardSubtitle, CardText, CardTitle } from 'reactstrap';

function Listappoinment(props) {

    const [data, setdata] = useState([]);

    const getdata = () => {
        let localdata = JSON.parse(localStorage.getItem("apt"));

        setdata(localdata);
    }

    useEffect(() => {
        getdata();
    }, [])
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
                                    {d.Gender}<br/>
                                    {d.checkbox}
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