import React, {useState} from 'react'
import {Modal, Button, Carousel} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
// ..
AOS.init({
    duration:1000
});

function Room({room, fromdate, todate}) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <div className='row m-3 p-3 bs'>
            <div className='col-md-4'>
             <img src={room.imageurls[0]} className='image' alt="BestImage"/>
            </div>
            <div className='col-md-8'>
              <h1>{room.name}</h1>
              <p>max count: {room.maxcount}</p>
              <p>phno: {room.phonenumber}</p>
              <p>Type : {room.type}</p>
              <div>
                {(fromdate && todate) && (
                   <Link to={`/book/${room._id}/${fromdate}/${todate}`}>
                   <button className='btn btn-primary m-2'>Book now</button>
                   </Link>
                )}
                 
                  <button className='btn btn-primary' onClick={handleShow}>View Details</button>
              </div>


              <ul class="colorlib-bubbles">
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
		</ul>


            </div>

      <Modal show={show} onHide={handleClose} size='lg'>
        <Modal.Header>
          <Modal.Title>{room.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Carousel>
                {room.imageurls.map(url => {
                    return  <Carousel.Item>
                    <img
                      className="d-block w-100 image1"
                      src={url}
                      alt="FavImage"
                    />
                  </Carousel.Item>
                })}
            </Carousel>
            <p>{room.description}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
        </div>
    )
}

export default Room
