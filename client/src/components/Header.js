import React from "react";
import { Header, Button, Menu, Image, Box } from "grommet";
import { Home } from "grommet-icons";
// import shift from "../images/shift-logo-blue.svg";
import logo from "../images/logo2.png";

export default function HeaderBar(props) {
  return (
    <Header background="neutral-2">
      <Button icon={<Home />} hoverIndicator />
      <Box height="xsmall" width="small" align="center">
        <Image
          fit="cover"
          src={logo}
            // src="logomakr.com/7evvbV"
          // src="//v2.grommet.io/assets/Wilderpeople_Ricky.jpg"
          // src="https://photos.smugmug.com/Pinnacles-May-2019/n-8KLNDR/i-bxkrqwL/0/1c7fa7f2/M/i-bxkrqwL-M.jpg"
          // src={shi1ft}
        />
      </Box>

      <Menu label="account" items={[{ label: "logout" }]} />
    </Header>
  );
}
