import React from "react";
import { Header, Button, Menu, Image, Box } from "grommet";
import { Home } from "grommet-icons";
import shift from "../images/shift-logo-blue.svg";

export default function HeaderBar(props) {
  return (
    <Header background="neutral-3">
      <Button icon={<Home />} hoverIndicator />
      <Box height="small" width="small">
        <Image
          fit="cover"
          // src="https://photos.smugmug.com/Pinnacles-May-2019/n-8KLNDR/i-bxkrqwL/0/1c7fa7f2/M/i-bxkrqwL-M.jpg"
          src={shift}
        />
      </Box>

      <Menu label="account" items={[{ label: "logout" }]} />
    </Header>
  );
}
