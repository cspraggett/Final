import React from "react";
import { Header, Button, Menu, Image, Box } from "grommet";
import { Home } from "grommet-icons";

export default function HeaderBar(props) {
  return (
    <Header background="neutral-3">
      <Button icon={<Home />} hoverIndicator />
      <Box height="small" width="small">
        <Image
          fit="cover"
          src="client/public/images/shift-logo-blue.svg"
          // src="//v2.grommet.io/assets/Wilderpeople_Ricky.jpg"
        />
      </Box>

      <Menu label="account" items={[{ label: "logout" }]} />
    </Header>
  );
}
