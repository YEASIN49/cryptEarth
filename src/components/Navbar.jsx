import React, {useEffect, useState} from "react";
import { Button, Menu, Typography, Avatar } from "antd";
import { Link } from "react-router-dom";
import { HomeOutlined, MoneyCollectOutlined, BulbOutlined, FundOutlined, MenuOutlined } from "@ant-design/icons";
import icon from "../images/logo.png"

const Navbar = () => {

    const [isBurgerBtnOpen, setIsBurgerBtnOpen] = useState(true);
	const [screenWidth, setScreenWidth] = useState(window.innerWidth);


    const toggleBurgerBtnHandler = () => {
        setIsBurgerBtnOpen((prevState) => prevState = !prevState);
	}

    useEffect(()=>{
        const resizer = () => setScreenWidth(window.innerWidth);
        window.addEventListener("resize",resizer)

        return () => window.removeEventListener("resize",resizer);
    },[])

    useEffect(()=>{
        screenWidth > 800 ? setIsBurgerBtnOpen((prevState) =>  prevState = true) : setIsBurgerBtnOpen((prevState) =>  prevState = false)
    },[screenWidth])



    return(
        <div className="nav-container">
            <div className="logo-container">
                <Avatar src={icon} size="large"/>
                <Typography.Title level={2} className="logo" >
                    <Link to="/">cryptEarth</Link>
                </Typography.Title>

                {
                    
                    <Button className="menu-control-container" onClick={toggleBurgerBtnHandler}>
                         <MenuOutlined />
                    </Button>
                }    
                
            </div>
            {
                isBurgerBtnOpen && 
                <Menu theme="dark" key={"navLinks"}>
                <Menu.Item icon={<HomeOutlined />} key={"home"}>
                    <Link to="/">Home</Link>
                </Menu.Item>
                <Menu.Item icon={<FundOutlined />} key={"cryptocurrencies"}>
                    <Link to="/cryptocurrencies">Cryptocurrencies</Link>
                </Menu.Item>
                <Menu.Item icon={<MoneyCollectOutlined />} key={"exchanges"}>
                    <Link to="/exchanges">Exchanges</Link>
                </Menu.Item>
                <Menu.Item icon={<BulbOutlined />} key={"news"}>
                    <Link to="/news">News</Link>
                </Menu.Item>
            </Menu>
            }
        </div>
    )
}

export default Navbar;