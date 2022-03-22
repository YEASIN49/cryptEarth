import React, { useEffect, useState } from "react";
import millify from "millify";
import { Link } from "react-router-dom";
import { Card, Row, Col, Input, Typography } from "antd";


import { useGetCryptosQuery } from "../services/cryptoAPI";

const Cryptocurrencies = ({simplified})  => {
    // console.log("simplified");
    // console.log(simplified);
    const {Title} = Typography;
    const count = simplified ? 10 : 80;
    const {data: cryptoList, isFetching } = useGetCryptosQuery(count); // data is renamed as crytoList for easier understanding
    const [cryptos, setCryptos] = useState();
    const [searchItem, setSearchItem] = useState("");

    // console.log("crptoList");
    // console.log(cryptoList);

    useEffect(() => {
        if(cryptoList !== undefined && cryptos === undefined){
            setCryptos(prevState => prevState =  cryptoList.data.coins);
        }
    },[cryptoList])

    useEffect(()=>{
        if(cryptos){
            const filterSearchItem = cryptoList.data.coins.filter((coin) => coin.name.toLowerCase().includes(searchItem.toLowerCase()))
            setCryptos(prevState => prevState =  filterSearchItem);
        } 
    },[searchItem])

    if(isFetching) return "Loading...";
    // console.log(cryptos)
    return(
        <>
            {
            simplified ?
                ""
                :
                <div className="search-crypto">
                    <input placeholder="Search Crypto" onChange={(e) => setSearchItem(prevState => prevState = e.target.value)}/>
                </div>
            }
             <div className="home-heading-container">
                <Title level={2} className="home-title" >TOP {count} CRYPTO CURRENCY STATS</Title>
            </div>
           
            <Row gutter={[12,12]} className="crypto-card-container">
                {/* {console.log(cryptos)} */}
                {cryptos ? cryptos.map( (currency, index) => (
                    <Col xs={24} sm={12} lg={6} className="crypto-card" key={`${index}`}>
                        <Link to={`/crypto/${index}`}>
                            <Card 
                                title={`${currency.rank} - ${currency.name}`}
                                extra={<img className="crypto-image" src={currency.iconUrl}/>}
                                hoverable
                            >
                                <p>Price : {millify(currency.price)}</p>
                                <p>Market Cap : {millify(currency.marketCap)}</p>
                                <p>Daily Change : {millify(currency.change)}</p>
                                <p>Daily Change : {millify(currency.change)}</p>                            
                            </Card>
                        </Link>
                    </Col>
                ))
                :
                ""
                // console.log("Entered once")
            }
            </Row>  
        </>
    )
}

export default Cryptocurrencies;