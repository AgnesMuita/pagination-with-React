import React,{useState} from "react";
import ReactPaginate from 'react-paginate';
import './App.css';
import { Container, Row, Col,Navbar, NavbarBrand, NavbarToggler,Collapse} from 'reactstrap';


const NewsCard =(props)=>{
  return (
    <div style={{padding:10}}>
      <a href = {props.url}>
        {props.title} by  {props.author}
      </a>
    </div>
  )

}
function App() {
    
  const[hitss, setHits]=useState([]);
  const[isLoaded, setIsLoaded] = useState(false);
  const[query,setQuery] = useState('startups');
  const[pageCount, setPageCount] = useState(1);
  const[currentPage, setCurrentPage] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const handleChange=()=>{
    fetch(`https://hn.algolia.com/api/v1/search?query=${query}&page=${currentPage}`)
    .then(res=>res.json())
    .then(body=>{
        setHits([...body.hits])
        setPageCount(body.nbPages);
        setIsLoaded(true)
    })
    .catch(error=>console.error("ERROR",error))
  }

  const handleInput=(event)=>{
    setQuery(event.target.value)
  }

  const handlePageChange=(selectedObject)=>{
      setCurrentPage(selectedObject.selected); 
      console.log(currentPage)
      handleChange();
  }

  const toggleOpenState=()=>{
      setIsOpen(!isOpen)
  }

  return (
      <div style={{marginTop:100}}>
        <Container className="container">  
        <Row>
          <Col>
            <input type="text" placeholder="Add Query..." onChange={handleInput}/>
            <br></br>
            <button onClick={handleChange} className='btn btn-primary' style={{marginTop:20}}>Get Data</button>
            {isLoaded?( 
              hitss.map((item)=>{ 
                // console.log(item)
                  return(             
                    <NewsCard 
                      comment_text={item.comment_text}
                      story_text={item.story_text}
                      story_url={item.story_url}
                      title={item.title}
                      author={item.author}
                      key={item.objectID}>
                    </NewsCard>
                  )           
              })
            ):(
            <div></div>
            )}
            {isLoaded?(
              <ReactPaginate
                  pageCount={pageCount}
                  pageRange={2}
                  marginPagesDisplayed={2}
                  onPageChange={handlePageChange}
                  containerClassName={'container'}
                  previousLinkClassName={'page'}
                  breakClassName={'page'}
                  nextLinkClassName={'page'}
                  pageClassName={'page'}
                  disabledClassNae={'disabled'}
                  activeClassName={'active'}
              />
            ):(
                <div>Nothing to display</div>
            )}
          </Col>
        </Row>
        </Container>
      </div>
  )
}

export default App;
