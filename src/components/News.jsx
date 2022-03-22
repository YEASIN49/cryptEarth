import React, {useState, useEffect} from "react";
import { useGetCryptoNewsQuery } from "../services/cryptoNewsAPI";
import millify from "millify";
import { Card, Row, Col, Input, Typography, Avatar } from "antd";
import { Link } from "react-router-dom";
import moment from "moment";
// import Title from "antd/lib/skeleton/Title";
// import { Typography } from "antd";

const News = ({simplified})  => {

    // const api = ;


    const count = simplified ? 10 : 80;
    const cat = "bitcoin";

    const {Title, Text} = Typography;
    const defaultImage = "https://www.bing.com/th?id=OVFT.9Mx6OTHFZdPHlCfkAF2f9C&pid=News";

    const [cryptos, setCryptos] = useState();
    const [searchItem, setSearchItem] = useState("");
    const {data: cryptoNews, isFetching} = useGetCryptoNewsQuery({newsCategory: cat ,count: count});

    // console.log("cryptoNews");
    // console.log(cryptoNews.value);

    useEffect(() => {
        if(cryptoNews !== undefined && cryptos === undefined){
            setCryptos(prevState => prevState =  cryptoNews.value);
        }
    },[cryptoNews])

    console.log("cryptoNews");
    console.log(cryptos);
    console.log(cryptos);

    if(isFetching) return "Loading...";

    return(
        <>
            <div className="home-heading-container">
                <Title level={2} className="home-title" >LATEST CRPTO NEWS</Title>
            </div>
   
            <Row gutter={[12,12]} className="crypto-card-container">
        
            {cryptos ? cryptos.map((news, index) => (
                
                <Col xs={24} sm={24} lg={8} className="crypto-card" key={`${index}`}>
                    <a href={`${news.url}`} target="_blank" rel="noreferrer">
                        <Card hoverable>
                            <div className="news-image-container">
                                <Title level={5} className="news-title">
                                    {news.name}
                                </Title>
                                <img src={news?.image?.thumbnail?.contentUrl || defaultImage} alt="" />
                            </div>
                        
                            {/* <p>Source : {news.provider[0].name}</p> */}
                            <p>{news.description.length > 100 ? `${news.description.substring(0,100)}...` : news.description}</p>
                            <div className="provider-container">
                                <div className="provider-info">
                                <Avatar src={news?.provider[0]?.image?.thumbnail?.contentUrl || defaultImage} />
                                <Text className="provider-name">{news.provider[0].name}</Text>
                            </div>
                            <Text> {moment(news.datePublished).startOf().fromNow()}</Text>
                            </div>
                        </Card>
                    </a>
                </Col>
            ))
            :
            console.log("Entered once")
        }
        </Row>  
    </>
    )
}

export default News;