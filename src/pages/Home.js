import{ useState } from 'react'
import { Card, Carousel } from 'react-bootstrap'
import Footer from '../component/Footer';


const slide1 = "https://pasal.edu.vn/upload_images/images/2022/top-10-website-hoc-tieng-anh-hieu-qua.jpg";
const slide2 = "https://assets.alot.com/assets/common/higher_education/u11524_602x312.jpg";
const slide3 = "https://i.ytimg.com/vi/aaFlmrZDUaI/maxresdefault.jpg";


const w1 = "https://ila.edu.vn/wp-content/uploads/2023/07/ila-dong-tu-trong-tieng-anh-verb-1.jpg";
const w2 = "https://online-learning-college.com/wp-content/uploads/2022/04/Nouns.jpg";
const w3 = "https://blog.inkforall.com/wp-content/uploads/2020/06/Adjectives-e1591693916976.png";


export default function Home() {



    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex) => {
      setIndex(selectedIndex);
    }

  return (
    <div>
       <Carousel activeIndex={index} onSelect={handleSelect}>
    <Carousel.Item>
        <img 
            src={slide1} 
            alt="First slide"  
            className='d-block w-100'
            style={{height: '600px'}} 
        />
    </Carousel.Item>
    <Carousel.Item>
        <img 
            src={slide2} 
            alt="Second slide"  
            className='d-block w-100'
            style={{height: '600px'}} 
        />
    </Carousel.Item>
    <Carousel.Item>
        <img 
            src={slide3} 
            alt="Third slide"  
            className='d-block w-100'
            style={{height: '600px'}} 
        />
    </Carousel.Item>
</Carousel>



        <h1 style={{display:"flex" , justifyContent:"center", margin:"50px"}}>English Testing</h1>
        <div style={{display: "flex", justifyContent: "space-around"}}>
        
    <Card className='col-3'>
        <div>
        <Card.Text style={{textAlign: "center"}}>
                    <h3>Verbs</h3>
                </Card.Text>
            <Card.Header>
            <img src={w1} className='w-100' style={{objectFit: "cover", height: "200px"}}/> 
            </Card.Header>
           
        </div>
    </Card>

    <Card className='col-3'>
        <div>
        <Card.Text style={{textAlign: "center"}}>
                    <h3>Nouns</h3>
                </Card.Text>
            <Card.Header>
            <img src={w2} className='w-100' style={{objectFit: "cover", height: "200px"}}/> 
            </Card.Header>
         
               
           
        </div>
    </Card>

    <Card className='col-3'>
        <div>
        <Card.Text style={{textAlign: "center"}}>
                    <h3>Adjectives </h3>
                </Card.Text>
            <Card.Header>
            <img src={w3} className='w-100' style={{objectFit: "cover", height: "200px"}}/> 
            </Card.Header>
          
                
             
        </div>
    </Card>
</div>


        
      <Footer/>
       
    </div>

  )
}
