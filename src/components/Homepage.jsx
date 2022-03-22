import React from "react";
import millify from "millify";
import { Typography, Row, Col, Statistic } from "antd";
import { Link } from "react-router-dom";
import { useGetCryptosQuery } from "../services/cryptoAPI";
import {Cryptocurrencies, News } from "../components"

const { Title } = Typography;

const Homepage = ()  => {

    const { data, isFetching } = useGetCryptosQuery(10);
    // console.log(data);
    
    // let globalData;
    
    if(isFetching) return "Loading...";
    
    const globalData = data.data;
    // console.log("globalData");
    console.log(globalData);
    
    return(
        <>
            <Title level={2} className="heading">
                Crypto Stats
            </Title>
            <Row>
                <Col span={12}><Statistic title="Total Cryptocurrencies" value={globalData.stats.total}/></Col>
                <Col span={12}><Statistic title="Total Exchanges" value={millify(globalData.stats.totalExchanges)}/></Col>
                <Col span={12}><Statistic title="Total Market Cap" value={millify(globalData.stats.totalMarketCap)}/></Col>
                <Col span={12}><Statistic title="Total 24 Hour Volume" value={millify(globalData.stats.total24hVolume)}/></Col>
                <Col span={12}><Statistic title="Total Markets" value={millify(globalData.stats.totalMarkets)}/></Col>
                {/* <col span={12}><Statistic title="Total Cryptocurrencies" value={5}/></col> */}
            </Row>
            {/* <div className="home-heading-container">
                <Title level={2} className="home-title" >Top {simplified ? 10} Cryptocurrencies </Title>
            </div> */}
            <Cryptocurrencies simplified/>
            <Title level={5} className="show-more" ><Link to={"/cryptocurrencies"}>Show More</Link></Title>
            {/* <div className="home-heading-container">
                <Title level={2} className="home-title" >Latest Crypto News</Title>
            </div> */}
            <News simplified/>
            <Title level={5} className="show-more" ><Link to={"/news"}>Show More</Link></Title>

        </>
    )
}

export default Homepage;