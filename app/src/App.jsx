import styled from "styled-components";
import { useState , useEffect } from "react";
import SearchResult from "./components/SearchResults/SearchResult";

export const Base_url = "http://localhost:9000";

const App = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [err,setErr] = useState(null)
  const [filteredData,setFilteredData] =useState(null)
  const [selectedBtn,setSelectedBtn] = useState('all')

 

  useEffect(()=>{
    const fetchFoodItem = async () => {
      setLoading(true)
      try {
        const response = await fetch(Base_url);
        const json = await response.json();
        setData(json);
        setFilteredData(json)
        setLoading(false)
       
      } catch (error) {
        setErr('UNABLE TO FETCH DATA')
      }
    };

    fetchFoodItem();
  },[])

  function searchFood(e){
    const searchValue = e.target.value;
    console.log(searchValue);
    if(searchValue ===''){
      setFilteredData(null)
    }
    const filter =data?.filter((food)=>
     food.name.toLowerCase().includes(searchValue.toLowerCase()))
     setFilteredData(filter) 
    }

    const filteredFood=(type)=>{
      if(type==='all'){
        setFilteredData(data)
        setSelectedBtn(all);
        return;
      }
      const filter =data?.filter((food)=>
      food.type.toLowerCase().includes(type.toLowerCase())
      )
      setFilteredData(filter) 
      setSelectedBtn(type)
    }

    const filterBtns=[
      {
        name:'All',
        type:'all'
      },
      {
        name:'Breakfast',
        type:'breakfast'
      },
      {
        name:'Lunch',
        type:'lunch'
      },{
        name:'Dinner',
        type:'dinner'
      }
    ]

    
      
  console.log(data)
  if(err) return <div>{err}</div>;
  if(loading) return <div>Loading...</div>
  
  return (
    <>
      <Container>
      <TopContainer>
        <div className="logo">
          <img src="/logo.svg" alt="logo"/>
        </div>

        <div className="search">
          <input type="text" onChange={searchFood} placeholder="SEARCH FOOD" />
        </div>
      </TopContainer>
      <FilterContainer>
      {
        filterBtns.map((value)=>
        <Button  isSelected={selectedBtn == value.type}
         key={value.name} onClick={()=>filteredFood(value.type)}>{value.name}</Button>)
      }
      </FilterContainer>
    </Container>
    <SearchResult data={filteredData}/>
    </>
  );
};
export default App;

export const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
   padding-bottom: 5%;
  
`;

const TopContainer = styled.section`
  justify-content: space-between;
  display: flex;
  height: 148px;
  padding: 16px;
  align-items: center;
 

  .search {
    input {
      background-color: transparent;
      border: 1px solid red;
      height: 40px;
      font-size: 16px;
      color: white;
      border-radius: 5px;
      padding: 4px 0 10px;
      &::placeholder{
        color: white;
        text-align:center;
      
      }
    }
  }
  @media (0 < width < 600px){
    flex-direction:column ;
    height: 120px;
  }
`;

const FilterContainer = styled.section`
  display: flex;
  justify-content: center;
  gap: 12px;
  padding-bottom: 40px;
`;

export const Button = styled.button`
  border-radius: 5px;
  background: ${({isSelected})=>(isSelected ? '#f22f2f' :'#ff4343')};
  padding: 6px 12px;
  border: none;
  color: white;
  cursor:pointer;
& :hover{
  background-color: #ff4343;
}
  
`;

