import React from 'react';
import "./Sidebar.css";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import { Avatar, IconButton } from "@material-ui/core";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import {SearchOutlined} from "@material-ui/icons";
import SidebarChat from "./SidebarChat";
 
function Sidebar() {
    return (
        <div className="sidebar">
            <div className="sidebar_header">
            <Avatar src="https://mk0timesnextw7n7qiu0.kinstacdn.com/wp-content/uploads/2019/12/facts-you-must-know-about-prabhas.jpg"/>
                <div className="sidebar_headerRight">
                    <IconButton>
                    <DonutLargeIcon/>
                    </IconButton>
                    <IconButton>
                    <ChatIcon/>
                    </IconButton>
                    <IconButton>
                    <MoreVertIcon/>
                    </IconButton>
                </div>
            </div>
            <div className="sidebar_search">
                <div className="sidebar_searchContainer">
                    <SearchOutlined/>
                    <input placeholder="search or start a new chat" type="text"/>
                </div>
                </div>
                <div className="sidebar_chats">
                    <SidebarChat/>
                    <SidebarChat/>
                    <SidebarChat/>
                 </div>
        </div>
    );
}

export default Sidebar;
